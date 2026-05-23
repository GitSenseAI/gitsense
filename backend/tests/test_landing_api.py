"""Backend API tests for GitSense landing page endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://ai-repo-scan.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# -------- Health/root --------
class TestRoot:
    def test_root_endpoint(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "GitSense" in data["message"]


# -------- Analyze --------
class TestAnalyze:
    def test_analyze_valid_repo(self, client):
        payload = {"repo_url": "gitlawb://gitsense/repository-demo"}
        r = client.post(f"{API}/analyze", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        # Structural assertions
        for key in [
            "id", "repo_url", "repo_name", "health_score",
            "architecture_summary", "files_analyzed", "lines_of_code",
            "languages", "dependencies", "contributors",
            "security_risks", "ai_recommendations",
            "documentation_coverage", "test_coverage", "created_at",
        ]:
            assert key in data, f"Missing key: {key}"

        # Value assertions
        assert data["repo_url"] == payload["repo_url"]
        assert data["repo_name"] == "gitsense/repository-demo"
        assert 0 <= data["health_score"] <= 100
        assert isinstance(data["dependencies"], list) and len(data["dependencies"]) > 0
        assert isinstance(data["contributors"], list) and len(data["contributors"]) > 0
        assert isinstance(data["ai_recommendations"], list) and len(data["ai_recommendations"]) > 0
        assert isinstance(data["languages"], dict) and len(data["languages"]) > 0
        # Dependency shape
        dep = data["dependencies"][0]
        for k in ["name", "version", "risk", "type"]:
            assert k in dep
        # Contributor shape
        c = data["contributors"][0]
        for k in ["name", "commits", "role", "avatar_seed"]:
            assert k in c

    def test_analyze_deterministic_health_score(self, client):
        """Same repo_url should yield same health score (seeded random)."""
        payload = {"repo_url": "gitlawb://gitsense/repository-demo"}
        r1 = client.post(f"{API}/analyze", json=payload).json()
        r2 = client.post(f"{API}/analyze", json=payload).json()
        assert r1["health_score"] == r2["health_score"]
        assert r1["repo_name"] == r2["repo_name"]

    def test_analyze_invalid_empty(self, client):
        r = client.post(f"{API}/analyze", json={"repo_url": ""})
        assert r.status_code == 400
        assert "detail" in r.json()

    def test_analyze_invalid_short(self, client):
        r = client.post(f"{API}/analyze", json={"repo_url": "ab"})
        assert r.status_code == 400

    def test_analyze_missing_field(self, client):
        r = client.post(f"{API}/analyze", json={})
        # FastAPI returns 422 for missing required field
        assert r.status_code in (400, 422)


# -------- Metrics --------
class TestMetrics:
    def test_metrics_endpoint(self, client):
        r = client.get(f"{API}/metrics")
        assert r.status_code == 200
        data = r.json()
        for key in [
            "repositories_analyzed",
            "ai_scans_completed",
            "contributors_tracked",
            "average_analysis_ms",
        ]:
            assert key in data
            assert isinstance(data[key], int)
        assert data["repositories_analyzed"] > 0
        assert data["average_analysis_ms"] > 0

    def test_metrics_increases_after_analyze(self, client):
        before = client.get(f"{API}/metrics").json()
        client.post(f"{API}/analyze", json={"repo_url": "gitlawb://test/repo-metrics"})
        after = client.get(f"{API}/metrics").json()
        assert after["repositories_analyzed"] >= before["repositories_analyzed"]

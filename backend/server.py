from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import random
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# -------- Existing status check models (kept) --------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


# -------- Analyzer models --------
class AnalyzeRequest(BaseModel):
    repo_url: str


class Contributor(BaseModel):
    name: str
    commits: int
    role: str
    avatar_seed: str


class Dependency(BaseModel):
    name: str
    version: str
    risk: str  # low, medium, high
    type: str  # runtime, dev


class SecurityRisk(BaseModel):
    severity: str
    title: str
    file: str


class AnalysisResult(BaseModel):
    id: str
    repo_url: str
    repo_name: str
    health_score: int
    architecture_summary: str
    files_analyzed: int
    lines_of_code: int
    languages: dict
    dependencies: List[Dependency]
    contributors: List[Contributor]
    security_risks: List[SecurityRisk]
    ai_recommendations: List[str]
    documentation_coverage: int
    test_coverage: int
    created_at: str


@api_router.get("/")
async def root():
    return {"message": "GitSense API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# -------- Mock analyzer --------
def _generate_mock_analysis(repo_url: str) -> AnalysisResult:
    repo_name = repo_url.replace("gitlawb://", "").replace("https://gitlawb.com/", "").strip("/") or "blvckout/core-node"

    random.seed(repo_name)
    health_score = random.randint(72, 96)

    deps = [
        {"name": "react", "version": "19.0.0", "risk": "low", "type": "runtime"},
        {"name": "fastapi", "version": "0.110.1", "risk": "low", "type": "runtime"},
        {"name": "motor", "version": "3.3.1", "risk": "low", "type": "runtime"},
        {"name": "axios", "version": "1.8.4", "risk": "medium", "type": "runtime"},
        {"name": "lodash", "version": "4.17.20", "risk": "high", "type": "runtime"},
        {"name": "tailwindcss", "version": "3.4.17", "risk": "low", "type": "dev"},
        {"name": "framer-motion", "version": "11.5.0", "risk": "low", "type": "runtime"},
        {"name": "recharts", "version": "3.6.0", "risk": "low", "type": "runtime"},
    ]

    contributors = [
        {"name": "blvckout", "commits": 1428, "role": "Maintainer", "avatar_seed": "blvckout"},
        {"name": "neon.dev", "commits": 612, "role": "Core", "avatar_seed": "neon"},
        {"name": "kira.x", "commits": 318, "role": "Core", "avatar_seed": "kira"},
        {"name": "ascii_void", "commits": 204, "role": "Contributor", "avatar_seed": "ascii"},
        {"name": "0xRaven", "commits": 142, "role": "Contributor", "avatar_seed": "raven"},
    ]

    security_risks = [
        {"severity": "high", "title": "Outdated lodash with prototype pollution CVE", "file": "package.json"},
        {"severity": "medium", "title": "Hardcoded token in legacy config", "file": "src/legacy/config.ts"},
        {"severity": "low", "title": "Missing CSP headers in nginx config", "file": "deploy/nginx.conf"},
    ]

    recommendations = [
        "Upgrade lodash to >=4.17.21 to patch CVE-2020-8203",
        "Move legacy config tokens to environment variables",
        "Add E2E tests covering the auth refresh flow",
        "Split the monolithic services/index.ts into domain modules",
    ]

    return AnalysisResult(
        id=str(uuid.uuid4()),
        repo_url=repo_url,
        repo_name=repo_name,
        health_score=health_score,
        architecture_summary="Modular monorepo with a FastAPI service layer, a React 19 frontend, and an event-driven worker queue. Clean separation of domain modules with a thin API gateway.",
        files_analyzed=random.randint(840, 2400),
        lines_of_code=random.randint(48000, 184000),
        languages={"TypeScript": 52, "Python": 31, "Rust": 9, "Shell": 5, "Other": 3},
        dependencies=[Dependency(**d) for d in deps],
        contributors=[Contributor(**c) for c in contributors],
        security_risks=[SecurityRisk(**s) for s in security_risks],
        ai_recommendations=recommendations,
        documentation_coverage=random.randint(58, 92),
        test_coverage=random.randint(61, 88),
        created_at=datetime.now(timezone.utc).isoformat(),
    )


@api_router.post("/analyze", response_model=AnalysisResult)
async def analyze_repo(req: AnalyzeRequest):
    if not req.repo_url or len(req.repo_url.strip()) < 3:
        raise HTTPException(status_code=400, detail="Invalid repository URL")
    result = _generate_mock_analysis(req.repo_url.strip())
    # Persist a lightweight record
    await db.analyses.insert_one({
        "id": result.id,
        "repo_url": result.repo_url,
        "repo_name": result.repo_name,
        "health_score": result.health_score,
        "created_at": result.created_at,
    })
    return result


@api_router.get("/metrics")
async def get_metrics():
    """Public counters for the landing page."""
    base_analyzed = 184_239
    base_scans = 612_904
    base_contribs = 48_127
    avg_ms = 1820

    try:
        count = await db.analyses.count_documents({})
    except Exception:
        count = 0

    return {
        "repositories_analyzed": base_analyzed + count,
        "ai_scans_completed": base_scans + count * 3,
        "contributors_tracked": base_contribs + count // 2,
        "average_analysis_ms": avg_ms,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

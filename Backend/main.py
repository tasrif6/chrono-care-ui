# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.core.config import settings
# from app.db.database import Base, engine
# from app.routes import auth as auth_router

# Base.metadata.create_all(bind=engine)

# app = FastAPI(title="HealthSync Auth")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[settings.CORS_ORIGINS],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(auth_router.router)



from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routes import auth

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://localhost:8000",
    "*"  # Allow all origins temporarily for testing
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")  # Add prefix to match the frontend URL


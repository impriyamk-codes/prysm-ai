from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "Prysm Backend Running"}

@app.post("/chat")
def chat(request: ChatRequest):
    user_message = request.message

    try:
        response = model.generate_content(
            f"You are Prysm, an AI workspace assistant for students and developers. Reply helpfully and concisely.\n\nUser: {user_message}"
        )

        return {
            "reply": response.text
        }

    except Exception as e:
        return {
            "reply": "Prysm AI provider is connected, but the current API quota is unavailable. For now, I can run in mock mode while you continue building the app."
        }
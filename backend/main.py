# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from anthropic import AsyncAnthropic
import os
import time

app = FastAPI()

# Initialize Claude client
client = AsyncAnthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

class AgentRequest(BaseModel):
    prompt: str

class AgentResponse(BaseModel):
    response: str
    processing_time: float

@app.post("/api/agent", response_model=AgentResponse)
async def run_agent(request: AgentRequest):
    if not request.prompt:
        raise HTTPException(status_code=400, detail="Prompt string is required.")
    
    start_time = time.time()
    
    try:
        # Streamline the prompt to Claude
        message = await client.messages.create(
            max_tokens=250,
            messages=[{"role": "user", "content": request.prompt}],
            model="claude-3-haiku-20240307",
            system="You are an autonomous AI agent integrated into a high-end software development agency's terminal. You specialize in Python, R, and Machine Learning pipelines. Keep responses concise, technical, and slightly cyberpunk in tone."
        )
        response_text = message.content[0].text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Neural link severed: {str(e)}")
    
    return AgentResponse(
        response=response_text,
        processing_time=round(time.time() - start_time, 2)
    )
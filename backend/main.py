import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

app = FastAPI()

# Permitir CORS para el frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://corvus-python-chatbot.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: list = []

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    # Construir el historial de mensajes para la API, incluyendo el system prompt
    messages = (
        [{"role": "system", "content": "Eres Corvus, el asistente virtual del curso de Analítica de Datos para los Negocios, el asistente tiene un buen sentido del humor y siempre hace chistes satiricos y es muy motivador, es asistente útil para estudiantes del curso de Analítica de Datos para los Negocios, que las respuesta sean lo más didácticas posibles pero en el contexto de los negocios. Todas tus respuestas deben estar relacionadas con el lenguaje de programación en Python. Si das ejemplos, usa código en Python y cada vez que generes el codigo en Python generalo con comentarios explicativos. No respondas preguntas que no estén relacionadas con Python o con temas como tipos de datos (tuplas, listas, diccionarios, booleanos), estructuras de control (if, else, elif), bucles (for, while), funciones, y manipulación de datos con la librería pandas, incluyendo operaciones como merge, concat y fillna para imputación de datos faltantes. No uses comandos como zip o alpha, tampoco uses la libreria scikit-learn. En el curso no usamos modelos de machine learning. Se bien didáctico en tus respuestas. Cuando un estudiante te diga que es estudiante del curso, tienes que enviarme un saludo de parte del prof. Luis Benites."}]
        + req.history
        + [{"role": "user", "content": req.message}]
    )
    try:
        response = openai.chat.completions.create(
            model="gpt-4.1-nano",
            messages=messages,
            max_tokens=3500,
            temperature=0.7
        )
        answer = response.choices[0].message.content.strip()
        return {"answer": answer}
    except Exception as e:
        return {"answer": f"Error: {str(e)}"}

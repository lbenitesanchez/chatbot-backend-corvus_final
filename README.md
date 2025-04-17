# Chatbot Web con GPT-4o mini

Este proyecto es un ejemplo práctico para docentes de la Facultad de Ciencias Empresariales sobre cómo integrar la inteligencia artificial generativa en herramientas educativas y de gestión, usando la API de OpenAI (GPT-4o mini).

## Estructura del proyecto
- `backend/`: Servidor FastAPI que conecta con la API de OpenAI
- `frontend/`: Interfaz de chat en React

## Instrucciones rápidas

### 1. Backend (Python + FastAPI)
1. Ve a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala dependencias:
   ```bash
   pip install -r requirements.txt
   ```
3. Pon tu clave de OpenAI en el archivo `.env` (reemplaza `TU_CLAVE_OPENAI_AQUI`).
4. Ejecuta el servidor:
   ```bash
   uvicorn main:app --reload
   ```

### 2. Frontend (React)
1. Ve a la carpeta `frontend`:
   ```bash
   cd ../frontend
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Ejecuta la app:
   ```bash
   npm start
   ```

La app React estará en `http://localhost:3000` y el backend en `http://localhost:8000`.

---

## ¿Cómo funciona?
- El usuario escribe una pregunta en la interfaz de chat.
- El frontend envía la pregunta al backend.
- El backend consulta la API de OpenAI y devuelve la respuesta.
- El frontend muestra la respuesta en el chat.

---

## Casos de uso sugeridos
- Asistente para consultas administrativas o académicas
- Tutor virtual para dudas sobre materias
- Generador de ejemplos o ejercicios personalizados

---

## Seguridad
- **Nunca expongas tu clave de OpenAI en el frontend.**
- Este ejemplo está pensado para demostraciones y aprendizaje.

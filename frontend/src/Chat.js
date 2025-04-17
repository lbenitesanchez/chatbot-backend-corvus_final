import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./responsive-chat.css";

const BOT_AVATAR = '🤖';
const USER_AVATAR = '😎';

const AVATARS = {
  assistant: BOT_AVATAR,
  user: USER_AVATAR
};

const NAMES = {
  assistant: "Corvus",
  user: "Estudiante"
};

// Mensaje de bienvenida inicial
const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "¡Hola! Soy Corvus 🤖, tu asistente virtual para el curso de Analítica de Datos para los Negocios. Estoy aquí para ayudarte a aprender y aplicar Python en el contexto empresarial. Puedes preguntarme sobre tipos de datos, estructuras de control, bucles, funciones o manipulación de datos con pandas. ¿En qué tema te gustaría comenzar hoy?"
};

function Chat() {
  // El estado inicial incluye el mensaje de bienvenida
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://chatbot-backend-corvus-final.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages.filter(m => m.role && m.content).map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: "assistant", content: data.answer }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: "assistant", content: "Error al conectar con el servidor." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="responsive-chat-container" style={{ width: "100%", height: "70vh", overflow: "hidden", display: "flex", flexDirection: "column", background: "#f8fafc", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          const align = isUser ? "flex-end" : "flex-start";
          const bgColor = isUser ? "#e0e7ff" : "#f1f5f9";
          const borderColor = isUser ? "#6366f1" : "#0ea5e9";
          return (
            <div key={idx} style={{ display: "flex", flexDirection: isUser ? "row-reverse" : "row", alignItems: "flex-end", marginBottom: 16 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                margin: isUser ? "0 0 0 12px" : "0 12px 0 0",
                color: isUser ? "#6366f1" : "#0ea5e9",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}>
                <span role="img" aria-label={NAMES[msg.role]} style={{ fontSize: 28, lineHeight: 1 }}>{AVATARS[msg.role]}</span>
              </div>
              <div className="responsive-chat-bubble" style={{
                background: bgColor,
                border: `1.5px solid ${borderColor}`,
                borderRadius: 16,
                padding: "12px 18px",
                maxWidth: "70%",
                fontSize: 16,
                color: "#22292f",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                textAlign: "left"
              }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: borderColor, marginBottom: 4 }}>{NAMES[msg.role]}</div>
                {msg.role === "assistant" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={oneLight}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{ borderRadius: 12, fontSize: 15, padding: 16, maxWidth: "100vw", overflowX: "auto", boxSizing: "border-box" }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            style={{
                              background: "#f1f5f9",
                              borderRadius: 6,
                              padding: "2px 6px",
                              fontSize: 15,
                              maxWidth: "100vw",
                              overflowX: "auto",
                              boxSizing: "border-box"
                            }}
                            className={className}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          );
        })}
        {loading && (
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", marginBottom: 16 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              margin: "0 12px 0 0",
              color: "#0ea5e9",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
              <span role="img" aria-label={NAMES.assistant} style={{ fontSize: 28, lineHeight: 1 }}>{AVATARS.assistant}</span>
            </div>
            <div style={{
              background: "#f1f5f9",
              border: "1.5px solid #0ea5e9",
              borderRadius: 16,
              padding: "12px 18px",
              maxWidth: "70%",
              fontSize: 16,
              color: "#22292f",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              textAlign: "left"
            }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#0ea5e9", marginBottom: 4 }}>{NAMES.assistant}</div>
              Pensando...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} style={{ display: "flex", padding: 16, borderTop: "1px solid #e5e7eb", background: "#fff" }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 8,
            border: "1.5px solid #cbd5e1",
            fontSize: 16,
            outline: "none",
            marginRight: 12,
            background: "#f1f5f9"
          }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: loading ? "#a5b4fc" : "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0 22px",
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default Chat;

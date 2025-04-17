import React from "react";
import Chat from "./Chat";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f5f5" }}>
      <div style={{ width: 1000, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", padding: 24 }}>
        <h2 style={{ textAlign: "center" }}>Chatbot para Analítica de datos para los negocios parte Python</h2>
        <Chat />
      </div>
    </div>
  );
}

export default App;

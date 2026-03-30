import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const API_KEY = "SUA_API_KEY";
const SESSION = "default";

const SEND_URL = "http://localhost:3001/api/sendText";

app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    console.log("Webhook recebido:", JSON.stringify(data, null, 2));

    // 🔍 Ajuste conforme estrutura recebida
    const message = data?.body || data?.message || "";
    const from = data?.from || data?.chatId || data?.sender || "";

    if (!message || !from) return res.sendStatus(200);

    let reply = "";

    if (message.toLowerCase().includes("emagrecer")) {
      reply = "Oi! Você quer emagrecer ou ganhar massa?";
    } else if (message.toLowerCase().includes("massa")) {
      reply = "Ótimo! Quer ajuda com dieta ou treino?";
    } else {
      reply = "Tenho algo que pode te ajudar 👇\n👉 SEU_LINK_AQUI";
    }

    const numero = String(from).includes("@c.us")
      ? from
      : from + "@c.us";

    await axios.post(
      SEND_URL,
      {
        session: SESSION,
        to: numero,
        text: reply
      },
      {
        headers: {
          "X-Api-Key": API_KEY
        }
      }
    );

    res.sendStatus(200);

  } catch (err) {
    console.log("Erro:", err.response?.data || err.message);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
import express from "express";

const app = express();
app.use(express.json());

app.post("/webhook", (req, res) => {
  const mensagem = req.body?.message?.conversation || "";

  console.log("Mensagem recebida:", mensagem);

  let resposta = "Oi! Você quer emagrecer ou ganhar massa?";

  if (mensagem.includes("emagrecer")) {
    resposta = "Entendi! Qual sua maior dificuldade hoje?";
  }

  if (mensagem.includes("dieta")) {
    resposta = "Tenho algo que pode te ajudar 👇\n👉 SEU_LINK_AQUI";
  }

  console.log("Resposta do bot:", resposta);

  res.json({ reply: resposta }); // 🔥 AQUI ESTÁ A DIFERENÇA
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000 🚀"));
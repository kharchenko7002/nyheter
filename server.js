// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import fetch from "node-fetch";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Log IP-adresse for hver request
app.use((req, res, next) => {
  const rawIp = req.headers['x-forwarded-for'] || req.ip;
  const ip = rawIp.replace(/^.*:/, '');
  console.log("🔍 Normalisert IP:", ip);
  req.normalizedIp = ip;
  next();
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Midlertidig minne for gjeste-IP bruk
const gjesteTeller = {};

// === GPT-4 analyse av nyheten ===
app.post("/sjekk-nyhet", async (req, res) => {
  const { tekst } = req.body;

  try {
    const respons = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Du er en nyhetsanalytiker og ekspert på faktasjekk. Din jobb er å analysere en nyhetssetning og svare klart om den er \"SANN\" eller \"FALSK\".
Svar alltid med dette formatet:

Resultat: SANN eller FALSK  
Begrunnelse: kort forklaring  
Sikkerhet: XX%

Svar alltid tydelig, ikke si at du er en AI eller at du ikke kan bekrefte. Gi en vurdering basert på allmenn kunnskap.`,
        },
        { role: "user", content: `Nyhet: "${tekst}"` },
      ],
    });

    const svar = respons.choices[0].message.content;
    res.json({ resultat: svar });
  } catch (error) {
    console.error("🛑 Feil med OpenAI:", error);
    res.status(500).send("Det oppstod en feil ved sjekking av nyheten.");
  }
});

// === NewsAPI med begrensning ===
app.post("/soek-nyhet-newsapi", async (req, res) => {
  const { tekst, språk, email } = req.body;
  console.log("📥 mottatt email:", email);

  const valgtSprak = språk || "no";
  const ip = req.normalizedIp;

  const erInnlogget = Boolean(email);
  if (!erInnlogget) {
    gjesteTeller[ip] = (gjesteTeller[ip] || 0) + 1;
    const antallBrukt = gjesteTeller[ip];
    const antallIgjen = Math.max(0, 5 - antallBrukt);

    console.log("🧠 Bruker-IP:", ip, "Forsøk brukt:", antallBrukt);

    if (antallBrukt > 5) {
      return res.status(429).json({
        resultat: `❌ Du har brukt opp gjestegrensen. Logg inn for ubegrenset tilgang. (${antallIgjen} igjen)`
      });
    }
  }

  const renset = tekst
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(" ")
    .filter((ord) => ord.length > 3)
    .slice(0, 6)
    .join(" ");

  const q1 = encodeURIComponent(renset);
  const q2 = encodeURIComponent(tekst.split(" ").slice(0, 3).join(" "));
  const baseURL = "https://newsapi.org/v2/everything";
  const url1 = `${baseURL}?qInTitle=${q1}&language=${valgtSprak}&sortBy=relevancy&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
  const url2 = `${baseURL}?q=${q2}&language=${valgtSprak}&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;

  try {
    const f1 = await fetch(url1);
    const d1 = await f1.json();

    if (d1.articles?.length > 0) {
      return res.json({
        resultat: d1.articles.map((a) => ({
          tittel: a.title,
          kilde: a.source.name,
          url: a.url,
        })),
      });
    }

    const f2 = await fetch(url2);
    const d2 = await f2.json();

    if (d2.articles?.length > 0) {
      return res.json({
        resultat: d2.articles.map((a) => ({
          tittel: a.title,
          kilde: a.source.name,
          url: a.url,
        })),
      });
    }

    res.json({ resultat: "❌ Ingen relevante nyhetsartikler ble funnet." });
  } catch (error) {
    console.error("🛑 Feil ved NewsAPI-søk:", error);
    res.status(500).send("Feil ved søk i nyhetskilder.");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server kjører på port ${PORT}`);
});
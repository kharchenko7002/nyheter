import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// === GPT-4 analyse av nyheten ===
app.post("/sjekk-nyhet", async (req, res) => {
  const { tekst } = req.body;

  try {
    const respons = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Du er en nyhetsanalytiker og ekspert på faktasjekk. Din jobb er å analysere en nyhetssetning og svare klart om den er "SANN" eller "FALSK".
Svar alltid med dette formatet:

Resultat: SANN eller FALSK  
Begrunnelse: kort forklaring  
Sikkerhet: XX%

Svar alltid tydelig, ikke si at du er en AI eller at du ikke kan bekrefte. Gi en vurdering basert på allmenn kunnskap.`,
        },
        {
          role: "user",
          content: `Nyhet: "${tekst}"`,
        },
      ],
    });

    const svar = respons.choices[0].message.content;
    res.json({ resultat: svar });
  } catch (error) {
    console.error("🛑 Feil med OpenAI:", error);
    res.status(500).send("Det oppstod en feil ved sjekking av nyheten.");
  }
});

// === Forbedret søk i NewsAPI ===
app.post("/soek-nyhet-newsapi", async (req, res) => {
  const { tekst, språk } = req.body;
  const valgtSpråk = språk || "no";

  // === Rens og velg nøkkelord ===
  const nøkkelord = tekst
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(" ")
    .filter((ord) => ord.length > 3)
    .slice(0, 6)
    .join(" ");

  const q1 = encodeURIComponent(nøkkelord);
  const q2 = encodeURIComponent(tekst.split(" ").slice(0, 3).join(" "));

  const baseURL = "https://newsapi.org/v2/everything";

  // === Første forsøk (avansert søk i tittel + relevans)
  const url1 = `${baseURL}?qInTitle=${q1}&language=${valgtSpråk}&sortBy=relevancy&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;

  // === Andre forsøk (hvis første gir null)
  const url2 = `${baseURL}?q=${q2}&language=${valgtSpråk}&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;

  try {
    const første = await fetch(url1);
    const data1 = await første.json();

    console.log("🔍 Primært søk etter:", nøkkelord);
    console.log("🌐 URL 1:", url1);
    console.log("📦 Resultat 1:", JSON.stringify(data1, null, 2));

    if (data1.articles && data1.articles.length > 0) {
      const funn = data1.articles.map((artikkel) => ({
        tittel: artikkel.title,
        kilde: artikkel.source.name,
        url: artikkel.url,
      }));
      return res.json({ resultat: funn });
    }

    // === Fallback hvis ingen resultater
    const backup = await fetch(url2);
    const data2 = await backup.json();

    console.log("🔁 Fallback søk etter:", tekst);
    console.log("🌐 URL 2:", url2);
    console.log("📦 Resultat 2:", JSON.stringify(data2, null, 2));

    if (data2.articles && data2.articles.length > 0) {
      const funn = data2.articles.map((artikkel) => ({
        tittel: artikkel.title,
        kilde: artikkel.source.name,
        url: artikkel.url,
      }));
      return res.json({ resultat: funn });
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

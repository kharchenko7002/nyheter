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
    console.error("Feil med OpenAI:", error);
    res.status(500).send("Det oppstod en feil ved sjekking av nyheten.");
  }
});

app.post("/soek-nyhet-newsapi", async (req, res) => {
  const { tekst, språk } = req.body;
  const valgtSpråk = språk || "no";
  const soekeord = encodeURIComponent(tekst.split(" ").slice(0, 5).join(" "));
  const url = `https://newsapi.org/v2/everything?q=${soekeord}&language=${valgtSpråk}&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`;

  try {
    const respons = await fetch(url);
    const data = await respons.json();

    if (data.articles && data.articles.length > 0) {
      const funn = data.articles.map((artikkel) => ({
        tittel: artikkel.title,
        kilde: artikkel.source.name,
        url: artikkel.url,
      }));
      res.json({ resultat: funn });
    } else {
      res.json({ resultat: "Ingen relevante nyhetsartikler ble funnet." });
    }
  } catch (error) {
    console.error("Feil ved NewsAPI-søk:", error);
    res.status(500).send("Feil ved søk i nyhetskilder.");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server kjører på port ${PORT}`));

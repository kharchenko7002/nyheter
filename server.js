import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

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
    console.error(error);
    res.status(500).send("Det oppstod en feil ved sjekking av nyheten.");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server kjører på port ${PORT}`));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import fetch from "node-fetch";
import Stripe from "stripe";
import bodyParser from "body-parser";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use("/webhook", bodyParser.raw({ type: "application/json" }));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
const db = getFirestore();

app.post("/sjekk-nyhet", async (req, res) => {
  const { tekst } = req.body;
  try {
    const respons = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Du er en nyhetsanalytiker og ekspert på faktasjekk. Din jobb er å analysere en nyhetssetning og svare klart om den er "SANN" eller "FALSK".\nSvar alltid med dette formatet:\n\nResultat: SANN eller FALSK\nBegrunnelse: kort forklaring\nSikkerhet: XX%`,
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
    res.status(500).send("Feil ved sjekking av nyheten.");
  }
});

app.post("/soek-nyhet-newsapi", async (req, res) => {
  const { tekst, språk } = req.body;
  const valgtSpråk = språk || "no";
  const nøkkelord = tekst
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(" ")
    .filter((ord) => ord.length > 3)
    .slice(0, 6)
    .join(" ");
  const q1 = encodeURIComponent(nøkkelord);
  const q2 = encodeURIComponent(tekst.split(" ").slice(0, 3).join(" "));
  const url1 = `https://newsapi.org/v2/everything?qInTitle=${q1}&language=${valgtSpråk}&sortBy=relevancy&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
  const url2 = `https://newsapi.org/v2/everything?q=${q2}&language=${valgtSpråk}&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;

  try {
    const første = await fetch(url1);
    const data1 = await første.json();
    if (data1.articles && data1.articles.length > 0) {
      const funn = data1.articles.map((artikkel) => ({
        tittel: artikkel.title,
        kilde: artikkel.source.name,
        url: artikkel.url,
      }));
      return res.json({ resultat: funn });
    }

    const backup = await fetch(url2);
    const data2 = await backup.json();
    if (data2.articles && data2.articles.length > 0) {
      const funn = data2.articles.map((artikkel) => ({
        tittel: artikkel.title,
        kilde: artikkel.source.name,
        url: artikkel.url,
      }));
      return res.json({ resultat: funn });
    }

    res.json({ resultat: "❌ Ingen relevante nyhetsartikler ble funnet." });
  } catch {
    res.status(500).send("Feil ved søk i nyhetskilder.");
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const { uid, email } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "nok",
          product_data: {
            name: "Premium tilgang",
          },
          unit_amount: 5000,
        },
        quantity: 1,
      },
    ],
    metadata: { uid },
    success_url: "http://localhost:3000?status=success",
    cancel_url: "http://localhost:3000?status=cancel",
  });

  res.json({ url: session.url });
});

app.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const uid = session.metadata.uid;
    await db.collection("brukere").doc(uid).set({ premium: true }, { merge: true });
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server kjører på port ${PORT}`));

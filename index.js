const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.API_KEY;

app.get("/matches/week", async (req, res) => {
  try {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const dateFrom = today.toISOString().split("T")[0];
    const dateTo = nextWeek.toISOString().split("T")[0];

    const response = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: {
          "X-Auth-Token": API_KEY
        }
      }
    );

    const data = await response.json();

    const matches = data.matches.map(m => ({
      home: m.homeTeam.name,
      away: m.awayTeam.name,
      date: m.utcDate.split("T")[0],
      winRate: {
        home: Math.floor(Math.random() * 50) + 50,
        away: Math.floor(Math.random() * 50)
      }
    }));

    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API error" });
  }
});

app.get("/", (req, res) => {
  res.send("API 서버 정상 작동중 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행중: ${PORT}`);
});
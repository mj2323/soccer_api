const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const API_KEY = "6fda0fb3b934403c8775836972e12954";

app.get("/matches/week", async (req, res) => {
  try {
    // 📅 오늘 ~ 7일 계산
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const dateFrom = today.toISOString().split("T")[0];
    const dateTo = nextWeek.toISOString().split("T")[0];

    // ⚽ API 호출
    const response = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: {
          "X-Auth-Token": API_KEY
        }
      }
    );

    const data = await response.json();

    // 🎯 우리가 쓸 데이터로 가공
    const matches = data.matches.map(m => ({
      home: m.homeTeam.name,
      away: m.awayTeam.name,
      date: m.utcDate.split("T")[0],

      // 👉 일단 랜덤 승률 (나중에 개선)
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

app.listen(3000, () => console.log("서버 실행중"));
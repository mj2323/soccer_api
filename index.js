const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "6fda0fb3b934403c8775836972e12954";

app.get("/matches", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/matches",
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    const matches = response.data.matches;

    // 간단 필터 (주요 리그만)
    const filtered = matches.filter(m =>
      ["PL", "PD", "BL1"].includes(m.competition.code)
    );

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: "API 호출 실패" });
  }
});

app.listen(3000, () => {
  console.log("서버 실행됨");
});
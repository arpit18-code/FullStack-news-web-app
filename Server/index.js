const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/api/news", async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = req.query.page || "";

    let url = `https://newsdata.io/api/1/latest?apikey=${process.env.API_KEY}&q=${search}&language=en,hi&country=in`;

    if (page) {
      url += `&page=${page}`;
    }

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching global news:", error.message);

    res.status(500).json({
      message: "Error fetching news",
    });
  }
});

app.get("/api/news/category", async (req, res) => {
  try {
    const category = req.query.category || "";
    const page = req.query.page || "";

    let url = `https://newsdata.io/api/1/latest?apikey=${process.env.API_KEY}&country=in&language=en,hi`;

    if (category && category !== "All") {
      url += `&category=${category}`;
    }

    if (page) {
      url += `&page=${page}`;
    }

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching category news:", error.message);

    res.status(500).json({
      message: "Error fetching category news",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

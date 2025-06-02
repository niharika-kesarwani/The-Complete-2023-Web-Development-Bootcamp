const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&contains=${q}`
    );

    console.log("API Success:", response.data);
    res.status(200).json({
      success: true,
      data: {
        joke: response.data.joke,
        setup: response.data.setup,
        delivery: response.data.delivery,
      },
    });
  } catch (error) {
    console.error("API Error:", error.response?.data);
    res.status(500).json({
      success: false,
      message: error.response?.data.message,
      description: error.response?.data.causedBy[0],
    });
  }
});

app.listen(3000, () => console.log("Server started on port 3000!"));

const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Nashik,india&appid=c38d5e4f757ff2f9641cc92635828e8b&units=metric";

    https.get(url, function (response) {
        console.log(response.statusCode)

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.setHeader("Content-Type", "text/html");
            res.write("The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The temperature in Nashik is " + temp + " degrees Celcius</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "test",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  let countries = [];
  const result = await db.query("SELECT country_code FROM visited_countries");
  result.rows.forEach((country) => countries.push(country.country_code));
  console.log(result.rows);
  res.render("index.ejs", { countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const countryInput = req.body.country;

  const countryResult = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [countryInput]
  );

  if (countryResult.rows.length !== 0) {
    const countryCode = countryResult.rows[0].country_code;

    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);

    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

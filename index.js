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

const getVisitedCountries = async () => {
  let countries = [];
  const result = await db.query("SELECT country_code FROM visited_countries");
  result.rows.forEach((country) => countries.push(country.country_code));
  return countries;
};

const renderIndexEJS = async (res, errorText) => {
  const countries = await getVisitedCountries();
  res.render("index.ejs", {
    countries,
    total: countries.length,
    error: errorText ?? null,
  });
};

app.get("/", async (req, res) => {
  renderIndexEJS(res);
});

app.post("/add", async (req, res) => {
  const countryInput = req.body.country;

  if (countryInput) {
    const countryResult = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
      [countryInput.toLowerCase()]
    );

    if (countryResult.rows.length !== 0) {
      const countryCode = countryResult.rows[0].country_code;

      try {
        await db.query(
          "INSERT INTO visited_countries (country_code) VALUES ($1)",
          [countryCode]
        );
        res.redirect("/");
      } catch (err) {
        renderIndexEJS(res, "Country has already been added, try again.");
      }
    } else {
      renderIndexEJS(res, "Country name does not exist, try again.");
    }
  } else {
    renderIndexEJS(res, "Country name cannot be empty, try again.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

require("dotenv/config");
const express = require("express");
const Router = require("./routes/index");
const { connectDatabase } = require("./config/db.config");

const app = express();
const PORT = process.env.PORT || "8000";
const HOST = process.env.HOST || "127.0.0.1";
const DB_URL = process.env.DB_CONNECTION_STRING || "";

app.set("trust proxy", true);

app.use(express.json({ limit: "12kb" }));
app.use(express.urlencoded({ limit: "6kb", extended: true }));

app.use("/api", Router);

async function start() {
  try {
    await connectDatabase(DB_URL);
    app.listen(PORT, HOST, () =>
      console.log(`Server is up and running on port ${PORT}`)
    );
  } catch (error) {
    const message = error.message || "An error occured";
    console.log(message);
  }
}

start();

import express  from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "Projects",
  host: "localhost",
  database: "real_estate",
  password: "Pauly200210@",
  port: "5432",
});

// Login to the Admin Page

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (
    email?.trim().toLowerCase() === "realestate@gmail.com" &&
    password === "Pauly200210@"
  ) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// Create Listings 

app.listen(5000, () => {
  console.log("listening on port 5000");
});

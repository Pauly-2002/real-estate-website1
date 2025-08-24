import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

const pool = new Pool({
  user: "projects",
  host: "localhost",
  database: "real_estate",
  password: "Pauly200210@",
  port: "5432",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Cloudinary Storage

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "real_estate_listings",
    allowed_formats: [
      "jpg",
      "png",
      "jpeg",
      "webp",
      "gif",
      "svg",
      "bmp",
      "tiff",
    ],
  },
});

const upload = multer({ storage });
// Login to the Admin Page

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  

  if (
    email?.trim().toLowerCase() === "realestate@gmail.com" &&
    password === "Pauly200210@"
  ) {
    res.status(200).json({isAdmin:true});

  } else {
    res.sendStatus(401);
  }
});

// Create Listings

app.post("/api/admin/listings", upload.array("images", 5), async (req, res) => {
  const {
    title,
    description,
    price,
    agent_contact,
    location,
    beds,
    sqft,
    baths,
    types,
  } = req.body;

  // Convert price to float
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return res.status(400).json({ error: "Price must be a valid number" });
  }

  try {
    const imageUrls = req.files.map((file) => {
      const baseUrl = file.path;
      return baseUrl.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
    });
    await pool.query(
      "INSERT INTO listings(title, description, price, image_urls, agent_contact, location, beds, sqft, baths, property_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )",
      [
        title,
        description,
        numericPrice,
        imageUrls,
        agent_contact,
        location,
        beds,
        sqft,
        baths,
        types,
      ]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Get Listings

app.get("/api/displaylistings", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM listings");
    res.json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "database error" });
  }
});

// Delete Listings

app.delete("/api/deletelistings/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM listings WHERE id=$1", [id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Editing Listings

app.put("/api/updatelistings/:id", async (req, res) => {
  const {
    title,
    description,
    price,
    beds,
    baths,
    sqft,
    location,
    agent_contact,
  } = req.body;
  const { id } = req.params;
  console.log(
    title,
    description,
    price,
    beds,
    baths,
    sqft,
    location,
    agent_contact
  );

  try {
    await pool.query(
      "UPDATE listings SET title=$1, description=$2, price=$3, beds=$4, baths=$5, sqft=$6, location=$7, agent_contact=$8 WHERE id=$9",
      [
        title,
        description,
        price,
        beds,
        baths,
        sqft,
        location,
        agent_contact,
        id,
      ]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Search Queries

app.get("/properties", async (req, res) => {
  const { location, type } = req.query;
  let query = "SELECT * FROM listings WHERE 1=1";
  let params = [];

  if (location) {
    params.push(`%${location.trim()}%`);
    query += ` AND TRIM(location) ILIKE $${params.length}`;
  }

  if (type) {
    params.push(type);
    query += ` AND property_type ILIKE $${params.length}`;
  }

  try {
    const result = await pool.query(query, params);
    console.log("Query:", query, "Params:", params); // ✅ Debug
    res.json(result.rows); // ✅ Correct response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});

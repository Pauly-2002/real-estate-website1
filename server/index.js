import express from "express";
import cors from "cors";
import pool from "./db.js"; // ✅ import pool directly
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Multer + Cloudinary storage
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

/* ===================
      API ROUTES
=================== */

// Login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email?.trim().toLowerCase() === "realestate@gmail.com" &&
    password === "Pauly200210@"
  ) {
    res.status(200).json({ isAdmin: true });
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

  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return res.status(400).json({ error: "Price must be a valid number" });
  }

  try {
    const imageUrls = req.files.map((file) =>
      file.path.replace("/upload/", "/upload/f_auto,q_auto,w_800/")
    );

    await pool.query(
      "INSERT INTO listings(title, description, price, image_urls, agent_contact, location, beds, sqft, baths, property_type) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
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
    console.error("Error inserting listing:", err);
    res.sendStatus(500);
  }
});

// Get Listings
app.get("/api/displaylistings", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM listings");
    res.json(results.rows);
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ error: "database error" });
  }
});

// Delete Listings
app.delete("/api/deletelistings/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM listings WHERE id=$1", [req.params.id]);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error deleting listing:", err);
    res.sendStatus(500);
  }
});

// Update Listings
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
        req.params.id,
      ]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error("Error updating listing:", err);
    res.sendStatus(500);
  }
});

// Search Properties
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
    res.json(result.rows);
  } catch (error) {
    console.error("Error searching properties:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================
   SERVE REACT BUILD
=================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/:path(*)", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

/* ===================
   START SERVER
=================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes.js");
const memberRoutes = require("./routes/memberRoutes.js");
const partyRoutes = require("./routes/partyRoutes.js");

const connectDB = require("./database/connectDB.js");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

connectDB();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
  methods: "GET , POST , PUT , PATCH , DELETE , HEAD",
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/parties", partyRoutes);
app.use("/api/members", memberRoutes);

app.listen(PORT, () =>
  console.log(`Server is started at http://localhost:${PORT}`)
);
app.get("/test", (req, res) => {
  res.send("Server is connected successfully!");
});

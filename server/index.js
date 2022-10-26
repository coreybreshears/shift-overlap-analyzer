const express = require("express");
const shiftRoute = require("./routes/shiftRoute");
const queryRoute = require("./routes/queryRoute");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.NODE_PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/shifts", shiftRoute);
app.use("/queries", queryRoute);

app.listen(PORT, () => console.log("Server started"));

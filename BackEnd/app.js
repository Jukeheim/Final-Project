require("dotenv").config();

const cors = require("cors");

const express = require("express");
const logger = require("morgan");

require("./config/db.config");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const router = require("./router/router");
app.use("/", router);
app.use((err, req, res, next) => {
    res.status(err.status).json(err);
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App running at port ${port} 🚀🚀`));
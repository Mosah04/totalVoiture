import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { fileURLToPath } from "url";
import { dirname } from "path";

import indexRouter from "./routes/index.js";
import demandesRouter from "./routes/demandes.js";
import devisRouter from "./routes/devis.js";
import reclamationsRouter from "./routes/reclamations.js";
import transactionsRouter from "./routes/transactions.js";
import annoncesRouter from "./routes/annonces.js";
import assurancesRouter from "./routes/assurances.js";

import middleware from "./middleware/index.js";

import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}${DATABASE_URL}`;

await mongoose.connect(mongoDB);

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(middleware.decodeToken);

app.use("/", indexRouter);
app.use("/annonces", annoncesRouter);
app.use("/assurances", assurancesRouter);
app.use("/demandes", demandesRouter);
app.use("/devis", devisRouter);
app.use("/reclamations", reclamationsRouter);
app.use("/transactions", transactionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;

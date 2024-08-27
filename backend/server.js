// Utgå från förra workshopen, men spara data för users och accounts i mySql.

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.development.local" });
// const secret = process.env.JWT_SECRET || "default_secret";
const secret = "summer";

function generateAccessToken(userId) {
  return jwt.sign(userId, secret);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, secret, (err, userId) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.userId = userId;
    next();
  });
}

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to add a new user
app.post("/users", async (req, res) => {
  const { username, password, amount } = req.body;
  try {
    const { rows } = await sql`
      INSERT INTO users (username, password)
      VALUES (${username}, ${password})
      RETURNING id;
    `;
    const userId = rows[0].id;

    await sql`
      INSERT INTO accounts (user_id, amount)
      VALUES (${userId}, ${amount});
    `;
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Endpoint to create a session (login)
app.post("/sessions", async (req, res) => {
  const { username, password } = req.body;
  try {
    const { rows } = await sql`
      SELECT * FROM users WHERE username = ${username};
    `;
    const dbUser = rows[0];
    if (dbUser && dbUser.password === password) {
      const token = generateAccessToken(dbUser.id);
      res.json({ token });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Endpoint to get account details
app.get("/me/accounts", authenticateToken, async (req, res) => {
  try {
    const { rows } = await sql`
      SELECT * FROM accounts WHERE user_id = ${req.userId};
    `;
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

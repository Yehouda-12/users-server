import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();
const __dirname = path.resolve()
const PORT = process.env.PORT || 3000;
const TODOS_PATH = process.env.TODOS_PATH || path.join(__dirname, "data", "users.json");
import users from './routes/users.js'

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/users',users)
app.get('/yehiel', (req,res)=>{
  res.send("FUCK YOU YEHIEL")})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import cors from 'cors';
import cursoRouter from "./Routes/rotaCurso.js";

const host = "0.0.0.0";
const port = 4000;
const app = express();



app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:3000 http://localhost:4000"
  );
  next();
});

app.use(cors({
  origin: "*"
}))

app.use(express.json()); 

app.use("/curso", cursoRouter);

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
}); 
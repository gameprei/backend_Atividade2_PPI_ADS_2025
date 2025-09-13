import express from "express";
import cursoRouter from "./Routes/rotaCurso.js";

const host = "0.0.0.0";
const port = 4000;
const app = express();

app.use(express.json()); 

app.use("/curso", cursoRouter);

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
}); 
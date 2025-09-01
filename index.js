import express from "express";

const host = "0.0.0.0";
const port = 4000;
const app = express();

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
}); 
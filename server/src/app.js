import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ServiceFlow API v1");
});

export default app;
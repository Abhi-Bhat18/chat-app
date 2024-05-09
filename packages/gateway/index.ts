import express from "express";
import proxy from "express-http-proxy";

const PORT = 9000;

const app = express();

app.use("/user", proxy("http://localhost:1335"));
app.use('/conversation', proxy('http://localhost:1336'));

app.use("/", async (req, res) => {
  return res.json({ status: "ok", service: "api-gateway" });
});

app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));

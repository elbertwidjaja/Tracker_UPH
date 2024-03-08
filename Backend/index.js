import express from "express";
import routes from "./routes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOption = {
  origin: ["http://localhost:8081"],
  credentials: true,
};
app.use(cors(corsOption));

const PORT = 3000;

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});

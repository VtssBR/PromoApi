import {config} from "dotenv"; 
config();
import cors from "cors"
import express from "express"
import {router} from './routes/indexRouter'
import { setupCrons } from "./utils/cron";


const app = express();


app.use(cors())
app.use(express.json());
app.use("/api", router);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

setupCrons();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
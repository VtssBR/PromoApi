import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import {router} from './routes/indexRouter'
import { errorHandlerMiddleware } from "./middlewares/error-handler"


const app = express();

app.use(cors())
app.use(express.json());
app.use(errorHandlerMiddleware)
app.use("/api", router);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
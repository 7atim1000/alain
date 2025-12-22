import express from 'express';
import {Request, Response} from 'express' ;
import cors from 'cors';
import "dotenv/config";
import "colors";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

app.get('/', (req: Request, res:Response)=> res.send('Server is running'));


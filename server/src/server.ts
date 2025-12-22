import express from 'express' ;
import {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config" ;
import 'colors' ;
//npm run build

import router from './routes' ;
import connectDB from './config/db' ;

const app = express();

app.use(express.json({limit: "4mb"}));
app.use(cors({
    origin: "*",
    credentials: true,
}));



// server route
app.get('/', (req: Request, res: Response) => res.send("Server is running"));
app.use('/v1/api/', router);


// port and DB 

connectDB();

const PORT = process.env.PORT || 6060
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`.bgBlue)
});
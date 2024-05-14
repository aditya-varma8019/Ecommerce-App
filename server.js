import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoute from './routes/authRoute.js';

const app = express();

connectDb();

dotenv.config();

app.use(express.json())
app.use(morgan('dev'))


app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.use('/api/v1/auth/', authRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.black);
})
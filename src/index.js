import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import movieRouter from './routes/movieRouter.js';
import errorHandler from './middlewares/errorHandler.js';
 
const PORT = 3000;
 
const app = express();
app.use(express.json());
app.use(morgan('combined'));
 
app.get('/', (req, res) => {
res.json({ message: 'Chérie de MOI' });
});
 
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
 
app.use(errorHandler);
 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
 
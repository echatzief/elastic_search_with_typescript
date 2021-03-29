// Imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import api from './api/index';

// Initializations
const app = express();
const PORT = process.env.PORT || 1337;

// Middlewares
app.use(morgan('common'));
app.use(express.json());
app.use(cors({
  origin: "*"
}));

//Routes
app.use('/api',api);

// Start the app
app.listen(PORT, () => {
  console.log(`App is running at localhost:${PORT}`);
})
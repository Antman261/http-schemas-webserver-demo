import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from "helmet";

const PORT = 8080;
const app = express();

app.use(morgan('combined'));
app.use(compression());
app.use(helmet());

app.listen(PORT, () => {
  console.log(`Polls Server started on port ${PORT}`);
});

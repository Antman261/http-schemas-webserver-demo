import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import { STATIC_PATH, staticMiddleware } from './routes/static.js';
import { decorateExpressRouter } from 'http-schemas/server.js';
import { pollsApiSchema } from 'http-schema';
import { getPollsRouteHandler, postPollsRouteHandler } from './routes/polls.js';
import { validationErrorHandler } from './routes/validationErrorHandler.js';

const PORT = 8080;
const app = express();
const pollsApi = decorateExpressRouter({
  schema: pollsApiSchema,
  onValidationError: validationErrorHandler,
});

app.use(morgan('combined'));
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
app.use(staticMiddleware);
app.use('/api', pollsApi);

pollsApi.get('/polls', getPollsRouteHandler);
pollsApi.post('/polls', postPollsRouteHandler);

app.get('*', (req, res) => {
  res.sendFile(`${STATIC_PATH}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Polls Server started on port ${PORT}`);
});

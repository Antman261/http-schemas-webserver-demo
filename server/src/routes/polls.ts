import { createRequestHandler } from 'http-schemas/server.js';
import { pollsApiSchema } from 'http-schema';
import { pollsRepo } from '../repositories/polls/memory.js';

export const getPollsRouteHandler = createRequestHandler(
  pollsApiSchema,
  'GET',
  '/polls',
  async (req, res) => {
    res.json({ polls: await pollsRepo.getPolls() });
  }
);

export const postPollsRouteHandler = createRequestHandler(
  pollsApiSchema,
  'POST',
  '/polls',
  async (req, res) => {
    const pollInput = req.body;
    const poll = await pollsRepo.createPoll(pollInput);
    res.json(poll);
  }
);

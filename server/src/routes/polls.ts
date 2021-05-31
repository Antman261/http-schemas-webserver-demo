import { createRequestHandler } from 'http-schemas/server.js';
import { pollsApiSchema } from 'http-schema';
import { pollsRepo } from '../repositories/polls/memory.js';
import {createChoiceViaController} from "../domain/polls/choiceController.js";
import {isNever} from "../never.js";
import {addVoteViaController} from "../domain/polls/voteController.js";

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

export const getPollByIdRouteHandler = createRequestHandler(
  pollsApiSchema,
  'GET',
  '/polls/:id',
  async (req, res) => {
    const pollId = parseInt(req.params.id, 10);
    const poll = await pollsRepo.getPollById(pollId);
    if (!poll) {
      res.status(404).json({error: "Poll not found"});
      return;
    }
    res.json(poll);
  }
);

export const postChoiceRouteHandler = createRequestHandler(
  pollsApiSchema,
  'POST',
  '/polls/:id/choices',
  async (req, res) => {
    const pollId = parseInt(req.params.id, 10);
    const {text} = req.body;
    const {outcome, poll} = await createChoiceViaController(text, pollId);
    switch (outcome) {
      case "DUPLICATE_CHOICE":
        res.status(400).json({error: "That choice already exists in this poll"});
        return;
      case "INVALID_POLL_TYPE":
        res.status(400).json({error: "Cannot add choices to a fixed poll"});
        return;
      case "POLL_NOT_FOUND":
        res.status(404).json({error: "Poll not found"});
        return;
      case "SUCCESSFUL":
        if (!poll) {
          throw new Error('Somehow succeeded without a poll object')
        }
        res.json(poll);
        return;
      default:
        return isNever(outcome);
    }
  }
);

export const postVoteRouteHandler = createRequestHandler(
  pollsApiSchema,
  'POST',
  '/polls/:id/choices/:choiceId/vote',
  async (req, res) => {
    const pollId = parseInt(req.params.id, 10);
    const choiceId = parseInt(req.params.choiceId, 10);
    const {outcome, poll} = await addVoteViaController(pollId, choiceId);
    switch (outcome) {
      case "POLL_NOT_FOUND":
        res.status(404).json({error: "Poll not found"});
        return;
      case "CHOICE_NOT_FOUND":
        res.status(404).json({error: "Choice not found"});
        return;
      case "SUCCEEDED":
        if (!poll) {
          throw new Error('Somehow succeeded without a poll object')
        }
        res.json(poll);
        return;
      default:
        return isNever(outcome);
    }
  }
)

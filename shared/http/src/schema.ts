import {createHttpRoute, createHttpSchema, t} from "http-schemas";
import {ChoiceInput, Poll, PollInput} from "./types";

export const pollsApiSchema = createHttpSchema([
  createHttpRoute({
    method: 'GET',
    path: '/polls',
    responseBody: t.object({
      polls: t.array(Poll),
    })
  }),
  createHttpRoute({
    method: 'GET',
    path: '/polls/:id',
    paramNames: ['id'],
    responseBody: Poll
  }),
  createHttpRoute({
    method: 'POST',
    path: '/polls',
    requestBody: PollInput,
    responseBody: Poll
  }),
  createHttpRoute({
    method: 'POST',
    path: '/polls/:id/choices',
    requestBody: ChoiceInput,
    responseBody: Poll,
  })
]);

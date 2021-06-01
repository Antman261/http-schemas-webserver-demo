import {PollsRepo} from "../../repositories/polls";
import {validateChoiceForPoll} from "./choiceValidator.js";
import {Poll} from "api-schema";
import {pollsRepo} from "../../repositories/polls/memory.js";

type CreateChoiceOutcome = {
  poll?: Poll;
  outcome: 'SUCCESSFUL' | 'POLL_NOT_FOUND' | 'INVALID_POLL_TYPE' | 'DUPLICATE_CHOICE';
}

const createChoiceCreationController = (repo: PollsRepo) => async (choiceText: string, pollId: number): Promise<CreateChoiceOutcome> => {
  const poll = await repo.getPollById(pollId);
  if (!poll) {
    return {outcome: 'POLL_NOT_FOUND'}
  }
  const outcome = validateChoiceForPoll(choiceText, poll);
  if (outcome !== 'VALID') {
    return {outcome};
  }
  await repo.createChoiceForPoll(choiceText, pollId);
  return {
    outcome: 'SUCCESSFUL',
    poll: await repo.getPollById(pollId),
  }
}

export const createChoiceViaController = createChoiceCreationController(pollsRepo);

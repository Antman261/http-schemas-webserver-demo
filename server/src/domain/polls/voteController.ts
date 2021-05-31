import {pollsRepo} from "../../repositories/polls/memory.js";
import {PollsRepo} from "../../repositories/polls";
import {Poll} from "http-schema";

type AddVoteOutcome = {
  poll?: Poll;
  outcome: 'SUCCEEDED' | 'POLL_NOT_FOUND' | 'CHOICE_NOT_FOUND';
}

const createVoteAdderController = (repo: PollsRepo) => async (pollId: number, choiceId: number): Promise<AddVoteOutcome> => {
  const poll = await pollsRepo.getPollById(pollId);
  if (!poll) {
    return { outcome: 'POLL_NOT_FOUND' };
  }
  const choice = poll.choices.find(c => c.id === choiceId);
  if (!choice) {
    return { outcome: 'CHOICE_NOT_FOUND' };
  }
  return {
    outcome: 'SUCCEEDED',
    poll: await pollsRepo.addVoteForChoice(pollId, choiceId)
  }
};

export const addVoteViaController = createVoteAdderController(pollsRepo);

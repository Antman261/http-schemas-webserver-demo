import { Choice, ChoiceInput, Poll, PollInput } from 'api-schema';

export type PollsRepo = {
  getPolls: () => Promise<Poll[]>;
  getPollById: (id: number) => Promise<Poll | undefined>;
  getChoicesByPollId: (pollId: number) => Promise<Choice[]>;
  createPoll: (poll: PollInput) => Promise<Poll>;
  createChoiceForPoll: (choice: ChoiceInput, pollId: number) => Promise<Choice>;
  addVoteForChoice: (pollId: number, choiceId: number) => Promise<Poll>;
};

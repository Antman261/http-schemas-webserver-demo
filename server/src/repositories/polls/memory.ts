import { PollsRepo } from './index';
import { Choice, Poll } from 'http-schema';

const polls: Poll[] = [];

const getPollById = (id: number) => (p: Poll): boolean => p.id === id;
const getChoiceById = (id: number) => (c: Choice): boolean => c.id === id;
const getMaxChoiceId = (polls: Poll[]): number => {
  const toChoiceIds = (p: Poll) => p.choices.map((c) => c.id);
  return Math.max(...polls.map(toChoiceIds).flat(), 0);
};

export const pollsRepo: PollsRepo = {
  getPolls: async () => polls,
  getPollById: async (id) => polls.find(getPollById(id)),
  getChoicesByPollId: async (id) => {
    const poll = polls.find(getPollById(id));
    return poll ? poll.choices : [];
  },
  createPoll: async (pollInput) => {
    const maxId = Math.max(...polls.map((p) => p.id), 0);
    const newPoll = {
      ...pollInput,
      choices: pollInput.choices.map((c, idx) => ({
        text: c,
        id: getMaxChoiceId(polls) + 1 + idx,
        votes: 0,
      })),
      id: maxId + 1,
    };
    polls.push(newPoll);
    return newPoll;
  },
  createChoiceForPoll: async (choice, pollId) => {
    const oldPollIndex = polls.findIndex(getPollById(pollId));
    if (oldPollIndex === -1) {
      throw new Error(
        `Could not create choice for poll with id: [${pollId}]: poll does not exist`
      );
    }
    const newChoice: Choice = {
      text: choice,
      id: getMaxChoiceId(polls) + 1,
      votes: 0,
    };
    const oldPoll = polls[oldPollIndex];
    polls[oldPollIndex] = {
      ...oldPoll,
      choices: [...oldPoll.choices, newChoice],
    };
    return newChoice;
  },
  addVoteForChoice: async (pollId, choiceId) => {
    const pollIndex = polls.findIndex(getPollById(pollId));
    if (pollIndex === -1) {
      throw new Error(
        `Could not add vote to choice with pollId: [${pollId}]: poll does not exist`
      );
    }
    const choiceIndex = polls[pollIndex].choices.findIndex(
      getChoiceById(choiceId)
    );
    if (choiceIndex === -1) {
      throw new Error(
        `Could not add vote to choice with id: [${choiceId}]: choice does not exist`
      );
    }
    polls[pollIndex].choices[choiceIndex].votes++;
    return polls[pollIndex];
  },
};

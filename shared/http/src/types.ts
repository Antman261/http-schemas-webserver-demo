import { t } from "http-schemas";

export const ChoiceInput = t.object({
  text: t.string,
  votes: t.number,
});

const Choice = t.object({
  ...ChoiceInput.properties,
  id: t.number,
});

const PollTypes = t.union(t.unit('OPEN'), t.unit('FIXED'));

export const PollInput = t.object({
  text: t.string,
  type: PollTypes,
  choices: t.array(Choice),
});

export const Poll = t.object({
  ...PollInput.properties,
  id: t.number,
});

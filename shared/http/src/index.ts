import { t, TypeFromTypeInfo } from "http-schemas";
import {pollsApiSchema} from "./schema";
import {Poll, PollInput, ChoiceInput} from "./types";

export type Poll = TypeFromTypeInfo<typeof Poll>;
export type PollInput = TypeFromTypeInfo<typeof PollInput>;
export type ChoiceInput = TypeFromTypeInfo<typeof ChoiceInput>;

export {pollsApiSchema};

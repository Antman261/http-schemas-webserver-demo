import {createHttpClient} from "http-schemas/client";
import {pollsApiSchema} from "http-schema";

const baseURL = 'http://localhost:8080/api';

export const apiClient = createHttpClient(pollsApiSchema, { baseURL });

// for some reason the CRA compiler is complaining about this
// export const isPollResponse = (p: Poll | ErrorBody): p is Poll => {
//   return !!(p as Poll).id;
// }

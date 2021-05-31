import {createHttpClient} from "http-schemas/client";
import {pollsApiSchema} from "http-schema";

export const apiClient = createHttpClient(pollsApiSchema, { baseURL: '/api' });

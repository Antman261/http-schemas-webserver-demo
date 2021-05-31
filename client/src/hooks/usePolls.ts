import {HttpClient} from "http-schemas/client";
import {Poll, pollsApiSchema} from "http-schema";
import {useEffect, useState} from "react";


export const usePolls = (apiClient: HttpClient<typeof pollsApiSchema>) => {
  const [polls, setPolls ] = useState<Poll[]>([]);
  useEffect(() => {
    (async () => {
      const result = await apiClient.get('/polls');
      setPolls(result.polls);
    })();
  }, [apiClient]);
  return polls;
}

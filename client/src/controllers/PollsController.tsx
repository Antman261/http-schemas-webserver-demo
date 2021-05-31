import * as React from "react";
import {usePolls} from "../hooks/usePolls";
import {apiClient} from "../apiClient";

export const PollsController = () => {
  const polls = usePolls(apiClient);
  return (
    <div>
      {polls.length ?
        polls.map(poll => (
        <div>
          <h2>{poll.text}</h2>
        </div>
      )) : (
        <h2>No polls found...</h2>
        )}
    </div>
  );
}

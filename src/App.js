import React from "react";
import styled from "styled-components";
import { useGetActiveStreams } from "./hooks/api/useGetActiveStreams";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const { isLoading, streamData, serverError } = useGetActiveStreams();
  const { data: streams } = streamData;

  return (
    <Wrapper>
      {isLoading && <p>Loading...</p>}
      {serverError && <p>Oops server error</p>}
      {streams &&
        streams.map((stream) => {
          return <p key={stream.id}>{stream.user_name}</p>;
        })}
    </Wrapper>
  );
};

export default App;

import React from 'react';
import styled from 'styled-components';
import GameTable from './components/GameTable';

function App() {
  return (
    <Wrapper>
      <GameTable />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;

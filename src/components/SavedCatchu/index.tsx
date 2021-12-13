import React from 'react';
import { Wrapper } from './style';

function SavedCatchu({ catchu }: { catchu: Marker | null }) {
  return (
    <Wrapper>
      <div>saved catchu</div>
      {catchu && catchu.catchu.component()}
    </Wrapper>
  );
}

export default SavedCatchu;

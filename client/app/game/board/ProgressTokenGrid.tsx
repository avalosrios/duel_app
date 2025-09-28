import React from 'react';
import useBoardState from '~/game/hooks/useBoardState';

export default function ProgressTokenGrid(): React.ReactNode {
  const { progressTokens } = useBoardState();
  return (
    <div className='grid grid-cols-5'>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
  );
}

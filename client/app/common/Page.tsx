import React from 'react';
import Flexbox from '~/common/Flexbox';
import stylePadding from '~/common/stylePadding';

interface Props {
  children?: React.ReactNode;
}

export default function Page({ children }: Props): React.ReactNode {
  return (
    <Flexbox direction='column' className={['h-screen', stylePadding.all['4']]}>
      {children}
    </Flexbox>
  );
}

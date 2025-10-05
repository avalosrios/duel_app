import React, { useState } from 'react';
import SetupContext from '~/game/state/setup.context';

interface Props {
  children: React.ReactNode;
  initialStep: string;
}
export default function GameSetupProvider({
  children,
  initialStep,
}: Props): React.ReactNode {
  const [stepHistory, setStepHistory] = useState<string[]>([initialStep]);

  const setCurrentStep = (step: string) => {
    // try to find the step in the history
    // if the history contains the step, then it means we are going back
    const indexOfStep = stepHistory.indexOf(step);
    if (indexOfStep >= 0) {
      // we are going back, slice to that step
      setStepHistory(stepHistory.slice(0, indexOfStep + 1));
    } else {
      // moving forward to a new step
      setStepHistory(prev => [...prev, step]);
    }
  };

  return (
    <SetupContext
      value={{
        stepHistory,
        setCurrentStep,
      }}
    >
      {children}
    </SetupContext>
  );
}

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
  // TODO: Do we really need the current step? Isn't it just the last step in the history?
  const [currentStep, setCurrentStepState] = useState<string>(initialStep);
  const [stepHistory, setStepHistory] = useState<string[]>([initialStep]);

  const setCurrentStep = (step: string) => {
    // try to find the step in the history
    // if the history contains the step, then it means we are going back
    const indexOfStep = stepHistory.indexOf(step);
    if (indexOfStep >= 0) {
      // we are going back
      setCurrentStepState(stepHistory[indexOfStep - 1]);
      setStepHistory(prev => prev.slice(0, indexOfStep));
      return;
    } else {
      setCurrentStepState(step);
      setStepHistory(prev => [...prev, step]);
    }
  };

  return (
    <SetupContext
      value={{
        currentStep,
        setCurrentStep,
        stepHistory,
      }}
    >
      {children}
    </SetupContext>
  );
}

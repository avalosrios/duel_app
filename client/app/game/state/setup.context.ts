import { createContext, useContext } from 'react';

export interface SetupContextState {
  currentStep: string | null; // Using the step names for now
  setCurrentStep: (step: string) => void;
  stepHistory: string[]; // Array tracking the path of steps taken
}

const setupContext = createContext<SetupContextState>({
  currentStep: null,
  setCurrentStep: () => {},
  stepHistory: [],
});

export function useSetupContext(): SetupContextState {
  return useContext(setupContext);
}

export default setupContext;

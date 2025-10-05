import { createContext, useContext } from 'react';

export interface SetupContextState {
  stepHistory: string[]; // Array tracking the path of steps taken
  setCurrentStep: (step: string) => void;
}

const setupContext = createContext<SetupContextState>({
  stepHistory: [],
  setCurrentStep: () => {},
});

export function useSetupContext(): SetupContextState {
  return useContext(setupContext);
}

export default setupContext;

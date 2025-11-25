import React, { useEffect } from 'react';
import type { Route } from '~router/app/+types/root';
import Flexbox from '~/common/Flexbox';
import SetupStepContainer from '~/game/setup/SetupStepContainer';
import useGameDispatch from '~/game/hooks/useGameDispatch';
import { useSetupState } from '~/game/hooks/useGameStore';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Setup - Duel App' },
    { name: 'description', content: 'Setup your Duel Game' },
  ];
}

// TODO: Add a draft page that does the drafting and shows the cards in the deck

export default function Setup() {
  const dispatch = useGameDispatch();
  const { stepHistory } = useSetupState();

  // Initialize setup with first step if not already initialized
  useEffect(() => {
    if (stepHistory.length === 0) {
      dispatch({
        type: 'setup/SET_CURRENT_STEP',
        payload: { step: 'Board Setup' },
      });
    }
  }, [dispatch, stepHistory.length]);

  return (
    <>
      <Flexbox direction='row'>
        <h1 className='text-2xl font-bold mb-4'>Setup</h1>
      </Flexbox>
      <SetupStepContainer />
    </>
  );
}

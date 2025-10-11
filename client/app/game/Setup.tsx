import type { Route } from '~router/app/+types/root';
import Flexbox from '~/common/Flexbox';
import GameSetupProvider from '~/game/state/GameSetupProvider';
import SetupStepContainer from '~/game/setup/SetupStepContainer';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Setup - Duel App' },
    { name: 'description', content: 'Setup your Duel Game' },
  ];
}

// TODO: Add a draft page that does the drafting and shows the cards in the deck

export default function Setup() {
  return (
    <GameSetupProvider initialStep={'Board Setup'}>
      <Flexbox direction='row'>
        <h1 className='text-2xl font-bold mb-4'>Setup</h1>
      </Flexbox>
      <SetupStepContainer />
    </GameSetupProvider>
  );
}

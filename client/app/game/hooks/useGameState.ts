import { useContext } from 'react';
import gameContext, { type GameState } from '~/game/state/game.context';

export default function useGameState(): GameState {
  return useContext(gameContext);
}

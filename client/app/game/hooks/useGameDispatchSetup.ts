import type { SetupAction } from '~/game/setup/SetupStep';
import { useGameDispatch } from '~/game/state/game.reducer';
import { useBoardDispatch } from '~/game/state/board.reducer';

const INITIAL_COINS: number = 7;
const INITIAL_CONFLICT_PAWN_POSITION: number = 0;

export default function useGameDispatchSetup(): (action: SetupAction) => void {
  const gameDispatch = useGameDispatch();
  const boardDispatch = useBoardDispatch();
  return (action: SetupAction) => {
    switch (action) {
      case 'setup_coins':
        gameDispatch({
          type: 'INIT_ALL_PLAYER_COINS',
          payload: { coins: INITIAL_COINS },
        });
        break;
      case 'place_conflict_pawn':
        boardDispatch({
          type: 'SET_CONFLICT_PAWN_POSITION',
          payload: { position: INITIAL_CONFLICT_PAWN_POSITION },
        });
        break;
      case 'place_military_tokens':
        boardDispatch({
          type: 'INIT_MILITARY_TOKENS',
        });
        break;
      default:
        break;
    }
  };
}

import useGameDispatch from '~/game/hooks/useGameDispatch';
import { GAME_CONFIG } from '~/game/engine/constants/config';

export default function useGameSetupPlayerCoins(): () => void {
  const dispatch = useGameDispatch();
  return () =>
    dispatch({
      type: 'game/INIT_ALL_PLAYER_COINS',
      payload: { coins: GAME_CONFIG.INITIAL_COINS },
    });
}

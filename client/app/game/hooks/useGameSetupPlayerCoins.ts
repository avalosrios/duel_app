import { useGameDispatch } from '~/game/state/game.reducer';

const INITIAL_COINS = 7;

export default function useGameSetupPlayerCoins(): () => void {
  const dispatch = useGameDispatch();
  return () =>
    dispatch({
      type: 'INIT_ALL_PLAYER_COINS',
      payload: { coins: INITIAL_COINS },
    });
}

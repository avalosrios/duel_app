import { useContext } from 'react';
import boardContext, {
  type BoardContextState,
} from '~/game/state/board.context';

export default function useBoardState(): BoardContextState {
  return useContext(boardContext);
}

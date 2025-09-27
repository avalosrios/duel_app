import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('game', 'routes/game.tsx', [
    index('./game/GameHome.tsx'),
    route('setup', './game/Setup.tsx'),
  ]),
  route('*', './common/Catchall.tsx'), // catchall route,
] satisfies RouteConfig;

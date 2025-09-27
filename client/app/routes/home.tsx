import { Welcome } from '~/welcome/welcome';
import type { Route } from '~router/app/+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Duel App' },
    { name: 'description', content: 'Welcome to Duel App!' },
  ];
}

export default function Home() {
  return <Welcome />;
}

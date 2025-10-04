import { Welcome } from '~/welcome/welcome';

// {}: Route.MetaArgs
export function meta() {
  return [
    { title: 'Duel App' },
    { name: 'description', content: 'Welcome to Duel App!' },
  ];
}

export default function Home() {
  return <Welcome />;
}

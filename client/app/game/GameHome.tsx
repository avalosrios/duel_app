import React from 'react';
import { NavLink } from 'react-router';
import { capitalize } from 'lodash-es';

const sections: string[] = ['setup'];

export default function GameHome(): React.ReactNode {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>Game Home</div>
      <div className='flex'>
        <ul>
          {sections.map((section: string) => (
            <li key={section}>
              <NavLink to={`/game/${section}`}>{capitalize(section)}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

const FooterMenu = () => {
  return (
    <footer className='App-footer'>
      <p>
        <Link to='/' className='App-link'>
          ホーム
        </Link>
        {' | '}
        <Link to='/profile' className='App-link'>
          プロフィール
        </Link>
        {' | '}
        <a
          className='App-link'
          href='https://ja.reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Reactを学ぶ
        </a>
        {' | '}
        <a
          className='App-link'
          href='https://ja.vitejs.dev/guide/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Viteガイド
        </a>
      </p>
    </footer>
  );
};

export default FooterMenu;

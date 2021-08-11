import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../auth/LoginButton';
import LogoutButton from '../auth/LogoutButton';
import logo from '../../logo.svg';
import '../../App.css';

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Hello Vite + React!</p>
        {isLoading && <div>読み込み中...</div>}
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && (
          <div>
            <LogoutButton />
            <img src={user.picture} alte={user.name} />
            <h2>{user.name}</h2>
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;

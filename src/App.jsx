import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
  const [count, setCount] = useState(0);
  const [userMetadata, setUserMetadata] = useState(null);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: import.meta.env.VITE_AUTH0_SCOPE,
        });

        const userDetailsByIdUrl = `${import.meta.env.VITE_AUTH0_AUDIENCE}users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { description } = await metadataResponse.json();
        setUserMetadata (description.replaceAll('\n', '  '));
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

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
            <p>{user.email}</p>
            <h3>ユーザー情報</h3>
            {userMetadata ? (
              <div>{JSON.stringify(userMetadata)}</div>
            ) : (
              '※なし'
            )}
          </div>
        )}
        <p>
          <button type='button' onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
          {' | '}
          <a
            className='App-link'
            href='https://vitejs.dev/guide/features.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../auth/LoginButton';
import LogoutButton from '../auth/LogoutButton';

const Profile = () => {
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

        const userDetailsByIdUrl = `${
          import.meta.env.VITE_AUTH0_AUDIENCE
        }users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { description } = await metadataResponse.json();
        setUserMetadata(description.replaceAll('\n', '  '));
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>プロフィール</h1>
        {isLoading && <div>読み込み中...</div>}
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && (
          <div>
            <LogoutButton />
            <img src={user.picture} alte={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            {userMetadata ? <div>{JSON.stringify(userMetadata)}</div> : '※なし'}
          </div>
        )}
      </header>
    </div>
  );
};

export default Profile;

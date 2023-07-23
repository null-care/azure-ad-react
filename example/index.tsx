import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AuthProvider, AzureAdConfiguration, Auth, useAuth } from '../.';

const App = () => {
  const {
    signInRedirect,
    signInPopup,
    signOutPopup,
    signOutRedirect,
  } = useAuth();
  return (
    <div>
      <AuthProvider azureAdConfig={azureAdConfig}>
        <Auth.Authenticated>
          <Auth.IsAdmin>
            <div>You are signed in as an admin!</div>
          </Auth.IsAdmin>
          <Auth.NotAdmin>
            <div>You are signed in as a user!</div>
          </Auth.NotAdmin>
        </Auth.Authenticated>
        <Auth.Unauthenticated>
          <div>You are not signed in!</div>
        </Auth.Unauthenticated>
      </AuthProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

const azureAdConfig: AzureAdConfiguration = {
  auth: {
    clientId: '<client_id>',
    authority: 'https://login.microsoftonline.com/<tenant_id>',
    redirectUri: 'http://localhost:3000',
  },
  userScopes: ['User.Read'],
  adminScopes: ['User.Write'],
  autoLogin: true,
  autoLoginMode: 'redirect',
};

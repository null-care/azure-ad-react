import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, AzureAdConfiguration } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<AuthProvider azureAdConfig={azureAdConfig} />);
    root.unmount();
  });
});

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

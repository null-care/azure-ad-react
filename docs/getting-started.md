# Getting Started

1. [Configuration](#configuration)
1. [Initialization](#initialization)
1. [Determining whether a user is authenticated](#determining-whether-a-user-is-authenticated)
1. [Sign a user in and out](#sign-a-user-in-and-out)

## Configuration

In order to use the `AuthProvider`, you first need to create a `AzureAdConfiguration` object and pass it to the provider as a prop.

> Read more about [Configuration Options](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md)

Create the configuration

```js
// AzureAdConfig.ts

import { AzureAdConfiguration } from '@nullcare/azure-ad-react';

export const azureAdConfig: AzureAdConfiguration = {
  return {
    auth: {
      clientId: '<client_id' // Required
      authority: `https://login.microsoftonline.com/${'<tennant_id>'}`,
      redirectUri: '<redirect_url>',
    },

    // (optional) Set up cache configuration
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },

    // (optional) Set up user/admin scopes & roles
    adminScopes: ["api://<app_registration_endpoint>/<admin_scope>"],
    userScopes: ["User.Read"],
    adminRoles: ['User.Write'],

    // (optional) Set up automatic sign in
    autoLogin: true,
    autoLoginMode: 'redirect',
  };
};
```

Import the configuration and pass it to the provider

```javascript
// page.ts

'use client'; // If using NextJS 13 with /app router

. . .

// Import the configuration object
import { azureAdConfig } from './AzureAdConfig'
import { AuthProvider, Auth } from '@nullcare/azure-ad-react';

const AppProvider = () => (

  // Pass the configuration to the provider
  <AuthProvider azureAdConfig={azureAdConfig}>
    <App />
  </AuthProvider>
);

. . .
```

## Initialization

`@nullcare/azure-ad-react` is built on the [React context API](https://reactjs.org/docs/context.html) and all parts of your app that require authentication must be wrapped in the `AuthProvider` component. You will first need to define your the `AzureAdConfiguration` and then pass this to `AuthProvider` as a prop.

```javascript
'use client'; // If using NextJS 13 with /app router

import React from 'react';
import App from './app.jsx';
import { AuthProvider, AzureAdConfiguration, Auth } from '@nullcare/azure-ad-react';

// Azure Ad configuration
const azureAdConfig: AzureAdConfiguration = {
  auth: {
    clientId: '<client_id>',
  },
};

// Component
const AppProvider = () => (
  <AuthProvider azureAdConfig={azureAdConfig}>
    <App />
  </AuthProvider>
);

. . .
```

All components underneath `AuthProvider` will have access to the `useAuth` hook via context as well as all hooks and components provided by `@nullcare/azure-ad-react`.

## Determining whether a user is authenticated

Most applications will need to conditionally render certain components based on whether a user is signed in or not. `@nullcare/azure-ad-react` provides a simple way to do this.

### `Auth`

`Auth.Authenticated` and `Auth.Unauthenticated` components will only render their children if a user is authenticated or unauthenticated, respectively.

```javascript
'use client'; // If using NextJS 13 with /app router

import { Auth } from '@nullcare/azure-ad-react';

const Page = () => {
  return (
    <div>
      <Auth.Authenticated>
        <p>You are signed in!</p>
      </Auth.Authenticated>
      <Auth.Unauthenticated>
        <p>You are not signed in!</p>
      </Auth.Unauthenticated>
    </div>
  );
};

. . .
```

### `Auth.IsAdmin`

`Auth.IsAdmin` and `Auth.NotAdmin` components will only render their children if a user belongs to an admin role or not, respectively.

```javascript
'use client'; // If using NextJS 13 with /app router

import React from 'react';
import { AuthProvider, AzureAdConfiguration, Auth } from '@nullcare/azure-ad-react';

const azureAdConfig: AzureAdConfiguration = {
  auth: {
    clientId: '<client_id>',
  },
  // Define admin role
  adminRoles: ['User.Write'],
};

const App = () => {
  return (
    <div>
      <AuthProvider azureAdConfig={azureAdConfig}>
        <Auth.IsAdmin>
          <div>You are signed in as an admin!</div>
        </Auth.IsAdmin>
        <Auth.NotAdmin>
          <div>You are signed in as a user!</div>
        </Auth.NotAdmin>
      </AuthProvider>
    </div>
  );
};

. . .
```

## Sign a user in and out

The`useAuth` hook exposes functionality for signing a user in and out. There are multiple alternatives for signing in, including automatic sign in on page load, redirect and popup prompts.

### Popup and Redirect

```javascript
'use client'; // If using NextJS 13 with /app router

import React from 'react';
import { Auth, useAuth } from '@nullcare/azure-ad-react';
  const { signInRedirect, signInPopup, signOutPopup, signOutRedirect } = useAuth();

const App = () => {
  return (
    <div>
      <Auth.Unauthenticated>
        <button onCLick={signInRedirect}>Sign in with redirect</button>
        <button onCLick={signInPopup}>Sign in with a popup</button>
      </Auth.Unauthenticated>

      <!--The same works for signing out-->
      <Auth.Authenticated>
        <button onCLick={signOutRedirect}>Sign out with redirect</button>
        <button onCLick={signOutPopup}>Sign out with a popup</button>
      </Auth.Authenticated>
    </div>
  );
};

. . .
```

### AutoLogin

To autmatically sign in users on page load, specify `autoLogin` in your `AzureAdConfiguration`. You can also choose between `redirect` or `popup` by specifying `autoLoginMode`(_defaults to redirect_).

```js
'use client'; // If using NextJS 13 with /app router

import React from 'react';
import App from './app.jsx';
import { AuthProvider, AzureAdConfiguration, Auth } from '@nullcare/azure-ad-react';

// Azure Ad configuration
const azureAdConfig: AzureAdConfiguration = {
  auth: {
    clientId: '<client_id>',
  },

  autoLogin: true, // Enable autoLogin
  autoLoginMode: 'redirect', // Set autoLogin mode
};

// Component
const AppProvider = () => (
  <AuthProvider azureAdConfig={azureAdConfig}>
    <App />
  </AuthProvider>
);

. . .

```

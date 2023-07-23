import React from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { createContext } from 'react';
import { default as internal } from '../internal/hooks/InternalAuth';
import {
  AuthContextValue,
  AuthProviderProps,
  ProviderProps,
} from './AuthProviderConstants';

/**
 * Creates the authentication context.
 */
export const AuthContext = createContext<AuthContextValue>(
  defaultAuthContextValue()
);

/**
 * Provides authentication capabilities to the application.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @param {Configuration} props.msalConfig - The MSAL configuration.
 * @returns {React.ReactNode} The wrapped components with authentication context.
 */
export const AuthProvider = (props: AuthProviderProps): React.JSX.Element => {
  const instance = new PublicClientApplication(props.azureAdConfig);
  return (
    <MsalProvider instance={instance}>
      <Provider instance={instance} {...props}>
        {props.children}
      </Provider>
    </MsalProvider>
  );
};

/**
 * Provides the authentication context value to the application.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} - The wrapped components with authentication context value.
 */
const Provider = (props: ProviderProps): React.JSX.Element => {
  const value = internal.useAuth(props);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

/**
 * Default authentication context value.
 */
function defaultAuthContextValue(): AuthContextValue {
  return {
    username: undefined,
    name: undefined,
    isAuthenticated: false,
    isAdmin: false,
    scope: undefined,
    signInRedirect: () => {},
    signInPopup: () => {},
    signOutRedirect: () => {},
    signOutPopup: () => {},
    getAdminToken: () => Promise.resolve(undefined),
    config: {},
  };
}

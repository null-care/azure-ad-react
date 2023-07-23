import { Configuration, IPublicClientApplication } from '@azure/msal-browser';

export interface AzureAdConfiguration extends Configuration {
  adminRoles?: string[];
  adminScopes?: string[];
  userScopes?: string[];

  /**
   * If true, will attempt to login when the component mounts
   */
  autoLogin?: boolean;

  /**
   * If autoLogin is true, this will determine whether to use a redirect or popup
   * for the login flow
   * @default 'redirect'
   */
  autoLoginMode?: AutoLoginMode;
}

export type AuthContextValue = {
  username: string | undefined;
  name: string | undefined;
  isAuthenticated: boolean;
  isAdmin: boolean;
  scope: string | undefined;
  signInRedirect: () => void;
  signInPopup: () => void;
  signOutRedirect: () => void;
  signOutPopup: () => void;
  getAdminToken: () => Promise<object | void>;
  config: AuthContextConfiguration;
};

export type AuthContextConfiguration = {
  userScopes?: string[];
  adminScopes?: string[];
};

export type AuthProviderProps = {
  azureAdConfig: AzureAdConfiguration;
  children?: React.ReactNode;
  adminRoles?: string[];
};

export type ProviderProps = AuthProviderProps & {
  instance: IPublicClientApplication;
};

export type InternalAuthProps = {
  instance: IPublicClientApplication;
  azureAdConfig: AzureAdConfiguration;
};

type AutoLoginMode = 'redirect' | 'popup';

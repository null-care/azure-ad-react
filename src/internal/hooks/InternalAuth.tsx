import {
  EventType,
  IPublicClientApplication,
  InteractionStatus,
  RedirectRequest,
  AccountInfo,
  SilentRequest,
} from '@azure/msal-browser';
import {
  InternalAuthProps,
  AuthContextValue,
} from '../../provider/AuthProviderConstants';
import { useEffect, useState } from 'react';
import { default as constants } from './Constants';
import { parseJwt } from '../../utils/JwtParse';

namespace Internal {
  /**
   *  Hook for managing authentication and user roles.
   * @returns {AuthContextValue} - The authentication context.
   */
  export function useAuth(props: InternalAuthProps): AuthContextValue {
    const { instance } = props;
    const [scope, setScope] = useState<string>();
    const [activeAccount, setActiveAccount] = useState<AccountInfo | undefined>(
      instance.getActiveAccount() as AccountInfo | undefined
    );

    const {
      adminRoles,
      adminScopes,
      userScopes,
      autoLogin,
      autoLoginMode,
    } = props.azureAdConfig;

    useEffect(() => {
      // Initialize instance and do all initial setup for msal
      Initialize(instance);
    }, []);

    /**
     * Waits for the authentication interaction to complete.
     * @param {number} timeout - The timeout in seconds(defaults to 60).
     * @returns {Promise<void>} A Promise that resolves when the interaction is complete.
     */
    async function WaitForInteraction(timeout: number = 60): Promise<void> {
      const interactionStatus = constants.getInteractionStatus();

      if (interactionStatus === InteractionStatus.None) {
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (timeout > 0) {
        return WaitForInteraction(timeout - 1);
      }
      console.error('Authentication interaction timed out.');
    }

    useEffect(() => {
      const fetchAdminToken = async () => {
        // Wait for interaction to complete
        constants.interactionInProgress() && (await WaitForInteraction());

        // Fetch admin token once the active account is available
        if (activeAccount && adminScopes !== undefined) {
          getAdminToken();
        }
      };

      fetchAdminToken();
    }, [activeAccount]);

    // Helper functions to get user information and manage sign-in/sign-out
    const username = activeAccount?.username;
    const name = activeAccount?.name;
    const isAuthenticated = activeAccount !== null;
    const isAdmin =
      scope !== undefined && adminRoles !== undefined
        ? adminRoles.includes(scope)
        : false;

    /**
     * Initiates the sign-in process using a redirect.
     */
    const signInRedirect = () => {
      if (userScopes === undefined) return;
      instance.loginRedirect(userRequest(userScopes)).catch((e: any) => {
        console.error(e);
      });
    };

    /**
     * Initiates the sign-in process using a popup.
     */
    const signInPopup = () => {
      if (userScopes === undefined) return;
      instance.loginPopup(userRequest(userScopes)).catch((e: any) => {
        console.error(e);
      });
    };

    /**
     * Initiates the sign-out process using a redirect.
     */
    const signOutRedirect = () => {
      instance.logoutRedirect();
    };

    /**
     * Initiates the sign-out process using a popup.
     */
    const signOutPopup = () => {
      instance.logoutPopup();
    };

    /**
     * Gets the admin token for the authenticated user.
     * @returns {Promise<AdminJwtToken | void>} A Promise that resolves to the admin token or void if an error occurs.
     */
    const getAdminToken = async (): Promise<object | void> => {
      if (adminScopes === undefined) return;
      try {
        const req = adminRequest(adminScopes);
        const response = await instance.acquireTokenSilent(req);
        const adminToken = parseJwt(response?.accessToken);
        setScope(adminToken?.scp);

        return adminToken;
      } catch (e) {
        console.error(e);
      }
    };

    /**
     * Configures the scopes and state for user requests.
     * @returns {RedirectRequest} - The redirect request configuration.
     */
    const userRequest = (scopes: string[]): RedirectRequest => {
      return {
        scopes,
        state: window.location.pathname,
      };
    };

    /**
     * Configures the scopes and account for admin requests.
     * @returns {SilentRequest} - The silent request configuration.
     */
    const adminRequest = (scopes: string[]): SilentRequest => {
      return {
        scopes,
        account: activeAccount,
      };
    };

    async function Initialize(msalInstance: IPublicClientApplication) {
      // Set active acccount on page load
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
      }

      msalInstance.addEventCallback(
        (event: { eventType: any; payload: { account: any } }) => {
          try {
            if (
              // set active account after redirect
              event.eventType === EventType.LOGIN_SUCCESS &&
              event.payload.account
            ) {
              const account = event.payload.account;
              msalInstance.setActiveAccount(account);
              setActiveAccount(account);
            }
          } catch (err) {
            console.log(err);
          }
        }
      );

      // handle auth redirect/do all initial setup for msal
      await msalInstance
        .handleRedirectPromise()
        .then(() => {
          // Check if user signed in
          const account = msalInstance.getActiveAccount();

          // if autoLogin is enabled, prompt anonymous user with login
          if (!account && autoLogin) {
            autoLoginMode === 'popup'
              ? msalInstance.loginPopup()
              : msalInstance.loginRedirect();
          }
        })
        .catch(err => {
          // TODO: Handle errors
          console.log(err);
        });
    }

    return {
      username,
      name,
      isAuthenticated,
      isAdmin,
      scope,
      signInRedirect,
      signInPopup,
      signOutRedirect,
      signOutPopup,
      getAdminToken,
      config: {
        userScopes,
        adminScopes,
      },
    };
  }
}

export default Internal;

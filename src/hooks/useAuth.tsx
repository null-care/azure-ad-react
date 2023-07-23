import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { AuthContextValue } from '../provider/AuthProviderConstants';

/**
 * Custom hook to consume the AuthContext.
 * @returns {AuthContextValue | null} The authentication context value.
 */
export function useAuth(): AuthContextValue {
  return useContext<AuthContextValue>(AuthContext);
}

import React from 'react';
import { AuthenticatedTemplate } from '@azure/msal-react';

/**
 * Renders the children components if the user is authenticated.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered.
 * @returns {React.ReactNode} - The child components if the user is authenticated, otherwise null.
 */
export const Authenticated = (props: {
  children: React.ReactNode;
}): React.ReactNode => {
  return <AuthenticatedTemplate>{props.children}</AuthenticatedTemplate>;
};

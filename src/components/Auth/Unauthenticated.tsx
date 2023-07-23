import { UnauthenticatedTemplate } from '@azure/msal-react';
import React from 'react';

/**
 * Renders the children components if the user is unauthenticated.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered.
 * @returns {React.ReactNode} - The child components if the user is unauthenticated, otherwise null.
 */
export const Unauthenticated = (props: { children: React.ReactNode }) => {
  return <UnauthenticatedTemplate>{props.children}</UnauthenticatedTemplate>;
};

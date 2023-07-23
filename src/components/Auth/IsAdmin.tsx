import React from 'react';
import { useAuth } from '../../hooks/useAuth';

/**
 * Renders the children components if the user is an admin.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered.
 * @returns {React.ReactNode} - The child components if the user is an admin, otherwise null.
 */
export const IsAdmin = (props: {
  children: React.ReactNode;
}): React.ReactNode => {
  const { isAdmin } = useAuth();

  return isAdmin ? <>{props.children}</> : null;
};

import { InteractionStatus } from '@azure/msal-browser';

namespace Internal {
  export const getInteractionStatus = (): InteractionStatus =>
    (sessionStorage.getItem('msal.interaction.status') as InteractionStatus) ??
    InteractionStatus.None;

  export const interactionInProgress = (): boolean =>
    getInteractionStatus() !== InteractionStatus.None;
}

export default Internal;

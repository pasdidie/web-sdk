import { createEventEmitter } from 'utils-event-emitter';
import type { EmitterEventHotKey } from 'components-shared';
import type { EmitterEventUi } from 'components-ui-pixi';

import type { EmitterEventGame } from './typesEmitterEvent';

export type EmitterEvent = EmitterEventHotKey | EmitterEventUi | EmitterEventGame;

export const { eventEmitter } = createEventEmitter<EmitterEvent>();

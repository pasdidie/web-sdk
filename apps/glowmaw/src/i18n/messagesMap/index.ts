import { mergeMessagesMaps } from 'utils-shared/i18n';
import { messagesMap as messagesMapUiPixi } from 'components-ui-pixi';
import { messagesMap as messagesMapUiHtml } from 'components-ui-html';

import en from './en';

// Game strings are English; LoadI18n falls back to English for unknown `lang`.
export default mergeMessagesMaps([{ en }, messagesMapUiPixi, messagesMapUiHtml]);

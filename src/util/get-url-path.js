import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getPathUrl = (metaUrl) => dirname(fileURLToPath(metaUrl));




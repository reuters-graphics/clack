import color from 'picocolors';

import { S_BAR_START } from './utils';

export const intro = (title = '') => {
  process.stdout.write(
    `${color.gray(S_BAR_START)}  ${color.bgCyan(` ${title} `)}\n`
  );
};

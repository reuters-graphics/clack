import { stripVTControlCharacters as strip } from 'node:util';
import color from 'picocolors';

import {
  S_BAR,
  S_BAR_H,
  S_CORNER_TOP_RIGHT,
  S_CONNECT_LEFT,
  S_CORNER_BOTTOM_RIGHT,
  S_STEP_SUBMIT,
} from './utils';

export const note = (message: string, title = '') => {
  const lines = `\n${message}\n`.split('\n');
  const titleLen = strip(title).length;
  const len =
    Math.max(
      lines.reduce((sum, ln) => {
        const line = strip(ln);
        return line.length > sum ? line.length : sum;
      }, 0),
      titleLen
    ) + 2;
  const msg = lines
    .map(
      (ln) =>
        `${color.gray(S_BAR)}  ${ln}${' '.repeat(len - strip(ln).length)}${color.gray(
          S_BAR
        )}`
    )
    .join('\n');
  process.stdout.write(
    `${color.gray(S_BAR)}\n${color.green(S_STEP_SUBMIT)}  ${color.reset(title)} ${color.gray(
      S_BAR_H.repeat(Math.max(len - titleLen - 1, 1)) + S_CORNER_TOP_RIGHT
    )}\n${msg}\n${color.gray(S_CONNECT_LEFT + S_BAR_H.repeat(len + 2) + S_CORNER_BOTTOM_RIGHT)}\n`
  );
};

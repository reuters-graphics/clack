import { spinner as clackSpinner } from '@clack/prompts';

class Spinner {
  private spinner: ReturnType<typeof clackSpinner>;
  private startTime?: number;
  constructor(public minTime = 0) {
    this.spinner = clackSpinner();
  }

  start(msg?: string) {
    this.spinner.start(msg);
    this.startTime = new Date().getTime();
  }

  async stop(msg?: string, code?: number) {
    const currentTime = new Date().getTime();
    const elapsed = currentTime - (this.startTime ?? 0);
    const remaining = this.minTime - elapsed;

    if (remaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, remaining));
    }
    this.spinner.stop(msg, code);
  }
}

/**
 * A variation of clack's built-in spinner that runs for at least
 * a number of milliseconds.
 *
 * @param minTime Minimum time in milliseconds the spinner should run.
 * @returns Spinner instance
 */
export const spinner = (
  /** The minimum time in milliseconds the spinner should run */
  minTime: number = 0
) => new Spinner(minTime);

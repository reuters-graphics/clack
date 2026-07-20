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

  async stop(msg?: string, code = 0) {
    const currentTime = new Date().getTime();
    const elapsed = currentTime - (this.startTime ?? 0);
    const remaining = this.minTime - elapsed;

    if (remaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, remaining));
    }

    // clack v1 replaced the numeric `code` argument to `stop` with
    // dedicated methods. Map the legacy codes to preserve behavior:
    // 0 = success, 1 = cancelled, anything else = error.
    if (code === 0) {
      this.spinner.stop(msg);
    } else if (code === 1) {
      this.spinner.cancel(msg);
    } else {
      this.spinner.error(msg);
    }
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

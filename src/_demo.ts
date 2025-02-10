import { datetime, intro } from '.';
import { cancel, isCancel, outro } from '@clack/prompts';

async function main() {
  intro('CLI');
  const initialDate = new Date();
  initialDate.setMinutes(0);
  initialDate.setSeconds(0);
  initialDate.setMilliseconds(0);
  const result = await datetime({
    message: 'Select a date and time:',
    initialValue: initialDate,
    validate: (value) => {
      const date = value;

      if (isNaN(date.getTime())) {
        return 'Invalid date format';
      }
      if (date.getTime() < new Date().getTime()) {
        return 'Date must be in the future';
      }
    },
  });

  if (isCancel(result)) {
    cancel('Exited CLI');
    return;
  }

  outro('Done');
}

main().catch(console.error);

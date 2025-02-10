import { datetime, intro, note } from './src/index';
import { cancel, isCancel, outro } from '@clack/prompts';

async function main() {
  intro('Clack CLI');
  const initialDate = new Date();
  initialDate.setMinutes(0);

  note(
    `Additional clack prompts for Reuters Graphics tools`,
    '@reuters-graphics/clack'
  );

  const result = await datetime({
    message: 'Select a date and time',
    initialValue: initialDate,
    validate: (value) => {
      if (value.getTime() < new Date().getTime()) {
        return 'Date must be in the future';
      }
    },
  });

  if (isCancel(result)) {
    cancel('Exited Clack CLI');
    return;
  }

  outro('🏁 Done');
}

main();

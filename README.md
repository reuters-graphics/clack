# @reuters-graphics/clack

Additional @clack/prompts options.

## Installation

```console
pnpm install @reuters-graphics/clack
```

## Prompts

### datetime

```typescript
import { datetime } from '@reuters-graphics/clack';

const date = await datetime({
  message: 'Pick a date and time',
  initialValue: new Date(),
  validate: (value: Date) => {
    if (date.getTime() < new Date().getTime()) {
      return 'Date must be in the future';
    }
  },
});
```

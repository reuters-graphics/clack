# @reuters-graphics/clack

Additional prompts and specifically styled ones we use with [clack](https://www.clack.cc/) at Reuters Graphics.

## Installation

```console
pnpm install @reuters-graphics/clack
```

## Demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/github/reuters-graphics/clack)

## Prompts

### datetime

```typescript
import { datetime } from '@reuters-graphics/clack';

const date = await datetime({
  message: 'Pick a date and time',
  initialValue: new Date(),
  validate: (value) => {
    if (value.getTime() < new Date().getTime()) {
      return 'Date must be in the future';
    }
  },
});
```

### intro

```typescript
import { intro } from '@reuters-graphics/clack';

intro('My CLI');
```

### note

```typescript
import { note } from '@reuters-graphics/clack';

note('My message', 'title');
```

### spinner

A spinner that runs for _at least_ a number of milliseconds.

```typescript
import { spinner } from '@reuters-graphics/clack';

const s = spinner(1000);
s.start('Building');
// ...
await s.end('🏁 Built');
```

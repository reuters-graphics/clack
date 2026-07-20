---
'@reuters-graphics/clack': major
---

Update to clack v1 (`@clack/core` v1, `@clack/prompts` v1)

- Bump `@clack/core` to `^1.4.3` and `@clack/prompts` to `^1.7.0`.
- `DateTimePrompt` now extends the generic `Prompt<Date>` and wraps the
  caller's `validate` to satisfy clack's new `Validate<Date>` signature.
- The `spinner` wrapper maps its legacy numeric `code` argument to clack
  v1's dedicated `stop`/`cancel`/`error` methods (0 = success, 1 =
  cancelled, anything else = error), preserving the existing public API.
- Move `@clack/prompts` to a runtime dependency, since the `spinner`
  export imports it at runtime.

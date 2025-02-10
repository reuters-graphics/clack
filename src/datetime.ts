import { Prompt } from '@clack/core';
import color from 'picocolors';

import { symbol, S_BAR, S_BAR_END, type CursorAction } from './utils';

interface DateTimePromptOptions {
  message: string;
  initialValue?: Date;
  validate?: ((value: Date) => string | Error | undefined) | undefined;
}

type DateTimeField = 'year' | 'month' | 'day' | 'hour' | 'minute';

class DateTimePrompt extends Prompt {
  private message: string;
  private activeField: DateTimeField = 'year';
  private fields: DateTimeField[] = ['year', 'month', 'day', 'hour', 'minute'];
  public value: Date;

  constructor(options: DateTimePromptOptions) {
    const { message, initialValue = new Date(), ...rest } = options;

    super(
      {
        ...rest,
        render: () => this.renderPrompt(),
      },
      false
    );

    this.message = message;
    this.value = initialValue;

    this.value.setSeconds(0);
    this.value.setMilliseconds(0);

    this.on('cursor', this.handleCursor.bind(this));
  }

  private formatDate(date: Date) {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
      date.getHours()
    )}:${pad(date.getMinutes())}`;
  }

  private handleCursor(action: CursorAction) {
    switch (action) {
      case 'left':
        this.moveField(-1);
        break;
      case 'right':
        this.moveField(1);
        break;
      case 'up':
        this.incrementField(1);
        break;
      case 'down':
        this.incrementField(-1);
        break;
    }
  }

  private moveField(direction: number) {
    const currentIndex = this.fields.indexOf(this.activeField);
    const newIndex =
      (currentIndex + direction + this.fields.length) % this.fields.length;
    this.activeField = this.fields[newIndex];
  }

  private incrementField(direction: number) {
    const newDate = new Date(this.value);

    switch (this.activeField) {
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + direction);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + direction);
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + direction);
        break;
      case 'hour':
        newDate.setHours(newDate.getHours() + direction);
        break;
      case 'minute':
        newDate.setMinutes(newDate.getMinutes() + direction);
        break;
    }

    this.value = newDate;
  }

  private highlightField(field: DateTimeField, value: string) {
    return this.activeField === field ? color.cyan(value) : value;
  }

  private renderPrompt() {
    const date = this.value;
    const pad = (n: number) => n.toString().padStart(2, '0');

    const year = this.highlightField('year', date.getFullYear().toString());
    const month = this.highlightField('month', pad(date.getMonth() + 1));
    const day = this.highlightField('day', pad(date.getDate()));
    const hour = this.highlightField('hour', pad(date.getHours()));
    const minute = this.highlightField('minute', pad(date.getMinutes()));

    const state = this.state;
    const error = this.error;
    const value = this.formatDate(this.value);
    const message = this.message;

    const valueWithHighlight = `${year}-${month}-${day} ${hour}:${minute}`;

    const prevBar = `${color.gray(S_BAR)}\n`;
    const title = `${symbol(state)}  ${message}\n`;

    switch (state) {
      case 'error':
        return `${prevBar}${title}${color.yellow(S_BAR)}  ${value}\n${color.yellow(S_BAR_END)}  ${color.yellow(error)}\n`;
      case 'submit':
        return `${prevBar}${title}${color.gray(S_BAR)}  ${color.dim(value)}\n${color.gray(S_BAR)}`;
      case 'cancel':
        return `${prevBar}${title}${color.gray(S_BAR)}  ${color.strikethrough(color.dim(value ?? ''))}${value?.trim() ? `\n${color.gray(S_BAR)}` : ''}`;
      default:
        return `${prevBar}${title}${color.cyan(S_BAR)}  ${valueWithHighlight}  ${color.dim('↑/↓ ←/→')}\n${color.cyan(S_BAR_END)}\n`;
    }
  }
}

export const datetime = (opts: DateTimePromptOptions) => {
  return new DateTimePrompt({
    message: opts.message,
    validate: opts.validate,
    initialValue: opts.initialValue,
  }).prompt() as Promise<Date | symbol>;
};

import {AbstractControl, ValidationErrors} from '@angular/forms';

export function emptyStringValidator(control: AbstractControl): ValidationErrors | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  return !isWhitespace ? null : {'whitespace-error': true};
}

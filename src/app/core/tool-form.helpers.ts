import { FormGroup } from '@angular/forms';

export function toggleMoreOptions(isOpen: boolean): { show: boolean; label: string } {
  const show = !isOpen;
  return {
    show,
    label: show ? 'See Less' : 'More option'
  };
}

export function toggleFlag(isOn: boolean): boolean {
  return !isOn;
}

export function clearControl(form: FormGroup, controlName: string): void {
  form.controls[controlName].setValue('');
}

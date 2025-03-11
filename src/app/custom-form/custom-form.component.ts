import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-custom-form',
  template: `
    <input type="text" placeholder="Título" (input)="onTitleInput($event)" [value]="value.title">
    <textarea placeholder="Descripción" (input)="onDescriptionInput($event)" [value]="value.description"></textarea>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFormComponent),
      multi: true
    }
  ]
})
export class CustomFormComponent implements ControlValueAccessor {
  value: { title: string; description: string } = { title: '', description: '' };

  onChange: any = () => { };
  onTouch: any = () => { };

  onTitleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value.title = inputElement.value;
    this.onChange(this.value);
    this.onTouch();
  }

  onDescriptionInput(event: Event) {
    const textareaElement = event.target as HTMLTextAreaElement;
    this.value.description = textareaElement.value;
    this.onChange(this.value);
    this.onTouch();
  }

  writeValue(value: { title: string; description: string }): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implementación para manejo de estado deshabilitado
  }
}

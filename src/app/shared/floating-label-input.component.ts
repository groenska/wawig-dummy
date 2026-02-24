import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floating-label-input',
  standalone: true,
  template: `
    <div class="relative bg-gray-50 border border-gray-200 rounded px-3 py-2 hover:border-gray-300 focus-within:border-blue-500 transition-colors">
      <label class="block text-[10px] text-gray-500 uppercase font-semibold mb-0.5 leading-none">
        {{ label }}
      </label>
      <input
        [type]="type"
        [name]="name"
        [value]="value"
        [placeholder]="placeholder"
        [defaultValue]="defaultValue"
        class="block w-full bg-transparent border-none p-0 text-sm text-gray-900 focus:ring-0 placeholder-gray-400"
      />
    </div>
  `
})
export class FloatingLabelInputComponent {
  @Input() label = '';
  @Input() type = 'text';
  @Input() name = '';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() defaultValue = '';
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floating-label-textarea',
  standalone: true,
  template: `
    @if (label) {
      <div class="relative bg-gray-50 border border-gray-200 rounded px-3 py-2 hover:border-gray-300 focus-within:border-blue-500 transition-colors">
        <label class="block text-[10px] text-gray-500 uppercase font-semibold mb-0.5 leading-none">
          {{ label }}
        </label>
        <textarea
          [rows]="rows"
          [placeholder]="placeholder"
          class="block w-full bg-transparent border-none p-0 text-sm text-gray-900 focus:ring-0 placeholder-gray-400 resize-none"
        ></textarea>
      </div>
    } @else {
      <textarea
        [rows]="rows"
        [placeholder]="placeholder"
        class="w-full bg-gray-50 border border-gray-300 rounded p-2 text-sm focus:border-[#004e82] outline-none"
      ></textarea>
    }
  `
})
export class FloatingLabelTextareaComponent {
  @Input() label = '';
  @Input() rows = 3;
  @Input() placeholder = '';
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floating-label-select',
  standalone: true,
  template: `
    <div class="relative bg-gray-50 border border-gray-200 rounded px-3 py-2 hover:border-gray-300 focus-within:border-blue-500 transition-colors">
      <label class="block text-[10px] text-gray-500 uppercase font-semibold mb-0.5 leading-none">
        {{ label }}
      </label>
      <select
        [name]="name"
        [value]="value"
        (change)="onChange($event)"
        class="block w-full bg-transparent border-none p-0 text-sm text-gray-900 focus:ring-0 cursor-pointer">
        <ng-content></ng-content>
      </select>
    </div>
  `
})
export class FloatingLabelSelectComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() value = '';
  @Input() changeHandler!: (value: string) => void;

  onChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    if (this.changeHandler) {
      this.changeHandler(val);
    }
  }
}

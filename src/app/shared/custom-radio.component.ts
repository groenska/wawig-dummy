import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-radio',
  standalone: true,
  template: `
    <label class="flex items-center gap-3 cursor-pointer group mb-2">
      <div class="relative flex items-center justify-center">
        <input
          type="radio"
          class="peer sr-only"
          [name]="name"
          [checked]="checked"
          (change)="checkedChange.emit()"
        />
        <div class="w-5 h-5 border-2 border-gray-400 rounded-full peer-checked:border-[#004e82] transition-colors"></div>
        <div class="absolute w-2.5 h-2.5 bg-[#004e82] rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
      </div>
      <span class="text-sm text-gray-700 group-hover:text-gray-900">{{ label }}</span>
    </label>
  `
})
export class CustomRadioComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<void>();
}

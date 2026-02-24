import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  standalone: true,
  template: `
    <label class="flex items-start gap-3 cursor-pointer group select-none">
      <div class="relative flex items-center justify-center mt-0.5">
        <input
          type="checkbox"
          class="peer sr-only"
          [checked]="checked"
          [disabled]="disabled"
          [attr.defaultChecked]="defaultChecked ? '' : null"
          (change)="onCheckChange($event)"
        />
        <div class="w-5 h-5 border-2 border-gray-400 rounded sm:rounded-[2px] peer-checked:bg-[#004e82] peer-checked:border-[#004e82] transition-colors"></div>
        <svg
          class="absolute w-3.5 h-3.5 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900 pt-0.5">{{ label }}</span>
    </label>
  `
})
export class CustomCheckboxComponent {
  @Input() label = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() defaultChecked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onCheckChange(event: Event) {
    const val = (event.target as HTMLInputElement).checked;
    this.checkedChange.emit(val);
  }
}

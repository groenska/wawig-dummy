import { Component, Input, Output, EventEmitter, ElementRef, HostListener, signal, computed } from '@angular/core';

@Component({
  selector: 'app-date-input',
  standalone: true,
  template: `
    <div class="relative">
      <div
        class="flex items-center"
        [class.opacity-60]="disabled"
        [class.cursor-not-allowed]="disabled"
        [class.cursor-pointer]="!disabled"
        (click)="toggle()">
        <div class="flex-1 relative bg-gray-50 border rounded px-3 py-2 flex items-center justify-between group transition-colors"
          [class.border-[#004e82]]="isOpen()"
          [class.ring-1]="isOpen()"
          [class.ring-[#004e82]/20]="isOpen()"
          [class.border-gray-200]="!isOpen()"
          [class.hover:border-gray-300]="!isOpen()">
          <div class="flex flex-col flex-1 min-w-0">
            @if (label) {
              <label class="block text-[10px] text-gray-500 uppercase font-semibold mb-0.5 leading-none cursor-pointer select-none">
                {{ label }}
              </label>
            }
            <div class="text-sm text-gray-900 truncate font-medium h-5 flex items-center">
              @if (value) {
                {{ formatDateDisplay(value) }}
              } @else {
                <span class="text-gray-400">TT.MM.JJJJ</span>
              }
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="ml-2 shrink-0 transition-colors"
            [class.text-[#004e82]]="isOpen()"
            [class.text-sky-800]="!isOpen()">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
        </div>
      </div>

      @if (isOpen()) {
        <div class="absolute z-50 mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-72">
          <div class="flex justify-between items-center mb-4">
            <button type="button" (click)="changeMonth(-1, $event)" class="p-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div class="font-bold text-gray-800 select-none">{{ monthNames[viewMonth()] }} {{ viewYear() }}</div>
            <button type="button" (click)="changeMonth(1, $event)" class="p-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          <div class="grid grid-cols-7 mb-2 border-b border-gray-100 pb-2">
            @for (d of weekdays; track d) {
              <div class="text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider select-none">{{ d }}</div>
            }
          </div>

          <div class="grid grid-cols-7 gap-y-1 justify-items-center">
            @for (empty of emptyDays(); track $index) {
              <div class="h-8"></div>
            }
            @for (day of daysInMonth(); track day) {
              <button
                type="button"
                (click)="selectDay(day, $event)"
                class="h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors text-center"
                [class.bg-[#004e82]]="isSelected(day)"
                [class.text-white]="isSelected(day)"
                [class.font-bold]="isSelected(day)"
                [class.shadow-sm]="isSelected(day)"
                [class.border]="isToday(day) && !isSelected(day)"
                [class.border-[#004e82]]="isToday(day) && !isSelected(day)"
                [class.text-[#004e82]]="isToday(day) && !isSelected(day)"
                [class.font-semibold]="isToday(day) && !isSelected(day)"
                [class.hover:bg-sky-50]="isToday(day) && !isSelected(day)"
                [class.hover:bg-gray-100]="!isToday(day) && !isSelected(day)"
                [class.text-gray-700]="!isToday(day) && !isSelected(day)">
                {{ day }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class DateInputComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() name = '';
  @Output() valueChange = new EventEmitter<string>();

  isOpen = signal(false);
  viewMonth = signal(new Date().getMonth());
  viewYear = signal(new Date().getFullYear());

  weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  emptyDays = computed(() => {
    const first = new Date(this.viewYear(), this.viewMonth(), 1).getDay();
    const startDay = first === 0 ? 6 : first - 1;
    return new Array(startDay);
  });

  daysInMonth = computed(() => {
    const count = new Date(this.viewYear(), this.viewMonth() + 1, 0).getDate();
    return Array.from({ length: count }, (_, i) => i + 1);
  });

  constructor(private elRef: ElementRef) {}

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isOpen() && !this.elRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggle() {
    if (this.disabled) return;
    const opening = !this.isOpen();
    this.isOpen.set(opening);
    if (opening && this.value) {
      const d = this.parseDateString(this.value);
      this.viewMonth.set(d.getMonth());
      this.viewYear.set(d.getFullYear());
    }
  }

  changeMonth(offset: number, event: Event) {
    event.stopPropagation();
    let m = this.viewMonth() + offset;
    let y = this.viewYear();
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    this.viewMonth.set(m);
    this.viewYear.set(y);
  }

  selectDay(day: number, event: Event) {
    event.stopPropagation();
    const month = String(this.viewMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const isoDate = `${this.viewYear()}-${month}-${dayStr}`;
    this.valueChange.emit(isoDate);
    this.isOpen.set(false);
  }

  isSelected(day: number): boolean {
    if (!this.value) return false;
    const dateStr = `${this.viewYear()}-${String(this.viewMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return this.value === dateStr;
  }

  isToday(day: number): boolean {
    const today = new Date();
    return day === today.getDate() && this.viewMonth() === today.getMonth() && this.viewYear() === today.getFullYear();
  }

  formatDateDisplay(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }

  private parseDateString(dateStr: string): Date {
    if (!dateStr) return new Date();
    const parts = dateStr.split('-');
    if (parts.length !== 3) return new Date();
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  }
}

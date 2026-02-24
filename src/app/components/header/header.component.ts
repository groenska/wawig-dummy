import { Component, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, Menu, User } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <header class="bg-[#004e82] text-white h-12 flex items-center justify-between px-4 shadow-md z-20 relative shrink-0">
      <div class="flex items-center gap-4">
        <button
          (click)="toggleSidebar.emit()"
          class="p-1 hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Menü umschalten">
          <lucide-icon [img]="MenuIcon" [size]="24"></lucide-icon>
        </button>
        <div class="flex flex-col leading-tight cursor-default">
          <div class="flex items-baseline gap-2">
            <span class="font-bold text-lg tracking-wide">WAWIG</span>
            <span class="text-xs opacity-80 mt-1">v1.0.0</span>
          </div>
          <span class="text-xs font-light text-sky-100 uppercase tracking-widest">WIBAS</span>
        </div>
      </div>

      <button
        (click)="userClick.emit()"
        class="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/20 cursor-pointer hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
        <lucide-icon [img]="UserIcon" [size]="16"></lucide-icon>
        <span class="text-sm font-medium">wawig-user-1</span>
      </button>
    </header>
  `
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() userClick = new EventEmitter<void>();

  readonly MenuIcon = Menu;
  readonly UserIcon = User;
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SidebarItem, TabId } from '../../types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <aside
      class="bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto shrink-0 transition-all duration-300 ease-in-out"
      [class.w-64]="isOpen"
      [class.translate-x-0]="isOpen"
      [class.opacity-100]="isOpen"
      [class.w-0]="!isOpen"
      [class.-translate-x-full]="!isOpen"
      [class.opacity-0]="!isOpen"
      [class.overflow-hidden]="!isOpen">
      <div class="p-4 pb-2 whitespace-nowrap">
        <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Einzugsgebiet</h2>
      </div>
      <nav class="flex-1 w-64">
        <ul>
          @for (item of menuItems; track item.id) {
            <li>
              <button
                (click)="selectTab.emit(item.id)"
                class="w-full text-left block px-4 py-3 text-sm transition-colors border-l-4 outline-none"
                [class.border-[#004e82]]="activeTab === item.id"
                [class.bg-sky-50]="activeTab === item.id"
                [class.text-[#004e82]]="activeTab === item.id"
                [class.font-semibold]="activeTab === item.id"
                [class.border-transparent]="activeTab !== item.id"
                [class.text-gray-700]="activeTab !== item.id"
                [class.hover:bg-gray-50]="activeTab !== item.id"
                [class.hover:text-gray-900]="activeTab !== item.id"
                [class.focus:bg-gray-50]="activeTab !== item.id">
                {{ item.label }}
              </button>
            </li>
          }
        </ul>
      </nav>
    </aside>
  `
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Input() activeTab: TabId = 'stammdaten';
  @Output() selectTab = new EventEmitter<TabId>();

  menuItems: SidebarItem[] = [
    { id: 'suche', label: 'Suche / Filtern' },
    { id: 'stammdaten', label: 'Stammdaten (EG)' },
    { id: 'gis', label: 'Geometrie / GIS' },
    { id: 'beschreibung', label: 'Beschreibung / Hydrogeologie' },
    { id: 'rmm', label: 'Risikomanagement (RMM)' },
    { id: 'dokumente', label: 'Dokumente' },
    { id: 'import-export', label: 'Import / Export' },
  ];
}

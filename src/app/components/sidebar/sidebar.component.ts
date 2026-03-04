import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SidebarItem, TabId, SucheResult } from '../../types';

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

      <!-- Navigation -->
      <div class="p-4 pb-2 whitespace-nowrap">
        <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Hauptmenü</h2>
      </div>
      <nav class="w-64">
        <ul>
          <!-- Suche / Filtern -->
          <li>
            <button
              (click)="selectTab.emit('suche')"
              class="w-full text-left block px-4 py-3 text-sm transition-colors border-l-4 outline-none"
              [class.border-[#004e82]]="activeTab === 'suche'"
              [class.bg-sky-50]="activeTab === 'suche'"
              [class.text-[#004e82]]="activeTab === 'suche'"
              [class.font-semibold]="activeTab === 'suche'"
              [class.border-transparent]="activeTab !== 'suche'"
              [class.text-gray-700]="activeTab !== 'suche'"
              [class.hover:bg-gray-50]="activeTab !== 'suche'"
              [class.hover:text-gray-900]="activeTab !== 'suche'"
              [class.focus:bg-gray-50]="activeTab !== 'suche'">
              Suche / Filtern
            </button>
          </li>

          <!-- Einzugsgebiet-Untermenü (dynamisch nach Suche) -->
          @if (selectedEg) {
            <li>
              <p class="pl-7 pr-4 py-1.5 text-xs text-[#004e82] font-semibold truncate border-l-4 border-transparent bg-sky-50">
                {{ selectedEg.idEg }}
              </p>
            </li>
            @for (item of egItems; track item.id) {
              <li>
                <button
                  (click)="selectTab.emit(item.id)"
                  class="w-full text-left block pl-7 pr-4 py-2 text-sm transition-colors border-l-4 outline-none"
                  [class.border-[#004e82]]="activeTab === item.id"
                  [class.bg-sky-50]="activeTab === item.id"
                  [class.text-[#004e82]]="activeTab === item.id"
                  [class.font-semibold]="activeTab === item.id"
                  [class.border-transparent]="activeTab !== item.id"
                  [class.text-gray-600]="activeTab !== item.id"
                  [class.hover:bg-gray-50]="activeTab !== item.id"
                  [class.hover:text-gray-900]="activeTab !== item.id"
                  [class.focus:bg-gray-50]="activeTab !== item.id">
                  {{ item.label }}
                </button>
              </li>
            }
          }

          <!-- Neues Einzugsgebiet -->
          <li>
            <button
              (click)="selectTab.emit('neues-einzugsgebiet')"
              class="w-full text-left block px-4 py-3 text-sm transition-colors border-l-4 outline-none"
              [class.border-[#004e82]]="activeTab === 'neues-einzugsgebiet'"
              [class.bg-sky-50]="activeTab === 'neues-einzugsgebiet'"
              [class.text-[#004e82]]="activeTab === 'neues-einzugsgebiet'"
              [class.font-semibold]="activeTab === 'neues-einzugsgebiet'"
              [class.border-transparent]="activeTab !== 'neues-einzugsgebiet'"
              [class.text-gray-700]="activeTab !== 'neues-einzugsgebiet'"
              [class.hover:bg-gray-50]="activeTab !== 'neues-einzugsgebiet'"
              [class.hover:text-gray-900]="activeTab !== 'neues-einzugsgebiet'"
              [class.focus:bg-gray-50]="activeTab !== 'neues-einzugsgebiet'">
              Neues Einzugsgebiet
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  `
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Input() activeTab: TabId = 'suche';
  @Input() selectedEg: SucheResult | null = null;
  @Output() selectTab = new EventEmitter<TabId>();

  mainItems: SidebarItem[] = [
    { id: 'suche', label: 'Suche / Filtern' },
    { id: 'neues-einzugsgebiet', label: 'Neues Einzugsgebiet' },
  ];

  egItems: SidebarItem[] = [
    { id: 'stammdaten', label: 'Stammdaten (EG)' },
    { id: 'gis', label: 'Geometrie / GIS' },
    { id: 'beschreibung', label: 'Beschreibung / Hydrogeologie' },
    { id: 'rmm', label: 'Risikomanagement (RMM)' },
    { id: 'dokumente', label: 'Dokumente' },
  ];
}

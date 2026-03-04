import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, ChevronLeft } from 'lucide-angular';
import { SidebarItem, TabId, SucheResult } from '../../types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule],
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

      @if (selectedEg || isNewEg) {
        <!-- EG-Modus -->
        <button
          (click)="closeEg.emit()"
          class="flex items-center gap-1.5 w-full px-4 py-3 text-xs text-gray-500 hover:text-[#004e82] hover:bg-gray-50 transition-colors border-b border-gray-200 whitespace-nowrap outline-none">
          <lucide-icon [img]="ChevronLeftIcon" [size]="13"></lucide-icon>
          Zurück zur Suche
        </button>

        @if (isNewEg) {
          <div class="px-4 py-4 border-b border-gray-200 whitespace-nowrap">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Neues Einzugsgebiet</p>
            <p class="text-sm font-medium text-gray-700 truncate">Name: (vorläufig)</p>
            <p class="text-xs text-gray-500 truncate mt-0.5">Entnahmestelle: –</p>
            <span class="inline-block mt-2 text-xs px-2 py-0.5 rounded-full border bg-sky-50 border-sky-200 text-sky-800">
              Neu / ungespeichert
            </span>
          </div>
        } @else {
          <div class="px-4 py-4 border-b border-gray-200 whitespace-nowrap">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Einzugsgebiet</p>
            <p class="font-mono text-sm font-bold text-[#004e82] truncate">{{ selectedEg!.idEg }}</p>
            <p class="text-xs text-gray-600 truncate mt-0.5">{{ selectedEg!.name }}</p>
            <span class="inline-block mt-2 text-xs px-2 py-0.5 rounded-full border"
              [class.bg-yellow-50]="selectedEg!.bearbeitungsstand === 'Entwurf'"
              [class.border-yellow-200]="selectedEg!.bearbeitungsstand === 'Entwurf'"
              [class.text-yellow-800]="selectedEg!.bearbeitungsstand === 'Entwurf'"
              [class.bg-green-50]="selectedEg!.bearbeitungsstand === 'Plausibilisiert'"
              [class.border-green-200]="selectedEg!.bearbeitungsstand === 'Plausibilisiert'"
              [class.text-green-800]="selectedEg!.bearbeitungsstand === 'Plausibilisiert'">
              {{ selectedEg!.bearbeitungsstand }}
            </span>
          </div>
        }

        <nav class="flex-1 w-64">
          <ul>
            @for (item of egItems; track item.id) {
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

      } @else {
        <!-- Hauptmenü -->
        <div class="p-4 pb-2 whitespace-nowrap">
          <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Hauptmenü</h2>
        </div>
        <nav class="w-64">
          <ul>
            @for (item of mainItems; track item.id) {
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
      }
    </aside>
  `
})
export class SidebarComponent {
  readonly ChevronLeftIcon = ChevronLeft;

  @Input() isOpen = true;
  @Input() activeTab: TabId = 'suche';
  @Input() selectedEg: SucheResult | null = null;
  @Input() isNewEg = false;
  @Output() selectTab = new EventEmitter<TabId>();
  @Output() closeEg = new EventEmitter<void>();

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

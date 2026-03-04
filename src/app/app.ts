import { Component, signal } from '@angular/core';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';
import { TabId, SucheResult } from './types';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StammdatenComponent } from './components/stammdaten/stammdaten.component';
import { BeschreibungComponent } from './components/beschreibung/beschreibung.component';
import { RmmComponent } from './components/rmm/rmm.component';
import { SucheComponent } from './components/suche/suche.component';
import { GisToolComponent } from './components/gis-tool/gis-tool.component';
import { DokumenteComponent } from './components/dokumente/dokumente.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LucideAngularModule,
    HeaderComponent,
    SidebarComponent,
    StammdatenComponent,
    BeschreibungComponent,
    RmmComponent,
    SucheComponent,
    GisToolComponent,
    DokumenteComponent,
    UserProfileComponent,
  ],
  template: `
    <div class="flex flex-col h-screen bg-[#f0f2f5] overflow-hidden text-[#333]">
      <app-header
        (toggleSidebar)="toggleSidebar()"
        (userClick)="activeTab.set('user-profile')">
      </app-header>

      <div class="flex flex-1 overflow-hidden">
        <app-sidebar
          [isOpen]="isSidebarOpen()"
          [activeTab]="activeTab()"
          [selectedEg]="selectedEg()"
          (selectTab)="activeTab.set($event)">
        </app-sidebar>

        <main class="flex-1 flex flex-col min-w-0">
          <div class="flex-none p-4 md:px-8 pt-6 pb-2">
            <div class="flex items-center text-xs text-gray-500 gap-1 font-medium">
              @if (activeTab() === 'user-profile') {
                <button
                  (click)="activeTab.set('suche')"
                  class="hover:text-[#004e82] hover:underline focus:outline-none focus:text-[#004e82] transition-colors">
                  System
                </button>
                <lucide-icon [img]="ChevronRightIcon" [size]="12" class="text-gray-400"></lucide-icon>
                <span class="text-[#004e82] font-bold cursor-default">Benutzerverwaltung</span>
              } @else if (activeTab() === 'suche' || activeTab() === 'neues-einzugsgebiet') {
                <span class="text-gray-400 cursor-default">Hauptmenü</span>
                <lucide-icon [img]="ChevronRightIcon" [size]="12" class="text-gray-400"></lucide-icon>
                <span class="text-[#004e82] font-bold cursor-default">{{ getPageTitle(activeTab()) }}</span>
              } @else {
                <button
                  (click)="activeTab.set('suche')"
                  class="hover:text-[#004e82] hover:underline focus:outline-none focus:text-[#004e82] transition-colors">
                  Hauptmenü
                </button>
                <lucide-icon [img]="ChevronRightIcon" [size]="12" class="text-gray-400"></lucide-icon>
                <button
                  (click)="activeTab.set('suche')"
                  class="hover:text-[#004e82] hover:underline focus:outline-none focus:text-[#004e82] transition-colors">
                  @if (selectedEg()) { Einzugsgebiet ({{ selectedEg()!.idEg }}) } @else { Einzugsgebiet }
                </button>
                <lucide-icon [img]="ChevronRightIcon" [size]="12" class="text-gray-400"></lucide-icon>
                <span class="text-[#004e82] font-bold cursor-default">{{ getPageTitle(activeTab()) }}</span>
              }
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-4 md:p-8 md:pt-4">
            @switch (activeTab()) {
              @case ('stammdaten') { <app-stammdaten /> }
              @case ('beschreibung') { <app-beschreibung /> }
              @case ('rmm') { <app-rmm /> }
              @case ('suche') { <app-suche (egSelected)="selectEg($event)" /> }
              @case ('neues-einzugsgebiet') { <app-stammdaten /> }
              @case ('gis') { <app-gis-tool /> }
              @case ('dokumente') { <app-dokumente /> }
              @case ('user-profile') { <app-user-profile /> }
              @default { <app-stammdaten /> }
            }
          </div>
        </main>
      </div>
    </div>
  `
})
export class AppComponent {
  readonly ChevronRightIcon = ChevronRight;

  isSidebarOpen = signal(true);
  activeTab = signal<TabId>('suche');
  selectedEg = signal<SucheResult | null>(null);

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  selectEg(eg: SucheResult) {
    this.selectedEg.set(eg);
    this.activeTab.set('stammdaten');
  }

  getPageTitle(id: TabId): string {
    switch (id) {
      case 'suche': return 'Suche / Filtern';
      case 'neues-einzugsgebiet': return 'Neues Einzugsgebiet';
      case 'stammdaten': return 'Stammdaten (EG)';
      case 'beschreibung': return 'Beschreibung / Hydrogeologie';
      case 'rmm': return 'Risikomanagement (RMM)';
      case 'gis': return 'Geometrie / GIS';
      case 'dokumente': return 'Dokumente';
      case 'user-profile': return 'Benutzerprofil';
      default: return '';
    }
  }
}

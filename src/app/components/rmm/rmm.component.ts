import { Component, signal } from '@angular/core';
import { LucideAngularModule, Plus, ChevronDown, ChevronUp, Pencil } from 'lucide-angular';
import { FloatingLabelSelectComponent } from '../../shared/floating-label-select.component';
import { FloatingLabelInputComponent } from '../../shared/floating-label-input.component';
import { FloatingLabelTextareaComponent } from '../../shared/floating-label-textarea.component';
import { DateInputComponent } from '../../shared/date-input.component';
import { RmmEntry } from '../../types';

@Component({
  selector: 'app-rmm',
  standalone: true,
  imports: [
    LucideAngularModule,
    FloatingLabelSelectComponent,
    FloatingLabelInputComponent,
    FloatingLabelTextareaComponent,
    DateInputComponent,
  ],
  template: `
    <div class="space-y-6 max-w-6xl mx-auto">

      <!-- Filter -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 class="text-xl font-medium text-gray-800 mb-4">Risikomanagementmaßnahmen</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <app-floating-label-select
            label="Sektor"
            [value]="filterSektor()"
            [changeHandler]="setFilterSektor">
            <option value="">Alle Sektoren</option>
            <option value="1">1 – Industrie</option>
            <option value="2">2 – Siedlung</option>
            <option value="3">3 – Abwasser</option>
            <option value="4">4 – Abfall</option>
            <option value="5">5 – Altlasten</option>
            <option value="6">6 – Untergrund</option>
            <option value="7">7 – Landwirtschaft</option>
            <option value="8">8 – Forstwirtschaft</option>
            <option value="9">9 – Sonstige</option>
            <option value="10">10 – Naturräumliche Einflüsse</option>
          </app-floating-label-select>

          <app-floating-label-select
            label="Berichtszyklus"
            [value]="filterZyklus()"
            [changeHandler]="setFilterZyklus">
            <option value="">Alle</option>
            <option value="2019-2021">2019–2021</option>
            <option value="2022-2024">2022–2024</option>
            <option value="2025-2027">2025–2027</option>
          </app-floating-label-select>

          <div class="md:col-span-2 flex items-end justify-end">
            <button
              (click)="addEntry()"
              class="flex items-center gap-2 bg-[#004e82] text-white px-4 py-2 rounded text-sm hover:bg-[#003d66] transition-colors">
              <lucide-icon [img]="PlusIcon" [size]="16"></lucide-icon>
              <span>Neue Maßnahme</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Tabelle -->
      <section class="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th class="px-4 py-3">Sektor</th>
                <th class="px-4 py-3">Maßnahmenbezeichnung</th>
                <th class="px-4 py-3">Typ</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Priorität</th>
                <th class="px-4 py-3">Bearbeitungsstand</th>
                <th class="px-4 py-3 text-right">Aktion</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (entry of entries(); track entry.id) {
                <tr
                  class="hover:bg-gray-50 transition-colors cursor-pointer"
                  (click)="toggleDetail(entry.id)">
                  <td class="px-4 py-3 font-mono text-gray-500">{{ entry.sektor }}</td>
                  <td class="px-4 py-3 text-gray-900 font-medium">{{ entry.massnahmenbezeichnung }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ getTypLabel(entry.typRmm) }}</td>
                  <td class="px-4 py-3">
                    <span class="text-xs px-2 py-0.5 rounded-full border"
                      [class.bg-yellow-50]="entry.statusRmm === '1'"
                      [class.border-yellow-200]="entry.statusRmm === '1'"
                      [class.text-yellow-800]="entry.statusRmm === '1'"
                      [class.bg-blue-50]="entry.statusRmm === '2'"
                      [class.border-blue-200]="entry.statusRmm === '2'"
                      [class.text-blue-800]="entry.statusRmm === '2'"
                      [class.bg-green-50]="entry.statusRmm === '3'"
                      [class.border-green-200]="entry.statusRmm === '3'"
                      [class.text-green-800]="entry.statusRmm === '3'">
                      {{ getStatusLabel(entry.statusRmm) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-gray-600">{{ getPrioLabel(entry.priorisierung) }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ getBearbeitungsstandLabel(entry.bearbeitungsstandRisiko) }}</td>
                  <td class="px-4 py-3 text-right">
                    <button class="p-1.5 text-gray-500 hover:text-[#004e82] hover:bg-blue-50 rounded transition-colors">
                      <lucide-icon [img]="PencilIcon" [size]="14"></lucide-icon>
                    </button>
                  </td>
                </tr>

                @if (expandedId() === entry.id) {
                  <tr>
                    <td colspan="7" class="px-4 py-4 bg-sky-50/50 border-t border-blue-100">
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
                        <app-floating-label-input
                          label="Maßnahmenbezeichnung fein"
                          name="massnahmenbezeichnungFein"
                          [value]="entry.massnahmenbezeichnungFein" />

                        <app-floating-label-select
                          label="Typ RMM"
                          [value]="entry.typRmm"
                          [changeHandler]="noopHandler">
                          <option value="1">Präventivmaßnahme</option>
                          <option value="2">Minderungsmaßnahme</option>
                          <option value="3">Sicherstellung Untersuchung</option>
                          <option value="4">Schutzgebietsfestsetzung Anpassung</option>
                        </app-floating-label-select>

                        <app-floating-label-select
                          label="Status RMM"
                          [value]="entry.statusRmm"
                          [changeHandler]="noopHandler">
                          <option value="1">Geplant</option>
                          <option value="2">In Umsetzung</option>
                          <option value="3">Abgeschlossen</option>
                        </app-floating-label-select>

                        <app-floating-label-select
                          label="Priorisierung"
                          [value]="entry.priorisierung"
                          [changeHandler]="noopHandler">
                          <option value="1">1 – Sehr hoch</option>
                          <option value="2">2 – Hoch</option>
                          <option value="3">3 – Mittel</option>
                          <option value="4">4 – Gering</option>
                          <option value="5">5 – Sehr gering</option>
                        </app-floating-label-select>

                        <app-date-input
                          label="Risikobewertung vom"
                          [value]="entry.risikobewertungVom"
                          (valueChange)="noopHandler($event)" />

                        <app-floating-label-select
                          label="Bearbeitungsstand Risikobewertung"
                          [value]="entry.bearbeitungsstandRisiko"
                          [changeHandler]="noopHandler">
                          <option value="0">0 – Nicht erforderlich</option>
                          <option value="1">1 – Eingereicht / unbearbeitet</option>
                          <option value="2">2 – In Bearbeitung / Abstimmung</option>
                          <option value="3">3 – Geprüft / plausibilisiert</option>
                        </app-floating-label-select>

                        <div class="md:col-span-3">
                          <app-floating-label-textarea
                            label="Kurzbeschreibung Maßnahme"
                            [rows]="3"
                            placeholder="Freitext..." />
                        </div>

                        <div class="md:col-span-3">
                          <app-floating-label-textarea
                            label="Kommentar"
                            [rows]="2"
                            placeholder="Optionaler Kommentar..." />
                        </div>
                      </div>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `
})
export class RmmComponent {
  readonly PlusIcon = Plus;
  readonly ChevronDownIcon = ChevronDown;
  readonly ChevronUpIcon = ChevronUp;
  readonly PencilIcon = Pencil;

  filterSektor = signal('');
  filterZyklus = signal('2025-2027');
  expandedId = signal<number | null>(null);

  entries = signal<RmmEntry[]>([
    {
      id: 1,
      sektor: '7',
      massnahmenbezeichnung: '501 – Kooperative Maßnahmen Landwirtschaft',
      massnahmenbezeichnungFein: 'Beratung Pflanzenschutzmitteleinsatz',
      kurzbeschreibung: 'Reduktion des PSM-Eintrags durch gezielte Beratung der Landwirte im EG.',
      typRmm: '1',
      statusRmm: '2',
      priorisierung: '2',
      berichtszyklus: '2025-2027',
      risikobewertungVom: '2025-03-15',
      bearbeitungsstandRisiko: '2',
      kommentar: '',
    },
    {
      id: 2,
      sektor: '2',
      massnahmenbezeichnung: '42 – Maßnahmen Siedlungsentwässerung',
      massnahmenbezeichnungFein: 'Sanierung Mischwasserentlastung',
      kurzbeschreibung: 'Erneuerung und Ertüchtigung der Mischwasserentlastungsbauwerke im Einzugsgebiet.',
      typRmm: '2',
      statusRmm: '1',
      priorisierung: '3',
      berichtszyklus: '2025-2027',
      risikobewertungVom: '',
      bearbeitungsstandRisiko: '1',
      kommentar: 'Abstimmung mit Kommunen läuft.',
    },
    {
      id: 3,
      sektor: '5',
      massnahmenbezeichnung: '43 – Altlastensanierung',
      massnahmenbezeichnungFein: 'Grundwassermonitoring Altstandort',
      kurzbeschreibung: 'Überwachung der Schadstofffahne am ehemaligen Industriestandort.',
      typRmm: '3',
      statusRmm: '3',
      priorisierung: '1',
      berichtszyklus: '2022-2024',
      risikobewertungVom: '2024-11-20',
      bearbeitungsstandRisiko: '3',
      kommentar: 'Sanierung abgeschlossen, Monitoring weitergeführt.',
    },
  ]);

  setFilterSektor = (val: string) => this.filterSektor.set(val);
  setFilterZyklus = (val: string) => this.filterZyklus.set(val);
  noopHandler = (_val: string) => {};

  toggleDetail(id: number) {
    this.expandedId.update(prev => prev === id ? null : id);
  }

  addEntry() {
    const newEntry: RmmEntry = {
      id: Date.now(),
      sektor: '',
      massnahmenbezeichnung: '',
      massnahmenbezeichnungFein: '',
      kurzbeschreibung: '',
      typRmm: '1',
      statusRmm: '1',
      priorisierung: '3',
      berichtszyklus: '2025-2027',
      risikobewertungVom: '',
      bearbeitungsstandRisiko: '0',
      kommentar: '',
    };
    this.entries.update(list => [newEntry, ...list]);
    this.expandedId.set(newEntry.id);
  }

  getTypLabel(val: string): string {
    const map: Record<string, string> = { '1': 'Prävention', '2': 'Minderung', '3': 'Untersuchung', '4': 'Schutzgebiet' };
    return map[val] ?? val;
  }

  getStatusLabel(val: string): string {
    const map: Record<string, string> = { '1': 'Geplant', '2': 'In Umsetzung', '3': 'Abgeschlossen' };
    return map[val] ?? val;
  }

  getPrioLabel(val: string): string {
    const map: Record<string, string> = { '1': 'Sehr hoch', '2': 'Hoch', '3': 'Mittel', '4': 'Gering', '5': 'Sehr gering' };
    return map[val] ?? val;
  }

  getBearbeitungsstandLabel(val: string): string {
    const map: Record<string, string> = { '0': 'Nicht erforderl.', '1': 'Eingereicht', '2': 'In Bearbeitung', '3': 'Geprüft' };
    return map[val] ?? val;
  }
}

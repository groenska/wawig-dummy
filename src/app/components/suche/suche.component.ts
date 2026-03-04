import { Component, signal, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, Search, Download, RotateCcw } from 'lucide-angular';
import { FloatingLabelInputComponent } from '../../shared/floating-label-input.component';
import { FloatingLabelSelectComponent } from '../../shared/floating-label-select.component';
import { CustomCheckboxComponent } from '../../shared/custom-checkbox.component';
import { SucheResult } from '../../types';

@Component({
  selector: 'app-suche',
  standalone: true,
  imports: [
    LucideAngularModule,
    FloatingLabelInputComponent,
    FloatingLabelSelectComponent,
    CustomCheckboxComponent,
  ],
  template: `
    <div class="space-y-6 max-w-6xl mx-auto">

      <!-- Suchformular -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 class="text-xl font-medium text-gray-800 mb-6">Suche / Filtern</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <app-floating-label-select
            label="Datenführende Dienststelle"
            value=""
            [changeHandler]="noopHandler">
            <option value="">Alle</option>
            <option value="lra-karlsruhe">LRA Karlsruhe</option>
            <option value="lra-esslingen">LRA Esslingen</option>
            <option value="lra-tuebingen">LRA Tübingen</option>
            <option value="rp-stuttgart">RP Stuttgart</option>
            <option value="rp-karlsruhe">RP Karlsruhe</option>
          </app-floating-label-select>

          <app-floating-label-input
            label="EG-Nr. / WSG-Nr."
            name="egNr"
            placeholder="z.B. DE_TWEG_BW_..." />

          <app-floating-label-input
            label="Name EG"
            name="egName"
            placeholder="Suchbegriff..." />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <app-floating-label-input
            label="Betreiber / Betreiber-ID"
            name="betreiber"
            placeholder="Name oder ID..." />

          <app-floating-label-select
            label="Genutztes Gewässer"
            value=""
            [changeHandler]="noopHandler">
            <option value="">Alle</option>
            <option value="1">1 – Grundwasser</option>
            <option value="2">2 – Angereichertes GW</option>
            <option value="3">3 – Oberflächenwasser</option>
            <option value="4">4 – Talsperre</option>
          </app-floating-label-select>

          <app-floating-label-select
            label="Sektor"
            value=""
            [changeHandler]="noopHandler">
            <option value="">Alle</option>
            <option value="1">1 – Industrie</option>
            <option value="2">2 – Siedlung</option>
            <option value="3">3 – Abwasser</option>
            <option value="7">7 – Landwirtschaft</option>
          </app-floating-label-select>
        </div>

        <div class="flex items-center justify-between mt-6">
          <app-custom-checkbox
            label="Nur EG mit fehlendem Datum Risikobewertung"
            [checked]="filterMissingDate()"
            (checkedChange)="filterMissingDate.set($event)" />

          <div class="flex gap-3">
            <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <lucide-icon [img]="ResetIcon" [size]="14"></lucide-icon>
              Zurücksetzen
            </button>
            <button class="flex items-center gap-2 bg-[#004e82] text-white px-5 py-2 rounded text-sm hover:bg-[#003d66] transition-colors font-medium">
              <lucide-icon [img]="SearchIcon" [size]="14"></lucide-icon>
              Suchen
            </button>
          </div>
        </div>
      </section>

      <!-- Ergebnisse -->
      <section class="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 class="text-sm font-semibold text-gray-700">
            {{ results.length }} Ergebnis{{ results.length !== 1 ? 'se' : '' }}
          </h3>
          <div class="flex gap-2">
            <button class="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors">
              <lucide-icon [img]="DownloadIcon" [size]="12"></lucide-icon>
              CSV
            </button>
            <button class="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-gray-700 transition-colors">
              <lucide-icon [img]="DownloadIcon" [size]="12"></lucide-icon>
              XLSX
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th class="px-4 py-3">ID_EG</th>
                <th class="px-4 py-3">Name</th>
                <th class="px-4 py-3">Dienststelle</th>
                <th class="px-4 py-3">Gewässer</th>
                <th class="px-4 py-3">Betreiber</th>
                <th class="px-4 py-3">Bearbeitungsstand</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (r of results; track r.idEg) {
                <tr class="hover:bg-blue-50 transition-colors cursor-pointer" (click)="egSelected.emit(r)">
                  <td class="px-4 py-3 font-mono text-[#004e82] font-medium">{{ r.idEg }}</td>
                  <td class="px-4 py-3 text-gray-900">{{ r.name }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ r.dienststelle }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ r.gewaesser }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ r.betreiber }}</td>
                  <td class="px-4 py-3">
                    <span class="text-xs px-2 py-0.5 rounded-full border"
                      [class.bg-yellow-50]="r.bearbeitungsstand === 'Entwurf'"
                      [class.border-yellow-200]="r.bearbeitungsstand === 'Entwurf'"
                      [class.text-yellow-800]="r.bearbeitungsstand === 'Entwurf'"
                      [class.bg-green-50]="r.bearbeitungsstand === 'Plausibilisiert'"
                      [class.border-green-200]="r.bearbeitungsstand === 'Plausibilisiert'"
                      [class.text-green-800]="r.bearbeitungsstand === 'Plausibilisiert'">
                      {{ r.bearbeitungsstand }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `
})
export class SucheComponent {
  @Output() egSelected = new EventEmitter<SucheResult>();

  readonly SearchIcon = Search;
  readonly DownloadIcon = Download;
  readonly ResetIcon = RotateCcw;

  filterMissingDate = signal(false);
  noopHandler = (_val: string) => {};

  results: SucheResult[] = [
    { idEg: 'DE_TWEG_BW_1234', name: 'Stuttgarter Brunnen EG', dienststelle: 'LRA Esslingen', gewaesser: 'Grundwasser', betreiber: 'Stadtwerke Stuttgart', bearbeitungsstand: 'Entwurf' },
    { idEg: 'DE_TWEG_BW_2001', name: 'Filderebene Süd EG', dienststelle: 'LRA Esslingen', gewaesser: 'Grundwasser', betreiber: 'Zweckverband Filder', bearbeitungsstand: 'Plausibilisiert' },
    { idEg: 'DE_TWEG_BW_3050', name: 'Bodensee Nordwest EG', dienststelle: 'LRA Karlsruhe', gewaesser: 'Oberflächenwasser', betreiber: 'BWV Bodensee', bearbeitungsstand: 'Entwurf' },
    { idEg: 'DE_TWEG_BW_4100', name: 'Neckartal Heilbronn EG', dienststelle: 'RP Stuttgart', gewaesser: 'Angereichertes GW', betreiber: 'Stadtwerke Heilbronn', bearbeitungsstand: 'Plausibilisiert' },
    { idEg: 'DE_TWEG_BW_5200', name: 'Schwarzwald Ost EG', dienststelle: 'RP Freiburg', gewaesser: 'Grundwasser', betreiber: 'GWV Schwarzwald', bearbeitungsstand: 'Entwurf' },
  ];
}

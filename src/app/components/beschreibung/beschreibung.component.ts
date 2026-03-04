import { Component, signal, computed } from '@angular/core';
import { LucideAngularModule, Database } from 'lucide-angular';
import { FloatingLabelInputComponent } from '../../shared/floating-label-input.component';
import { FloatingLabelSelectComponent } from '../../shared/floating-label-select.component';
import { FloatingLabelTextareaComponent } from '../../shared/floating-label-textarea.component';
import { BeschreibungData } from '../../types';

@Component({
  selector: 'app-beschreibung',
  standalone: true,
  imports: [LucideAngularModule, FloatingLabelInputComponent, FloatingLabelSelectComponent, FloatingLabelTextareaComponent],
  template: `
    <div class="space-y-6 max-w-6xl mx-auto">

      <!-- Hydrogeologie -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 class="text-xl font-medium text-gray-800 mb-6">Hydrogeologie</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <app-floating-label-input
            label="Genutzter GW-Leiter"
            name="gwLeiter"
            [value]="formData().gwLeiter" />

          <app-floating-label-select
            label="Schutzpotential GW-Körper"
            [value]="formData().schutzpotential"
            [changeHandler]="makeHandler('schutzpotential')">
            <option value="">-- Bitte wählen --</option>
            <option value="1">1 – günstig</option>
            <option value="2">2 – eher günstig</option>
            <option value="3">3 – mittel</option>
            <option value="4">4 – eher ungünstig</option>
            <option value="5">5 – ungünstig</option>
          </app-floating-label-select>

          <app-floating-label-input
            label="GWN gemittelt über EG (mm)"
            name="gwNeu"
            type="number"
            [value]="formData().gwNeu" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <app-floating-label-input
            label="Anteil Uferfiltrat / AGW (geschätzt, %)"
            name="anteilUfAgw"
            type="number"
            [value]="formData().anteilUfAgw" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <app-floating-label-textarea
            label="Hydrochemische Verhältnisse"
            [rows]="3"
            placeholder="Freitext..." />

          <app-floating-label-textarea
            label="Geohydraulische Verhältnisse"
            [rows]="3"
            placeholder="Freitext..." />

          <app-floating-label-textarea
            label="Hydrogeologische Verhältnisse"
            [rows]="3"
            placeholder="Freitext..." />
        </div>
      </section>

      <!-- Landnutzung nach ALKIS -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h2 class="text-xl font-medium text-gray-800">Landnutzung je Sektor</h2>
            <p class="text-xs text-gray-400 mt-0.5">Quelle: ALKIS – automatisierter Abruf</p>
          </div>
          <div class="flex items-center gap-3 flex-shrink-0">
            @if (alkisZuletzt()) {
              <span class="text-xs text-gray-400">Stand: {{ alkisZuletzt() }}</span>
            }
            <button
              (click)="alkisAbrufen()"
              [disabled]="alkisLoading()"
              class="flex items-center gap-2 border border-[#004e82] text-[#004e82] px-4 py-2 rounded text-sm hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              @if (alkisLoading()) {
                <div class="w-4 h-4 border-2 border-[#004e82] border-t-transparent rounded-full animate-spin"></div>
              } @else {
                <lucide-icon [img]="DatabaseIcon" [size]="15"></lucide-icon>
              }
              {{ alkisLoading() ? 'Wird abgerufen …' : 'Aus ALKIS abrufen' }}
            </button>
          </div>
        </div>

        @if (alkisLoading()) {
          <div class="flex flex-col items-center justify-center h-44 text-gray-400 gap-3">
            <div class="w-8 h-8 border-2 border-[#004e82] border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm">ALKIS-Daten werden abgerufen …</span>
          </div>
        } @else if (sektoren().length > 0) {
          <!-- Gestapelter Balken -->
          <div class="flex h-7 rounded overflow-hidden mb-5">
            @for (s of sektoren(); track s.nr; let i = $index) {
              @if (+s.value > 0) {
                <div
                  [style.width.%]="+s.value"
                  [style.backgroundColor]="sektorFarben[i]"
                  [title]="s.nr + '. ' + s.label + ': ' + s.value + '%'">
                </div>
              }
            }
          </div>

          <!-- Einzelbalken -->
          <div class="space-y-2">
            @for (s of sektoren(); track s.nr; let i = $index) {
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-sm flex-shrink-0" [style.backgroundColor]="sektorFarben[i]"></div>
                <span class="w-56 text-sm text-gray-700 truncate">{{ s.nr }}. {{ s.label }}</span>
                <div class="flex-1 bg-gray-100 rounded-full h-4">
                  <div
                    class="h-full rounded-full"
                    [style.width.%]="+s.value"
                    [style.backgroundColor]="sektorFarben[i]">
                  </div>
                </div>
                <span class="w-10 text-right text-sm font-semibold text-gray-700">{{ s.value }} %</span>
              </div>
            }
          </div>

          <!-- Summe -->
          <div class="mt-4 text-xs text-right font-medium"
            [class.text-green-600]="sektorenSumme() === 100"
            [class.text-red-600]="sektorenSumme() !== 100">
            Summe: {{ sektorenSumme().toFixed(1) }} %
          </div>
        } @else {
          <!-- Leerer Zustand -->
          <div class="flex flex-col items-center justify-center h-44 gap-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
            <lucide-icon [img]="DatabaseIcon" [size]="32" class="opacity-25"></lucide-icon>
            <span class="text-sm">Noch keine ALKIS-Daten geladen.</span>
            <span class="text-xs">Klicken Sie „Aus ALKIS abrufen" um die Landnutzungsdaten zu importieren.</span>
          </div>
        }
      </section>

      <!-- Naturraum & Hydrologie -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 class="text-xl font-medium text-gray-800 mb-6">Naturraum & Hydrologie</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <app-floating-label-textarea
            label="Naturräumliche Gegebenheiten"
            [rows]="4"
            placeholder="Freitext..." />

          <app-floating-label-textarea
            label="Zuflüsse (Durchfluss)"
            [rows]="4"
            placeholder="Freitext..." />

          <app-floating-label-textarea
            label="Abflussprozesse"
            [rows]="4"
            placeholder="Freitext..." />
        </div>
      </section>
    </div>
  `
})
export class BeschreibungComponent {
  readonly DatabaseIcon = Database;

  readonly sektorFarben = [
    '#e74c3c', '#e67e22', '#f39c12', '#9b59b6', '#c0392b',
    '#607d8b', '#27ae60', '#16a085', '#3498db', '#1abc9c',
  ];

  alkisLoading = signal(false);
  alkisZuletzt = signal<string | null>(null);

  alkisAbrufen() {
    this.alkisLoading.set(true);
    setTimeout(() => {
      this.sektoren.set([
        { nr: 1, label: 'Industrie', value: '5' },
        { nr: 2, label: 'Siedlung', value: '22' },
        { nr: 3, label: 'Abwasser', value: '3' },
        { nr: 4, label: 'Abfall / Altablagerungen', value: '1' },
        { nr: 5, label: 'Altlasten / Schadensfälle', value: '2' },
        { nr: 6, label: 'Untergrund (Bergbau, Geothermie)', value: '8' },
        { nr: 7, label: 'Landwirtschaft', value: '38' },
        { nr: 8, label: 'Forstwirtschaft', value: '15' },
        { nr: 9, label: 'Sonstige', value: '4' },
        { nr: 10, label: 'Naturräumliche Einflüsse', value: '2' },
      ]);
      this.alkisLoading.set(false);
      const now = new Date();
      this.alkisZuletzt.set(
        now.toLocaleDateString('de-DE') + ', ' +
        now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr'
      );
    }, 1500);
  }

  formData = signal<BeschreibungData>({
    gwLeiter: 'Oberer Muschelkalk',
    schutzpotential: '3',
    gwNeu: '180',
    hydrochemie: '',
    geohydraulik: '',
    hydrogeologie: '',
    naturraum: '',
    zufluesse: '',
    abflussprozesse: '',
    anteilUfAgw: '',
    sektorIndustrie: '5',
    sektorSiedlung: '22',
    sektorAbwasser: '3',
    sektorAbfall: '1',
    sektorAltlasten: '2',
    sektorUntergrund: '8',
    sektorLandwirtschaft: '38',
    sektorForstwirtschaft: '15',
    sektorSonstige: '4',
    sektorNaturraeumlich: '2',
  });

  sektoren = signal<{ nr: number; label: string; value: string }[]>([]);

  sektorenSumme = computed(() =>
    this.sektoren().reduce((sum, s) => sum + (parseFloat(s.value) || 0), 0)
  );

  handleChange(field: keyof BeschreibungData, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  makeHandler(field: keyof BeschreibungData): (value: string) => void {
    return (value: string) => this.handleChange(field, value);
  }
}

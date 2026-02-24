import { Component, signal, computed } from '@angular/core';
import { FloatingLabelInputComponent } from '../../shared/floating-label-input.component';
import { FloatingLabelSelectComponent } from '../../shared/floating-label-select.component';
import { FloatingLabelTextareaComponent } from '../../shared/floating-label-textarea.component';
import { BeschreibungData } from '../../types';

@Component({
  selector: 'app-beschreibung',
  standalone: true,
  imports: [FloatingLabelInputComponent, FloatingLabelSelectComponent, FloatingLabelTextareaComponent],
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

      <!-- Landnutzung nach ATKIS / Corine -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 class="text-xl font-medium text-gray-800 mb-6">Landnutzung je Sektor (Besch_FN, % nach ATKIS/Corine)</h2>

        <div class="border border-gray-200 rounded overflow-hidden">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th class="px-4 py-3 w-12">Nr.</th>
                <th class="px-4 py-3">Sektor</th>
                <th class="px-4 py-3 w-32 text-right">Anteil (%)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (s of sektoren(); track s.nr; let i = $index) {
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3 text-gray-500 font-mono">{{ s.nr }}</td>
                  <td class="px-4 py-3 text-gray-900">{{ s.label }}</td>
                  <td class="px-4 py-3 text-right">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      [value]="s.value"
                      (input)="updateSektor(i, $any($event.target).value)"
                      class="w-20 text-right bg-gray-50 border border-gray-200 rounded px-2 py-1 text-sm focus:border-blue-500 focus:ring-0 outline-none" />
                  </td>
                </tr>
              }
            </tbody>
            <tfoot>
              <tr class="bg-gray-50 font-semibold border-t border-gray-200">
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3 text-gray-900">Summe</td>
                <td class="px-4 py-3 text-right">
                  <span
                    class="inline-block w-20 text-right px-2 py-1 text-sm rounded"
                    [class.text-green-700]="sektorenSumme() === 100"
                    [class.bg-green-50]="sektorenSumme() === 100"
                    [class.text-red-700]="sektorenSumme() !== 100"
                    [class.bg-red-50]="sektorenSumme() !== 100">
                    {{ sektorenSumme().toFixed(1) }} %
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
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

  sektoren = signal([
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

  sektorenSumme = computed(() =>
    this.sektoren().reduce((sum, s) => sum + (parseFloat(s.value) || 0), 0)
  );

  updateSektor(index: number, value: string) {
    this.sektoren.update(list => list.map((s, i) => i === index ? { ...s, value } : s));
  }

  handleChange(field: keyof BeschreibungData, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  makeHandler(field: keyof BeschreibungData): (value: string) => void {
    return (value: string) => this.handleChange(field, value);
  }
}

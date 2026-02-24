import { Component, signal } from '@angular/core';
import { FloatingLabelInputComponent } from '../../shared/floating-label-input.component';
import { FloatingLabelSelectComponent } from '../../shared/floating-label-select.component';
import { EinzugsgebietData } from '../../types';

@Component({
  selector: 'app-stammdaten',
  standalone: true,
  imports: [FloatingLabelInputComponent, FloatingLabelSelectComponent],
  template: `
    <div class="space-y-6 max-w-6xl mx-auto">

      <!-- Identifikation -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 class="text-xl font-medium text-gray-800 mb-6">Identifikation</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <app-floating-label-input
            label="ID_EG"
            name="idEg"
            [value]="formData().idEg"
            placeholder="DE_TWEG_BW_XXXX" />

          <app-floating-label-select
            label="Datenführende Dienststelle*"
            [value]="formData().datenfuehrendeDienststelle"
            [changeHandler]="makeHandler('datenfuehrendeDienststelle')">
            <option value="">-- Bitte wählen --</option>
            <option value="lra-karlsruhe">LRA Karlsruhe</option>
            <option value="lra-esslingen">LRA Esslingen</option>
            <option value="lra-tuebingen">LRA Tübingen</option>
            <option value="lra-freiburg">LRA Freiburg</option>
            <option value="rp-stuttgart">RP Stuttgart</option>
            <option value="rp-karlsruhe">RP Karlsruhe</option>
            <option value="rp-freiburg">RP Freiburg</option>
            <option value="rp-tuebingen">RP Tübingen</option>
          </app-floating-label-select>

          <app-floating-label-select
            label="WSG-Nr.-AMT"
            [value]="formData().wsgNrAmt"
            [changeHandler]="makeHandler('wsgNrAmt')">
            <option value="">-- Bitte wählen --</option>
            <option value="WSG-001">WSG-001 Stuttgarter Brunnen</option>
            <option value="WSG-002">WSG-002 Filderebene Süd</option>
            <option value="WSG-003">WSG-003 Bodensee Nord</option>
          </app-floating-label-select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div class="md:col-span-2">
            <app-floating-label-input
              label="Name Einzugsgebiet*"
              name="nameEg"
              [value]="formData().nameEg" />
          </div>
          <app-floating-label-input
            label="Zuordnung WR-Nr."
            name="zuordnungWrNr"
            [value]="formData().zuordnungWrNr" />
        </div>
      </section>

      <!-- Gewässer & Betreiber -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 class="text-xl font-medium text-gray-800 mb-6">Gewässer & Betreiber</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <app-floating-label-select
            label="Genutztes Gewässer*"
            [value]="formData().genutzesGewaesser"
            [changeHandler]="makeHandler('genutzesGewaesser')">
            <option value="">-- Bitte wählen --</option>
            <option value="1">1 – Grundwasser</option>
            <option value="2">2 – Angereichertes Grundwasser</option>
            <option value="3">3 – Oberflächenwasser</option>
            <option value="4">4 – Talsperre</option>
          </app-floating-label-select>

          <app-floating-label-input
            label="Betreiber*"
            name="betreiber"
            [value]="formData().betreiber" />

          <app-floating-label-input
            label="Betreiber-ID"
            name="betreiberId"
            [value]="formData().betreiberId" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <app-floating-label-input
            label="Gesamtfläche (ha)*"
            name="gesamtflaeche"
            type="number"
            [value]="formData().gesamtflaeche" />

          <app-floating-label-input
            label="Jährl. zulässige Entnahmemenge (m³)"
            name="entnahmemenge"
            type="number"
            [value]="formData().entnahmemenge" />

          <app-floating-label-input
            label="Verknüpfung Rohwasserentnahmestelle (GW-Nr.)"
            name="verknuepfungRohwasser"
            [value]="formData().verknuepfungRohwasser"
            placeholder="z.B. GW-Nr. aus GWDB" />
        </div>
      </section>

      <!-- Rechtliche Verknüpfungen -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 class="text-xl font-medium text-gray-800 mb-6">Rechtliche Verknüpfungen</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <app-floating-label-input
            label="WRRL-ID Wasserkörper"
            name="wrrlIdWk"
            [value]="formData().wrrlIdWk" />

          <app-floating-label-input
            label="ID WVG nach TrinkwRL"
            name="idWvgTrinkwrl"
            [value]="formData().idWvgTrinkwrl" />
        </div>
      </section>

      <!-- Aktionsleiste -->
      <div class="flex justify-end gap-3">
        <button class="px-6 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          Abbrechen
        </button>
        <button class="px-6 py-2 bg-[#004e82] text-white rounded text-sm hover:bg-[#003d66] transition-colors font-medium">
          Entwurf speichern
        </button>
        <button class="px-6 py-2 bg-green-700 text-white rounded text-sm hover:bg-green-800 transition-colors font-medium">
          Freigeben
        </button>
      </div>
    </div>
  `
})
export class StammdatenComponent {
  formData = signal<EinzugsgebietData>({
    idEg: 'DE_TWEG_BW_1234',
    wsgNrAmt: 'WSG-001',
    nameEg: 'Stuttgarter Brunnen EG',
    datenfuehrendeDienststelle: 'lra-esslingen',
    genutzesGewaesser: '1',
    betreiber: 'Stadtwerke Stuttgart',
    betreiberId: 'BET-0042',
    gesamtflaeche: '245.8',
    entnahmemenge: '1200000',
    wrrlIdWk: 'DE_RW_DEBW_8-01',
    idWvgTrinkwrl: '',
    verknuepfungRohwasser: 'GW-4711, GW-4712',
    zuordnungWrNr: 'WR-2023-0815',
  });

  handleChange(field: keyof EinzugsgebietData, value: any) {
    this.formData.update(prev => ({ ...prev, [field]: value }));
  }

  makeHandler(field: keyof EinzugsgebietData): (value: string) => void {
    return (value: string) => this.handleChange(field, value);
  }
}

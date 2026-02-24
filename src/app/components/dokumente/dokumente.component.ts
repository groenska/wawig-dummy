import { Component } from '@angular/core';
import { LucideAngularModule, FileText, Download, Trash2, Plus } from 'lucide-angular';

@Component({
  selector: 'app-dokumente',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="space-y-6 max-w-6xl mx-auto">

      <!-- Berichte TrinkwEGV -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-medium text-gray-800">Berichte nach TrinkwEGV</h2>
          <button class="flex items-center gap-2 bg-[#004e82] text-white px-4 py-2 rounded text-sm hover:bg-[#003d66] transition-colors">
            <lucide-icon [img]="PlusIcon" [size]="16"></lucide-icon>
            <span>Bericht hochladen</span>
          </button>
        </div>

        <div class="border border-gray-200 rounded overflow-hidden">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th class="px-6 py-4">Name</th>
                <th class="px-6 py-4">Typ</th>
                <th class="px-6 py-4">Berichtszyklus</th>
                <th class="px-6 py-4">Datum</th>
                <th class="px-6 py-4">Größe</th>
                <th class="px-6 py-4 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (doc of berichteDocs; track doc.name) {
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 flex items-center gap-3 font-medium text-gray-900">
                    <lucide-icon [img]="FileTextIcon" [size]="18" class="text-gray-400"></lucide-icon>
                    {{ doc.name }}
                  </td>
                  <td class="px-6 py-4 text-gray-500">{{ doc.type }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ doc.zyklus }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ doc.date }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ doc.size }}</td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button class="p-1.5 text-gray-500 hover:text-[#004e82] hover:bg-blue-50 rounded transition-colors" title="Download">
                        <lucide-icon [img]="DownloadIcon" [size]="16"></lucide-icon>
                      </button>
                      <button class="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Löschen">
                        <lucide-icon [img]="Trash2Icon" [size]="16"></lucide-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <!-- Fachliche Informationen -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-medium text-gray-800">Fachliche Informationen</h2>
          <button class="flex items-center gap-2 bg-[#004e82] text-white px-4 py-2 rounded text-sm hover:bg-[#003d66] transition-colors">
            <lucide-icon [img]="PlusIcon" [size]="16"></lucide-icon>
            <span>Dokument hochladen</span>
          </button>
        </div>

        <div class="border border-gray-200 rounded overflow-hidden">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th class="px-6 py-4">Name</th>
                <th class="px-6 py-4">Typ</th>
                <th class="px-6 py-4">Datum</th>
                <th class="px-6 py-4">Größe</th>
                <th class="px-6 py-4 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (doc of fachDocs; track doc.name) {
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 flex items-center gap-3 font-medium text-gray-900">
                    <lucide-icon [img]="FileTextIcon" [size]="18" class="text-gray-400"></lucide-icon>
                    {{ doc.name }}
                  </td>
                  <td class="px-6 py-4 text-gray-500">{{ doc.type }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ doc.date }}</td>
                  <td class="px-6 py-4 text-gray-500">{{ doc.size }}</td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button class="p-1.5 text-gray-500 hover:text-[#004e82] hover:bg-blue-50 rounded transition-colors" title="Download">
                        <lucide-icon [img]="DownloadIcon" [size]="16"></lucide-icon>
                      </button>
                      <button class="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Löschen">
                        <lucide-icon [img]="Trash2Icon" [size]="16"></lucide-icon>
                      </button>
                    </div>
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
export class DokumenteComponent {
  readonly FileTextIcon = FileText;
  readonly DownloadIcon = Download;
  readonly Trash2Icon = Trash2;
  readonly PlusIcon = Plus;

  berichteDocs = [
    { name: 'Risikobewertung_EG_1234_2025.pdf', type: 'PDF', zyklus: '2025–2027', date: '15.03.2025', size: '1.8 MB' },
    { name: 'Risikobewertung_EG_1234_2022.pdf', type: 'PDF', zyklus: '2022–2024', date: '20.06.2022', size: '2.1 MB' },
  ];

  fachDocs = [
    { name: 'Hydrogeologisches_Gutachten_EG_1234.pdf', type: 'PDF', date: '10.01.2024', size: '4.5 MB' },
    { name: 'Landnutzungsanalyse_ATKIS_2023.xlsx', type: 'Excel', date: '28.11.2023', size: '320 KB' },
    { name: 'Foto_Entnahmestelle_GW4711.jpg', type: 'Image', date: '05.05.2023', size: '3.2 MB' },
  ];
}

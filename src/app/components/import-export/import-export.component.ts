import { Component } from '@angular/core';
import { LucideAngularModule, Upload, Download, FileSpreadsheet, Database, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-import-export',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="space-y-6 max-w-6xl mx-auto">

      <!-- Import -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 class="text-xl font-medium text-gray-800 mb-6">Import</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- RMM aus GWDB -->
          <div class="border border-gray-200 rounded p-5 hover:border-gray-300 transition-colors">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#004e82] shrink-0">
                <lucide-icon [img]="DatabaseIcon" [size]="20"></lucide-icon>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 mb-1">RMM aus GWDB importieren</h3>
                <p class="text-sm text-gray-500 mb-4">Risikomanagementmaßnahmen aus der Grundwasserdatenbank übernehmen.</p>
                <button class="flex items-center gap-2 bg-[#004e82] text-white px-4 py-2 rounded text-sm hover:bg-[#003d66] transition-colors">
                  <lucide-icon [img]="UploadIcon" [size]="14"></lucide-icon>
                  Import starten
                </button>
              </div>
            </div>
          </div>

          <!-- Geometrien -->
          <div class="border border-gray-200 rounded p-5 hover:border-gray-300 transition-colors">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-700 shrink-0">
                <lucide-icon [img]="MapPinIcon" [size]="20"></lucide-icon>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 mb-1">Geometrien importieren</h3>
                <p class="text-sm text-gray-500 mb-4">Shapefile (.shp) oder GeoPackage (.gpkg) hochladen.</p>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <lucide-icon [img]="UploadIcon" [size]="24" class="text-gray-400 mx-auto mb-2"></lucide-icon>
                  <p class="text-sm text-gray-500">Datei hierher ziehen oder <span class="text-[#004e82] font-medium">auswählen</span></p>
                  <p class="text-xs text-gray-400 mt-1">.shp, .gpkg (max. 50 MB)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Export -->
      <section class="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 class="text-xl font-medium text-gray-800 mb-6">Export</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Einzugsgebiete -->
          <div class="border border-gray-200 rounded p-5">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 shrink-0">
                <lucide-icon [img]="FileSpreadsheetIcon" [size]="20"></lucide-icon>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 mb-1">Einzugsgebiete (Stammdaten)</h3>
                <p class="text-sm text-gray-500 mb-4">Alle Einzugsgebiete mit Stammdaten exportieren.</p>
                <div class="flex gap-2">
                  <button class="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <lucide-icon [img]="DownloadIcon" [size]="14"></lucide-icon>
                    CSV
                  </button>
                  <button class="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <lucide-icon [img]="DownloadIcon" [size]="14"></lucide-icon>
                    XLSX
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Risikomanagementmaßnahmen -->
          <div class="border border-gray-200 rounded p-5">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 shrink-0">
                <lucide-icon [img]="FileSpreadsheetIcon" [size]="20"></lucide-icon>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 mb-1">Risikomanagementmaßnahmen</h3>
                <p class="text-sm text-gray-500 mb-4">Alle RMM mit Status und Priorisierung exportieren.</p>
                <div class="flex gap-2">
                  <button class="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <lucide-icon [img]="DownloadIcon" [size]="14"></lucide-icon>
                    CSV
                  </button>
                  <button class="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <lucide-icon [img]="DownloadIcon" [size]="14"></lucide-icon>
                    XLSX
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class ImportExportComponent {
  readonly UploadIcon = Upload;
  readonly DownloadIcon = Download;
  readonly FileSpreadsheetIcon = FileSpreadsheet;
  readonly DatabaseIcon = Database;
  readonly MapPinIcon = MapPin;
}

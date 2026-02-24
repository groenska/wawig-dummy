import { Component, signal, computed } from '@angular/core';
import {
  LucideAngularModule,
  Map as MapIcon,
  Plus,
  MousePointer2,
  Upload,
  Trash2,
  Undo2,
} from 'lucide-angular';

interface SvgVertex {
  id: number;
  px: number;
  py: number;
}

const SCALE = 125;
const UTM_X0 = 460000;
const UTM_Y0 = 5420000;

@Component({
  selector: 'app-gis-tool',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="h-full flex flex-col bg-white rounded shadow-sm border border-gray-200 overflow-hidden" style="min-height: 500px">
      <!-- Toolbar -->
      <div class="bg-gray-50 p-3 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-3 flex-wrap">
          <div class="flex items-center gap-2 text-sm font-medium text-gray-700">
            <lucide-icon [img]="MapIconRef" [size]="16"></lucide-icon>
            <span>Geometrie Einzugsgebiet</span>
          </div>
          <div class="h-4 w-px bg-gray-300"></div>

          <button
            (click)="toggleCapture()"
            class="text-sm flex items-center gap-1 px-2 py-1 rounded transition-colors"
            [class.bg-blue-100]="isCapturing()"
            [class.text-[#004e82]]="isCapturing()"
            [class.font-semibold]="isCapturing()"
            [class.text-gray-600]="!isCapturing()"
            [class.hover:text-[#004e82]]="!isCapturing()"
            [class.hover:bg-gray-100]="!isCapturing()">
            @if (isCapturing()) {
              <lucide-icon [img]="MousePointer2Icon" [size]="14"></lucide-icon>
            } @else {
              <lucide-icon [img]="PlusIcon" [size]="14"></lucide-icon>
            }
            <span>{{ isCapturing() ? 'Erfassen beenden' : 'Polygon digitalisieren' }}</span>
          </button>

          @if (isCapturing() && vertices().length > 0) {
            <button
              (click)="undoLastVertex()"
              class="text-sm flex items-center gap-1 px-2 py-1 rounded text-amber-700 hover:text-amber-800 hover:bg-amber-50 transition-colors"
              title="Letzten Punkt entfernen">
              <lucide-icon [img]="Undo2Icon" [size]="14"></lucide-icon>
              <span>Rückgängig</span>
            </button>
          }

          @if (vertices().length > 0) {
            <button
              (click)="clearPolygon()"
              class="text-sm flex items-center gap-1 px-2 py-1 rounded text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors">
              <lucide-icon [img]="Trash2Icon" [size]="14"></lucide-icon>
              <span>Polygon löschen</span>
            </button>
          }

          <button class="text-sm flex items-center gap-1 px-2 py-1 rounded text-gray-600 hover:text-[#004e82] hover:bg-gray-100 transition-colors">
            <lucide-icon [img]="UploadIcon" [size]="14"></lucide-icon>
            <span>SHP / GPKG laden</span>
          </button>
        </div>

        <div class="flex items-center gap-4 text-xs text-gray-500">
          @if (areaHa() !== null) {
            <span class="font-semibold text-sm text-gray-800 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
              Fläche: {{ areaHa()!.toFixed(1) }} ha
            </span>
          }
          <label class="font-medium flex items-center gap-1.5">
            Bearbeitungsstand:
            <select
              [value]="bearbeitungsstand()"
              (change)="bearbeitungsstand.set($any($event.target).value)"
              class="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:border-blue-500 focus:ring-0 outline-none"
              [class.text-yellow-700]="bearbeitungsstand() === '1'"
              [class.text-green-700]="bearbeitungsstand() === '2'">
              <option value="1">Entwurf</option>
              <option value="2">Plausibilisiert / abgestimmt</option>
            </select>
          </label>
          <span class="font-mono">EPSG:25832</span>
        </div>
      </div>

      <!-- Map Area -->
      <div class="flex-1 relative overflow-hidden bg-[#eef3e5]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 500"
          class="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          [class.cursor-crosshair]="isCapturing()"
          [class.cursor-default]="!isCapturing()"
          (click)="handleSvgClick($event)">

          <!-- Hintergrund -->
          <rect width="800" height="500" fill="#eef3e5" />

          <!-- Koordinatenraster -->
          @for (i of gridLines; track i) {
            <line [attr.x1]="i" y1="0" [attr.x2]="i" y2="500" stroke="#d4ddc8" stroke-width="0.5" />
            <line x1="0" [attr.y1]="i > 500 ? 0 : i" x2="800" [attr.y2]="i > 500 ? 0 : i" stroke="#d4ddc8" stroke-width="0.5" />
          }
          @for (j of gridLinesY; track j) {
            <line x1="0" [attr.y1]="j" x2="800" [attr.y2]="j" stroke="#d4ddc8" stroke-width="0.5" />
          }

          <!-- Rhein -->
          <path d="M 30 0 Q 50 80 40 160 Q 25 250 60 340 Q 80 400 70 500" fill="none" stroke="#8cb4d4" stroke-width="4" opacity="0.7" />
          <text x="18" y="195" font-size="9" fill="#5a8aad" transform="rotate(-10,18,195)">Rhein</text>

          <!-- Neckar -->
          <path d="M 280 0 Q 310 60 350 120 Q 400 180 420 230 Q 460 300 520 340 Q 560 360 600 350" fill="none" stroke="#8cb4d4" stroke-width="2.5" opacity="0.6" />
          <text x="400" y="175" font-size="9" fill="#5a8aad" transform="rotate(25,400,175)">Neckar</text>

          <!-- Donau -->
          <path d="M 250 400 Q 350 380 450 390 Q 550 405 650 395 Q 720 388 800 400" fill="none" stroke="#8cb4d4" stroke-width="3" opacity="0.6" />
          <text x="500" y="380" font-size="9" fill="#5a8aad">Donau</text>

          <!-- Bodensee -->
          <ellipse cx="420" cy="480" rx="80" ry="25" fill="#b6d4e8" opacity="0.6" />
          <text x="395" y="485" font-size="9" fill="#5a8aad">Bodensee</text>

          <!-- Schwarzwald (Höhen-Schraffur) -->
          <rect x="80" y="180" width="120" height="180" rx="30" fill="#c8d8b0" opacity="0.4" />
          <text x="105" y="278" font-size="9" fill="#6b8a50" font-style="italic">Schwarzwald</text>

          <!-- Schwäbische Alb -->
          <rect x="300" y="300" width="180" height="50" rx="20" fill="#c8d8b0" opacity="0.3" />
          <text x="335" y="330" font-size="9" fill="#6b8a50" font-style="italic">Schwäbische Alb</text>

          <!-- Städte -->
          <circle cx="390" cy="130" r="4" fill="#888" opacity="0.6" />
          <text x="400" y="134" font-size="10" fill="#555" font-weight="500">Stuttgart</text>

          <circle cx="160" cy="230" r="3" fill="#888" opacity="0.6" />
          <text x="170" y="234" font-size="9" fill="#666">Freiburg</text>

          <circle cx="100" cy="90" r="3" fill="#888" opacity="0.6" />
          <text x="110" y="94" font-size="9" fill="#666">Karlsruhe</text>

          <circle cx="610" cy="230" r="3" fill="#888" opacity="0.6" />
          <text x="620" y="234" font-size="9" fill="#666">Ulm</text>

          <circle cx="320" cy="200" r="3" fill="#888" opacity="0.6" />
          <text x="330" y="204" font-size="9" fill="#666">Tübingen</text>

          <circle cx="490" cy="160" r="3" fill="#888" opacity="0.6" />
          <text x="500" y="164" font-size="9" fill="#666">Göppingen</text>

          <circle cx="200" cy="140" r="3" fill="#888" opacity="0.6" />
          <text x="210" y="144" font-size="9" fill="#666">Pforzheim</text>

          <circle cx="300" cy="90" r="3" fill="#888" opacity="0.6" />
          <text x="310" y="94" font-size="9" fill="#666">Heilbronn</text>

          <!-- Polygon -->
          @if (polygonPoints().length >= 2) {
            <polygon
              [attr.points]="polygonPoints()"
              fill="#004e82"
              fill-opacity="0.15"
              stroke="#004e82"
              stroke-width="2"
              [attr.stroke-dasharray]="isCapturing() ? '6,4' : 'none'" />
          }

          <!-- Stützpunkte -->
          @for (v of vertices(); track v.id) {
            <circle
              [attr.cx]="v.px"
              [attr.cy]="v.py"
              r="5"
              fill="#004e82"
              stroke="#fff"
              stroke-width="1.5" />
          }

          <!-- Kompassrose -->
          <g transform="translate(760, 40)">
            <circle r="16" fill="white" opacity="0.85" stroke="#aaa" stroke-width="0.5" />
            <polygon points="0,-13 -4,-2 4,-2" fill="#c0392b" />
            <polygon points="0,13 -4,2 4,2" fill="#aaa" />
            <text y="-16" text-anchor="middle" font-size="8" fill="#c0392b" font-weight="bold">N</text>
          </g>

          <!-- Maßstabsbalken -->
          <g transform="translate(30, 475)">
            <rect x="0" y="0" width="80" height="5" fill="white" stroke="#888" stroke-width="0.5" />
            <rect x="0" y="0" width="40" height="5" fill="#333" />
            <text x="0" y="-3" font-size="7" fill="#555">0</text>
            <text x="38" y="-3" font-size="7" fill="#555" text-anchor="middle">5 km</text>
            <text x="78" y="-3" font-size="7" fill="#555" text-anchor="end">10 km</text>
          </g>
        </svg>

        <!-- Hinweis-Banner -->
        @if (isCapturing()) {
          <div class="absolute top-4 left-1/2 -translate-x-1/2 bg-[#004e82] text-white px-4 py-2 rounded-full shadow-lg text-sm z-10 pointer-events-none">
            Klicken Sie auf die Karte, um Polygonpunkte zu setzen
          </div>
        }

        <!-- Koordinatenpanel -->
        @if (vertices().length > 0) {
          <div class="absolute top-4 left-4 bg-white/95 backdrop-blur p-3 rounded shadow-lg border border-gray-200 z-10 w-72 max-h-64 overflow-hidden flex flex-col">
            <h4 class="font-bold text-sm text-gray-900 mb-2 border-b pb-1 flex justify-between items-center shrink-0">
              <span>Polygonpunkte</span>
              <span class="text-xs bg-gray-200 px-1.5 rounded-full text-gray-600">{{ vertices().length }}</span>
            </h4>
            <div class="overflow-y-auto space-y-1 pr-1 flex-1">
              @for (v of vertices(); track v.id) {
                <div class="text-xs text-gray-600 flex justify-between items-center hover:bg-gray-50 p-1 rounded transition-colors">
                  <span class="font-medium">Punkt {{ $index + 1 }}</span>
                  <span class="font-mono text-gray-400 text-[10px]">{{ toUtmX(v.px) }} / {{ toUtmY(v.py) }}</span>
                </div>
              }
            </div>
          </div>
        }

        <!-- Placeholder wenn keine Geometrie -->
        @if (vertices().length === 0 && !isCapturing()) {
          <div class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div class="bg-white/90 backdrop-blur p-6 rounded-lg shadow-lg border border-gray-200 text-center max-w-sm pointer-events-auto">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <lucide-icon [img]="MapIconRef" [size]="24"></lucide-icon>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Keine Geometrie vorhanden</h3>
              <p class="text-gray-500 text-sm mb-4">Klicken Sie auf "Polygon digitalisieren", um ein Einzugsgebiet auf der Karte abzugrenzen.</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
  `]
})
export class GisToolComponent {
  readonly MapIconRef = MapIcon;
  readonly PlusIcon = Plus;
  readonly MousePointer2Icon = MousePointer2;
  readonly UploadIcon = Upload;
  readonly Trash2Icon = Trash2;
  readonly Undo2Icon = Undo2;

  vertices = signal<SvgVertex[]>([]);
  isCapturing = signal(false);
  bearbeitungsstand = signal('1');

  gridLines = Array.from({ length: 11 }, (_, i) => i * 80);
  gridLinesY = Array.from({ length: 7 }, (_, i) => i * 80);

  polygonPoints = computed(() => {
    const verts = this.vertices();
    if (verts.length < 2) return '';
    return verts.map(v => `${v.px},${v.py}`).join(' ');
  });

  areaHa = computed(() => {
    const verts = this.vertices();
    if (verts.length < 3) return null;
    return this.calculateAreaHa(verts);
  });

  handleSvgClick(event: MouseEvent) {
    if (!this.isCapturing()) return;

    const svg = (event.target as Element).closest('svg');
    if (!svg) return;

    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());

    this.vertices.update(v => [
      ...v,
      { id: Date.now(), px: Math.round(svgPt.x * 10) / 10, py: Math.round(svgPt.y * 10) / 10 },
    ]);
  }

  toggleCapture() {
    this.isCapturing.update(v => !v);
  }

  undoLastVertex() {
    this.vertices.update(v => v.slice(0, -1));
  }

  clearPolygon() {
    this.vertices.set([]);
    this.isCapturing.set(false);
  }

  toUtmX(px: number): string {
    return (UTM_X0 + px * SCALE).toFixed(0);
  }

  toUtmY(py: number): string {
    return (UTM_Y0 - py * SCALE).toFixed(0);
  }

  private calculateAreaHa(verts: SvgVertex[]): number {
    let area = 0;
    for (let i = 0; i < verts.length; i++) {
      const j = (i + 1) % verts.length;
      area += verts[i].px * verts[j].py - verts[j].px * verts[i].py;
    }
    const pixelArea = Math.abs(area / 2);
    return (pixelArea * SCALE * SCALE) / 10000;
  }
}

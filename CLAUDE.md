# CLAUDE.md – WAWIG Projektkontext

Diese Datei wird von Claude Code automatisch geladen und enthält alle wichtigen Informationen zum Projekt.

---

## Projektübersicht

**Name**: WAWIG – WIBAS (Madok Hymo Click Dummy Angular)
**Zweck**: Verwaltungssystem für Trinkwasserschutz-Einzugsgebiete in Baden-Württemberg.
Sachbearbeiter können Einzugsgebietsdaten pflegen, Risikomanagement-Maßnahmen verwalten, Geometrien digitalisieren und Dokumente verwalten.

**Status**: Click-Dummy / Prototyp – keine Backend-Anbindung, alle Daten sind hardcoded/Mock, keine Persistenz.

**Sprache**: Deutsch (UI und Domänenlogik vollständig auf Deutsch)
**Primäre Nutzerrolle**: Sachbearbeiter Trinkwasserschutz (z.B. Landratsamt Esslingen)

---

## Tech-Stack

| Bereich | Technologie |
|---------|------------|
| Framework | Angular 21 (Standalone Components, kein NgModule) |
| Sprache | TypeScript 5.9 (strict mode) |
| Styling | Tailwind CSS 4.2 (utility-first, keine component styles) |
| Icons | Lucide Angular 0.575 |
| State Management | Angular Signals (`signal()`, `computed()`) |
| Reaktivität | RxJS 7.8 (minimal, kaum genutzt) |
| Build | Angular CLI 21, `npm start` → http://localhost:4200 |

---

## Architektur

- **Navigation**: Tab-basiert via `activeTab = signal<TabId>(...)` in `src/app/app.ts` – **kein Angular Router**
- **Template-Syntax**: Neue Syntax `@if`, `@switch`, `@case`, `@for` (Angular 17+)
- **Standalone Components**: Alle Komponenten nutzen `standalone: true`
- **Keine Services**: Daten leben direkt in den Komponenten als Signals
- **Keine externe State-Library**: Nur Angular Signals
- **Primärfarbe**: `#004e82` (Dunkelblau)

---

## Komponenten-Übersicht

### Feature Components (`src/app/components/`)

| Komponente | Tab-ID | Beschreibung |
|-----------|--------|--------------|
| `header` | – | Topbar mit Logo (WAWIG v1.0.0), Menü-Toggle, User-Icon |
| `sidebar` | – | Kollabierbare linke Navigation, 7 Menüpunkte |
| `stammdaten` | `stammdaten` | Stammdaten-Formular: ID_EG, WSG-Nummern, Betreiber, WRRL-IDs |
| `beschreibung` | `beschreibung` | Hydrogeologie, Landnutzung nach Sektoren (Summe muss 100% ergeben) |
| `rmm` | `rmm` | Risikomanagement-Maßnahmen: filterable Tabelle, erweiterbare Zeilen |
| `suche` | `suche` | Suchmaske + Ergebnistabelle mit Export (CSV/XLSX) |
| `import-export` | `import-export` | Import aus GWDB, Export Stammdaten/RMM, Geometrie-Upload |
| `gis-tool` | `gis` | SVG-basierter Karteneditor, Polygon-Digitalisierung, Fläche in ha |
| `dokumente` | `dokumente` | TrinkwEGV-Berichte und techn. Unterlagen: Up-/Download |
| `user-profile` | `user-profile` | Benutzerinfos (Max Mustermann, wawig-user-1) |

### Shared Components (`src/app/shared/`)

| Komponente | Beschreibung |
|-----------|--------------|
| `floating-label-input` | Text-/Zahlen-Input mit schwebender Beschriftung |
| `floating-label-select` | Select-Dropdown mit schwebender Beschriftung |
| `floating-label-textarea` | Mehrzeiliges Textfeld mit optionaler Beschriftung |
| `custom-checkbox` | Gestylte Checkbox (Farbe #004e82) |
| `custom-radio` | Gestylter Radio-Button |
| `date-input` | Datepicker mit deutschem Kalender-Popup, Format DD.MM.YYYY |

### Typen (`src/app/types.ts`)

- `EinzugsgebietData` – Stammdaten-Interface
- `BeschreibungData` – Hydrogeologie-Interface
- `RmmEntry` – Risikomanagement-Eintrag
- `TabId` – Union-Type aller Tab-IDs
- `SidebarItem` – Sidebar-Menüeintrag

---

## Arbeitshinweise für Claude

1. **Immer Standalone Components** – kein NgModule anlegen
2. **Signals statt Services** – Zustand in `signal()` / `computed()` halten
3. **Neue Template-Syntax** – `@if`, `@for`, `@switch` verwenden, kein `*ngIf`/`*ngFor`
4. **Tailwind für Styles** – keine separaten CSS-Dateien pro Komponente
5. **Lucide Icons** – für neue Icons immer aus `lucide-angular` importieren
6. **Deutsch** – alle Labels, Kommentare und Fehlermeldungen auf Deutsch
7. **Kein Router** – neue "Seiten" als Tab hinzufügen (`TabId` in `types.ts` erweitern)
8. **Mock-Daten** – Prototyp, keine Backend-Calls nötig; Daten direkt in der Komponente
9. **Shared Components nutzen** – für Formulare immer die bestehenden Shared-Komponenten verwenden
10. **Strict TypeScript** – keine `any`-Typen, explizite Interfaces für neue Datenstrukturen

---

## Projektstruktur

```
src/
├── app/
│   ├── app.ts                  # Root-Komponente, Tab-Routing, Layout
│   ├── app.config.ts           # Angular-Konfiguration
│   ├── types.ts                # TypeScript-Interfaces und -Types
│   ├── components/             # Feature-Komponenten (je ein Verzeichnis)
│   └── shared/                 # Wiederverwendbare Form-Komponenten
├── index.html
├── main.ts
└── styles.css                  # Globale Tailwind-Imports + Scrollbar-Styles
```

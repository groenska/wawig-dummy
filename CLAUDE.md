# CLAUDE.md – WAWIG Projektkontext

Diese Datei wird von Claude Code automatisch geladen und enthält alle wichtigen Informationen zum Projekt.

---

## Projektübersicht

**Name**: WAWIG – WIBAS (Madok Hymo Click Dummy Angular)
**Version**: v1.2.0
**Zweck**: Verwaltungssystem für Trinkwasserschutz-Einzugsgebiete in Baden-Württemberg.
Sachbearbeiter können Einzugsgebietsdaten pflegen, Risikomanagement-Maßnahmen verwalten, Geometrien digitalisieren und Dokumente verwalten.

**Status**: Click-Dummy / Prototyp – keine Backend-Anbindung, alle Daten sind hardcoded/Mock, keine Persistenz.

**Sprache**: Deutsch (UI und Domänenlogik vollständig auf Deutsch)
**Primäre Nutzerrolle**: Sachbearbeiter Trinkwasserschutz (z.B. Landratsamt Esslingen)
**Deployment**: GitHub Pages → https://groenska.github.io/wawig-dummy/

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
- **EG-Modus**: `selectedEg` und `isNewEg` Signals in `app.ts` steuern, ob Sidebar Hauptmenü oder EG-Untermenü zeigt
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
| `header` | – | Topbar mit Logo (WAWIG v1.2.0), Menü-Toggle, User-Icon |
| `sidebar` | – | Kollabierbare linke Navigation; Hauptmenü oder EG-Untermenü je nach Kontext |
| `stammdaten` | `stammdaten` | Stammdaten-Formular: ID_EG, WSG-Nummern, Betreiber, WRRL-IDs |
| `beschreibung` | `beschreibung` | Hydrogeologie; Landnutzung via ALKIS-Abruf als Balkendiagramm (10 Sektoren) |
| `rmm` | `rmm` | Risikomanagement-Maßnahmen: filterbare Tabelle, erweiterbare Zeilen, XLSX-Import |
| `suche` | `suche` | Suchmaske (allg. Suche + Bearbeitungsstand-Filter) + Ergebnistabelle mit Export |
| `gis-tool` | `gis` | SVG-basierter Karteneditor, Polygon-Digitalisierung, Fläche in ha |
| `dokumente` | `dokumente` | TrinkwEGV-Berichte und techn. Unterlagen: Up-/Download |
| `user-profile` | `user-profile` | Benutzerinfos (wawig-user-1) |

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
- `SucheResult` – Suchergebnis-Interface (idEg, name, dienststelle, gewaesser, betreiber, bearbeitungsstand)
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

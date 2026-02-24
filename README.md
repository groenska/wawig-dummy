# WAWIG – Click-Dummy

Interaktiver Prototyp des **WAWIG-Verwaltungssystems** (WIBAS Madok Hymo) für die Verwaltung von Trinkwasserschutz-Einzugsgebieten in Baden-Württemberg.

> **Hinweis:** Dies ist ein Click-Dummy ohne Backend-Anbindung. Alle angezeigten Daten sind Beispieldaten und werden nicht gespeichert.

---

## Voraussetzungen

- **Node.js** ab Version 22 – [Download](https://nodejs.org/)
- **npm** (wird mit Node.js mitgeliefert)

Prüfe deine Installation:

```bash
node --version    # z.B. v22.x.x
npm --version     # z.B. 11.x.x
```

## Installation

1. Repository klonen:

```bash
git clone https://git.chrissy.synology.me/Chris/Wawig-ClickDummy.git
cd Wawig-ClickDummy
```

2. Abhängigkeiten installieren:

```bash
npm install
```

## Starten

```bash
npm start
```

Anschließend im Browser öffnen: **http://localhost:4200/**

Die Anwendung aktualisiert sich automatisch bei Änderungen am Quellcode.

## Funktionsumfang

| Bereich | Beschreibung |
|---------|-------------|
| **Stammdaten** | Einzugsgebiets-ID, WSG-Nummern, Betreiber, WRRL-Kennungen |
| **Beschreibung** | Hydrogeologie, Landnutzung nach Sektoren |
| **Risikomanagement** | Filterbare Maßnahmentabelle mit Details pro Eintrag |
| **Suche** | Suchmaske mit Ergebnistabelle und Export (CSV/XLSX) |
| **GIS-Tool** | Karteneditor mit Polygon-Digitalisierung und Flächenberechnung |
| **Dokumente** | TrinkwEGV-Berichte und technische Unterlagen verwalten |
| **Import/Export** | GWDB-Import, Stammdaten-/RMM-Export, Geometrie-Upload |

## Bedienung

- Über die **linke Seitenleiste** zwischen den Funktionsbereichen wechseln
- Die Seitenleiste lässt sich über das Menü-Icon einklappen
- Alle Formulare und Tabellen sind mit Beispieldaten befüllt
- Änderungen werden **nicht** gespeichert (Prototyp)

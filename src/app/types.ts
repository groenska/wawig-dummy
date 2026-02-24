export interface EinzugsgebietData {
  idEg: string;
  wsgNrAmt: string;
  nameEg: string;
  datenfuehrendeDienststelle: string;
  genutzesGewaesser: string;
  betreiber: string;
  betreiberId: string;
  gesamtflaeche: string;
  entnahmemenge: string;
  wrrlIdWk: string;
  idWvgTrinkwrl: string;
  verknuepfungRohwasser: string;
  zuordnungWrNr: string;
}

export interface BeschreibungData {
  gwLeiter: string;
  schutzpotential: string;
  gwNeu: string;
  hydrochemie: string;
  geohydraulik: string;
  hydrogeologie: string;
  naturraum: string;
  zufluesse: string;
  abflussprozesse: string;
  anteilUfAgw: string;
  sektorIndustrie: string;
  sektorSiedlung: string;
  sektorAbwasser: string;
  sektorAbfall: string;
  sektorAltlasten: string;
  sektorUntergrund: string;
  sektorLandwirtschaft: string;
  sektorForstwirtschaft: string;
  sektorSonstige: string;
  sektorNaturraeumlich: string;
}

export interface RmmEntry {
  id: number;
  sektor: string;
  massnahmenbezeichnung: string;
  massnahmenbezeichnungFein: string;
  kurzbeschreibung: string;
  typRmm: string;
  statusRmm: string;
  priorisierung: string;
  berichtszyklus: string;
  risikobewertungVom: string;
  bearbeitungsstandRisiko: string;
  kommentar: string;
}

export type TabId = 'stammdaten' | 'beschreibung' | 'rmm' | 'suche' | 'import-export' | 'gis' | 'dokumente' | 'user-profile';

export type SidebarItem = {
  id: TabId;
  label: string;
};

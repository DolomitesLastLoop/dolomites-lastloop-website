// Wildcard-Startplätze (Sport OK Toblach vergibt eine begrenzte Zahl frei),
// eingelöst über den Athleten-Freiplatzcode ("Athleten-Freiplatz 2027" in
// Stripe). Kein DB-Feld speichert den verwendeten Rabattcode pro Anmeldung
// (siehe CLAUDE.md) — welche Registrierung als Wildcard auf der Startliste
// erscheint, ist deshalb eine von Simon manuell bestätigte, kuratierte Liste,
// keine automatische Ableitung aus Stripe/DB. Nicht jeder Code-Nutzer landet
// hier (bewusste Entscheidung, z. B. interne Testkäufe).
//
// nameOverride: nur setzen, wenn der offizielle Name (Sport OK Toblach) vom
// Anmeldedatensatz abweicht.
export const WILDCARD_PARTICIPANTS: {
  id: string;
  nameOverride?: string;
}[] = [
  { id: "1be74bb7-bf51-4dc3-a4f4-10eeca5c54d7" }, // Raphael Stanic
  { id: "094d9834-0e21-4fe8-a55d-00b8d5c5ce37" }, // Marco Matteazzi
  { id: "2bd391dc-3a44-4a27-b9f1-c2eee8d28c47" }, // Ted Pullin
  { id: "da0604e9-4a32-45fb-830e-06fe0241f574" }, // Albert Urbanovich
  { id: "529edb0b-a688-4192-9536-c2c7ce8dda26" }, // Monika Rabanser
  { id: "5e49e4c7-5fea-4b28-b047-b43f581cf097", nameOverride: "Andrea Maria Bergner" },
  { id: "2f3c03f3-20fb-4f43-86ba-e91f352f2ea3" }, // Celia Parker
  { id: "5db9de41-3b06-44ec-8e0d-1d59f89c0bc8" }, // Luca Clara
  { id: "fea6df21-c537-4776-afce-b3524fffe535" }, // Alexander Rabensteiner
  { id: "cab576f0-d8e8-4b08-bffd-92ccf1fe1d69" }, // Martin Griesser
  { id: "8251f560-ad38-42b1-82de-2de84a71dbac" }, // Leah Broger
];

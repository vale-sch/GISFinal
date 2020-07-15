Server Instruktionen: 

Um auf die Seiten zu gelangen: 

ICE Shop: https://vale-sch.github.io/GISFinal/website/index.html

Administrator Seite: https://vale-sch.github.io/GISFinal/website/administrator.html




Aktuell stehender Code läuft über den Server


Um Lokal auszuführen: 
Müssen in den Dateien administrator.ts, Basket.ts, administrator.html und warenkorb.html die url in: http:localhost:8100 geändert werden. 

Die lokale Datenbank liegt mit im Ordner und wird einmal über:

mongod --port 27020 --dbpath "weg zur Datenbank", gestartet 

Und über den lokalen Server: 

"Pfad zum js Ordner " node server.js local 

gestartet


Datenbankstruktur
{
_id:"5f0e2f52e0e9ba001742ef43",
Vorname:"Valentin",
Nachname:"Schmidberger",
Email:"valentinschmidberger@try.de",
Passwort:"jojojojojpaswort",
Bestellung: ["Waffel", "Eis", "Eis", "Eis", "Stecksachen", "Soßen", "Streusel"],
Gesamtpreis:"11.4"
    },


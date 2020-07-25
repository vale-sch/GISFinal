Server Instruktionen: 

Um auf die Seiten zu gelangen: 

ICE Shop: https://vale-sch.github.io/GISFinal/website/index.html




Aktuell stehender Code läuft über den Server


Um Lokal auszuführen: 
Müssen in den Dateien administrator.ts, Basket.ts, administrator.html und warenkorb.html die url in: http:localhost:8100 geändert werden. 

Die lokale Datenbank liegt mit im Ordner und wird einmal über:

mongod --port 27020 --dbpath "weg zur Datenbank", gestartet 

Und über den lokalen Server: 

"Pfad zum js Ordner " node server.js local 

gestartet

JSON-Datei-Struktur:

eisArtikel:[{
        "kategorie": string,
        "image": "string,
        "beschreibung": string,
        "preis": number,
        "stück": number,
        "name": string
    }
]
Datenbankstruktur:
Orders
|- Buyers
   |-Administrator.html & Warenkorb.html
          |- _iD: string,
          |- Vorname: string,
          |- Nachname: string,
          |- Email: string,
          |- Passwort: string,
          |- Waffel: string,
          |- Eis: string[],
          |- Topinngs: string[],
          |- Gesamtpreis: string;



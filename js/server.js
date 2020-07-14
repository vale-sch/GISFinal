"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eisdiele = void 0;
const Http = require("http");
const url = require("url");
const Mongo = require("mongodb");
var Eisdiele;
(function (Eisdiele) {
    let server = Http.createServer();
    //let receivedData: Data[];
    let port = process.env.PORT;
    let datas;
    let databaseUrl = ["mongodb+srv://SchmidbergerValentin:tixzo1-Qofqir-bazruf@schmidbergervalentin.kklg0.mongodb.net/Database?retryWrites=true&w=majority", "mongodb://localhost:27020"];
    //mongodb+srv://SchmidbergerValentin:tixzo1-Qofqir-bazruf@schmidbergervalentin.kklg0.mongodb.net/Database?retryWrites=true&w=majority
    //let databaseUrl: string = ;
    if (!port)
        port = 8100;
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        port = Number(process.env.PORT);
        console.log("Starting server");
    }
    async function connectToDatabase(_url) {
        let myArgs = process.argv.slice(2);
        let switchURL;
        switch (myArgs[0]) {
            case "local":
                switchURL = databaseUrl[1];
                console.log("switched to local database");
                break;
            case "remote":
                switchURL = databaseUrl[0];
                console.log("switched to remote server");
                break;
            default:
                switchURL = databaseUrl[1];
                console.log("Sorry, that is not something I know how to do, local will beeing used");
        }
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(switchURL, options);
        await mongoClient.connect();
        datas = mongoClient.db("Orders").collection("Buyers");
        console.log("Database connection", datas != undefined);
    }
    //eine Port-Nummer wird vergeben
    //Wenn port nicht erreichbar ist, soll der Port den Wert 8100 annehmen --> localhost:8100
    //Server und zugehörige listener werden erstellt/geaddet
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        //Diesen Code innerhalb von einem aktiven Server testen:
        //im Header --> ServerResponse daten
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let adresse = _request.url;
        let _url = url.parse(adresse, true);
        let pathname = _url.pathname;
        //Adresse parsen (umwandeln):
        if (_request.url) {
            if (pathname == "/receive") {
                await receiveJSONObj(_response, await receiveDatas(_response));
                console.log("received!");
                _response.end();
            }
            if (pathname == "/storeData") {
                storeDatas(_url.query);
                _response.end();
            }
            if (pathname == "/deleteOne") {
                console.log("delteone");
                await receiveJSONObj(_response, await removeOne(_url.query));
                _response.end();
            }
        }
        console.log("Response successful");
    }
    async function storeDatas(_datas) {
        await datas.insertOne(_datas);
        console.log("Insert angekommen!");
    }
    async function receiveDatas(_response) {
        let cursur = datas.find();
        // tslint:disable-next-line: no-any
        let orders = await cursur.toArray();
        console.log(orders);
        return await orders;
    }
    // tslint:disable-next-line: no-any
    async function receiveJSONObj(_response, _result) {
        _response.setHeader("content-type", "application/json");
        console.log(JSON.stringify(await _result));
        _response.write(JSON.stringify(await _result));
    }
    async function removeOne(_query) {
        let id = _query["id"];
        let objID = new Mongo.ObjectId(id);
        console.log("remove", id);
        return await datas.deleteOne({ "_id": objID });
    }
    Eisdiele.removeOne = removeOne;
})(Eisdiele = exports.Eisdiele || (exports.Eisdiele = {}));
//# sourceMappingURL=server.js.map
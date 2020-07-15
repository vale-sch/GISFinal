import * as Http from "http";
import * as url from "url";
import * as Mongo from "mongodb";
import { ParsedUrlQuery } from "querystring";

export namespace Eisdiele {

  interface Data {

    // tslint:disable-next-line: no-any
    [type: string]: string | string[] | undefined;
  }

  export interface Orders {
    _id: string;
    Vorname: string;
    Nachname: string;
    Email: string;
    Passwort: string;
    Bestellung: string[];
    Gesamtpreis: string;
  }

  let server: Http.Server = Http.createServer();
  //let receivedData: Data[];
  let port: number | string | undefined = process.env.PORT;
  let datas: Mongo.Collection;
  let databaseUrl: string[] = ["mongodb+srv://SchmidbergerValentin:tixzo1-Qofqir-bazruf@schmidbergervalentin.kklg0.mongodb.net/Database?retryWrites=true&w=majority", "mongodb://localhost:27020"];
  //mongodb+srv://SchmidbergerValentin:tixzo1-Qofqir-bazruf@schmidbergervalentin.kklg0.mongodb.net/Database?retryWrites=true&w=majority
  //let databaseUrl: string = ;
  if (!port)
    port = 8100;
  server.addListener("request", handleRequest);
  server.addListener("listening", handleListen);
  server.listen(port);

  startServer(port);
  connectToDatabase(databaseUrl);

  function startServer(_port: number | string): void {
    port = Number(process.env.PORT);
    console.log("Starting server");

  }

  async function connectToDatabase(_url: string[]): Promise<void> {
    let myArgs: string[] = process.argv.slice(2);
    let switchURL: string;

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
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(switchURL, options);
    await mongoClient.connect();
    datas = mongoClient.db("Orders").collection("Buyers");
    console.log("Database connection", datas != undefined);
  }
  //eine Port-Nummer wird vergeben
  //Wenn port nicht erreichbar ist, soll der Port den Wert 8100 annehmen --> localhost:8100
  //Server und zugehörige listener werden erstellt/geaddet
  function handleListen(): void {
    console.log("Listening");
  }

  async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

    //Diesen Code innerhalb von einem aktiven Server testen:
    //im Header --> ServerResponse daten
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    let adresse: string = <string>_request.url;
    let _url: url.UrlWithParsedQuery = url.parse(adresse, true);
    let pathname: string = <string>_url.pathname;

    //Adresse parsen (umwandeln):
    if (_request.url) {
      if (pathname == "/receive") {
        await receiveJSONObj(_response, await receiveDatas(_response));
        console.log("Received all Orders!");
        _response.end();

      }
      if (pathname == "/storeData") {

        storeDatas(_url.query);
        console.log("Order stored!");
        _response.end();
      }
      if (pathname == "/deleteOne") {
        console.log("Deleted this one!");
        await receiveJSONObj(_response, await removeOne(_url.query));
        _response.end();
      }
    }
    console.log("Response of Data Server successful");

  }

  async function storeDatas(_datas: Data): Promise<void> {
    await datas.insertOne(_datas);

  }
  async function receiveDatas(_response: Http.ServerResponse): Promise<Eisdiele.Orders[]> {
    let cursur: Mongo.Cursor<Eisdiele.Orders> = datas.find();
    // tslint:disable-next-line: no-any
    let orders: any = await cursur.toArray();
    return await orders;

  }

  // tslint:disable-next-line: no-any
  async function receiveJSONObj(_response: Http.ServerResponse, _result: any): Promise<void> {
    _response.setHeader("content-type", "application/json");
    _response.write(JSON.stringify(await _result));
  }
  export async function removeOne(_query: ParsedUrlQuery): Promise<Mongo.DeleteWriteOpResultObject> {
    let id: string = <string>_query["id"];
    let objID: Mongo.ObjectId = new Mongo.ObjectId(id);
    console.log("removed ID: ", id);
    return await datas.deleteOne({ "_id": objID });
  }
}

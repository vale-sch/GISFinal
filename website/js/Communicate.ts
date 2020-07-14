 namespace Eisdiele {
    export let jsonObj: Eis[] = [];
    
    export interface Eis {
        kategorie: string;
        image: string;
        beschreibung: string;
        preis: number;
        stück: number;
        name: string;
    }
    export async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        jsonObj = await response.json();
        generateIce();
    }



}


namespace Eisdiele {

    export interface Orders {
        _id: string;
        Vorname: string;
        Nachname: string;
        Email: string;
        Passwort: string;
        Bestellung: string[];
        Gesamtpreis: string;
    }
    let getButton: HTMLButtonElement;
    let output: HTMLDivElement;
    let getDiv: HTMLDivElement;
    function init(): void {
        output = <HTMLDivElement>document.getElementById("orders");
        getDiv = <HTMLDivElement>document.getElementById("getButton");
        output.setAttribute("id", "output");
        getButton = document.createElement("button");
        getButton.setAttribute("id", "getButton");

        getDiv.appendChild(getButton).innerHTML = "Get Orders";
        getButton.addEventListener("click", onClickButtonReceive.bind(getButton));


    }


    init();
    async function onClickButtonReceive(_click: Event): Promise<void> {

        //let url: string = "http://localhost:8100";
        let url: string = "https://compaktdisk.herokuapp.com";
        let formData: FormData = new FormData(document.forms[0]);

        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        // url += "/";
        url += "/receive";
        url += "?" + query.toString();

        //console.log(url);
        let response: Response = await fetch(url);
        let orders: Orders[] = await response.json();

        console.log("order: " + orders);
        let out: HTMLDivElement = <HTMLDivElement>document.getElementById("output")!;
        out.innerHTML = "";
        for (let order of orders) {
            console.log("order:" + order);
            out.appendChild(createOrder(order));
        }


    }
    function createOrder(_order: Orders): HTMLElement {

        let ordersDiv: HTMLDivElement = document.createElement("div");
        ordersDiv.classList.add("one-order");
        ordersDiv.setAttribute("_id", _order._id);

        //let orderDiv: HTMLDivElement = document.createElement("div");
        let id: string = _order._id;
        let forename: string = _order.Vorname;
        let name: string = _order.Nachname;
        let Email: string = _order.Email;
        let Passwort: string = _order.Passwort;
        let Bestellung: string[] = _order.Bestellung;
        let gesamtPreis: string = _order.Gesamtpreis;
        let removeBtn: HTMLButtonElement = document.createElement("button");
        removeBtn.innerText = "Geld erhalten & Versendet";
        removeBtn.addEventListener("click", removeOne.bind(removeBtn));
        removeBtn.style.lineHeight = "70px";
        output.appendChild(ordersDiv).innerHTML = "Bestellung:" + id + "</br>" + " Vorname: " + forename + "</br>" + "Nachname :" + name + "</br>" + "Email: " + Email + "</br>" + "Passwort: " + Passwort + "</br>" + "Bestellung: " + Bestellung + "</br>" + "Gesamtpreis: " + gesamtPreis;
        ordersDiv.appendChild(removeBtn);

        return ordersDiv;

    }
    async function removeOne(_e: Event): Promise<void> {

        //let url: string = "http://localhost:8100";
        let url: string = "https://compaktdisk.herokuapp.com";
        let formData: FormData = new FormData(document.forms[0]);

        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        // url += "/";

        let clickedButton: HTMLElement = <HTMLElement>_e.target;
        let parentDiv: HTMLElement = <HTMLElement>clickedButton.parentElement;
        let idToRemove: string = parentDiv.getAttribute("_id")!;
        url += "/deleteOne?id=" + idToRemove;
        url += query.toString();

        let response: Response = await fetch(url);
        console.log(await response.json());

        await onClickButtonReceive(_e);
    }
}
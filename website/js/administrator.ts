namespace Eisdiele {
    window.addEventListener("load", init);
    interface Orders {
        _id: string;
        Vorname: string;
        Nachname: string;
        Email: string;
        Passwort: string;
        Waffel: string;
        Eis: string[];
        Toppings: string[];
        Gesamtpreis: string;
    }

    let getButton: HTMLButtonElement;
    let inputDiv: HTMLDivElement;
    let getDiv: HTMLDivElement;
    let paidDiv: HTMLDivElement;
    let sentDiv: HTMLDivElement;

    function init(): void {
        inputDiv = <HTMLDivElement>document.getElementById("orders");
        paidDiv = <HTMLDivElement>document.getElementById("paid");
        sentDiv = <HTMLDivElement>document.getElementById("paid");
        getDiv = <HTMLDivElement>document.getElementById("getButton");

        getButton = document.createElement("button");
        getButton.setAttribute("id", "getButton");

        getDiv.appendChild(getButton).innerHTML = "Get Orders";
        getButton.addEventListener("click", onClickButtonReceive.bind(getButton));
    }

    async function onClickButtonReceive(_click: Event): Promise<void> {

        //let url: string = "http://localhost:8100";
        let url: string = "https://icecreamforyou.herokuapp.com";
        let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);

        url += "/receive" + "?" + query.toString();

        let response: Response = await fetch(url);
        let orders: Orders[] = await response.json();

        inputDiv.innerHTML = "";
        paidDiv.innerHTML = "";
        sentDiv.innerHTML = "";

        inputDiv.setAttribute("id", "output");
        inputDiv.style.position = "absolute";
        inputDiv.style.maxWidth = "30%";
        inputDiv.style.paddingTop = "2%";
        inputDiv.style.paddingLeft = "5%";

        let out: HTMLDivElement = <HTMLDivElement>document.getElementById("output")!;
        out.innerHTML = "";
         // !Quelle: Inspirationen von LukasScheuerle BeispielServerA11
        for (let order of orders) {
            out.appendChild(createOrder(order));
        }
    }

    function createOrder(_order: Orders): HTMLDivElement {

        let ordersDiv: HTMLDivElement = document.createElement("div");
        ordersDiv.classList.add("one-order");
        ordersDiv.setAttribute("_id", _order._id);
        ordersDiv.setAttribute("id", "adminOrderDiv");
        //let orderDiv: HTMLDivElement = document.createElement("div");
        let id: string = _order._id;
        let forename: string = _order.Vorname;
        let name: string = _order.Nachname;
        let email: string = _order.Email;
        let passwort: string = _order.Passwort;
        let waffel: string = _order.Waffel;
        let eis: string[] = _order.Eis;
        let toppings: string[] = _order.Toppings;
        let gesamtPreis: string = _order.Gesamtpreis;
        let changeStatusButton: HTMLButtonElement = document.createElement("button");
        changeStatusButton.addEventListener("click", changeStatusToPaid.bind(changeStatusButton));
        changeStatusButton.innerText = "Geld erhalten";
        inputDiv.appendChild(ordersDiv).innerHTML = " Bestellungs_Id: " + id + "</br>" + " Vorname: " + forename + "</br>" + "Nachname: " + name + "</br>" + "Email: " + email + "</br>" + "Passwort: " + passwort + "</br>" + "Waffel: " + waffel + "</br>" + "Eis-Zusammensetzung: " + eis + "</br>" + "Toppings-Zusammensetzung: " + toppings + "</br>" + "Gesamtpreis: " + gesamtPreis + "€" + "<br><br>";
        ordersDiv.appendChild(changeStatusButton);

        return ordersDiv;
    }
    // !Quelle: Inspirationen von LukasScheuerle BeispielServerA11
    async function removeOne(_e: Event): Promise<void> {
        //let url: string = "http://localhost:8100";
        let url: string = "https://icecreamforyou.herokuapp.com";
        let formData: FormData = new FormData(document.forms[0]);

        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        // url += "/";

        let clickedButton: HTMLElement = <HTMLElement>_e.target;
        let parentDivRemove: HTMLElement = <HTMLElement>clickedButton.parentElement;
        let idToRemove: string = parentDivRemove.getAttribute("_id")!;

        url += "/deleteOne?id=" + idToRemove;
        url += query.toString();

        parentDivRemove.remove();
        let response: Response = await fetch(url);
        console.log("Removed one: " + await response.json());
    }

    function changeStatusToPaid(_e: Event): void {
        let clickedButton: HTMLElement = <HTMLElement>_e.target;
        let parentDiv0: HTMLElement = <HTMLElement>clickedButton.parentElement;

        paidDiv = <HTMLDivElement>document.getElementById("paid");
        clickedButton.style.display = "none";

        let changeStatusButton: HTMLButtonElement = document.createElement("button");
        changeStatusButton.addEventListener("click", changeStatusToSent.bind(changeStatusButton));
        changeStatusButton.innerText = "Paket verschickt";

        paidDiv.style.position = "absolute";
        paidDiv.style.paddingTop = "2%";
        paidDiv.style.maxWidth = "30%";
        paidDiv.style.left = "37.5%";
        paidDiv.appendChild(parentDiv0);
        parentDiv0.appendChild(changeStatusButton);
    }
    
    function changeStatusToSent(_e: Event): void {
        let clickedButton: HTMLElement = <HTMLElement>_e.target;
        let parentDiv1: HTMLElement = <HTMLElement>clickedButton.parentElement;

        sentDiv = <HTMLDivElement>document.getElementById("paid");
        clickedButton.style.display = "none";

        let removeBtn: HTMLButtonElement = document.createElement("button");
        removeBtn.innerText = "Aus der Datenbank entfernen";
        removeBtn.addEventListener("click", removeOne.bind(removeBtn));

        sentDiv.style.position = "absolute";
        sentDiv.style.paddingTop = "2%";
        sentDiv.style.maxWidth = "30%";
        sentDiv.style.left = "70%";
        sentDiv.appendChild(parentDiv1);
        parentDiv1.appendChild(removeBtn);
    }
}
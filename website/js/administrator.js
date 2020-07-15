"use strict";
var Eisdiele;
(function (Eisdiele) {
    let getButton;
    let output;
    let getDiv;
    function init() {
        output = document.getElementById("orders");
        getDiv = document.getElementById("getButton");
        output.setAttribute("id", "output");
        getButton = document.createElement("button");
        getButton.setAttribute("id", "getButton");
        getDiv.appendChild(getButton).innerHTML = "Get Orders";
        getButton.addEventListener("click", onClickButtonReceive.bind(getButton));
    }
    init();
    async function onClickButtonReceive(_click) {
        //let url: string = "http://localhost:8100";
        let url = "https://icecreamforyou.herokuapp.com";
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        // url += "/";
        url += "/receive";
        url += "?" + query.toString();
        let response = await fetch(url);
        let orders = await response.json();
        let out = document.getElementById("output");
        out.innerHTML = "";
        for (let order of orders) {
            console.log("order:" + order);
            out.appendChild(createOrder(order));
        }
    }
    function createOrder(_order) {
        let ordersDiv = document.createElement("div");
        ordersDiv.classList.add("one-order");
        ordersDiv.setAttribute("_id", _order._id);
        ordersDiv.setAttribute("id", "adminOrderDiv");
        //let orderDiv: HTMLDivElement = document.createElement("div");
        let id = _order._id;
        let forename = _order.Vorname;
        let name = _order.Nachname;
        let Email = _order.Email;
        let Passwort = _order.Passwort;
        let Bestellung = _order.Bestellung;
        let gesamtPreis = _order.Gesamtpreis;
        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Geld erhalten & Versendet";
        removeBtn.addEventListener("click", removeOne.bind(removeBtn));
        removeBtn.style.lineHeight = "25px";
        output.appendChild(ordersDiv).innerHTML = " Bestellungs_Id: " + id + "</br>" + " Vorname: " + forename + "</br>" + "Nachname :" + name + "</br>" + "Email: " + Email + "</br>" + "Passwort: " + Passwort + "</br>" + "Eis-Zusammensetzung: " + Bestellung + "</br>" + "Gesamtpreis: " + gesamtPreis;
        ordersDiv.appendChild(removeBtn);
        return ordersDiv;
    }
    async function removeOne(_e) {
        //let url: string = "http://localhost:8100";
        let url = "https://icecreamforyou.herokuapp.com";
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        // url += "/";
        let clickedButton = _e.target;
        let parentDiv = clickedButton.parentElement;
        let idToRemove = parentDiv.getAttribute("_id");
        url += "/deleteOne?id=" + idToRemove;
        url += query.toString();
        let response = await fetch(url);
        console.log(await response.json());
        await onClickButtonReceive(_e);
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=administrator.js.map
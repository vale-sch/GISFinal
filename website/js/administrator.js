"use strict";
var Eisdiele;
(function (Eisdiele) {
    window.addEventListener("load", init);
    let getButton;
    let inputDiv;
    let getDiv;
    let paidDiv;
    let sentDiv;
    function init() {
        inputDiv = document.getElementById("orders");
        paidDiv = document.getElementById("paid");
        sentDiv = document.getElementById("paid");
        getDiv = document.getElementById("getButton");
        getButton = document.createElement("button");
        getButton.setAttribute("id", "getButton");
        getDiv.appendChild(getButton).innerHTML = "Get Orders";
        getButton.addEventListener("click", onClickButtonReceive.bind(getButton));
    }
    async function onClickButtonReceive(_click) {
        //let url: string = "http://localhost:8100";
        let url = "https://icecreamforyou.herokuapp.com";
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url += "/receive" + "?" + query.toString();
        let response = await fetch(url);
        let orders = await response.json();
        inputDiv.innerHTML = "";
        paidDiv.innerHTML = "";
        sentDiv.innerHTML = "";
        inputDiv.setAttribute("id", "output");
        inputDiv.style.position = "absolute";
        inputDiv.style.maxWidth = "30%";
        inputDiv.style.paddingTop = "2%";
        inputDiv.style.paddingLeft = "5%";
        let out = document.getElementById("output");
        out.innerHTML = "";
        // !Quelle: Inspirationen von LukasScheuerle BeispielServerA11
        for (let order of orders) {
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
        let email = _order.Email;
        let passwort = _order.Passwort;
        let waffel = _order.Waffel;
        let eis = _order.Eis;
        let toppings = _order.Toppings;
        let gesamtPreis = _order.Gesamtpreis;
        let changeStatusButton = document.createElement("button");
        changeStatusButton.addEventListener("click", changeStatusToPaid.bind(changeStatusButton));
        changeStatusButton.innerText = "Geld erhalten";
        inputDiv.appendChild(ordersDiv).innerHTML = " Bestellungs_Id: " + id + "</br>" + " Vorname: " + forename + "</br>" + "Nachname: " + name + "</br>" + "Email: " + email + "</br>" + "Passwort: " + passwort + "</br>" + "Waffel: " + waffel + "</br>" + "Eis-Zusammensetzung: " + eis + "</br>" + "Toppings-Zusammensetzung: " + toppings + "</br>" + "Gesamtpreis: " + gesamtPreis + "€" + "<br><br>";
        ordersDiv.appendChild(changeStatusButton);
        return ordersDiv;
    }
    // !Quelle: Inspirationen von LukasScheuerle BeispielServerA11
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
        parentDiv.remove();
        let response = await fetch(url);
        console.log("Removed one: " + await response.json());
    }
    function changeStatusToPaid(_e) {
        let clickedButton = _e.target;
        let parentDiv = clickedButton.parentElement;
        paidDiv = document.getElementById("paid");
        clickedButton.style.display = "none";
        let changeStatusButton = document.createElement("button");
        changeStatusButton.addEventListener("click", changeStatusToSent.bind(changeStatusButton));
        changeStatusButton.innerText = "Paket verschickt";
        paidDiv.style.position = "absolute";
        paidDiv.style.paddingTop = "2%";
        paidDiv.style.maxWidth = "30%";
        paidDiv.style.left = "37.5%";
        paidDiv.appendChild(parentDiv);
        parentDiv.appendChild(changeStatusButton);
    }
    function changeStatusToSent(_e) {
        let clickedButton = _e.target;
        let parentDiv = clickedButton.parentElement;
        sentDiv = document.getElementById("paid");
        clickedButton.style.display = "none";
        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Aus der Datenbank entfernen";
        removeBtn.addEventListener("click", removeOne.bind(removeBtn));
        sentDiv.style.position = "absolute";
        sentDiv.style.paddingTop = "2%";
        sentDiv.style.maxWidth = "30%";
        sentDiv.style.left = "70%";
        sentDiv.appendChild(parentDiv);
        parentDiv.appendChild(removeBtn);
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=administrator.js.map
"use strict";
var Eisdiele;
(function (Eisdiele) {
    let eis;
    let basketArticleDiv;
    let informationDiv;
    let totalPrice;
    let form;
    let countPrice = 0;
    init();
    function init() {
        appendHTML();
        generateBasketArticle();
        generateContentInForm();
        onClickBasket();
    }
    function appendHTML() {
        basketArticleDiv = document.getElementById("warenKorbArtikel");
        informationDiv = document.getElementById("informationAnzeige");
        form = document.getElementById("formular");
    }
    function generateBasketArticle() {
        for (let index = 0; index <= localStorage.length - 1; index++) {
            let articleKey = localStorage.key(index);
            let jsonString = localStorage.getItem(articleKey);
            eis = JSON.parse(jsonString);
            let img = document.createElement("img");
            img.setAttribute("src", eis.image);
            let beschreibung = document.createElement("p");
            beschreibung.setAttribute("class", "text");
            let preis = document.createElement("p");
            preis.setAttribute("class", "text");
            let formatDiv = document.createElement("div");
            formatDiv.setAttribute("class", "formatDiv");
            basketArticleDiv.appendChild(formatDiv);
            let button = document.createElement("button");
            button.setAttribute("class", "creationButton");
            button.addEventListener("click", onClickDeleteStorage.bind(eis));
            countPrice += eis.preis;
            formatDiv.appendChild(img);
            formatDiv.appendChild(beschreibung).innerHTML = eis.name;
            formatDiv.appendChild(preis).innerHTML = "Kosten pro Stück: " + eis.preis + "€";
            formatDiv.appendChild(button).innerHTML = "Delete this";
        }
        totalPrice = document.createElement("h2");
        totalPrice.style.textAlign = "left";
        informationDiv.appendChild(totalPrice).innerHTML = "\xa0\xa0" + countPrice.toFixed(2) + "€";
        let sendBuy = document.createElement("button");
        sendBuy.addEventListener("click", onClickButtonStoreData.bind(sendBuy));
        let infoTag = document.createElement("p");
        infoTag.setAttribute("id", "infoTag");
        let confirmTag = document.createElement("p");
        informationDiv.appendChild(confirmTag).innerHTML = "Wir senden Ihnen automatisch eine Bestätigungs Email, dort finden Sie unsere Bankdaten um die Bestellung abzuschließen";
        informationDiv.appendChild(infoTag).innerHTML = "Mit dem Klick auf den Buttons, erklären Sie sich einverstanden mit den Shop AGB`s";
        informationDiv.appendChild(sendBuy).innerHTML = "Bezahlen";
        console.log("-------localStorage-------");
        console.log(localStorage);
    }
    function generateContentInForm() {
        for (let index = 0; index <= localStorage.length - 1; index++) {
            let articleKey = localStorage.key(index);
            let jsonString = localStorage.getItem(articleKey);
            eis = JSON.parse(jsonString);
            if (eis.kategorie == "Waffel") {
                let waffelInput = document.createElement("input");
                waffelInput.setAttribute("name", "Waffel");
                waffelInput.setAttribute("value", " " + eis.name);
                form.appendChild(waffelInput).innerHTML = articleKey + eis.name;
                waffelInput.style.display = "none";
            }
            if (eis.kategorie == "Eis") {
                let eisInput = document.createElement("input");
                eisInput.setAttribute("name", "Eis");
                eisInput.setAttribute("value", " " + eis.name);
                form.appendChild(eisInput).innerHTML = articleKey + eis.name;
                eisInput.style.display = "none";
            }
            if (eis.kategorie == "Stecksachen" || eis.kategorie == "Soßen" || eis.kategorie == "Streusel") {
                let toppingsInput = document.createElement("input");
                toppingsInput.setAttribute("name", "Toppings");
                toppingsInput.setAttribute("value", " " + eis.name);
                form.appendChild(toppingsInput).innerHTML = articleKey + eis.name;
                toppingsInput.style.display = "none";
            }
        }
        let preisInput = document.createElement("input");
        preisInput.setAttribute("name", "Gesamtpreis");
        preisInput.setAttribute("value", countPrice.toFixed(2).toString());
        form.appendChild(preisInput).innerHTML = countPrice.toFixed(2) + "";
        preisInput.style.display = "none";
    }
    async function onClickButtonStoreData(_click) {
        //let url: string = "http://localhost:8100";
        let url = "https://icecreamforyou.herokuapp.com";
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url += "/storeData" + "?" + query.toString();
        let response = await fetch(url);
        localStorage.clear();
        basketArticleDiv.innerHTML = "";
        informationDiv.innerHTML = "";
        informationDiv.style.width = "100%";
        let h2TextStore = document.createElement("h2");
        h2TextStore.style.color = "#411f1f";
        h2TextStore.style.textAlign = "center";
        let getToAdminLink = document.createElement("a");
        getToAdminLink.setAttribute("href", "https://vale-sch.github.io/GISFinal/website/administrator.html");
        getToAdminLink.setAttribute("target", "_blank");
        getToAdminLink.style.fontSize = "30px";
        let importetGif = document.createElement("img");
        importetGif.setAttribute("src", "/GISFinal/website/js/GISFINAL.gif");
        informationDiv.appendChild(h2TextStore).innerHTML = "Sie haben die Bestellung erfolgreich abgeschickt, eine Bestätigungs-Email wurde soeben an Sie gesendet";
        informationDiv.appendChild(getToAdminLink).innerHTML = "Zur Verkäufer Seite" + "<br> <br>";
        informationDiv.appendChild(importetGif);
        onClickBasket();
        console.log(response);
    }
    function onClickDeleteStorage(_click) {
        console.log("removedItem" + this.stück.toString());
        localStorage.removeItem(this.stück.toString());
        location.reload();
    }
    function onClickBasket() {
        Eisdiele.articleCounter = localStorage.length;
        let basketNumber = document.querySelector("li:last-child");
        basketNumber.setAttribute("id", "basketNumber");
        if (Eisdiele.articleCounter > 0) {
            basketNumber.setAttribute("id", "basketNumber");
            basketNumber.innerHTML = "" + Eisdiele.articleCounter;
        }
        else {
            basketNumber.innerHTML = "";
        }
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Basket.js.map
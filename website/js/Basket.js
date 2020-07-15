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
            formatDiv.appendChild(beschreibung).innerHTML = "-->" + eis.beschreibung;
            formatDiv.appendChild(preis).innerHTML = "Kosten pro Stück: " + eis.preis + "€";
            formatDiv.appendChild(button).innerHTML = "Delete this";
        }
        totalPrice = document.createElement("h2");
        totalPrice.style.textAlign = "left";
        informationDiv.appendChild(totalPrice).innerHTML = "\xa0\xa0" + Math.round((countPrice + Number.EPSILON) * 100) / 100 + "€";
        let sendBuy = document.createElement("button");
        sendBuy.addEventListener("click", onClickButtonStoreData.bind(sendBuy));
        let infoTag = document.createElement("p");
        infoTag.setAttribute("id", "infoTag");
        let confirmTag = document.createElement("p");
        informationDiv.appendChild(confirmTag).innerHTML = "Wir senden Ihnen automatisch eine Bestätigungs Email, dort finden Sie unsere Bankdaten um die Bestellung abzuschließen";
        informationDiv.appendChild(infoTag).innerHTML = "Mit dem Klick auf den Buttons, erklären Sie sich einverstanden mit den Shop AGB`s";
        informationDiv.appendChild(sendBuy).innerHTML = "Bezahlen";
    }
    function generateContentInForm() {
        for (let index = 0; index <= localStorage.length - 1; index++) {
            let articleKey = localStorage.key(index);
            let jsonString = localStorage.getItem(articleKey);
            eis = JSON.parse(jsonString);
            let nameLabel = document.createElement("label");
            nameLabel.setAttribute("for", "Bestellung:");
            let nameInput = document.createElement("input");
            nameInput.setAttribute("name", "Bestellung");
            nameInput.setAttribute("value", index.toString() + eis.name);
            form.appendChild(nameLabel).innerHTML = articleKey + eis.name;
            form.appendChild(nameInput).innerHTML = articleKey + eis.name;
            nameLabel.style.display = "none";
            nameInput.style.display = "none";
        }
        let preisLabel = document.createElement("label");
        preisLabel.setAttribute("for", "Gesamtpreis");
        let preisInput = document.createElement("input");
        preisInput.setAttribute("name", "Gesamtpreis");
        preisInput.setAttribute("value", (Math.round((countPrice + Number.EPSILON) * 100) / 100).toString());
        form.appendChild(preisLabel).innerHTML = "Gesamtpreis: ";
        form.appendChild(preisInput).innerHTML = Math.round((countPrice + Number.EPSILON) * 100) / 100 + "";
        preisLabel.style.display = "none";
        preisInput.style.display = "none";
    }
    async function onClickButtonStoreData(_click) {
        // let url: string = "http://localhost:8100";
        let url = "https://icecreamforyou.herokuapp.com";
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url += "/storeData";
        url += "?" + query.toString();
        let response = await fetch(url);
        localStorage.clear();
        basketArticleDiv.innerHTML = "";
        informationDiv.innerHTML = "";
        let h2TextStore = document.createElement("h2");
        h2TextStore.style.color = "lemonchiffon";
        h2TextStore.style.textAlign = "center";
        basketArticleDiv.appendChild(h2TextStore).innerHTML = "Sie haben die Bestellung erfolgreich abeschickt, eine Bestätigungs-Email wurde soeben an Sie gesendet";
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
            //localStorage.clear();
        }
        else {
            basketNumber.innerHTML = "";
        }
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Basket.js.map
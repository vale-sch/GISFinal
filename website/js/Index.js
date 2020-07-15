"use strict";
var Eisdiele;
(function (Eisdiele) {
    let setupDiv;
    let waffelDiv;
    let eisDiv;
    let sosenDiv;
    let stecksachenDiv;
    let streuselDiv;
    let formatDiv;
    let iceDiv;
    let img;
    let amount = 1;
    let eis;
    let constantNumber;
    window.addEventListener("load", init);
    appendFunction();
    async function init(_event) {
        await communicate("eisArtikel.json");
        theIceCreator();
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        Eisdiele.jsonObj = await response.json();
        generateIce();
    }
    function appendFunction() {
        setupDiv = document.getElementById("setupDiv");
        waffelDiv = document.getElementById("WaffelnDiv");
        eisDiv = document.getElementById("EisDiv");
        sosenDiv = document.getElementById("SosenDiv");
        stecksachenDiv = document.getElementById("StecksachenDiv");
        streuselDiv = document.getElementById("StreuselDiv");
        iceDiv = document.getElementById("iceDiv");
        iceDiv = document.getElementById("iceDiv");
    }
    function generateIce() {
        for (let index = 0; index < Eisdiele.jsonObj.length; index++) {
            if (Eisdiele.jsonObj[index].kategorie == "Waffel") {
                formatDiv = document.createElement("div");
                formatDiv.setAttribute("class", "formatDiv");
                setupDiv.appendChild(waffelDiv);
                waffelDiv.appendChild(formatDiv);
            }
            if (Eisdiele.jsonObj[index].kategorie == "Eis") {
                formatDiv = document.createElement("div");
                formatDiv.setAttribute("class", "formatDiv");
                setupDiv.appendChild(eisDiv);
                eisDiv.appendChild(formatDiv);
            }
            if (Eisdiele.jsonObj[index].kategorie == "Stecksachen") {
                formatDiv = document.createElement("div");
                formatDiv.setAttribute("class", "formatDiv");
                setupDiv.appendChild(stecksachenDiv);
                stecksachenDiv.appendChild(formatDiv);
            }
            if (Eisdiele.jsonObj[index].kategorie == "Soßen") {
                formatDiv = document.createElement("div");
                formatDiv.setAttribute("class", "formatDiv");
                setupDiv.appendChild(sosenDiv);
                sosenDiv.appendChild(formatDiv);
            }
            if (Eisdiele.jsonObj[index].kategorie == "Streusel") {
                formatDiv = document.createElement("div");
                formatDiv.setAttribute("class", "formatDiv");
                setupDiv.appendChild(streuselDiv);
                streuselDiv.appendChild(formatDiv);
            }
            let img = document.createElement("img");
            img.setAttribute("src", Eisdiele.jsonObj[index].image);
            let beschreibung = document.createElement("p");
            beschreibung.setAttribute("class", "text");
            let name = document.createElement("p");
            name.setAttribute("class", "text");
            let preis = document.createElement("p");
            preis.setAttribute("class", "text");
            let button = document.createElement("button");
            button.setAttribute("class", "creationButton");
            button.addEventListener("click", onClickCreate.bind(Eisdiele.jsonObj[index]));
            formatDiv.appendChild(img);
            formatDiv.appendChild(name).innerHTML = Eisdiele.jsonObj[index].name;
            formatDiv.appendChild(beschreibung).innerHTML = "-->" + Eisdiele.jsonObj[index].beschreibung;
            formatDiv.appendChild(preis).innerHTML = "Kosten pro Stück: " + Eisdiele.jsonObj[index].preis + "€";
            formatDiv.appendChild(button).innerHTML = "Ab in die Kreation! ";
        }
    }
    function onClickCreate(_click) {
        if (localStorage.length > 0) {
            if (this.kategorie == "Eis") {
                constantNumber = localStorage.length;
            }
        }
        if (localStorage.length == 0) {
            amount = 0;
        }
        amount++;
        this.stück = amount;
        pushToLocalStorage(this);
        onClickBasket();
        onClickclearIceDiv(iceDiv);
    }
    function pushToLocalStorage(_eis) {
        let inhalt = JSON.stringify(_eis);
        if (localStorage.length >= 1) {
            if (_eis.name == "Waffel") {
                let h3WaffelText = document.createElement("h3");
                h3WaffelText.style.textAlign = "center";
                setupDiv.appendChild(h3WaffelText).innerHTML = "Nur eine Waffel du kranker Sack!";
                return;
            }
        }
        localStorage.setItem(_eis.stück.toString(), inhalt);
    }
    function theIceCreator() {
        if (localStorage.length > 0) {
            let actualCreation = document.createElement("p");
            iceDiv.appendChild(actualCreation).innerHTML = "Ihre persönliche Kreation:";
        }
        for (let index = 0; index <= localStorage.length - 1; index++) {
            let articleKey = localStorage.key(index);
            let jsonString = localStorage.getItem(articleKey);
            eis = JSON.parse(jsonString);
            img = document.createElement("img");
            img.setAttribute("src", eis.image);
            let informationTag = document.createElement("a");
            informationTag.setAttribute("class", "fas fa-times");
            informationTag.setAttribute("href", "#fas fa-times");
            informationTag.addEventListener("click", onClickDeleteThis.bind(eis));
            let pictureDiv;
            pictureDiv = document.createElement("div");
            pictureDiv.setAttribute("class", "pictureDiv");
            iceDiv.appendChild(pictureDiv);
            iceDiv.appendChild(informationTag).innerHTML = eis.stück + "." + "-" + eis.name;
            if (eis.kategorie == "Waffel") {
                img.style.position = "fixed";
                img.style.bottom = "0%";
                img.style.left = "13%";
                pictureDiv.appendChild(img);
            }
            else if (eis.kategorie == "Eis") {
                if (eis.stück == 2) {
                    img.style.position = "fixed";
                    img.style.left += "13%";
                    img.style.bottom += "300px";
                    pictureDiv.appendChild(img);
                }
                else {
                    img.style.position = "fixed";
                    img.style.left += ("13%");
                    //img.style.left = - (index * 7) * 49 + "px";
                    img.style.bottom += (eis.stück * 95) + 120 + "px";
                    //img.style.bottom = "-100px";
                    pictureDiv.appendChild(img);
                }
            }
            if (eis.kategorie == "Stecksachen") {
                img.style.position = "fixed";
                img.style.left += ("13%");
                img.style.bottom += (constantNumber * 100) + 300 + "px";
                let rotateNumber = index * 3;
                img.style.transform += ("rotate" + "(" + rotateNumber + "deg)");
                pictureDiv.appendChild(img);
            }
            if (eis.kategorie == "Streusel") {
                img.style.position = "fixed";
                img.style.left += ("13%");
                img.style.bottom += (constantNumber * 190) - (25 * index) + "px";
                pictureDiv.appendChild(img);
            }
            if (eis.kategorie == "Soßen") {
                img.style.position = "fixed";
                img.style.left += ("13%");
                img.style.bottom += (constantNumber * 190) - (20 * index) + "px";
                pictureDiv.appendChild(img);
            }
        }
        if (localStorage.length > 0) {
            let tryAgain;
            tryAgain = document.createElement("a");
            tryAgain.setAttribute("class", "fas fa-redo-alt");
            tryAgain.setAttribute("href", "#fas fa-redo-alt");
            tryAgain.style.textAlign = "right";
            tryAgain.style.textDecorationColor = "lila";
            iceDiv.appendChild(tryAgain).innerHTML = " New Creation";
            tryAgain.addEventListener("click", onClickDeleteStorage.bind(tryAgain));
        }
        console.log("------localstorage-------");
        console.log(localStorage);
    }
    function onClickDeleteStorage() {
        localStorage.clear();
        location.reload();
    }
    function onClickDeleteThis(_click) {
        localStorage.removeItem(this.stück.toString());
        amount = localStorage.length;
        onClickclearIceDiv(iceDiv);
    }
    function onClickclearIceDiv(_iceDiv) {
        iceDiv.innerHTML = "";
        if (localStorage.length > 0) {
            theIceCreator();
        }
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
//# sourceMappingURL=Index.js.map
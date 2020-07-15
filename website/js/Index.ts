namespace Eisdiele {

    let setupDiv: HTMLDivElement;
    let waffelDiv: HTMLDivElement;
    let eisDiv: HTMLDivElement;
    let sosenDiv: HTMLDivElement;
    let stecksachenDiv: HTMLDivElement;
    let streuselDiv: HTMLDivElement;
    let formatDiv: HTMLDivElement;
    let iceDiv: HTMLDivElement;
    let img: HTMLImageElement;
    let amount: number = 1;
    let eis: Eis;
    let constantNumber: number;
    export let articleCounter: number;
    window.addEventListener("load", init);
    appendFunction();

    async function init(_event: Event): Promise<void> {
        await communicate("eisArtikel.json");
        theIceCreator();
    }

    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        jsonObj = await response.json();
        generateIce();
    }

    function appendFunction(): void {
        setupDiv = <HTMLDivElement>document.getElementById("setupDiv");
        waffelDiv = <HTMLDivElement>document.getElementById("WaffelnDiv");
        eisDiv = <HTMLDivElement>document.getElementById("EisDiv");
        sosenDiv = <HTMLDivElement>document.getElementById("SosenDiv");
        stecksachenDiv = <HTMLDivElement>document.getElementById("StecksachenDiv");
        streuselDiv = <HTMLDivElement>document.getElementById("StreuselDiv");
        iceDiv = <HTMLDivElement>document.getElementById("iceDiv");
        iceDiv = <HTMLDivElement>document.getElementById("iceDiv");

    }

    function generateIce(): void {
        for (let index: number = 0; index < jsonObj.length; index++) {

            if (jsonObj[index].kategorie == "Waffel") {
                formatDiv = document.createElement("div");
                formatDiv.setAttribute("class", "formatDiv");
                setupDiv.appendChild(waffelDiv);
                waffelDiv.appendChild(formatDiv);
            }
            if (jsonObj[index].kategorie == "Eis") {
                formatDiv = document.createElement("div");
                formatDiv.setAttribute("class", "formatDiv");
                setupDiv.appendChild(eisDiv);
                eisDiv.appendChild(formatDiv);
            }
            if (jsonObj[index].kategorie == "Stecksachen") {
                formatDiv = document.createElement("div");
                formatDiv.setAttribute("class", "formatDiv");
                setupDiv.appendChild(stecksachenDiv);
                stecksachenDiv.appendChild(formatDiv);
            }
            if (jsonObj[index].kategorie == "Soßen") {
                formatDiv = document.createElement("div");
                formatDiv.setAttribute("class", "formatDiv");
                setupDiv.appendChild(sosenDiv);
                sosenDiv.appendChild(formatDiv);
            }
            if (jsonObj[index].kategorie == "Streusel") {
                formatDiv = document.createElement("div");
                formatDiv.setAttribute("class", "formatDiv");
                setupDiv.appendChild(streuselDiv);
                streuselDiv.appendChild(formatDiv);
            }

            let img: HTMLImageElement = document.createElement("img");
            img.setAttribute("src", jsonObj[index].image);

            let beschreibung: HTMLParagraphElement = document.createElement("p");
            beschreibung.setAttribute("class", "text");
            let name: HTMLParagraphElement = document.createElement("p");
            name.setAttribute("class", "text");
            let preis: HTMLParagraphElement = document.createElement("p");
            preis.setAttribute("class", "text");

            let button: HTMLButtonElement = document.createElement("button");
            button.setAttribute("class", "creationButton");
            button.addEventListener("click", onClickCreate.bind(jsonObj[index]));

            formatDiv.appendChild(img);
            formatDiv.appendChild(name).innerHTML = jsonObj[index].name;
            formatDiv.appendChild(beschreibung).innerHTML = "-->" + jsonObj[index].beschreibung;
            formatDiv.appendChild(preis).innerHTML = "Kosten pro Stück: " + jsonObj[index].preis + "€";
            formatDiv.appendChild(button).innerHTML = "Ab in die Kreation! ";
        }
    }
    function onClickCreate(this: Eis, _click: MouseEvent): void {
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
    function pushToLocalStorage(_eis: Eis): void {
        let inhalt: string = JSON.stringify(_eis);

        if (_eis.stück > 0) {
            localStorage.setItem(_eis.stück.toString(), inhalt);
        } else { localStorage.setItem(_eis.stück.toString(), inhalt); }
        

    }
    function theIceCreator(): void {
        if (localStorage.length > 0) {
            let actualCreation: HTMLParagraphElement = document.createElement("p");
            iceDiv.appendChild(actualCreation).innerHTML = "Ihre persönliche Kreation:";
        }



        for (let index: number = 0; index <= localStorage.length - 1; index++) {
            let articleKey: string = <string>localStorage.key(index);
            let jsonString: string = <string>localStorage.getItem(articleKey);
            eis = <Eis>JSON.parse(jsonString);

            img = document.createElement("img");
            img.setAttribute("src", eis.image);

            let informationTag: HTMLAnchorElement = <HTMLAnchorElement>document.createElement("a");
            informationTag.setAttribute("class", "fas fa-times");
            informationTag.setAttribute("href", "#fas fa-times");

            informationTag.addEventListener("click", onClickDeleteThis.bind(eis));

            let pictureDiv: HTMLDivElement;
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

                } else {
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
                let rotateNumber: number = index * 3;
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
            let tryAgain: HTMLAnchorElement;
            tryAgain = document.createElement("a");
            tryAgain.setAttribute("class", "fas fa-redo-alt");
            tryAgain.setAttribute("href", "#fas fa-redo-alt");
            tryAgain.style.textAlign = "right";
            tryAgain.style.textDecorationColor = "lila";
            iceDiv.appendChild(tryAgain).innerHTML = " New Creation";
            tryAgain.addEventListener("click", onClickDeleteStorage.bind(tryAgain));
            let basketLink: HTMLAnchorElement;
            basketLink = document.createElement("a");
            basketLink.setAttribute("class", "fas fa-shopping-bag");
            basketLink.setAttribute("href", "#fas fa-shopping-bag");
            basketLink.style.textAlign = "right";
            basketLink.style.textDecorationColor = "lila";
            basketLink.style.lineHeight = "50px";
            iceDiv.appendChild(basketLink).innerHTML = " In den Warenkorb!";
            basketLink.addEventListener("click", onClickBasket.bind(basketLink));
        }

        console.log("------localstorage-------");
        console.log(localStorage);
    }

    function onClickDeleteStorage(): void {
        localStorage.clear();
        location.reload();
    }
    function onClickDeleteThis( this: Eis , _click: Event): void {
        localStorage.removeItem(this.stück.toString());
        amount = localStorage.length;
        onClickclearIceDiv(iceDiv);
    }

    function onClickclearIceDiv(_iceDiv: HTMLDivElement): void {

        iceDiv.innerHTML = "";
        if (localStorage.length > 0) { theIceCreator(); }

    }
    function onClickBasket(): void {
        articleCounter = localStorage.length;
        let basketNumber: HTMLLIElement = <HTMLLIElement>document.querySelector("li:last-child");
        let h3TextBaskter: HTMLHeadElement = <HTMLHeadElement>document.createElement("h3");
        h3TextBaskter.style.bottom = "90%";
        h3TextBaskter.style.float = "right";
        h3TextBaskter.style.color = "red";
        iceDiv.appendChild(h3TextBaskter).innerHTML = "Sie haben die Kreation erfolgreich zum Warenkorb geschickt!";
        basketNumber.setAttribute("id", "basketNumber");
        if (articleCounter > 0) {
            basketNumber.setAttribute("id", "basketNumber");
            basketNumber.innerHTML = "" + articleCounter;
            //localStorage.clear();
        }
        else {
            basketNumber.innerHTML = "";
        }

    }


}
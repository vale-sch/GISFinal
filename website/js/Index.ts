namespace Eisdiele {


    export interface Eis {
        kategorie: string;
        image: string;
        beschreibung: string;
        preis: number;
        stück: number;
        name: string;
    }
    let jsonObj: Eis[] = [];
    let setupDiv: HTMLDivElement;
    let waffelDiv: HTMLDivElement;
    let eisDiv: HTMLDivElement;
    let soßenDiv: HTMLDivElement;
    let stecksachenDiv: HTMLDivElement;
    let streuselDiv: HTMLDivElement;
    let formatDiv: HTMLDivElement;
    let iceDiv: HTMLDivElement;
    let img: HTMLImageElement;
    let amount: number = 1;
    let eis: Eis;
    let constantNumber: number;
    let isTopping: Boolean = false;
    export let articleCounter: number;
    window.addEventListener("load", init);
    appendFunction();

    async function init(_event: Event): Promise<void> {
        await communicate("eisArtikel.json");
        theIceCreator();
        generateIceSortiment();
    }

    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        jsonObj = await response.json();
    }

    function appendFunction(): void {
        setupDiv = <HTMLDivElement>document.getElementById("setupDiv");
        waffelDiv = <HTMLDivElement>document.getElementById("WaffelnDiv");
        eisDiv = <HTMLDivElement>document.getElementById("EisDiv");
        soßenDiv = <HTMLDivElement>document.getElementById("SosenDiv");
        stecksachenDiv = <HTMLDivElement>document.getElementById("StecksachenDiv");
        streuselDiv = <HTMLDivElement>document.getElementById("StreuselDiv");
        iceDiv = <HTMLDivElement>document.getElementById("iceDiv");
        iceDiv = <HTMLDivElement>document.getElementById("iceDiv");

    }

    function generateIceSortiment(): void {
        let setupHeadingText: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h1");
        let setupParagraphText: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        setupParagraphText.style.textAlign = "center";
        setupDiv.appendChild(setupHeadingText).innerHTML = "1. Waffeln";
        setupDiv.appendChild(setupParagraphText).innerHTML = "Haben Sie <b>viel Spaß</b> mit der neuen Version des <b>IceCreators</b>";

        let hrElement0: HTMLElement = <HTMLElement>document.createElement("hr");
        let hrElement1: HTMLElement = <HTMLElement>document.createElement("hr");
        let hrElement2: HTMLElement = <HTMLElement>document.createElement("hr");
        let hrElement3: HTMLElement = <HTMLElement>document.createElement("hr");

        hrElement0.style.height = "0px";
        hrElement1.style.height = "0px";
        hrElement2.style.height = "0px";
        hrElement3.style.height = "0px";


        let eisHeadingText: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h1");
        setupDiv.appendChild(eisDiv);
        eisDiv.appendChild(eisHeadingText).innerHTML = "2. Eiskugeln";
        eisDiv.appendChild(hrElement0);

        let steckSachenText: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h1");
        setupDiv.appendChild(stecksachenDiv);
        stecksachenDiv.appendChild(steckSachenText).innerHTML = "3. Stecksachen";
        stecksachenDiv.appendChild(hrElement1);

        let soßenText: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h1");
        setupDiv.appendChild(soßenDiv);
        soßenDiv.appendChild(soßenText).innerHTML = "3. Soßen";
        soßenDiv.appendChild(hrElement2);

        let streuselText: HTMLHeadingElement = <HTMLHeadingElement>document.createElement("h1");
        setupDiv.appendChild(streuselDiv);
        streuselDiv.appendChild(streuselText).innerHTML = "4. Streusel";
        streuselDiv.appendChild(hrElement3);


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
                setupDiv.appendChild(soßenDiv);
                soßenDiv.appendChild(formatDiv);
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

            formatDiv.appendChild(img);
            formatDiv.appendChild(name).innerHTML = jsonObj[index].name;
            formatDiv.appendChild(beschreibung).innerHTML = "-->" + jsonObj[index].beschreibung;
            formatDiv.appendChild(preis).innerHTML = "Kosten pro Stück: " + jsonObj[index].preis + "€";

            if (localStorage.length == 0) {
                if (jsonObj[index].kategorie == "Waffel") {
                    let button: HTMLButtonElement = document.createElement("button");
                    button.setAttribute("class", "creationButton");
                    button.addEventListener("click", onClickCreate.bind(jsonObj[index]));
                    formatDiv.appendChild(button).innerHTML = "Ab in die Kreation! ";
                }
            }
            if (localStorage.length > 0) {
                console.log("isTopping? = " + isTopping);
                if (!isTopping) {
                    let button: HTMLButtonElement = document.createElement("button");
                    button.setAttribute("class", "creationButton");
                    button.addEventListener("click", onClickCreate.bind(jsonObj[index]));
                    if (jsonObj[index].kategorie != "Waffel")
                        formatDiv.appendChild(button).innerHTML = "Ab in die Kreation! ";
                }
                if (isTopping) {
                    let button: HTMLButtonElement = document.createElement("button");
                    button.setAttribute("class", "creationButton");
                    button.addEventListener("click", onClickCreate.bind(jsonObj[index]));
                    if (jsonObj[index].kategorie == "Stecksachen" || jsonObj[index].kategorie == "Streusel" || jsonObj[index].kategorie == "Soßen")
                        formatDiv.appendChild(button).innerHTML = "Ab in die Kreation! ";
                }
            }
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
        onClickclear();
        onClickBasket();
    }

    function pushToLocalStorage(_eis: Eis): void {
        let inhalt: string = JSON.stringify(_eis);
        localStorage.setItem(_eis.stück.toString(), inhalt);
    }
    function theIceCreator(): void {
        isTopping = false;
        if (localStorage.length > 0) {
            let actualCreation: HTMLParagraphElement = document.createElement("p");
            iceDiv.appendChild(actualCreation).innerHTML = "Ihre persönliche Kreation:";
        }
        for (let index: number = 0; index <= localStorage.length - 1; index++) {
            let articleKey: string = <string>localStorage.key(index);
            let jsonString: string = <string>localStorage.getItem(articleKey);
            eis = <Eis>JSON.parse(jsonString);
            if (localStorage.length > 1) {
                if (eis.kategorie != "Eis") {
                    isTopping = true;
                }
            }


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
            img.style.left = "18%";
            if (eis.kategorie == "Waffel") {

                img.style.position = "fixed";
                img.style.bottom = "0%";
                pictureDiv.appendChild(img);
            }
            else if (eis.kategorie == "Eis") {
                if (eis.stück == 2) {
                    img.style.position = "fixed";

                    img.style.bottom += "300px";
                    pictureDiv.appendChild(img);

                } else {
                    img.style.position = "fixed";
                    img.style.bottom += (eis.stück * 95) + 120 + "px";
                    pictureDiv.appendChild(img);
                }

            }
            if (eis.kategorie == "Stecksachen") {
                img.style.position = "fixed";
                img.style.bottom += (constantNumber * 100) + 300 + "px";
                let rotateNumber: number = index * 3;
                img.style.transform += ("rotate" + "(" + rotateNumber + "deg)");
                pictureDiv.appendChild(img);
            }
            if (eis.kategorie == "Streusel") {
                img.style.position = "fixed";
                img.style.bottom += (constantNumber * 190) - (25 * index) + "px";
                pictureDiv.appendChild(img);
            }
            if (eis.kategorie == "Soßen") {
                img.style.position = "fixed";
                img.style.bottom += (constantNumber * 190) - (20 * index) + "px";
                pictureDiv.appendChild(img);
            }

        }

        console.log("------localstorage-------");
        console.log(localStorage);
    }

    function onClickDeleteThis(this: Eis, _click: Event): void {
        localStorage.removeItem(this.stück.toString());
        amount = localStorage.length;
        onClickclear();
    }

    function onClickclear(): void {
        iceDiv.innerHTML = "";
        theIceCreator();

        setupDiv.innerHTML = "";
        waffelDiv.innerHTML = "";
        eisDiv.innerHTML = "";
        stecksachenDiv.innerHTML = "";
        soßenDiv.innerHTML = "";
        streuselDiv.innerHTML = "";
        generateIceSortiment();
    }

    function onClickBasket(): void {
        articleCounter = localStorage.length;
        let basketNumber: HTMLLIElement = <HTMLLIElement>document.querySelector("li:last-child");
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
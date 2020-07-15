 namespace Eisdiele {

    let eis: Eis;
    let basketArticleDiv: HTMLDivElement;
    let informationDiv: HTMLDivElement;
    let totalPrice: HTMLParagraphElement;
    let form: HTMLFormElement;
    let countPrice: number = 0;
    init();

    function init(): void {
        appendHTML();

        generateBasketArticle();
        generateContentInForm();
        onClickBasket();

    }

    function appendHTML(): void {
        basketArticleDiv = <HTMLDivElement>document.getElementById("warenKorbArtikel");
        informationDiv = <HTMLDivElement>document.getElementById("informationAnzeige");
        form = <HTMLFormElement>document.getElementById("formular");

    }

    function generateBasketArticle(): void {
        for (let index: number = 0; index <= localStorage.length - 1; index++) {
            let articleKey: string = <string>localStorage.key(index);
            let jsonString: string = <string>localStorage.getItem(articleKey);
            eis = <Eis>JSON.parse(jsonString);
            let img: HTMLImageElement = document.createElement("img");
            img.setAttribute("src", eis.image);

            let beschreibung: HTMLParagraphElement = document.createElement("p");
            beschreibung.setAttribute("class", "text");
            let preis: HTMLParagraphElement = document.createElement("p");
            preis.setAttribute("class", "text");
            let formatDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            formatDiv.setAttribute("class", "formatDiv");
            basketArticleDiv.appendChild(formatDiv);
            let button: HTMLButtonElement = document.createElement("button");
            button.setAttribute("class", "creationButton");
            button.addEventListener("click", onClickDeleteStorage.bind(eis));

            countPrice += eis.preis;

            formatDiv.appendChild(img);

            formatDiv.appendChild(beschreibung).innerHTML = "-->" + eis.beschreibung;
            formatDiv.appendChild(preis).innerHTML = "Kosten pro Stück: " + eis.preis + "€";
            formatDiv.appendChild(button).innerHTML = "Delete this";

        }
        totalPrice = <HTMLParagraphElement>document.createElement("h2");
        totalPrice.style.textAlign = "left";
        informationDiv.appendChild(totalPrice).innerHTML = "\xa0\xa0" + Math.round((countPrice + Number.EPSILON) * 100) / 100 + "€";
        let sendBuy: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
        sendBuy.addEventListener("click", onClickButtonStoreData.bind(sendBuy));
        let infoTag: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        infoTag.setAttribute("id", "infoTag");
        let confirmTag: HTMLParagraphElement = <HTMLParagraphElement>document.createElement("p");
        informationDiv.appendChild(confirmTag).innerHTML = "Wir senden Ihnen automatisch eine Bestätigungs Email, dort finden Sie unsere Bankdaten um die Bestellung abzuschließen";
        informationDiv.appendChild(infoTag).innerHTML = "Mit dem Klick auf den Buttons, erklären Sie sich einverstanden mit den Shop AGB`s";

        informationDiv.appendChild(sendBuy).innerHTML = "Bezahlen";


    }
    function generateContentInForm(): void {
        for (let index: number = 0; index <= localStorage.length - 1; index++) {
            let articleKey: string = <string>localStorage.key(index);
            let jsonString: string = <string>localStorage.getItem(articleKey);
            eis = <Eis>JSON.parse(jsonString);
            let nameLabel: HTMLLabelElement = document.createElement("label");
            nameLabel.setAttribute("for", "Bestellung:");
            let nameInput: HTMLInputElement = document.createElement("input");
            nameInput.setAttribute("name", "Bestellung");
            nameInput.setAttribute("value", eis.name);
            
            form.appendChild(nameLabel).innerHTML = eis.name;
            form.appendChild(nameInput).innerHTML =  eis.name;
            nameLabel.style.display = "none";
            nameInput.style.display = "none";

        }
        let preisLabel: HTMLLabelElement = document.createElement("label");
        preisLabel.setAttribute("for", "Gesamtpreis");
        let preisInput: HTMLInputElement = document.createElement("input");
        preisInput.setAttribute("name", "Gesamtpreis");
        preisInput.setAttribute("value", (Math.round((countPrice + Number.EPSILON) * 100) / 100).toString());
        
        form.appendChild(preisLabel).innerHTML = "Gesamtpreis: ";
        form.appendChild(preisInput).innerHTML = Math.round((countPrice + Number.EPSILON) * 100) / 100 + "";
        preisLabel.style.display = "none";
        preisInput.style.display = "none";
       
        }

    async function onClickButtonStoreData(_click: MouseEvent): Promise<void> {
        
       // let url: string = "http://localhost:8100";
        let url: string = "https://icecreamforyou.herokuapp.com";
        let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += "/storeData";
        url += "?" + query.toString();
        let h3TextStore: HTMLHeadingElement = <HTMLHeadingElement> document.createElement("h1");
        informationDiv.appendChild(h3TextStore).innerHTML = "Sie haben die Bestellung erfolgreich abeschickt, eine Bestätigungs-Email wurde soeben an Sie gesendet";

        let response: Response = await fetch(url);
       
        localStorage.clear();
        location.reload();
        console.log(response);

    }
    function onClickDeleteStorage(this: Eis, _click: MouseEvent): void {
        console.log("removedItem" + this.stück.toString());
        localStorage.removeItem(this.stück.toString());
        location.reload();
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
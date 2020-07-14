"use strict";
var Eisdiele;
(function (Eisdiele) {
    Eisdiele.jsonObj = [];
    async function communicate(_url) {
        let response = await fetch(_url);
        Eisdiele.jsonObj = await response.json();
        Eisdiele.generateIce();
    }
    Eisdiele.communicate = communicate;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=Communicate.js.map
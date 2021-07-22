"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Main {
        static mainGraphId = "Graph|2021-07-22T11:53:03.841Z|80843";
        static elementsId = "Graph|2021-07-22T13:52:14.409Z|26149";
        static root;
        static async init() {
            this.root = ƒ.Project.resources[this.mainGraphId];
            console.log(`Root: `, this.root);
            let response = await fetch("elements.dae");
            let xmlText = await response.text();
            let xml = new DOMParser().parseFromString(xmlText, "text/xml");
            let visualScene = xml.querySelector("library_visual_scenes #Scene");
            for (let child of visualScene.children) {
                console.log(child);
            }
            // console.log(this.root);
        }
    }
    Endabgabe.Main = Main;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Main.js.map
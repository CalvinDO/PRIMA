"use strict";
var Endabgabe;
(function (Endabgabe) {
    let ElementType;
    (function (ElementType) {
        ElementType[ElementType["DeadEnd"] = 0] = "DeadEnd";
        ElementType[ElementType["Tunnel"] = 1] = "Tunnel";
        ElementType[ElementType["Turn"] = 2] = "Turn";
        ElementType[ElementType["L"] = 3] = "L";
        ElementType[ElementType["T"] = 4] = "T";
        ElementType[ElementType["Tripod"] = 5] = "Tripod";
        ElementType[ElementType["X"] = 6] = "X";
        ElementType[ElementType["OneBlocker"] = 7] = "OneBlocker";
        ElementType[ElementType["Void"] = 8] = "Void";
    })(ElementType = Endabgabe.ElementType || (Endabgabe.ElementType = {}));
    class ElementLoader {
        static elementIDMap = {};
        static elementMap = {};
        static fillElementMapIds() {
            this.elementIDMap[ElementType.DeadEnd] = "Graph|2021-07-22T17:46:11.732Z|64322";
            this.elementIDMap[ElementType.Tunnel] = "Graph|2021-07-22T17:51:51.065Z|73974";
            this.elementIDMap[ElementType.Turn] = "Graph|2021-07-22T18:13:45.296Z|39193";
            this.elementIDMap[ElementType.L] = "Graph|2021-07-22T18:14:56.738Z|97747";
            this.elementIDMap[ElementType.T] = "Graph|2021-07-22T18:15:37.590Z|66393";
            this.elementIDMap[ElementType.Tripod] = "Graph|2021-07-22T18:20:21.900Z|43495";
            this.elementIDMap[ElementType.X] = "Graph|2021-07-22T18:20:25.830Z|95475";
            this.elementIDMap[ElementType.OneBlocker] = "Graph|2021-07-22T18:21:04.501Z|04478";
            this.elementIDMap[ElementType.Void] = "Graph|2021-07-22T18:21:39.646Z|92219";
        }
        static fillElementResources() {
            for (let key in this.elementIDMap) {
                this.elementMap[key] = ƒ.Project.resources[this.elementIDMap[key]];
            }
        }
        static stringToElementType(_name) {
            for (let index = 0; index < Object.keys(ElementType).length / 2; index++) {
                if (ElementType[index] == _name) {
                    return index;
                }
            }
            return ElementType.Void;
        }
        static findElementByXMLID(_name) {
            let nameFirstPart = _name.split("_")[0];
            let foundElementType = this.stringToElementType(nameFirstPart);
            return this.elementMap[foundElementType];
        }
        static async init() {
            this.fillElementMapIds();
            this.fillElementResources();
            Endabgabe.Main.root = ƒ.Project.resources[Endabgabe.Main.rootGraphId];
            let response = await fetch("elements.dae");
            let xmlText = await response.text();
            let xml = new DOMParser().parseFromString(xmlText, "text/xml");
            let visualScene = xml.querySelector("library_visual_scenes #Scene");
            for (let child of visualScene.children) {
                let newElement = await ƒ.Project.createGraphInstance(this.findElementByXMLID(child.id));
                let rotations = Array.prototype.slice.call(child.querySelectorAll("rotate"));
                let rotNumbers = rotations.map(axis => +axis.textContent.split(" ")[3]);
                let rotation = new ƒ.Vector3(rotNumbers[2], rotNumbers[1], rotNumbers[0]);
                let translations = child.querySelector("translate").textContent.split(" ").map(axis => +axis / 2);
                let translation = new ƒ.Vector3(translations[0], translations[1], translations[2]);
                newElement.cmpTransform.mtxLocal.translate(translation);
                newElement.cmpTransform.mtxLocal.rotate(rotation);
                Endabgabe.Main.root.appendChild(newElement);
            }
        }
    }
    Endabgabe.ElementLoader = ElementLoader;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=ElementLoader.js.map
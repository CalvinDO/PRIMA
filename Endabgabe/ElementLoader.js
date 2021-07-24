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
        static berryID = "Graph|2021-07-24T09:30:40.324Z|12995";
        static berry;
        static fillElementMapIds() {
            ElementLoader.elementIDMap[ElementType.DeadEnd] = "Graph|2021-07-22T17:46:11.732Z|64322";
            ElementLoader.elementIDMap[ElementType.Tunnel] = "Graph|2021-07-22T17:51:51.065Z|73974";
            ElementLoader.elementIDMap[ElementType.Turn] = "Graph|2021-07-22T18:13:45.296Z|39193";
            ElementLoader.elementIDMap[ElementType.L] = "Graph|2021-07-22T18:14:56.738Z|97747";
            ElementLoader.elementIDMap[ElementType.T] = "Graph|2021-07-22T18:15:37.590Z|66393";
            ElementLoader.elementIDMap[ElementType.Tripod] = "Graph|2021-07-22T18:20:21.900Z|43495";
            ElementLoader.elementIDMap[ElementType.X] = "Graph|2021-07-22T18:20:25.830Z|95475";
            ElementLoader.elementIDMap[ElementType.OneBlocker] = "Graph|2021-07-22T18:21:04.501Z|04478";
            ElementLoader.elementIDMap[ElementType.Void] = "Graph|2021-07-22T18:21:39.646Z|92219";
        }
        static fillElementResources() {
            for (let key in ElementLoader.elementIDMap) {
                ElementLoader.elementMap[key] = ƒ.Project.resources[ElementLoader.elementIDMap[key]];
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
        static async init() {
            ElementLoader.fillElementMapIds();
            ElementLoader.fillElementResources();
            ElementLoader.berry = ƒ.Project.resources[ElementLoader.berryID];
        }
        static async createElements() {
            Endabgabe.Main.createdElements = new ƒ.Node("CreatedElements");
            Endabgabe.Main.goals = new ƒ.Node("Goals");
            // Main.createdElements.addComponent(new ƒ.ComponentTransform);
            let response = await fetch("/PRIMA/elements.dae");
            let xmlText = await response.text();
            let xml = new DOMParser().parseFromString(xmlText, "text/xml");
            let visualScene = xml.querySelector("library_visual_scenes #Scene");
            for (let positionNode of visualScene.children) {
                let rotations = Array.prototype.slice.call(positionNode.querySelectorAll("rotate"));
                let rotNumbers = rotations.map(axis => +axis.textContent.split(" ")[3]);
                let rotation = new ƒ.Vector3(rotNumbers[2], rotNumbers[1], rotNumbers[0]);
                let translations = positionNode.querySelector("translate").textContent.split(" ").map(axis => +axis / 2);
                let translation = new ƒ.Vector3(translations[0], translations[1], translations[2]);
                let nameFirstPart = positionNode.id.split("_")[0];
                let newElement;
                if (nameFirstPart == "Goal") {
                    newElement = new Endabgabe.Goal(translation, rotation);
                }
                else {
                    let foundElementType = ElementLoader.stringToElementType(nameFirstPart);
                    newElement = new Endabgabe.Element(foundElementType, translation, rotation);
                }
                await newElement.setData();
                Endabgabe.Main.createdElements.appendChild(newElement);
            }
            Endabgabe.Main.root.appendChild(Endabgabe.Main.createdElements);
        }
    }
    Endabgabe.ElementLoader = ElementLoader;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=ElementLoader.js.map
namespace Endabgabe {

    export enum ElementType {
        DeadEnd = 0,
        Tunnel = 1,
        Turn = 2,
        L = 3,
        T = 4,
        Tripod = 5,
        X = 6,
        OneBlocker = 7,
        Void = 8
    }

    export interface ElementIDMap {
        [key: number]: string
    }

    export interface ElementMap {
        [key: number]: ƒ.Graph
    }

    export class ElementLoader {

        private static elementIDMap: ElementIDMap = {};

        public static elementMap: ElementMap = {};

        public static berryID: string = "Graph|2021-07-24T09:30:40.324Z|12995";
        public static berry: ƒ.Graph;


        private static fillElementMapIds(): void {
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

        private static fillElementResources(): void {
            for (let key in ElementLoader.elementIDMap) {
                ElementLoader.elementMap[key] = <ƒ.Graph>ƒ.Project.resources[ElementLoader.elementIDMap[key]];
            }
        }

        private static stringToElementType(_name: string): ElementType {
            for (let index: number = 0; index < Object.keys(ElementType).length / 2; index++) {

                if (ElementType[index] == _name) {
                    return index;
                }
            }
            return ElementType.Void;
        }

        public static async init(): Promise<void> {
            ElementLoader.fillElementMapIds();
            ElementLoader.fillElementResources();

            ElementLoader.berry = <ƒ.Graph>ƒ.Project.resources[ElementLoader.berryID];
        }

        public static async createElements() {
            Main.createdElements = new ƒ.Node("CreatedElements");
            Main.goals = new ƒ.Node("Goals");
            // Main.createdElements.addComponent(new ƒ.ComponentTransform);

            let response: Response = await fetch("elements.dae");
            let xmlText: string = await response.text();

            let xml: XMLDocument = new DOMParser().parseFromString(xmlText, "text/xml");
            let visualScene: ParentNode = <ParentNode>xml.querySelector("library_visual_scenes #Scene");


            for (let positionNode of visualScene.children) {

                let rotations: Node[] = Array.prototype.slice.call(positionNode.querySelectorAll("rotate"));
                let rotNumbers: number[] = rotations.map(axis => +axis.textContent.split(" ")[3]);
                let rotation: ƒ.Vector3 = new ƒ.Vector3(rotNumbers[2], rotNumbers[1], rotNumbers[0]);

                let translations: number[] = positionNode.querySelector("translate").textContent.split(" ").map(axis => +axis / 2);
                let translation: ƒ.Vector3 = new ƒ.Vector3(translations[0], translations[1], translations[2]);

                let nameFirstPart: string = positionNode.id.split("_")[0];

                let newElement: Element;

                if (nameFirstPart == "Goal") {
                    newElement = new Goal(translation, rotation);
                } else {
                    let foundElementType: ElementType = ElementLoader.stringToElementType(nameFirstPart);
                    newElement = new Element(foundElementType, translation, rotation);
                }

                await newElement.setData();
                Main.createdElements.appendChild(newElement);
            }

            Main.root.appendChild(Main.createdElements);
        }
    }
}
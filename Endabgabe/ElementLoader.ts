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

        private static elementMap: ElementMap = {};

        private static fillElementMapIds(): void {
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

        private static fillElementResources(): void {
            for (let key in this.elementIDMap) {
                this.elementMap[key] = <ƒ.Graph>ƒ.Project.resources[this.elementIDMap[key]];
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

        private static findElementByXMLID(_name: string): ƒ.Graph {
            let nameFirstPart: string = _name.split("_")[0];

            let foundElementType: ElementType = this.stringToElementType(nameFirstPart);
            let output: ƒ.Graph = this.elementMap[foundElementType];
            output.name = nameFirstPart;
            return output;
        }

        public static async init(): Promise<void> {
            this.fillElementMapIds();
            this.fillElementResources();
        }

        public static async createElements() {
            Main.createdElements = new ƒ.Node("CreatedElements");

            let response: Response = await fetch("elements.dae");
            let xmlText: string = await response.text();

            let xml: XMLDocument = new DOMParser().parseFromString(xmlText, "text/xml");
            let visualScene: ParentNode = <ParentNode>xml.querySelector("library_visual_scenes #Scene");

            for (let positionNode of visualScene.children) {
                let newElement: ƒ.GraphInstance = await ƒ.Project.createGraphInstance(this.findElementByXMLID(positionNode.id));



                let rotations: Node[] = Array.prototype.slice.call(positionNode.querySelectorAll("rotate"));
                let rotNumbers: number[] = rotations.map(axis => +axis.textContent.split(" ")[3]);
                let rotation: ƒ.Vector3 = new ƒ.Vector3(rotNumbers[2], rotNumbers[1], rotNumbers[0]);

                let translations: number[] = positionNode.querySelector("translate").textContent.split(" ").map(axis => +axis / 2);
                let translation: ƒ.Vector3 = new ƒ.Vector3(translations[0], translations[1], translations[2]);


                newElement.cmpTransform.mtxLocal.translate(translation);
                newElement.cmpTransform.mtxLocal.rotate(rotation);

                Main.createdElements.appendChild(newElement);
            }

            Main.root.appendChild(Main.createdElements);
        }
    }
}
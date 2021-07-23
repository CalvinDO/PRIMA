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

    export class Main {

        public static mainGraphId: string = "Graph|2021-07-22T18:15:55.902Z|69224";


        private static elementIDMap: ElementIDMap = {};

        private static elementMap: ElementMap = {};

        private static root: ƒ.Graph;


        public static fillElementMapIds(): void {
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

        public static fillElementResources(): void {
            for (let key in this.elementIDMap) {
                this.elementMap[key] = <ƒ.Graph>ƒ.Project.resources[this.elementIDMap[key]];
            }
        }

        public static stringToElementType(_name: string): ElementType {
            for (let index: number = 0; index < Object.keys(ElementType).length / 2; index++) {

                if (ElementType[index] == _name) {
                    return index;
                }
            }
            return ElementType.Void;
        }

        public static findElementByXMLID(_name: string): ƒ.Graph {
            let nameFirstPart: string = _name.split("_")[0];

            console.log("nameFirstPart: ", nameFirstPart);
            let foundElementType: ElementType = this.stringToElementType(nameFirstPart);
            console.log("foundElementType: ", foundElementType);
            return this.elementMap[foundElementType];
        }

        public static async init(): Promise<void> {
            this.fillElementMapIds();
            this.fillElementResources();

            console.log(this.elementIDMap);
            console.log(this.elementMap);

            this.root = <ƒ.Graph>ƒ.Project.resources[this.mainGraphId];



            let response: Response = await fetch("elements.dae");
            let xmlText: string = await response.text();

            let xml: XMLDocument = new DOMParser().parseFromString(xmlText, "text/xml");
            let visualScene: ParentNode = <ParentNode>xml.querySelector("library_visual_scenes #Scene");


            for (let child of visualScene.children) {
                // console.log(child.id);

                let newElement: ƒ.GraphInstance = await ƒ.Project.createGraphInstance(this.findElementByXMLID(child.id));

                let rotations: Node[] = Array.prototype.slice.call(child.querySelectorAll("rotate"));
                let rotNumbers: number[] = rotations.map(axis => +axis.textContent.split(" ")[3]);
                let rotation: ƒ.Vector3 = new ƒ.Vector3(rotNumbers[2], rotNumbers[1], rotNumbers[0]);

                let translations: number[] = child.querySelector("translate").textContent.split(" ").map(axis => +axis / 2);
                let translation: ƒ.Vector3 = new ƒ.Vector3(translations[0], translations[1], translations[2]);


                newElement.cmpTransform.mtxLocal.translate(translation);
                newElement.cmpTransform.mtxLocal.rotate(rotation);
                this.root.appendChild(newElement);
            }

            console.log(this.root);
        }
    }
}

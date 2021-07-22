namespace Endabgabe {


    export class Main {
        public static mainGraphId: string = "Graph|2021-07-22T11:53:03.841Z|80843";
        public static elementsId: string = "Graph|2021-07-22T13:52:14.409Z|26149";

        public static root: ƒ.Graph;

        public static async init() {
            this.root = <ƒ.Graph>ƒ.Project.resources[this.mainGraphId];
            console.log(`Root: `, this.root);



            let response: Response = await fetch("elements.dae");
            let xmlText: string = await response.text();

            let xml: XMLDocument = new DOMParser().parseFromString(xmlText, "text/xml");
            let visualScene: ParentNode = <ParentNode>xml.querySelector("library_visual_scenes #Scene");


            for (let child of visualScene.children) {
                console.log(child);

            }





            // console.log(this.root);
        }

        //create element instances:
        /*
         elementsGraph.cmpTransform.mtxLocal.translate(new ƒ.Vector3(10, 10, 10));
            this.root.appendChild(await ƒ.Project.createGraphInstance(elementsGraph));

            elementsGraph.cmpTransform.mtxLocal.translate(new ƒ.Vector3(0, 0, 10));
            this.root.appendChild(await ƒ.Project.createGraphInstance(elementsGraph));

            elementsGraph.cmpTransform.mtxLocal.translate(new ƒ.Vector3(10, 0, 10));
            this.root.appendChild(await ƒ.Project.createGraphInstance(elementsGraph));

            elementsGraph.cmpTransform.mtxLocal.translate(new ƒ.Vector3(0, 10, 0));
            this.root.appendChild(await ƒ.Project.createGraphInstance(elementsGraph));
        */
    }
}

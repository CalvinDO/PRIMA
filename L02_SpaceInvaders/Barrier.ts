namespace SpaceInvaders {
    import ƒ = FudgeCore;
    export class Barrier extends ƒ.Node {

        private resolution: number;
        private offset: number = 4.5;
        private size: number = 0.14;

        constructor(_position: ƒ.Vector3, _name: string, _resolution: number) {
            super(_name);

            this.resolution = _resolution;


            this.addComponent(new ƒ.ComponentTransform);
            this.createQuantConstillation();


            this.mtxLocal.translation = _position;
        }

        private createQuant(_position: ƒ.Vector3): ƒ.Node {
            let newQuant: ƒ.Node = new ƒ.Node("Quant");

            let mesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(new ƒ.MeshCube(this.name));
            newQuant.addComponent(mesh);
            let material: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat));
            newQuant.addComponent(material);
            newQuant.addComponent(new ƒ.ComponentTransform());

            let scaleVec: ƒ.Vector3 = ƒ.Vector3.ONE();
            scaleVec.scale(this.size);

            newQuant.mtxLocal.scale(scaleVec);
            newQuant.mtxLocal.translate(_position);

            return newQuant;
        }


        private createQuantConstillation() {
            for (let xIndex: number = 0; xIndex < this.resolution; xIndex++) {
                for (let yIndex: number = 0; yIndex < this.resolution; yIndex++) {
                    let newPos: ƒ.Vector3 = new ƒ.Vector3((xIndex * this.size * 2) * this.offset,(yIndex * this.size * 2) * this.offset);
                    newPos.add(this.mtxLocal.translation);

                    let newQuant: ƒ.Node = this.createQuant(newPos);

                    this.appendChild(newQuant);
                }
            }
        }
    }
}
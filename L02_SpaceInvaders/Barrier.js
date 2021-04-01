"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Barrier extends ƒ.Node {
        constructor(_position, _name, _resolution) {
            super(_name);
            this.offset = 4.5;
            this.size = 0.14;
            this.resolution = _resolution;
            this.addComponent(new ƒ.ComponentTransform);
            this.createQuantConstillation();
            this.mtxLocal.translation = _position;
        }
        createQuant(_position) {
            let newQuant = new ƒ.Node("Quant");
            let mesh = new ƒ.ComponentMesh(new ƒ.MeshCube(this.name));
            newQuant.addComponent(mesh);
            let material = new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat));
            newQuant.addComponent(material);
            newQuant.addComponent(new ƒ.ComponentTransform());
            let scaleVec = ƒ.Vector3.ONE();
            scaleVec.scale(this.size);
            newQuant.mtxLocal.scale(scaleVec);
            newQuant.mtxLocal.translate(_position);
            return newQuant;
        }
        createQuantConstillation() {
            for (let xIndex = 0; xIndex < this.resolution; xIndex++) {
                for (let yIndex = 0; yIndex < this.resolution; yIndex++) {
                    let newPos = new ƒ.Vector3((xIndex * this.size * 2) * this.offset, (yIndex * this.size * 2) * this.offset);
                    newPos.add(this.mtxLocal.translation);
                    let newQuant = this.createQuant(newPos);
                    this.appendChild(newQuant);
                }
            }
        }
    }
    SpaceInvaders.Barrier = Barrier;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Barrier.js.map
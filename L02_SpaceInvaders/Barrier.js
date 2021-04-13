"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Barrier extends SpaceInvaders.Rigidbody {
        constructor(_position, _scale, _name, _resolution) {
            super(_position, _scale, _name);
            this.offset = 1;
            this.size = 0.07;
            this.resolution = _resolution;
            this.createQuantConstillation();
            //this.appendChild(this.createQuant(new ƒ.Vector3(0,1)));
        }
        createVisual() {
        }
        createQuant(_position) {
            let scaleVec = ƒ.Vector3.ONE();
            scaleVec.scale(this.size);
            let newQuant = new SpaceInvaders.Quant(_position, scaleVec);
            return newQuant;
        }
        createQuantConstillation() {
            for (let xIndex = -this.resolution; xIndex < this.resolution / 2; xIndex++) {
                for (let yIndex = -this.resolution; yIndex < this.resolution / 2; yIndex++) {
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
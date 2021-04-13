namespace SpaceInvaders {
    import ƒ = FudgeCore;
    export class Barrier extends Rigidbody {

        private resolution: number;
        private offset: number = 1;
        private size: number = 0.07;

        constructor(_position: ƒ.Vector3, _scale: ƒ.Vector3, _name: string, _resolution: number) {
            super(_position, _scale, _name);

            this.resolution = _resolution;

            this.createQuantConstillation();

            //this.appendChild(this.createQuant(new ƒ.Vector3(0,1)));
        }

        public createVisual(): void{

        }
        
        private createQuant(_position: ƒ.Vector3): Quant {
            let scaleVec: ƒ.Vector3 = ƒ.Vector3.ONE();
            scaleVec.scale(this.size);

            let newQuant: Quant = new Quant(_position, scaleVec);

            return newQuant;
        }


        private createQuantConstillation() {
            for (let xIndex: number = -this.resolution; xIndex < this.resolution/2; xIndex++) {
                for (let yIndex: number = - this.resolution; yIndex < this.resolution /2; yIndex++) {
                    let newPos: ƒ.Vector3 = new ƒ.Vector3((xIndex * this.size * 2) * this.offset,(yIndex * this.size * 2) * this.offset);
                    newPos.add(this.mtxLocal.translation);

                    let newQuant: Quant = this.createQuant(newPos);

                    this.appendChild(newQuant);
                }
            }
        }
    }
}
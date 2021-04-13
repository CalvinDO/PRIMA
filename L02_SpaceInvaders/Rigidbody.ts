namespace SpaceInvaders {
    import ƒ = FudgeCore;

    export class Rigidbody extends ƒ.Node {

        public mesh: ƒ.ComponentMesh;
        public material: ƒ.ComponentMaterial;


        constructor(_position: ƒ.Vector3, _scale: ƒ.Vector3, _name: string) {

            super("Rigidbody");

            this.createVisual();

            this.addComponent(new ƒ.ComponentTransform);

            this.mtxLocal.translation = _position;
            this.mtxLocal.scale(_scale);
        }

        public createVisual(): void {

            this.mesh = new ƒ.ComponentMesh(new ƒ.MeshCube(this.name));
            this.addComponent(this.mesh);
            this.material = new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat));
            this.addComponent(this.material);
        }

        public translate(_translation: ƒ.Vector3) {
            this.mtxLocal.translate(_translation);
        }

        public translateX(_translation: number) {
            this.mtxLocal.translateX(_translation);
        }

        public checkCollision(): void{
           
        }
    }
}
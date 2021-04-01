namespace SpaceInvaders {
    import ƒ = FudgeCore;
    export class Invader extends ƒ.Node {

        public mesh: ƒ.ComponentMesh;
        public material: ƒ.ComponentMaterial;

        public transform: ƒ.ComponentTransform;

        constructor(_position: ƒ.Vector3, _name: string) {
            super(_name);

            this.createVisual();

            this.addComponent(new ƒ.ComponentTransform);

            this.mtxLocal.translation = _position;

            // this.transform = this.getComponent()

        }

        private createVisual() {
            this.mesh = new ƒ.ComponentMesh(new ƒ.MeshCube(this.name));
            this.addComponent(this.mesh);
            this.material = new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat));
            this.addComponent(this.material);
        }

        public translate(_translation: ƒ.Vector3) {
            this.mtxLocal.translate(_translation);
        }
    }
}
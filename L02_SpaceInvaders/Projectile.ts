namespace SpaceInvaders {
    import ƒ = FudgeCore;
    export class Projectile extends ƒ.Node {

        public mesh: ƒ.ComponentMesh;
        public material: ƒ.ComponentMaterial;

        public transform: ƒ.ComponentTransform;

        public size: number = 0.1;


        constructor(_position: ƒ.Vector3) {
            super("Projectile");

            this.createVisual();

            this.addComponent(new ƒ.ComponentTransform);

            this.mtxLocal.translation = _position;
        }

        private createVisual() {
            this.mesh = new ƒ.ComponentMesh(new ƒ.MeshCube(this.name));
            this.addComponent(this.mesh);
            this.material = new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat));
            this.mesh.mtxPivot.scale(new ƒ.Vector3(this.size, this.size, this.size));
            this.addComponent(this.material);
        }

        public translateY(_translation: number) {
            this.mtxLocal.translateY(_translation);
        }

    }
}
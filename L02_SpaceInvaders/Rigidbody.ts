namespace SpaceInvaders {
    import ƒ = FudgeCore;

    export class Rigidbody extends ƒ.Node {

        public mesh: ƒ.ComponentMesh;
        public material: ƒ.ComponentMaterial;

        public rect: ƒ.Rectangle;

        constructor(_position: ƒ.Vector3, _scale: ƒ.Vector3, _name: string) {

            super("Rigidbody");

            this.createVisual();

            this.addComponent(new ƒ.ComponentTransform);

            this.mtxLocal.translation = _position;
            this.mtxLocal.scale(_scale);


            this.rect = new ƒ.Rectangle(_position.x / 2, _position.y / 2, 1 / 2, 1 / 2)
        }

        public createVisual(): void {

            this.mesh = new ƒ.ComponentMesh(new ƒ.MeshCube(this.name));
            this.addComponent(this.mesh);
            this.material = new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat));
            this.addComponent(this.material);
        }

        public translate(_translation: ƒ.Vector3) {

            let rb: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody();

            rb.gravityScale = 0;
            
            this.mtxLocal.translate(_translation);
        }

        public translateX(_translation: number) {
            this.mtxLocal.translateX(_translation);
        }

        public translateY(_translation: number) {
            this.mtxLocal.translateY(_translation);
        }

        public checkCollision(_secondCollider: ƒ.Rectangle): boolean {
            if (!this.rect.collides(_secondCollider)) {
                
                return false;
            }
            return true;
        }
    }
}
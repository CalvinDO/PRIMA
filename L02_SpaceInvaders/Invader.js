"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    class Invader extends ƒ.Node {
        constructor(_position, _name) {
            super(_name);
            this.createVisual();
            this.addComponent(new ƒ.ComponentTransform);
            this.mtxLocal.translation = _position;
            // this.transform = this.getComponent()
        }
        createVisual() {
            this.mesh = new ƒ.ComponentMesh(new ƒ.MeshCube(this.name));
            this.addComponent(this.mesh);
            this.material = new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat));
            this.addComponent(this.material);
        }
        translate(_translation) {
            this.mtxLocal.translate(_translation);
        }
    }
    SpaceInvaders.Invader = Invader;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map
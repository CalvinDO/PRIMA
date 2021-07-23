"use strict";
var Test;
(function (Test_1) {
    class Test {
        static init() {
            let rootGraphId = "Graph|2021-07-23T18:57:00.981Z|47267";
            let root = ƒ.Project.resources[rootGraphId];
            for (let node of root.getChild(0).getChildren()) {
                node.addComponent(new ƒ.ComponentRigidbody(10, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
                console.log(node.name);
            }
            ƒ.Physics.adjustTransforms(root, true);
            ƒ.Physics.settings.debugMode = ƒ.PHYSICS_DEBUGMODE.PHYSIC_OBJECTS_ONLY;
            ƒ.Physics.settings.debugDraw = true;
            ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);
        }
    }
    Test_1.Test = Test;
})(Test || (Test = {}));
//# sourceMappingURL=Main.js.map
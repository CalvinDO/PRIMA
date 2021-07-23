"use strict";
var Endabgabe;
(function (Endabgabe) {
    class Main {
        static rootGraphId = "Graph|2021-07-23T14:18:52.304Z|39896";
        static root;
        static createdElements;
        static avatar;
        static avatarRb;
        static avatarHeadHeight = 0.5;
        static cmpCamera;
        static viewport;
        static rotationSpeed = 0.2;
        static maxXRotation = 85;
        static async init() {
            Main.root = ƒ.Project.resources[Main.rootGraphId];
            await Endabgabe.ElementLoader.init();
            Main.cmpCamera = new ƒ.ComponentCamera();
            Main.cmpCamera.mtxPivot.translateY(Main.avatarHeadHeight);
            await Endabgabe.ElementLoader.createElements();
            Main.createAvatar();
            Main.createRigidbodies();
            ƒ.Physics.adjustTransforms(Main.root, true);
            Main.setupAudio();
            Main.root.getChildrenByName("Ground")[0].addComponent(new ƒ.ComponentRigidbody(100, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
            window.addEventListener("mousemove", Main.onMouseMove);
            let canvas = document.querySelector("canvas");
            Main.viewport = new ƒ.Viewport();
            Main.viewport.initialize("InteractiveViewport", this.root, Main.cmpCamera, canvas);
            canvas.addEventListener("mousedown", canvas.requestPointerLock);
            canvas.addEventListener("mouseup", function () { document.exitPointerLock(); });
            ƒ.Debug.log("Graph:", this.root);
            ƒ.Debug.log("Viewport:", Main.viewport);
            //ƒ.Physics.settings.debugMode = ƒ.PHYSICS_DEBUGMODE.PHYSIC_OBJECTS_ONLY;
            // ƒ.Physics.settings.debugDraw = true;
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, Main.update);
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        }
        static setupAudio() {
            let cmpListener = new ƒ.ComponentAudioListener();
            Main.cmpCamera.getContainer().addComponent(cmpListener);
            ƒ.AudioManager.default.listenWith(cmpListener);
            ƒ.AudioManager.default.listenTo(this.root);
            ƒ.Debug.log("Audio:", ƒ.AudioManager.default);
        }
        static onMouseMove(_event) {
            Main.avatarRb.rotateBody(ƒ.Vector3.Y(-_event.movementX * Main.rotationSpeed));
            let XIncrement = _event.movementY * Main.rotationSpeed;
            let currentX = Main.cmpCamera.mtxPivot.rotation.x;
            let nextFrameX = XIncrement + currentX;
            if (nextFrameX > Main.maxXRotation) {
                XIncrement = Main.maxXRotation - currentX;
            }
            if (nextFrameX < -Main.maxXRotation) {
                XIncrement = -Main.maxXRotation - currentX;
            }
            Main.cmpCamera.mtxPivot.rotateX(XIncrement);
        }
        static clamp(_input, _max, _min) {
            return _input > _max ? _max : (_input < _min ? _min : _input);
        }
        static update() {
            ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);
            Main.viewport.draw();
        }
        static createRigidbodies() {
            for (let element of Main.createdElements.getChildren()) {
                for (let wall of element.getChildren()) {
                    // let transform: ƒ.ComponentTransform = wall.cmpTransform;
                    //console.log(transform.mtxLocal);
                    //let rotation: ƒ.Vector3 = transform.mtxLocal.rotation;
                    //let translation: ƒ.Vector3 = transform.mtxLocal.translation;
                    //let mtxLocal: ƒ.Matrix4x4 = transform.mtxLocal;
                    wall.addComponent(new ƒ.ComponentRigidbody(100, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
                    // wall.removeComponent(transform);
                    //wall.addComponent(new ƒ.ComponentTransform(mtxLocal));
                }
            }
        }
        static createAvatar() {
            Main.avatarRb = new ƒ.ComponentRigidbody(32.5, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.PHYSICS_GROUP.DEFAULT);
            Main.avatarRb.restitution = 0.2;
            Main.avatarRb.rotationInfluenceFactor = ƒ.Vector3.ZERO();
            Main.avatarRb.friction = 5;
            Main.avatar = new ƒ.Node("Avatar");
            Main.avatar.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(Main.avatarHeadHeight * 3))));
            Main.avatar.addComponent(Main.avatarRb);
            Main.avatar.addComponent(Main.cmpCamera);
            Main.root.appendChild(Main.avatar);
        }
    }
    Endabgabe.Main = Main;
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Main.js.map
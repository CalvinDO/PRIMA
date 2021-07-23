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
        static rotationSpeed = 0.1;
        static maxXRotation = 85;
        static acceleration = 0.4;
        static drag = 0.1;
        static preInit() {
            Main.init();
        }
        static async init() {
            await ƒ.Project.loadResourcesFromHTML();
            ƒ.Debug.log("Project:", ƒ.Project.resources);
            Main.root = ƒ.Project.resources[Main.rootGraphId];
            await Endabgabe.ElementLoader.init();
            await Endabgabe.ElementLoader.createElements();
            Main.cmpCamera = new ƒ.ComponentCamera();
            Main.cmpCamera.mtxPivot.translateY(Main.avatarHeadHeight);
            Main.createAvatar();
            Main.createRigidbodies();
            Main.setupAudio();
            ƒ.Physics.adjustTransforms(Main.root, true);
            window.addEventListener("mousemove", Main.onMouseMove);
            let canvas = document.querySelector("canvas");
            Main.viewport = new ƒ.Viewport();
            Main.viewport.initialize("InteractiveViewport", Main.root, Main.cmpCamera, canvas);
            canvas.addEventListener("mousedown", canvas.requestPointerLock);
            canvas.addEventListener("mouseup", function () { document.exitPointerLock(); });
            ƒ.Debug.log("Graph:", Main.root);
            ƒ.Debug.log("Viewport:", Main.viewport);
            ƒ.Physics.settings.debugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
            ƒ.Physics.settings.debugDraw = true;
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, Main.update);
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        }
        static setupAudio() {
            let cmpListener = new ƒ.ComponentAudioListener();
            Main.cmpCamera.getContainer().addComponent(cmpListener);
            ƒ.AudioManager.default.listenWith(cmpListener);
            ƒ.AudioManager.default.listenTo(Main.root);
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
            Main.handleKeys();
            Main.viewport.draw();
        }
        static handleKeys() {
            let playerForward = ƒ.Vector3.Z();
            let playerLeft = ƒ.Vector3.X();
            playerForward.transform(Main.avatar.mtxWorld, false);
            playerLeft.transform(Main.avatar.mtxWorld, false);
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
                playerForward.scale(Main.acceleration);
                Main.avatarRb.addVelocity(playerForward);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
                playerForward.scale(-Main.acceleration);
                Main.avatarRb.addVelocity(playerForward);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                playerLeft.scale(Main.acceleration);
                Main.avatarRb.addVelocity(playerLeft);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                playerLeft.scale(-Main.acceleration);
                Main.avatarRb.addVelocity(playerLeft);
            }
            let velo = Main.avatarRb.getVelocity();
            let xZVelo = new ƒ.Vector2(velo.x, velo.z);
            if (xZVelo.magnitude >= 0) {
                xZVelo.scale(1 - Main.drag);
                let newVelo = new ƒ.Vector3(xZVelo.x, velo.y, xZVelo.y);
                Main.avatarRb.setVelocity(newVelo);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]))
                Main.avatarRb.applyLinearImpulse(new ƒ.Vector3(0, 20, 0));
        }
        static createRigidbodies() {
            Main.root.getChildrenByName("Ground")[0].addComponent(new ƒ.ComponentRigidbody(100, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
            if (!Main.createdElements) {
                return;
            }
            for (let child of Main.createdElements.getChildren()) {
                for (let wall of child.getChildren()) {
                    wall.addComponent(new ƒ.ComponentRigidbody(10, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
                }
            }
        }
        static createAvatar() {
            Main.avatarRb = new ƒ.ComponentRigidbody(32.5, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.PHYSICS_GROUP.DEFAULT);
            Main.avatarRb.restitution = 0.2;
            Main.avatarRb.rotationInfluenceFactor = ƒ.Vector3.ZERO();
            Main.avatarRb.friction = 5;
            Main.avatar = new ƒ.Node("Avatar");
            Main.avatar.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(20))));
            Main.avatar.addComponent(Main.avatarRb);
            Main.avatar.addComponent(Main.cmpCamera);
            Main.avatar.mtxLocal.translateX(2);
            Main.root.appendChild(Main.avatar);
        }
    }
    Endabgabe.Main = Main;
    window.addEventListener("load", Main.preInit);
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Main.js.map
"use strict";
var Endabgabe;
(function (Endabgabe) {
    let Axis;
    (function (Axis) {
        Axis[Axis["X"] = 0] = "X";
        Axis[Axis["Z"] = 1] = "Z";
        Axis[Axis["-X"] = 2] = "-X";
        Axis[Axis["-Z"] = 3] = "-Z";
    })(Axis = Endabgabe.Axis || (Endabgabe.Axis = {}));
    class Main {
        static rootGraphId = "Graph|2021-07-23T14:18:52.304Z|39896";
        static root;
        static createdElements;
        static goals;
        static avatar;
        static avatarRb;
        static avatarHeadHeight = 0.5;
        static cmpCamera;
        static viewport;
        static isGrounded;
        static jumpForce = 20;
        static rotationSpeed = 0.1;
        static maxXRotation = 85;
        static acceleration = 1;
        static drag = 0.1;
        static avatarScale = 0.35;
        static collidingElement = null;
        static rotating;
        static rotationSum = 0;
        static rotationIncrement = 0;
        static rotationAcceleration = 0.025;
        static rotationAxis;
        static rotator;
        static rotateSound = new ƒ.Audio("/Endabgabe/Audio/rotate.wav");
        static backgroundSound = new ƒ.Audio("/Endabgabe/Audio/background.wav");
        static cmpRotateSound = new ƒ.ComponentAudio(Main.rotateSound);
        static cmpBackgroundSound = new ƒ.ComponentAudio(Main.backgroundSound);
        static isGameWon;
        static async init() {
            await ƒ.Project.loadResourcesFromHTML();
            Main.root = ƒ.Project.resources[Main.rootGraphId];
            await Endabgabe.ElementLoader.init();
            await Endabgabe.ElementLoader.createElements();
            let canvas = document.querySelector("canvas");
            Main.cmpCamera = new ƒ.ComponentCamera();
            Main.cmpCamera.mtxPivot.translateY(Main.avatarHeadHeight);
            Main.cmpCamera.projectCentral(16 / 9, 80);
            Main.createAvatar();
            Main.createRigidbodies();
            Main.setupAudio();
            ƒ.Physics.adjustTransforms(Main.root, true);
            Main.rotator = new ƒ.Node("Rotator");
            Main.rotator.addComponent(new ƒ.ComponentTransform);
            Main.root.appendChild(Main.rotator);
            window.addEventListener("mousemove", Main.onMouseMove);
            Main.viewport = new ƒ.Viewport();
            Main.viewport.initialize("InteractiveViewport", Main.root, Main.cmpCamera, canvas);
            canvas.addEventListener("mousedown", canvas.requestPointerLock);
            canvas.addEventListener("mouseup", function (_event) { if (_event.button == 1) {
                document.exitPointerLock();
            } });
            //ƒ.Physics.settings.debugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
            //ƒ.Physics.settings.debugDraw = true;
            Main.cmpBackgroundSound.play(true);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, Main.update);
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        }
        static setupAudio() {
            let cmpListener = new ƒ.ComponentAudioListener();
            Main.cmpCamera.getContainer().addComponent(cmpListener);
            let audio = new ƒ.Node("Audio");
            audio.addComponent(Main.cmpRotateSound);
            audio.addComponent(Main.cmpBackgroundSound);
            Main.cmpRotateSound.volume = 1;
            Main.cmpBackgroundSound.volume = 0.3;
            Main.avatar.appendChild(audio);
            ƒ.AudioManager.default.listenWith(cmpListener);
            ƒ.AudioManager.default.listenTo(Main.root);
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
        static onKeyUp(_event) {
            if (_event.key == "f") {
                Main.layBerry();
            }
        }
        static async layBerry() {
            let newBerry = await ƒ.Project.createGraphInstance(Endabgabe.ElementLoader.berry);
            let rb = new ƒ.ComponentRigidbody(5, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE, ƒ.PHYSICS_GROUP.DEFAULT);
            newBerry.addComponent(rb);
            rb.mtxPivot.translate(Main.avatar.mtxWorld.translation);
            Main.root.appendChild(newBerry);
            ƒ.Physics.adjustTransforms(newBerry, true);
        }
        static update() {
            ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);
            Main.playerIsGroundedRaycast();
            Main.handleMovementKeys();
            Main.handleRotationKeys();
            Main.handleBackgroundSound();
            Main.handleGoals();
            if (Main.rotating) {
                Main.rotateMaze();
            }
            Main.viewport.draw();
        }
        static playerIsGroundedRaycast() {
            let hitInfo;
            hitInfo = ƒ.Physics.raycast(this.avatarRb.getPosition(), new ƒ.Vector3(0, -1, 0), Main.avatarScale + 0.06);
            if (hitInfo.hit)
                Main.isGrounded = true;
            else
                Main.isGrounded = false;
        }
        static handleGoals() {
            for (let goal of Main.createdElements.getChildren()) {
                let currentGoal;
                if (goal instanceof Endabgabe.Goal) {
                    currentGoal = goal;
                    if (currentGoal.collidesWith(Main.avatar.mtxWorld.translation)) {
                        Main.gameWon();
                    }
                }
            }
        }
        static gameWon() {
            Main.isGameWon = true;
            alert("You have won the game!");
            console.log("You have won the game!");
            Main.cmpBackgroundSound.play(false);
        }
        static handleBackgroundSound() {
            if (!Main.cmpBackgroundSound.isPlaying && !Main.isGameWon) {
                Main.cmpBackgroundSound.play(true);
            }
        }
        static handleRotationKeys() {
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
                if (Main.rotating) {
                    return;
                }
                for (let child of Main.createdElements.getChildren()) {
                    let currentElement = child;
                    if (currentElement.collidesWith(Main.avatar.mtxWorld.translation)) {
                        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                            Main.rotationAxis = Axis["-Z"];
                        }
                        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                            Main.rotationAxis = Axis.Z;
                        }
                        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP])) {
                            Main.rotationAxis = Axis["-X"];
                        }
                        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
                            Main.rotationAxis = Axis.X;
                        }
                        Main.startRotation(currentElement);
                    }
                }
            }
        }
        static rotateMaze() {
            let rotationTransform;
            switch (Main.rotationAxis) {
                case Axis.X:
                    rotationTransform = ƒ.Matrix4x4.ROTATION_X(Main.rotationIncrement);
                    break;
                case Axis["-X"]:
                    rotationTransform = ƒ.Matrix4x4.ROTATION_X(-Main.rotationIncrement);
                    break;
                case Axis.Z:
                    rotationTransform = ƒ.Matrix4x4.ROTATION_Z(Main.rotationIncrement);
                    break;
                case Axis["-Z"]:
                    rotationTransform = ƒ.Matrix4x4.ROTATION_Z(-Main.rotationIncrement);
                    break;
                default:
                    break;
            }
            for (let child of Main.createdElements.getChildren()) {
                child.cmpTransform.transform(rotationTransform, ƒ.BASE.NODE, Main.rotator);
            }
            Main.rotationSum += Main.rotationIncrement;
            Main.rotationIncrement += Main.rotationAcceleration;
            if (Main.rotationSum >= 90) {
                Main.finishRotation();
            }
        }
        static finishRotation() {
            Main.rotating = false;
            let overflow = Main.rotationSum - 90;
            let rotationOverflow;
            switch (Main.rotationAxis) {
                case Axis.X:
                    rotationOverflow = ƒ.Matrix4x4.ROTATION_X(-overflow);
                    break;
                case Axis["-X"]:
                    rotationOverflow = ƒ.Matrix4x4.ROTATION_X(overflow);
                    break;
                case Axis.Z:
                    rotationOverflow = ƒ.Matrix4x4.ROTATION_Z(-overflow);
                    break;
                case Axis["-Z"]:
                    rotationOverflow = ƒ.Matrix4x4.ROTATION_Z(overflow);
                    break;
                default:
                    break;
            }
            for (let child of Main.createdElements.getChildren()) {
                child.cmpTransform.transform(rotationOverflow, ƒ.BASE.NODE, Main.rotator);
            }
            Main.rotationSum = 0;
            Main.rotationIncrement = 0;
        }
        static startRotation(currentElement) {
            Main.rotating = true;
            let rotationPoint = currentElement.mtxWorld.translation;
            Main.rotator.mtxLocal.set(ƒ.Matrix4x4.IDENTITY());
            Main.rotator.mtxLocal.translate(rotationPoint);
            Main.cmpRotateSound.play(true);
        }
        static handleMovementKeys() {
            let playerForward = ƒ.Vector3.Z();
            let playerLeft = ƒ.Vector3.X();
            playerForward.transform(Main.avatar.mtxWorld, false);
            playerLeft.transform(Main.avatar.mtxWorld, false);
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
                playerForward.scale(Main.acceleration);
                Main.avatarRb.addVelocity(playerForward);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
                playerForward.scale(-Main.acceleration);
                Main.avatarRb.addVelocity(playerForward);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
                playerLeft.scale(Main.acceleration);
                Main.avatarRb.addVelocity(playerLeft);
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
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
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                if (Main.isGrounded) {
                    Main.avatarRb.applyLinearImpulse(new ƒ.Vector3(0, Main.jumpForce, 0));
                }
            }
        }
        static createRigidbodies() {
            if (!Main.createdElements) {
                return;
            }
            for (let child of Main.createdElements.getChildren()) {
                let currentElement = child;
                currentElement.addRigidbodies();
            }
        }
        static createAvatar() {
            Main.avatarRb = new ƒ.ComponentRigidbody(65, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.PHYSICS_GROUP.DEFAULT);
            Main.avatarRb.restitution = 0.2;
            Main.avatarRb.rotationInfluenceFactor = ƒ.Vector3.ZERO();
            Main.avatarRb.friction = 5;
            Main.avatar = new ƒ.Node("Avatar");
            Main.avatar.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(0))));
            let scale = new ƒ.Vector3(1, 1, 1);
            scale.scale(Main.avatarScale);
            Main.avatar.cmpTransform.mtxLocal.scale(scale);
            Main.avatar.addComponent(Main.avatarRb);
            Main.avatar.addComponent(Main.cmpCamera);
            Main.root.appendChild(Main.avatar);
        }
    }
    Endabgabe.Main = Main;
    window.addEventListener("load", Main.init);
    window.addEventListener("keyup", Main.onKeyUp);
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=Main.js.map
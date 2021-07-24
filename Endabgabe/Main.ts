namespace Endabgabe {


    export class Main {

        public static rootGraphId: string = "Graph|2021-07-23T14:18:52.304Z|39896";

        public static root: ƒ.Graph;
        public static createdElements: ƒ.Node;
        public static goals: ƒ.Node;


        public static avatar: ƒ.Node;

        public static avatarRb: ƒ.ComponentRigidbody;
        public static avatarHeadHeight: number = 0.5;

        public static cmpCamera: ƒ.ComponentCamera;

        public static viewport: ƒ.Viewport;

        public static isGrounded: boolean;
        public static jumpForce: number = 750;

        public static rotationSpeed: number = 0.1;
        public static maxXRotation: number = 85;

        public static movementAcceleration: number = 28;
        public static movementDrag: number = 0.1;

        public static avatarScale: number = 0.35;

        public static collidingElement: Element = null;


        public static rotating: boolean;
        public static rotationSum: number = 0;
        public static rotationIncrement: number = 0;
        public static rotationAcceleration: number = 100;

        public static rotationAxis: Axis;

        public static rotator: ƒ.Node;


        public static rotateSound: ƒ.Audio = new ƒ.Audio("/PRIMA/Endabgabe/Audio/rotate.wav");
        public static backgroundSound: ƒ.Audio = new ƒ.Audio("/PRIMA/Endabgabe/Audio/background.mp3");
        public static winSound: ƒ.Audio = new ƒ.Audio("/PRIMA/Endabgabe/Audio/win.mp3");

        public static cmpRotateSound: ƒ.ComponentAudio = new ƒ.ComponentAudio(Main.rotateSound);
        public static cmpBackgroundSound: ƒ.ComponentAudio = new ƒ.ComponentAudio(Main.backgroundSound);
        public static cmpWinSound: ƒ.ComponentAudio = new ƒ.ComponentAudio(Main.winSound);

        public static isGameWon: boolean;

        public static isModeHardcore: boolean;

        public static hardcoreToggle: HTMLInputElement;


        public static async init(): Promise<void> {
            Main.hardcoreToggle = document.querySelector("#hardcoreMode input");
            Main.hardcoreToggle.onchange = function () { Main.isModeHardcore = Main.hardcoreToggle.checked };

            await ƒ.Project.loadResourcesFromHTML();


            Main.root = <ƒ.Graph>ƒ.Project.resources[Main.rootGraphId];

            await ElementLoader.init();
            await ElementLoader.createElements();

            let canvas = document.querySelector("canvas");

            Main.cmpCamera = new ƒ.ComponentCamera();

            Main.cmpCamera.mtxPivot.translateY(Main.avatarHeadHeight);
            Main.cmpCamera.projectCentral(16 / 9, 90, 0.5, 0.1);

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
            canvas.addEventListener("mouseup", function (_event: MouseEvent) { if (_event.button == 1) { document.exitPointerLock(); } });


            //ƒ.Physics.settings.debugMode = ƒ.PHYSICS_DEBUGMODE.COLLIDERS;
            //ƒ.Physics.settings.debugDraw = true;

            Main.cmpBackgroundSound.play(true);
            console.log(Main.cmpBackgroundSound);

            ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, Main.update);
            ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        }


        private static setupAudio(): void {
            let cmpListener = new ƒ.ComponentAudioListener();
            Main.cmpCamera.getContainer().addComponent(cmpListener);

            let audio: ƒ.Node = new ƒ.Node("Audio");
            audio.addComponent(Main.cmpRotateSound);
            audio.addComponent(Main.cmpBackgroundSound);
            audio.addComponent(Main.cmpWinSound);

            Main.cmpRotateSound.volume = 1;
            Main.cmpBackgroundSound.volume = 0.3;
            Main.cmpWinSound.volume = 2;

            Main.avatar.appendChild(audio);

            ƒ.AudioManager.default.listenWith(cmpListener);
            ƒ.AudioManager.default.listenTo(Main.root);
        }


        private static onMouseMove(_event: MouseEvent): void {
            Main.avatarRb.rotateBody(ƒ.Vector3.Y(-_event.movementX * Main.rotationSpeed));

            let XIncrement: number = _event.movementY * Main.rotationSpeed;
            let currentX: number = Main.cmpCamera.mtxPivot.rotation.x;
            let nextFrameX: number = XIncrement + currentX;

            if (nextFrameX > Main.maxXRotation) {
                XIncrement = Main.maxXRotation - currentX;
            }

            if (nextFrameX < -Main.maxXRotation) {
                XIncrement = -Main.maxXRotation - currentX;
            }

            Main.cmpCamera.mtxPivot.rotateX(XIncrement);


        }

        public static onKeyUp(_event: KeyboardEvent) {
            if (_event.key == "f") {
                Main.layBerry();
            }
        }

        private static async layBerry(): Promise<void> {
            let newBerry: ƒ.GraphInstance = await ƒ.Project.createGraphInstance(ElementLoader.berry);

            let rb: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(5, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE, ƒ.PHYSICS_GROUP.DEFAULT);
            newBerry.addComponent(rb);
            rb.mtxPivot.translate(Main.avatar.mtxWorld.translation);
            Main.root.appendChild(newBerry);
            ƒ.Physics.adjustTransforms(newBerry, true);
        }

        private static update(): void {
            ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);

            Main.playerIsGroundedRaycast();

            if (!Main.isModeHardcore) {
                Main.handleMovementKeys(ƒ.Loop.timeFrameReal / 1000);
            }
            Main.handleRotationKeys();
            Main.handleBackgroundSound();
            Main.handleGoals();

            if (Main.rotating) {
                Main.rotateMaze(ƒ.Loop.timeFrameReal / 1000);
            }

            Main.viewport.draw();
        }

        private static playerIsGroundedRaycast(): void {
            let hitInfo: ƒ.RayHitInfo;
            hitInfo = ƒ.Physics.raycast(Main.avatarRb.getPosition(), new ƒ.Vector3(0, - 1, 0), Main.avatarScale + 0.1);
            if (hitInfo.hit)
                Main.isGrounded = true;
            else
                Main.isGrounded = false;
        }

        private static handleGoals(): void {

            for (let goal of Main.createdElements.getChildren()) {
                let currentGoal: Goal;

                if (goal instanceof Goal) {
                    currentGoal = <Goal>goal;
                    if (currentGoal.collidesWith(Main.avatar.mtxWorld.translation)) {
                        Main.winGame();
                    }
                }

            }
        }

        private static winGame(): void {
            ƒ.Loop.stop();
            Main.isGameWon = true;
            Main.cmpBackgroundSound.play(false);
            Main.cmpWinSound.play(true);

            //alert("You have won the game!");
            console.log("You have won the game!");

        }

        private static handleBackgroundSound(): void {
            if (!Main.cmpBackgroundSound.isPlaying && !Main.isGameWon) {
                Main.cmpBackgroundSound.play(true);
            }
        }

        private static handleRotationKeys(): void {

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT,
            ƒ.KEYBOARD_CODE.ARROW_RIGHT,
            ƒ.KEYBOARD_CODE.ARROW_UP,
            ƒ.KEYBOARD_CODE.ARROW_DOWN,
            ƒ.KEYBOARD_CODE.Q,
            ƒ.KEYBOARD_CODE.E,
            ƒ.KEYBOARD_CODE.CTRL_LEFT,
            ƒ.KEYBOARD_CODE.SHIFT_LEFT,
            ƒ.KEYBOARD_CODE.C

            ])) {
                if (Main.rotating) {
                    return;
                }

                for (let child of Main.createdElements.getChildren()) {
                    let currentElement: Element = <Element>child;

                    if (currentElement.collidesWith(Main.avatar.mtxWorld.translation)) {

                        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT, ƒ.KEYBOARD_CODE.Q])) {

                            Main.rotationAxis = Main.getOrientatedAxisFrom(Axis["-Z"]);

                        } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT, ƒ.KEYBOARD_CODE.E])) {

                            Main.rotationAxis = Main.getOrientatedAxisFrom(Axis.Z);

                        } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP, ƒ.KEYBOARD_CODE.SHIFT_LEFT])) {

                            Main.rotationAxis = Main.getOrientatedAxisFrom(Axis.X);

                        } else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN, ƒ.KEYBOARD_CODE.CTRL_LEFT])) {

                            Main.rotationAxis = Main.getOrientatedAxisFrom(Axis["-X"]);
                        }

                        Main.startRotation(currentElement);
                    }
                }
            }
        }

        private static getOrientatedAxisFrom(_axis: Axis): Axis {

            let avatarAxis: Axis;


            let playerForward: ƒ.Vector3 = ƒ.Vector3.Z();
            playerForward.transform(Main.avatar.mtxWorld, false);


            if (Math.abs(playerForward.z) > Math.abs(playerForward.x)) {

                if (playerForward.z > 0) {
                    avatarAxis = Axis["-Z"];
                } else {
                    avatarAxis = Axis.Z;
                }

            } else {

                if (playerForward.x > 0) {
                    avatarAxis = Axis["-X"];
                } else {
                    avatarAxis = Axis.X;
                }
            }




            let resultingAxis: Axis = avatarAxis + _axis;


            return Main.getModuloedAxis(resultingAxis);

        }

        private static getModuloedAxis(_dirtyAxis: Axis): Axis {
            return (_dirtyAxis % 4);
        }

        private static rotateMaze(_deltaTime: number): void {

            let rotationTransform: ƒ.Matrix4x4;
            let scaledRotationIncrement: number = Main.rotationIncrement * _deltaTime;

            switch (Main.rotationAxis) {
                case Axis.X:
                    rotationTransform = ƒ.Matrix4x4.ROTATION_X(scaledRotationIncrement);
                    break;
                case Axis["-X"]:
                    rotationTransform = ƒ.Matrix4x4.ROTATION_X(-scaledRotationIncrement);
                    break;
                case Axis.Z:
                    rotationTransform = ƒ.Matrix4x4.ROTATION_Z(scaledRotationIncrement);
                    break;
                case Axis["-Z"]:
                    rotationTransform = ƒ.Matrix4x4.ROTATION_Z(-scaledRotationIncrement);
                    break;
                default:
                    break;
            }


            for (let child of Main.createdElements.getChildren()) {
                child.cmpTransform.transform(rotationTransform, ƒ.BASE.NODE, Main.rotator);
            }

            Main.rotationSum += scaledRotationIncrement;
            Main.rotationIncrement += Main.rotationAcceleration * _deltaTime;

            if (Main.rotationSum >= 90) {
                Main.finishRotation();
            }
        }


        private static finishRotation() {

            Main.rotating = false;

            let overflow: number = Main.rotationSum - 90;
            let rotationOverflow: ƒ.Matrix4x4;



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


        private static startRotation(currentElement: Element) {

            Main.rotating = true;

            let rotationPoint: ƒ.Vector3 = currentElement.mtxWorld.translation;

            Main.rotator.mtxLocal.set(ƒ.Matrix4x4.IDENTITY());
            Main.rotator.mtxLocal.translate(rotationPoint);

            Main.cmpRotateSound.play(true);
        }


        private static handleMovementKeys(_deltaTime: number) {

            let playerForward: ƒ.Vector3 = ƒ.Vector3.Z();
            let playerLeft: ƒ.Vector3 = ƒ.Vector3.X();

            playerForward.transform(Main.avatar.mtxWorld, false);
            playerLeft.transform(Main.avatar.mtxWorld, false);

            playerForward.scale(_deltaTime);
            playerLeft.scale(_deltaTime);

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
                playerForward.scale(Main.movementAcceleration);
                Main.avatarRb.addVelocity(playerForward);
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S])) {
                playerForward.scale(-Main.movementAcceleration);
                Main.avatarRb.addVelocity(playerForward);
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A])) {
                playerLeft.scale(Main.movementAcceleration);
                Main.avatarRb.addVelocity(playerLeft);
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D])) {
                playerLeft.scale(-Main.movementAcceleration);
                Main.avatarRb.addVelocity(playerLeft);
            }

            let velo: ƒ.Vector3 = Main.avatarRb.getVelocity();
            let xZVelo: ƒ.Vector2 = new ƒ.Vector2(velo.x, velo.z);

            if (xZVelo.magnitude >= 0) {
                xZVelo.scale(1 - Main.movementDrag);
                let newVelo: ƒ.Vector3 = new ƒ.Vector3(xZVelo.x, velo.y, xZVelo.y);
                Main.avatarRb.setVelocity(newVelo);
            }

            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                if (Main.isGrounded) {
                    Main.avatarRb.applyLinearImpulse(new ƒ.Vector3(0, Main.jumpForce * _deltaTime, 0));
                }
            }
        }

        private static createRigidbodies() {
            if (!Main.createdElements) {
                return;
            }
            for (let child of Main.createdElements.getChildren()) {
                let currentElement: Element = <Element>child;
                currentElement.addRigidbodies();
                ƒ.Physics.adjustTransforms(child, true);
            }
        }


        private static createAvatar() {

            Main.avatarRb = new ƒ.ComponentRigidbody(65, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.PHYSICS_GROUP.DEFAULT);
            Main.avatarRb.restitution = 0.1;
            Main.avatarRb.rotationInfluenceFactor = ƒ.Vector3.ZERO();
            Main.avatarRb.friction = 0.1;

            Main.avatar = new ƒ.Node("Avatar");
            Main.avatar.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(0))));

            let scale: ƒ.Vector3 = new ƒ.Vector3(1, 1, 1);
            scale.scale(Main.avatarScale);

            Main.avatar.cmpTransform.mtxLocal.scale(scale);
            Main.avatar.addComponent(Main.avatarRb);
            Main.avatar.addComponent(Main.cmpCamera);


            Main.root.appendChild(Main.avatar);
        }

    }

    window.addEventListener("load", Main.init);
    window.addEventListener("keyup", Main.onKeyUp);
}

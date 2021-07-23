"use strict";
var L05_PhysicsGame;
(function (L05_PhysicsGame) {
    var ƒ = FudgeCore;
    // import fAid = FudgeAid;
    let audioBackground = new ƒ.Audio("./music/backgroundmusic.mp3");
    let audioGrab = new ƒ.Audio("./music/grab.wav");
    let audioShoot = new ƒ.Audio("./music/shoot.wav");
    let rootGraph;
    let cmpAvatar;
    let cmpRigidbodyBall;
    let ball;
    let avatarNode;
    let childAvatarNode;
    let viewport;
    let cmpCamera;
    let forwardMovement = 0;
    let backwardMovement = 0;
    let movementspeed = 12;
    let turningspeed = 12;
    let playerJumpForce = 2000;
    let isGrounded;
    let distance;
    let kickStrength = 750;
    let isGrabbed;
    let mouseMove = new ƒ.Vector2();
    let isMouseMooving;
    let cmpAudioGrab = new ƒ.ComponentAudio(audioGrab);
    let cmpAudioShoot = new ƒ.ComponentAudio(audioShoot);
    window.addEventListener("load", start);
    window.addEventListener("mousemove", onMouseMove);
    async function start(_event) {
        await FudgeCore.Project.loadResourcesFromHTML();
        // await FudgeCore.Project.loadResources("PhysicsGame.json");
        FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
        // pick the graph to show
        rootGraph = FudgeCore.Project.resources["Graph|2021-04-27T14:37:42.239Z|64317"];
        cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.clrBackground = ƒ.Color.CSS("DEEPSKYBLUE");
        cmpCamera.mtxPivot.translateY(1);
        cmpCamera.mtxPivot.rotateX(0);
        createAvatar();
        createRigidbodies();
        let canvas = document.querySelector("canvas");
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", rootGraph, cmpCamera, canvas);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
    }
    function createAvatar() {
        cmpAvatar = new ƒ.ComponentRigidbody(75, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.CAPSULE, ƒ.PHYSICS_GROUP.DEFAULT);
        cmpAvatar.restitution = 0.5;
        cmpAvatar.rotationInfluenceFactor = ƒ.Vector3.ZERO();
        cmpAvatar.friction = 1;
        avatarNode = new ƒ.Node("AvatarNode");
        avatarNode.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(3))));
        avatarNode.addComponent(cmpAvatar);
        avatarNode.addComponent(cmpCamera);
        childAvatarNode = new ƒ.Node("childAvatarNode");
        avatarNode.appendChild(childAvatarNode);
        childAvatarNode.addComponent(new ƒ.ComponentTransform());
        childAvatarNode.mtxLocal.translate(new ƒ.Vector3(0, 0.75, 5));
        rootGraph.appendChild(avatarNode);
        setupAudio();
    }
    function setupAudio() {
        // setup audio
        let cmpListener = new ƒ.ComponentAudioListener();
        cmpCamera.getContainer().addComponent(cmpListener);
        let audioNode = new ƒ.Node("audioNode");
        let cmpAudioBackground = new ƒ.ComponentAudio(audioBackground, true, true);
        cmpAudioBackground.volume = 0.2;
        audioNode.addComponent(cmpAudioBackground);
        audioNode.addComponent(cmpAudioGrab);
        audioNode.addComponent(cmpAudioShoot);
        avatarNode.appendChild(audioNode);
        FudgeCore.AudioManager.default.listenWith(cmpListener);
        FudgeCore.AudioManager.default.listenTo(audioNode);
        console.log(FudgeCore.AudioManager.default.volume);
    }
    function update() {
        ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);
        playerIsGroundedRaycast();
        handleKeys(ƒ.Loop.timeFrameReal / 1000);
        isGrabbingObjects();
        player_Movement(ƒ.Loop.timeFrameReal / 1000);
        viewport.draw();
        ƒ.AudioManager.default.update();
        if (ball == undefined)
            return;
        if (ball.mtxWorld.translation.y < 0) {
            cmpRigidbodyBall.setVelocity(ƒ.Vector3.ZERO());
            cmpRigidbodyBall.setRotation(ƒ.Vector3.ZERO());
            cmpRigidbodyBall.setPosition(new ƒ.Vector3(0, 4, 0));
            ball.mtxWorld.translate(new ƒ.Vector3(0, 4, 0));
        }
        if (avatarNode.mtxWorld.translation.y < 0) {
            cmpAvatar.setVelocity(ƒ.Vector3.ZERO());
            cmpAvatar.setRotation(ƒ.Vector3.ZERO());
            cmpAvatar.setPosition(new ƒ.Vector3(0, 4, 0));
            avatarNode.mtxWorld.translate(new ƒ.Vector3(0, 4, 0));
        }
        if (isGrabbed) {
            cmpRigidbodyBall.setVelocity(ƒ.Vector3.ZERO());
            cmpRigidbodyBall.setRotation(ƒ.Vector3.ZERO());
            cmpRigidbodyBall.setPosition(childAvatarNode.mtxWorld.translation);
            ball.mtxWorld.translate(childAvatarNode.mtxWorld.translation);
        }
        if (!isMouseMooving)
            mouseMove = ƒ.Vector2.ZERO();
        isMouseMooving = false;
    }
    function createRigidbodies() {
        let level = rootGraph.getChildrenByName("level")[0];
        for (let node of level.getChildren()) {
            let cmpRigidbody = new ƒ.ComponentRigidbody(0, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigidbody);
        }
        ball = rootGraph.getChildrenByName("ball")[0];
        cmpRigidbodyBall = new ƒ.ComponentRigidbody(25, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE, ƒ.PHYSICS_GROUP.GROUP_2);
        ball.addComponent(cmpRigidbodyBall);
        ƒ.Physics.adjustTransforms(rootGraph, true);
    }
    function handleKeys(_deltaTime) {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP]))
            forwardMovement = 1.33;
        else if (forwardMovement >= 0)
            forwardMovement -= _deltaTime * 2;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN]))
            backwardMovement = -1.33;
        else if (backwardMovement <= 0)
            backwardMovement += _deltaTime * 2;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]))
            if (isGrounded)
                cmpAvatar.applyLinearImpulse(new ƒ.Vector3(0, playerJumpForce, 0));
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.T]))
            ƒ.Physics.settings.debugMode = ƒ.Physics.settings.debugMode == ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER ? ƒ.PHYSICS_DEBUGMODE.PHYSIC_OBJECTS_ONLY : ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.Y]))
            ƒ.Physics.settings.debugDraw = !ƒ.Physics.settings.debugDraw;
    }
    function player_Movement(_deltaTime) {
        let playerForward;
        playerForward = ƒ.Vector3.Z();
        playerForward.transform(avatarNode.mtxWorld, false);
        cmpAvatar.rotateBody(new ƒ.Vector3(-mouseMove.y * turningspeed * _deltaTime, 0, 0));
        cmpAvatar.rotateBody(new ƒ.Vector3(0, -mouseMove.x * turningspeed * _deltaTime, 0));
        let movementVelocity = new ƒ.Vector3();
        movementVelocity.x = playerForward.x * (forwardMovement + backwardMovement) * movementspeed;
        movementVelocity.y = cmpAvatar.getVelocity().y;
        movementVelocity.z = playerForward.z * (forwardMovement + backwardMovement) * movementspeed;
        cmpAvatar.setVelocity(movementVelocity);
    }
    function onMouseMove(_event) {
        mouseMove = new ƒ.Vector2(_event.movementX, _event.movementY);
        isMouseMooving = true;
    }
    function isGrabbingObjects() {
        if (cmpRigidbodyBall != undefined) {
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.E])) {
                distance = ƒ.Vector3.DIFFERENCE(ball.mtxWorld.translation, avatarNode.mtxWorld.translation);
                if (distance.magnitude > 4)
                    return;
                cmpAudioGrab.play(true);
                cmpRigidbodyBall.setVelocity(ƒ.Vector3.ZERO());
                cmpRigidbodyBall.setRotation(ƒ.Vector3.ZERO());
                isGrabbed = true;
            }
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.R]) && isGrabbed == true) {
                cmpAudioShoot.play(true);
                isGrabbed = false;
                let playerForward;
                playerForward = ƒ.Vector3.Z();
                playerForward.transform(avatarNode.mtxWorld, false);
                cmpRigidbodyBall.applyImpulseAtPoint(new ƒ.Vector3(playerForward.x * kickStrength, playerForward.y * 5 * kickStrength, playerForward.z * kickStrength), avatarNode.mtxWorld.translation);
            }
        }
    }
    function playerIsGroundedRaycast() {
        let hitInfo;
        hitInfo = ƒ.Physics.raycast(cmpAvatar.getPosition(), new ƒ.Vector3(0, -1, 0), 1.1);
        if (hitInfo.hit)
            isGrounded = true;
        else
            isGrounded = false;
    }
})(L05_PhysicsGame || (L05_PhysicsGame = {}));
//# sourceMappingURL=PhysicsGame.js.map
"use strict";
var Endabgabe;
(function (Endabgabe) {
    (function (_graphId) {
        window.addEventListener("load", init);
        // show dialog for startup
        let dialog;
        function init(_event) {
            dialog = document.querySelector("dialog");
            dialog.addEventListener("click", function (_event) {
                dialog.close();
                startInteractiveViewport();
            });
            dialog.showModal();
        }
        // setup and start interactive viewport
        async function startInteractiveViewport() {
            // load resources referenced in the link-tag
            await ƒ.Project.loadResourcesFromHTML();
            ƒ.Debug.log("Project:", ƒ.Project.resources);
            await Endabgabe.Main.init();
            // pick the graph to show
            console.log("graphID: ", _graphId);
            let graph = ƒ.Project.resources[_graphId];
            ƒ.Debug.log("Graph:", graph);
            // setup the viewport
            let cmpCamera = new ƒ.ComponentCamera();
            let canvas = document.querySelector("canvas");
            let viewport = new ƒ.Viewport();
            viewport.initialize("InteractiveViewport", graph, cmpCamera, canvas);
            ƒ.Debug.log("Viewport:", viewport);
            // hide the cursor when interacting, also suppressing right-click menu
            canvas.addEventListener("mousedown", canvas.requestPointerLock);
            canvas.addEventListener("mouseup", function () { document.exitPointerLock(); });
            // make the camera interactive (complex method in FudgeAid)
            FudgeAid.Viewport.expandCameraToInteractiveOrbit(viewport);
            // setup audio
            let cmpListener = new ƒ.ComponentAudioListener();
            cmpCamera.getContainer().addComponent(cmpListener);
            ƒ.AudioManager.default.listenWith(cmpListener);
            ƒ.AudioManager.default.listenTo(graph);
            ƒ.Debug.log("Audio:", ƒ.AudioManager.default);
            // draw viewport once for immediate feedback
            viewport.draw();
            canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", { bubbles: true, detail: viewport }));
        }
    })(Endabgabe.Main.rootGraphId);
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=MainEditor.js.map
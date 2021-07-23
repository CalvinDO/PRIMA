namespace Endabgabe {

    (function (_graphId) {
        window.addEventListener("load", init);
        // show dialog for startup
        let dialog: HTMLDialogElement;
        function init(_event: Event) {
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
            await FudgeCore.Project.loadResourcesFromHTML();
            FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
            await Main.init();
            // pick the graph to show
            console.log("graphID: ", _graphId)
            let graph: ƒ.Graph = <ƒ.Graph>FudgeCore.Project.resources[_graphId];
            FudgeCore.Debug.log("Graph:", graph);
            // setup the viewport
            let cmpCamera = new FudgeCore.ComponentCamera();
            let canvas = document.querySelector("canvas");
            let viewport = new FudgeCore.Viewport();
            viewport.initialize("InteractiveViewport", graph, cmpCamera, canvas);
            FudgeCore.Debug.log("Viewport:", viewport);
            // hide the cursor when interacting, also suppressing right-click menu
            canvas.addEventListener("mousedown", canvas.requestPointerLock);
            canvas.addEventListener("mouseup", function () { document.exitPointerLock(); });
            // make the camera interactive (complex method in FudgeAid)
            FudgeAid.Viewport.expandCameraToInteractiveOrbit(viewport);
            // setup audio
            let cmpListener = new ƒ.ComponentAudioListener();
            cmpCamera.getContainer().addComponent(cmpListener);
            FudgeCore.AudioManager.default.listenWith(cmpListener);
            FudgeCore.AudioManager.default.listenTo(graph);
            FudgeCore.Debug.log("Audio:", FudgeCore.AudioManager.default);
            // draw viewport once for immediate feedback
            viewport.draw();
            canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", { bubbles: true, detail: viewport }));
        }
    })(Main.mainGraphId);
}
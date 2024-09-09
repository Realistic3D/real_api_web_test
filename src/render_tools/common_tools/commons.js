export function GetCanvas() {
    const canvases = document.querySelectorAll("canvas");
    for (const canvas of canvases)
        if (canvas.id === "renderCanvas") return canvas;
    const canvas = document.createElement("canvas");
    canvas.id = "renderCanvas";
    document.body.appendChild(canvas);
    return canvas;
}

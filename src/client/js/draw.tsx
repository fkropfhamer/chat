import * as React from 'react';

interface Props {
    isDrawing: boolean;
}

interface State {

}

export default function Draw(props: Props) {
    const [isMousePressed, setIsMousePressed] = React.useState(false);

    function addCanvasEventListeners(canvas: HTMLCanvasElement) {
        document.addEventListener("mouseup", () => {
            console.log("mouseup");
            setIsMousePressed(false);
        })
        document.addEventListener("mousedown", () => {
            console.log("tedstasdf")
            setIsMousePressed(true);
        })
        canvas.addEventListener("mousemove", (event: MouseEvent) => {
            if(isMousePressed) {
                console.log("mousemove", event.offsetX, event.offsetY);
            }
        })
    }

    function draw() {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (canvas) {
            if (props.isDrawing) {
                addCanvasEventListeners(canvas)
            }
            const ctx = canvas.getContext("2d"); 
        } else {
            throw Error('no canvas')
        }
        
    }

    React.useEffect(draw)

    return <canvas id="canvas" /> 
}
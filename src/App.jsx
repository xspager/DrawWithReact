import './App.css'

import { useLayoutEffect, useState} from 'react';

import ShapeMenu from './ShapeMenu';
import ColorMenu from './ColorMenu';

var ctx = null;

function createElement(id, type, a, b, strokeColor, fillColor) {
    return {id, type, a, b, strokeColor, fillColor};
}

function calcWidthAndHeight(element) {
    const [x1, y1] = Object.values(element.a);
    const [x2, y2] = Object.values(element.b);
    return [
        x2 > x1 ? x2 - x1 : x1 - x2,
        y2 > y1 ? y2 - y1 : y1 - y2
    ];
}

function calcAngle({a, b}) {
    const [x1, y1] = Object.values(a);
    const [x2, y2] = Object.values(b);
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.atan2(dy, dx);
}

function drawElement(element) {
    ctx.strokeStyle = element.strokeColor;
    ctx.fillStyle = element.fillColor;
    if(element.type === "line") {
        ctx.beginPath();
        if(false) {
            ctx.ellipse(...Object.values(element.a), 10, 10, 0,  2 * Math.PI, false);
        }
        ctx.moveTo(...Object.values(element.a));
        ctx.lineTo(...Object.values(element.b));
        if (false) {
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(...Object.values(element.b), 10, 0,  2 * Math.PI, true);
        }
        ctx.stroke();
    }
    if(element.type === "rect") {
        ctx.strokeRect(...Object.values(element.a), ...calcWidthAndHeight(element));
        ctx.rect(...Object.values(element.a), ...calcWidthAndHeight(element));
        ctx.fill();
    }
    if(element.type==="ellipse") {
        ctx.beginPath();
        ctx.ellipse(...Object.values(element.a), ...calcWidthAndHeight(element), 0,  2 * Math.PI, false);
        ctx.stroke();
        ctx.fill();
    }
    if(element.type==="arrow") {
        const headlen = 30;
        const angle = calcAngle(element);
        ctx.beginPath();
        ctx.moveTo(...Object.values(element.a));
        ctx.lineTo(...Object.values(element.b));
        //ctx.stroke();
        const [bx, by] = Object.values(element.b);
        //ctx.beginPath();
        ctx.moveTo(...Object.values(element.b));
        ctx.lineTo(bx - headlen * Math.cos(angle - Math.PI / 6), by - headlen * Math.sin(angle - Math.PI / 6));
        //ctx.strokeStyle = "green";
        //ctx.stroke();
        //ctx.beginPath();
        ctx.moveTo(...Object.values(element.b));
        //ctx.strokeStyle = "red";
        ctx.lineTo(bx - headlen * Math.cos(angle + Math.PI / 6), by - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
        ctx.strokeStyle = "black";
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

function App() {
    const [elements, setElements] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [selectedType, setSelectedType] = useState("line");
    const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
    const [foregroundColor, setForegroundColor] = useState("#000000");

    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "black";
        ctx.strokeStyle = foregroundColor;
        ctx.lineWidth = "3";
        ctx.lineCap = "round";

        elements.forEach(element => drawElement(element));
    }, [elements, foregroundColor]);
    
    const handleMouseDown = (event) => {
        //console.log(event);
        //console.log(event.buttons);
        if(drawing && event.buttons === 5) {
            setDrawing(false);
            setElements(prevState => [...prevState.slice(0,-1)])
            return;
        }
        setDrawing(true);
        const { clientX, clientY } = event;
        const element = createElement(elements.length, selectedType, {clientX, clientY}, {clientX, clientY}, foregroundColor, backgroundColor);
        setElements(prevState => [...prevState, element]);
    };
    const handleMouseMove = (event) => {
        if(!drawing) return;

        const { clientX, clientY } = event;

        const lastElement = elements.pop(-1);
        const newElement = {
            ...lastElement,
            b: { clientX, clientY }
        };
        setElements([...elements, newElement]);
    };
    const handleMouseUp = (event) => {
        if(!drawing) return;
        setDrawing(false);
    };
    const handleMouseOut = (event) => {
        if(drawing) setDrawing(false);
    }

    const handleTouchStart = (event) => {
        if (event.touches.length > 1 || (event.type === "touched" && event.touches.length > 0)) {
            console.log("Multi finger touch, ignoring it.");
            return;
        }
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
        handleMouseDown(event);
    }

    const handleTouchMove = (event) => {
        if (event.touches.length > 1 || (event.type === "touched" && event.touches.length > 0)) {
            console.log("Multi finger touch, ignoring it.");
            return;
        }
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
        handleMouseMove(event);
    }

    const handleTouchEnd = (event) => {
        handleMouseUp(event);
    }

    return (
<>
    <nav className="fixed m-2">
        <ShapeMenu selectedType={selectedType} setSelectedType={setSelectedType} />
        <ColorMenu backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor} foregroundColor={foregroundColor} setForegroundColor={setForegroundColor} />
    </nav>
    <canvas id="canvas" 
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        Canvas not supported :(
    </canvas>
</>
    );
}

export default App;

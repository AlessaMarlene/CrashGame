import { useEffect, useState, useRef } from "react";
import './multiplier.css';

const ROCKET_IMG = new Image();
ROCKET_IMG.src = 'assets/rocket.svg';
const ROCKET_EXPLOSION_IMG = new Image();
ROCKET_EXPLOSION_IMG.src = 'assets/rocket_explosion.svg';

const ROCKET_WIDTH = 15;
const ROCKET_HEIGHT = 20;
const ROCKET_EXPLOSION_WIDTH = 8;
const ROCKET_EXPLOSION_HEIGHT = 8;

const Multiplier = ({initializeValues, multValue, startGame, isUserRegistered, multCrashValue, multHasCrashed, increaseMultiplier}) => {
    const [rocketPosition, setRocketPosition] = useState({ x: 100, y: 90});
    const canvas = useRef();
    
    const drawImagesInCanvas = () => {
        const ctx = canvas.current.getContext("2d");
        ctx.clearRect(0, 0, 600, 350);
        ctx.save();
        ctx.rotate(45 * Math.PI / 180);
        drawRocketExplosion(ctx);
        drawRocket(ctx);
        ctx.restore();
    };

    const drawRocketExplosion = (ctx) => {
        ctx.drawImage(
            ROCKET_EXPLOSION_IMG,
            rocketPosition.x + 2,
            rocketPosition.y + 16,
            ROCKET_EXPLOSION_WIDTH,
            ROCKET_EXPLOSION_HEIGHT
        );
    }

    const drawRocket = (ctx) => {
        ctx.drawImage(
            ROCKET_IMG,
            rocketPosition.x,
            rocketPosition.y,
            ROCKET_WIDTH,
            ROCKET_HEIGHT
        );
    }
        
    const resetCanvas = () => {
        const ctx = canvas.current.getContext("2d");
        ctx.clearRect(0, 0, 600, 350);
        setRocketPosition({x:100,y:80});
    }

    useEffect(() => {
        if(startGame) {
            if(multValue >= multCrashValue) {
                multHasCrashed();
                resetCanvas();
            }
            else {
                increaseMultiplier();
                setRocketPosition({ x: rocketPosition.x + 0.5, y: rocketPosition.y - 2 });
                drawImagesInCanvas();
            }
        }
        else if(isUserRegistered) {
            setTimeout(initializeValues, 5000);
        }
    }, [multValue, startGame, isUserRegistered]);

    return (
        <div className="gameMult">
            <canvas 
                style={{ border: "2px solid black", width: "500px", height: "400px" }} 
                ref={canvas}
            >
            </canvas>
            <div className="mult">
                {
                    !startGame && multCrashValue > 0 ? 
                    <p>Crashed at {multCrashValue}x</p> :
                    <p>{multValue}x</p>
                }
            </div>
        </div>
    );
}

export default Multiplier;
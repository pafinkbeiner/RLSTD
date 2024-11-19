import { useState } from "react";
import { Button } from "../ui/button";

interface Props {
    targetPower: number;
    setTargetPower: (targetPower: number) => void;
}

export default function TargetPowerControl(props: Props) {

    const { targetPower, setTargetPower } = props;

    const changePower = (place: number, delta: number) => {
        const newPower = targetPower + delta * place;
        setTargetPower(newPower);
    };

    return (
        <div className="flex flex-row gap-3">
            {/* Tausenderstelle */}
            <div className="flex flex-col items-center">
                <Button variant={"outline"} onClick={() => changePower(1000, 1)}>+</Button>
                <p>{Math.floor((targetPower / 1000) % 10)}</p>
                <Button variant={"outline"} onClick={() => changePower(1000, -1)}>-</Button>
            </div>

            {/* Hunderterstelle */}
            <div className="flex flex-col items-center">
                <Button variant={"outline"} onClick={() => changePower(100, 1)}>+</Button>
                <p>{Math.floor((targetPower / 100) % 10)}</p>
                <Button variant={"outline"} onClick={() => changePower(100, -1)}>-</Button>
            </div>

            {/* Zehnerstelle */}
            <div className="flex flex-col items-center">
                <Button variant={"outline"} onClick={() => changePower(10, 1)}>+</Button>
                <p>{Math.floor((targetPower / 10) % 10)}</p>
                <Button variant={"outline"} onClick={() => changePower(10, -1)}>-</Button>
            </div>

            {/* Einerstelle */}
            <div className="flex flex-col items-center">
                <Button variant={"outline"} onClick={() => changePower(1, 1)}>+</Button>
                <p>{Math.floor(targetPower % 10)}</p>
                <Button variant={"outline"} onClick={() => changePower(1, -1)}>-</Button>
            </div>
        </div>
    )
}

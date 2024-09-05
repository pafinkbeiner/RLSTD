import { connect, status, disconnect, valueMapNotify, valueMapRead} from './bluetooth';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <h1>Wahoo Kickr Core Bluetooth Connection</h1>
    <button id="connect">Connect to Wahoo Kickr Core</button>
    <button id="disconnect">Disconnect Bluetooth Device</button>
    <p id="status">Status: Not connected</p>

    <h2>Power Output</h2>
    <p id="output">Power: N/A</p>

    <h2>Resistance Control</h2>
    <input type="range" id="resistance" min="0" max="100" value="50" />
    <label for="resistance">Resistance Level: <span id="resistanceLevel">50</span>%</label>
    <button id="test">TEST</button>
`

document.getElementById("connect")?.addEventListener("click", connect);
document.getElementById("disconnect")?.addEventListener("click", disconnect);

document.getElementById("test")?.addEventListener("click", () => {
    console.log(valueMapNotify);
    valueMapNotify.get(0x2A63)?.subscribe(v => console.log("0x2A63 - "+ v));
    valueMapNotify.get(0x2AD3)?.subscribe(v => console.log("0x2AD3 - "+ v));
    valueMapNotify.get(0x2ADA)?.subscribe(v => console.log("0x2ADA - "+ v));
    valueMapNotify.get(0x2AD2)?.subscribe(v => console.log("0x2AD2 - "+ v));
    console.log(valueMapRead);
});

status.asObservable().subscribe((status: string) => {
    document.getElementById("status")!.textContent = status;
});

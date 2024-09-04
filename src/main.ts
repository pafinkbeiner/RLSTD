import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <h1>Wahoo Kickr Core Bluetooth Connection</h1>
    <button id="connect">Connect to Wahoo Kickr Core</button>
    <p id="status">Status: Not connected</p>

    <h2>Power Output</h2>
    <p id="output">Power: N/A</p>

    <h2>Resistance Control</h2>
    <input type="range" id="resistance" min="0" max="100" value="50" />
    <label for="resistance">Resistance Level: <span id="resistanceLevel">50</span>%</label>
    <button id="test">TEST</button>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

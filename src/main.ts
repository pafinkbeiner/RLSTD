import { connect, status, disconnect, valueMapNotify, valueMapRead} from './bluetooth';
import './style.css'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

// `

document.getElementById("connect")?.addEventListener("click", connect);
document.getElementById("disconnect")?.addEventListener("click", disconnect);

document.getElementById("test")?.addEventListener("click", async () => {
    console.log(valueMapNotify);
    valueMapNotify.get(0x2A63)?.subscribe(v => console.log("0x2A63 - ", v));
    valueMapNotify.get(0x2AD3)?.subscribe(v => console.log("0x2AD3 - ", v));
    valueMapNotify.get(0x2ADA)?.subscribe(v => console.log("0x2ADA - ", v));
    valueMapNotify.get(0x2AD2)?.subscribe(v => console.log("0x2AD2 - ", v));
    console.log(valueMapRead);
    const test = await Promise.resolve(valueMapRead.get(10853)?.refresh);
    console.log(test)
});

status.asObservable().subscribe((status: string) => {
    document.getElementById("status")!.textContent = status;
});

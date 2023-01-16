import {init, start, fullscreen} from './hl-engine-js/lib/hl-engine.js';

let zipValveArrayBuffer;
let zipModArrayBuffer;

init({
  canvas: document.getElementById('canvas'),
  location: 'hl-engine-js/lib',
  setStatus: setStatus,
});

const zips = [
  "valve-trimmed.zip",
  "HL-Parpaing.zip",
]

async function loadZips() {
  // fetch all zips in parallel
  const responses = await Promise.all(zips.map(zip => fetch(zip)));
  // convert responses to array buffers
  const arrayBuffers = await Promise.all(responses.map(response => response.arrayBuffer()));

  zipValveArrayBuffer = arrayBuffers[0];
  zipModArrayBuffer = arrayBuffers[1];

  setStatus("HL-Parpaing ready to launch!")
  document.getElementById("loading").classList.add("hidden");
  document.getElementById('start').disabled = false;
}

loadZips();

document.getElementById('fullscreen').onclick = fullscreen

function setStatus(text) {
  document.getElementById('status').innerHTML = text;
}

document.getElementById('start').onclick = () => {
  document.getElementById('canvas').classList.remove("hidden");
  
  document.getElementById("launch-sound").play();
  document.getElementById('fullscreen').disabled = false;
  document.getElementById('start').disabled = true;
  document.getElementById('maps').disabled = true;

  start({
    zipValve: zipValveArrayBuffer,
    zipMod: zipModArrayBuffer,
    mod: "Hl-Parpaing",
    fullscreen: true,
    map: document.getElementById('maps').value,
  });
};

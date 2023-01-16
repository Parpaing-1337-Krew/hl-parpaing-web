let zipValveArrayBuffer;
let zipModArrayBuffer;

HLEngine.init({
  canvas: document.getElementById('canvas'),
  location: 'hl-engine-js/lib'
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

  document.getElementById('start').disabled = false;
}

loadZips();

document.getElementById('fullscreen').onclick = HLEngine.fullscreen

document.getElementById('start').onclick = function() {
  HLEngine.start({
    zipValve: zipValveArrayBuffer,
    zipMod: zipModArrayBuffer,
    mod: "Hl-Parpaing",
    fullscreen: true,
    map: document.getElementById('maps').value,
  });
};

let mic;
let recorder;
let firstSoundFile;
let sounds = [];
let recording = false;

function setup() {
  createCanvas(600, 600);
  
  mic = new p5.AudioIn();
  mic.start();
  
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  
  firstSound = new p5.SoundFile();
  
  recordButton = createButton("record");
  recordButton.position(width / 2 - 100, height / 2);
  recordButton.mousePressed(recordInput);
  
  stopButton = createButton("stop");
  stopButton.position(width / 2, height / 2);
  stopButton.mousePressed(stopInput);
  
  playButton = createButton("play");
  playButton.position(width / 2 + 100, height / 2);
  playButton.mousePressed(playFirstSound);
}

function draw() {
  background(220);
}

function recordInput() {
  userStartAudio();
    if (!recording && mic.enabled) {
      recorder.record(firstSound);
      recording = true;
  }
}

function stopInput() {
  recorder.stop();
  recording = false;
}

function playFirstSound() {
  firstSound.play();
}
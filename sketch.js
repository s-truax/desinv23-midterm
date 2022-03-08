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
  // playButton.mousePressed(playFirstSound);
  playButton.mousePressed(playLatestRecording);

  playFirstButton = createButton("play first sound");
  playFirstButton.position(width / 2, height / 2 - 100);
  playFirstButton.mousePressed(playFirstRecording);
}

function draw() {
  background(220);
}

function recordInput() {
  userStartAudio();
    if (!recording && mic.enabled) {
      soundFile = new p5.SoundFile();
      sounds.push(soundFile);
      recorder.record(soundFile);
      recording = true;
  }
}

function stopInput() {
  recorder.stop();
  recording = false;
}

function playLatestRecording() {
  soundFile = sounds[sounds.length - 1];
  soundFile.play();
}

function playFirstRecording() {
  soundFile = sounds[0];
  soundFile.play();
}

function playFirstSound() {
  firstSound.play();
}
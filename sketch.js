let mic;
let recorder;
let firstSoundFile;
let sounds = [];
let recording = false;
let looper;
let metronome = false;
let metronomeBPM = 120;

function setup() {
  createCanvas(600, 600);

  userStartAudio();
  
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

  metronomeButton = createButton("metronome");
  metronomeButton.position(width / 2, height / 2 + 100);
  metronomeButton.mousePressed(playMetronome);

  metronomeSynth = new p5.MonoSynth();

  // 4 / 4 time. 4n is a quarter note.
  metronomeLooper = new p5.SoundLoop(metronomeSound, "4n");
  metronomeLooper.bpm = metronomeBPM;
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

function playMetronome() {
  if (!metronome) {
    metronome = true;
    metronomeLooper.start();
  } else {
    metronome = false;
    metronomeLooper.stop();
  }
  console.log(metronome);
}

function metronomeSound(timeFromNow) {
  metronomeSynth.play("A6", 0.5);
}
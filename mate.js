
let step = 0;
let message = "Let's make mate!";
let status = {
water: false,
yerba: false,
sugar: 0,
straw: false
};
let showFace = "";
let requestedSugar;
let score = 0;

function setup() {
createCanvas(400, 400);
textAlign(CENTER, CENTER);
textSize(16);
generateNewRequest();
}

function draw() {
background(255);
textSize(20);
text("🧉 The Perfect Mate 🧉", width / 2, 30);
textSize(16);
text(message, width / 2, 70);

const steps = ["Water", "Yerba", "Sugar", "Straw"];
if (step < steps.length) {
if (step === 2) {
text("I want a mate with " + requestedSugar + " teaspoons of sugar", width / 2, 100);

drawButton("+1", 170);
drawButton("-1", 210);
drawButton("Next", 250);
} else {
drawButton(steps[step], 150);
drawButton("Skip", 200);
}
} else {
drawButton("Serve", 150);
}

// Status
textSize(14);
let statusText = "";
statusText += status.water ? "Water  " : "";
statusText += status.yerba ? "Yerba  " : "";
statusText += status.sugar > 0 ? `Sugar (${status.sugar})  ` : "No Sugar  ";
statusText += status.straw ? "Straw" : "";
text("Done: " + (statusText || "None"), width / 2, 290);

// Score
text("Score: " + score, width / 2, 310);

// Face
textSize(50);
if (showFace === "happy") text("😊", width / 2, 350);
else if (showFace === "sad") text("😢", width / 2, 350);
}

function drawButton(label, y) {
fill(200);
rect(120, y, 160, 30);
fill(0);
text(label, width / 2, y + 15);
}

function mousePressed() {
if (step < 4) {
if (step === 2) {
if (mouseInRect(120, 170, 160, 30)) {
if (status.sugar < 5) {
status.sugar++;
message = "Added sugar: " + status.sugar;
}
} else if (mouseInRect(120, 210, 160, 30)) {
if (status.sugar > 0) {
status.sugar--;
message = "Reduced sugar: " + status.sugar;
}
} else if (mouseInRect(120, 250, 160, 30)) {
message = "Sugar set to " + status.sugar;
step++;
}
} else {
if (mouseInRect(120, 150, 160, 30)) {
if (step === 0) status.water = true;
if (step === 1) status.yerba = true;
if (step === 3) status.straw = true;
message = stepsName(step) + " done!";
step++;
} else if (mouseInRect(120, 200, 160, 30)) {
message = "Skipped " + stepsName(step).toLowerCase();
step++;
}
}
} else if (step === 4 && mouseInRect(120, 150, 160, 30)) {
if (status.water && status.yerba && status.straw) {
if (status.sugar === requestedSugar) {
message = "Perfect Match! 😋";
showFace = "happy";
score++;
} else {
message = "Wrong Sugar! 😖";
showFace = "sad";
}
} else {
message = "Oops! Missing Something...";
showFace = "sad";
}
setTimeout(generateNewRequest, 2500);
}
}

function generateNewRequest() {
requestedSugar = int(random(0, 4)); // de 0 a 3
reset();
}

function stepsName(i) {
return ["Water", "Yerba", "Sugar", "Straw"][i];
}

function reset() {
step = 0;
message = "Let's make mate!";
showFace = "";
status = { water: false, yerba: false, sugar: 0, straw: false };
}

function mouseInRect(x, y, w, h) {
return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

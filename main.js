"use strict";
function assure(a, b) {
    if (a instanceof b)
        return a;
    throw new TypeError(`${a} is not ${b.name}.`);
}
const question = assure(document.getElementById("question"), HTMLDivElement);
const answer = assure(document.getElementById("answer"), HTMLInputElement);
const maru = assure(document.getElementById("maru"), HTMLDivElement);
const peke = assure(document.getElementById("peke"), HTMLDivElement);
let correct;
function generate() {
    const operand = Math.floor(Math.random() * 4);
    const min = 1;
    const max = operand < 2 ? 1000 : 100;
    const x = Math.floor(Math.random() * (max - min)) + min;
    const y = Math.floor(Math.random() * (max - min)) + min;
    const a = Math.max(x, y);
    const b = Math.min(x, y);
    correct = [a + b, a - b, a * b, a / b][operand];
    question.innerText = (a + ["＋", "－", "×", "÷"][operand] + b);
}
function check() {
    const diff = Math.abs(correct - parseFloat(answer.value));
    if (diff < 0.005) {
        maru.style.display = "block";
        navigator.vibrate([100]);
        setTimeout(() => {
            answer.value = "";
            maru.style.display = "none";
            generate();
        }, 800);
    }
    else {
        peke.style.display = "block";
        navigator.vibrate([500]);
        setTimeout(() => {
            answer.value = "";
            peke.style.display = "none";
        }, 800);
    }
}
generate();

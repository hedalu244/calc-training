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
    let a, b;
    switch (operand) {
        default:
        case 0:
            { // + 
                a = Math.floor(Math.random() * 999 + 1);
                b = Math.floor(Math.random() * 999 + 1);
            }
            break;
        case 1:
            { // - 
                b = Math.floor(Math.random() * 999 + 1);
                a = Math.floor(b + Math.random() * 999 + 1);
            }
            break;
        case 2:
            { // *
                b = Math.floor(Math.random() * 99 + 1);
                a = Math.floor(Math.random() * 99 + 1);
            }
            break;
        case 3:
            { // /
                b = Math.floor(Math.random() * 99 + 1);
                a = Math.floor(b * (Math.random() * 99 + 1));
            }
            break;
    }
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

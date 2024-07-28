const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const fontSize = document.querySelector('.font_size');
const delay_size = document.querySelector('.delay_size');
const tail_size = document.querySelector('.tail_size');

const upFontBtn = document.querySelector('.upButton');
const downFontBtn = document.querySelector('.downButton');
downFontBtn.disabled = true;
const upDelayBtn = document.querySelector('.up_delay');
const downDelayBtn = document.querySelector('.down_delay');
const upTailBtn = document.querySelector('.up_tail');
const downTailBtn = document.querySelector('.down_tail');

let font = 10;
canvas.width = innerWidth;
canvas.height = innerHeight;
let cols = canvas.width;
let rows = canvas.height;
let delay = 70; // скорость падения символов
let tail = 0.08; // скорость затухания символов
let rowPosition = [];
let katakanaSymbols = [];
context.font = font + 'px serif';

// для контроля изменения данных
fontSize.textContent = 'FONT: ' + font;
delay_size.textContent = 'DELAY: ' + delay;
tail_size.textContent = 'TAIL: ' + tail;

// Сохраняем в массив символы из алфавита "Катакана" (タイ ヲァヌ ギイ カア ビェン)
// используя кодировку юникод (взял из Википедии)
for (let i = 0; i < 96; i++)
    katakanaSymbols.push(String.fromCharCode(parseInt('0x30a0', 16) + i));

// заполняем массив произвольными значениями положения символа по оси Y
for (let i = 0; i < cols; i++)
    rowPosition[i] = Math.floor(Math.random() * (cols / font));

function render() {
    // переключаемся на зеленый цвет и печатаем в цикле символы в строке
    context.fillStyle = "#0f0";

    for (let i = 0; i < cols; i++) {
        let random = Math.random();
        let randomIndex = Math.floor(Math.random() * katakanaSymbols.length);
        context.fillText(katakanaSymbols[randomIndex], i * font, rowPosition[i] * font);
        if (rowPosition[i] > (rows / font) && random > 0.95) rowPosition[i] = 0;
        rowPosition[i]++;
    }

    // для эффекта затухания символов закрашиваем canvas черным полупрозрачным цветом,
    // альфа-каналом регулируем скорость затухания (tail)
    context.fillStyle = `rgba(0, 0, 0, ${tail.toFixed(2)})`;
    context.fillRect(0, 0, cols, rows);
}

let t = setInterval(render, delay);


// КНОПКИ
upFontBtn.addEventListener('click', () => {
    downFontBtn.disabled = false;
    font += 2;
    context.font = font + 'px serif';
    fontSize.textContent = 'FONT: ' + font;
    if (font > 32) upFontBtn.disabled = true;
});

downFontBtn.addEventListener('click', () => {
    upFontBtn.disabled = false;
    font -= 2;
    fontSize.textContent = 'FONT: ' + font;
    context.font = font + 'px serif';
    if (font < 12) downFontBtn.disabled = true;
});

upDelayBtn.addEventListener('click', () => {
    delay += 10;
    delay_size.textContent = 'DELAY: ' + delay;
    downDelayBtn.disabled = false;
    if (delay < 150) {
        clearInterval(t);
        t = setInterval(render, delay);
    } else
        upDelayBtn.disabled = true;

});

downDelayBtn.addEventListener('click', () => {
    delay -= 10;
    delay_size.textContent = 'DELAY: ' + delay;
    upDelayBtn.disabled = false;
    if (delay > 0) {
        clearInterval(t);
        t = setInterval(render, delay);
    } else
        downDelayBtn.disabled = true;
});

upTailBtn.addEventListener('click', () => {
    downTailBtn.disabled = false;
    tail += 0.01;
    tail_size.textContent = 'TAIL: ' + tail.toFixed(2);
    if (tail.toFixed(2) > 0.19) upTailBtn.disabled = true;
});

downTailBtn.addEventListener('click', () => {
    upTailBtn.disabled = false;
    tail -= 0.01;
    tail_size.textContent = 'TAIL: ' + tail.toFixed(2);
    if (tail.toFixed(2) < 0.02) downTailBtn.disabled = true;
});


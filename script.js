const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const fontSize = document.querySelector('.font_size');
const delay_size = document.querySelector('.delay_size');
const tail_size = document.querySelector('.tail_size');

let font = 10;
let cols = canvas.width;
let rows = canvas.height;
let delay = 80; // скорость падения символов
let tail = 0.08; // скорость затухания символов
let rowPosition = [];
let katakanaSymbols = [];
context.font = font + 'px serif';

// для контроля изменения данных
fontSize.textContent = 'FONT: ' + font;
delay_size.textContent = 'DELAY: ' + delay;
tail_size.textContent = 'TAIL: ' + tail;

// Сохраняем в массив символы из алфавита Катакана (タイ ヲァヌ ギイ カア ビェン)
//используя кодировку юникод (взял из Википедии)
for (let i = 0; i < 96; i++)
    katakanaSymbols.push(String.fromCharCode(parseInt('0x30a0', 16) + i));


// заполняем массив произвольными значениями положения символа по оси Y
for (let i = 0; i < cols / font; i++)
    rowPosition[i] = Math.floor(Math.random() * (cols / font));

function render() {
    // переключаемся на зеленый цвет и печатаем в цикле символы в строке
    context.fillStyle = "#0f0";

    for (let i = 0; i < cols / font; i++) {
        let random = Math.random();
        let randomIndex = Math.floor(Math.random() * katakanaSymbols.length);
        context.fillText(katakanaSymbols[randomIndex], i * font, rowPosition[i] * font);
        if (rowPosition[i] > (rows / font) && random > 0.95) rowPosition[i] = 0;
        rowPosition[i]++;
    }

    // для эффекта затухания символов закрашиваем canvas черным полупрозрачным цветом,
    // альфа-каналом регулируем длину затухающего хвоста (0.03)
    context.fillStyle = `rgba(0, 0, 0, ${tail})`;
    context.fillRect(0, 0, cols, rows);
}

let t = setInterval(render, delay);


// КНОПКИ ИЗМЕНЕНИЯ ШРИФТА
const upFontBtn = document.querySelector('.upButton');
upFontBtn.addEventListener('click', () => {
    if (font < 34) {
        font += 2;
        context.font = font + 'px serif';
        fontSize.textContent = 'FONT: ' + font;
    }
});

const downFontBtn = document.querySelector('.downButton');
downFontBtn.addEventListener('click', () => {
    if (font > 10) {
        font -= 2;
        context.font = font + 'px serif';
        fontSize.textContent = 'FONT: ' + font;
    }
});

// КНОПКИ ИЗМЕНЕНИЯ ЗАДЕРЖКИ ОТРИСОВКИ КАДРОВ
const upDelayBtn = document.querySelector('.up_delay');
upDelayBtn.addEventListener('click', () => {
    clearInterval(t);
    delay += 10;
    t = setInterval(render, delay);
    delay_size.textContent = 'DELAY: ' + delay;
});

const downDelayBtn = document.querySelector('.down_delay');
downDelayBtn.addEventListener('click', () => {
    clearInterval(t);
    delay -= 10;
    t = setInterval(render, delay);
    delay_size.textContent = 'DELAY: ' + delay;
});

// КНОПКИ ИЗМЕНЕНИЯ ЗАДЕРЖКИ ОТРИСОВКИ КАДРОВ
const upTailBtn = document.querySelector('.up_tail');
upTailBtn.addEventListener('click', () => {
    if (tail.toFixed(2) < 0.20) tail += 0.01;
    tail_size.textContent = 'TAIL: ' + tail.toFixed(2);
});

const downTailBtn = document.querySelector('.down_tail');
downTailBtn.addEventListener('click', () => {
    if (tail.toFixed(2) > 0) tail -= 0.01;
    tail_size.textContent = 'TAIL: ' + tail.toFixed(2);
});


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const fontSize = document.querySelector('.font_size');
const delay_size = document.querySelector('.delay_size');
const tail_size = document.querySelector('.tail_size');

const upFontBtn = document.querySelector('.up_font');
const downFontBtn = document.querySelector('.down_font');
downFontBtn.disabled = true;
const upDelayBtn = document.querySelector('.up_delay');
const downDelayBtn = document.querySelector('.down_delay');
const upTailBtn = document.querySelector('.up_tail');
const downTailBtn = document.querySelector('.down_tail');

let font = 10;
canvas.width = innerWidth;
canvas.height = innerHeight;
let screenWidth = canvas.width;
let screenHeight = canvas.height;
let delay = 70; // Скорость падения символов, меньше-> быстрее.
let tail = 0.08; // Скорость затухания символов, меньше-> медленнее.
let spread = 0.95;
let rowPosition = [];
let katakanaSymbols = [];
context.font = font + 'px serif';

// для контроля изменения данных на странице
fontSize.textContent = 'FONT: ' + font;
delay_size.textContent = 'DELAY: ' + delay;
tail_size.textContent = 'TAIL: ' + tail;

/* Используя кодировку юникод, сохраняем в массив 96 символов алфавита "Катакана" 
(タイ ヲァヌ ギイ カア ビェン - взяли из Википедии). */
for (let i = 0; i < 96; i++)
    katakanaSymbols.push(String.fromCharCode(parseInt('0x30a0', 16) + i));

// заполняем массив произвольными значениями положения символа по оси Y
for (let i = 0; i < screenWidth; i++)
    rowPosition[i] = Math.floor(Math.random() * (screenWidth / font));

/* Переключаемся на зеленый цвет и печатаем в цикле рандомно выбранные символы из массива.
Если символ дошел до низа экрана и рандом больше установленного в spread, 
позиция символа по оси-Y сбрасывается на 0. После прохода по массиву, 
для эффекта затухания символов закрашиваем canvas черным полупрозрачным цветом с альфа-каналом 
(для регулировки скорости затухания хвоста(tail)). */
function frame() {
    context.fillStyle = "#0f0";
    for (let i = 0; i < screenWidth; i++) {
        let randomIndex = Math.floor(Math.random() * katakanaSymbols.length);
        let randomSpread = Math.random();
        context.fillText(katakanaSymbols[randomIndex], i * font, rowPosition[i] * font);
        if (rowPosition[i] > (screenHeight / font) && randomSpread > spread) rowPosition[i] = 0;
        rowPosition[i]++;
    }
    context.fillStyle = `rgba(0, 0, 0, ${tail.toFixed(2)})`;
    context.fillRect(0, 0, screenWidth, screenHeight);
}

let render = setInterval(frame, delay);

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
        clearInterval(render);
        render = setInterval(frame, delay);
    } else
        upDelayBtn.disabled = true;

});

downDelayBtn.addEventListener('click', () => {
    delay -= 10;
    delay_size.textContent = 'DELAY: ' + delay;
    upDelayBtn.disabled = false;
    if (delay > 0) {
        clearInterval(render);
        render = setInterval(frame, delay);
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

// Скрываем кнопки после бездействия в течении 5сек
const wrapper = document.querySelector('.wrapper');
let noActionTimer = setTimeout(() => {
    wrapper.classList.add('invisible');
}, 5000);

document.addEventListener('mousemove', () => {
    wrapper.classList.remove('invisible');
    clearTimeout(noActionTimer);
    noActionTimer = setTimeout(() => {
        wrapper.classList.add('invisible');
    }, 5000);
});
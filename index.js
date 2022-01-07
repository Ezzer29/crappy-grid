const Jimp = require('jimp');

// COLORS
const color_0 = Jimp.rgbaToInt(240, 240, 240, 255);
const color_1 = Jimp.rgbaToInt(214, 16, 2, 255);
const color_2 = Jimp.rgbaToInt(32, 9, 107, 255);

// VARS
const DEV = 0;

let a = Array(5099).fill(0).map(()=>Array(5099).fill(0));

// console.log(a);

function cursor (x) { return x + 2500; }
// function cursorY (y) { return y + 2500; }

// prepare
function prep() {
    for ( let i = -2500; i < 2500; i += 1 ) {
        for ( let j = -2500; j < 2500; j += 1 ) {
            if ( i == 0 || j == 0 ) a[cursor(i)][cursor(j)] = 5;
            else a[cursor(i)][cursor(j)] = 0;
        }
    }
}

function write (x, y, scale, k) {
    try { a[Math.round(cursor(-y * scale))][Math.round(cursor(x * scale))] = k; }
    catch (err) { 
        if ( DEV >= 1 ) console.error('Da ErRor IN func write.. (y, x, cy, cx): ', y, x, cursor(y), cursor(x));
        if ( DEV >= 2 ) console.error(err); 
    }
}

function imgMagic (name) {
    Jimp.read('input.png', (err, img) => {
        if (err) throw err;
        img.resize(5000, 5000);
        for ( let i = 0; i < 5000; i += 1 ) {
            for ( let j = 0; j < 5000; j += 1 ) {
                if ( a[i][j] == 5 || a[i][j] == -5 ) {
                    img.setPixelColor(color_1, j, i);
                } else if ( a[i][j] == 10 ) {
                    img.setPixelColor(color_2, j, i);
                } else {
                    img.setPixelColor(color_0, j, i);
                }
            }
        }
        img.write(name + '.png');
    });
}

// Modules

const scale = 100;
const step = .00001;

function universal () {
    for ( let x = -1000; x <= 1000; x += step ) {
        write ( x , (4 * x + 2)/(Math.pow(x, 2) + 4 * x - 5), scale, 10 );
    }
}

prep();
universal();
imgMagic('output');
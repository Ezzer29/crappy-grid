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

const scale = 1250;
const step = .000001;

function universal (a) {
    for ( let x = 0; x <= 2*Math.PI; x += step ) {
        let sum1 = 0;
        let sum2 = 0;
        let c = 6;
        for ( let i = 0; i <= c; i += 1 ) {
            sum1 += Math.pow(5, -i*a)*Math.sin(Math.pow(5, i)*Math.PI*x); 
        }
        for ( let i = 0; i <= c; i += 1 ) {
            sum2 += Math.pow(5, -i*a)*Math.cos(Math.pow(5, i)*Math.PI*x);
        }
        write ( sum1, sum2, scale, 10 );
    }
}

prep();
universal(.6);
imgMagic('output');
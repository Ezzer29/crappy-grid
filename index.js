const Jimp = require('jimp');

// COLORS
const color_0 = Jimp.rgbaToInt(240, 240, 240, 255);
const color_1 = Jimp.rgbaToInt(214, 16, 2, 255);
const color_2 = Jimp.rgbaToInt(32, 9, 107, 255);

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

function write (x, y, k) {
    try { a[Math.round(cursor(y))][Math.round(cursor(x))] = k; }
    catch (err) { console.error('Da ErRor IN func write.. (y, x, cy, cx): ', y, x, cursor(y), cursor(x)); console.error(err); }
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

const zoom = 1500; // more like scale, but anyways...
const step = .00001;

function crown (x) {
    for ( let t = 0; t <= 2*Math.PI; t += step ) {
        // write(Math.cos(t) * zoom, Math.sin(t) * zoom, 10);
        let sum1 = 0;
        let sum2 = 0;
        let r1 = x;
        let r2 = 5;
        let c = 3;
        for ( let i = 0; i <= c; i += 1 ) {
            sum1 += Math.sin(Math.pow(r1, i)*t) / Math.pow(r2, i); 
        }
        for ( let i = 0; i <= c; i += 1 ) {
            sum2 += Math.cos(Math.pow(r1, i)*t) / Math.pow(r2, i);  
        }
        write ( sum1 * zoom, sum2 * zoom, 10 );
    }
}

prep();
crown(10);
imgMagic('output');
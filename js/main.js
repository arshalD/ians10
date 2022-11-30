// Inverse of number using extended euclidean.
function inv(div_r, div_t) {
    var x = 1, y = 0, z, r, a = Number.parseInt(div_r), m = Number.parseInt(div_t);

    while (true) {
        if (m == 0) {
            if (a != 1) {
                console.log(`Reason: gcd ${div_r} and ${div_t} is not same`);
                break;
            }
            return (x < 0) ? (div_t + x) : x;
        }
        r = Number.parseInt(a % m);
        z = Number.parseInt(x - (a / m) * y);
        a = m;
        m = r;
        x = y;
        y = z;
    }
}

// Chinese remainder theorem program.
function getCRT(mod, rem, size) {
    var M = 1, result = 0, t;

    for (var i = 0; i < size; i++) {
        M *= mod[i];
    }
    var temp;
    for (var i = 0; i < size; i++) {
        t = M / mod[i];
        temp = (rem[i] * t * inv(t, mod[i]));
        result += temp;
        console.log(temp);
    }

    result %= M;
    return (result < 0) ? (M + result) : result;
}

// // Driver method
// var num = [3, 5, 7];
// var rem = [2, 3, 2];
// console.log("x is " + getCRT(num, rem, 3));
var count = 0;
const doCalc = () => {
    numArr = [];
    remArr = [];
    for (let i = 0; i <= count; i++) {
        let num = document.getElementById(`num${i}`).value;
        let rem = document.getElementById(`rem${i}`).value;
        numArr.push(parseInt(num));
        remArr.push(parseInt(rem));
    }
    console.log(numArr, remArr, count);
    let x = getCRT(numArr, remArr, numArr.length);
    document.getElementById('result').innerHTML = `<br><h3>The value of X is :${x}</h3>`;
};

const addItem = () => {
    let container = document.getElementById("sim-container");
    window.event.preventDefault();
    ++count;
    container.innerHTML += `
        <br>
        <label for="fname">X % </label>
        <input type="text" id="num${count}" name="num${count}" placeholder="Number" required>
        <label for="lname">=</label>
        <input type="text" id="rem${count}" name="rem${count}" placeholder="Remainder">
        <button onclick="addItem()" class="add"><img width="35" src="./plus.png"></button>`;
};
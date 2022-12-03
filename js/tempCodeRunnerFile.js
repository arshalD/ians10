var count = 0;
// const doCalc = () => {
//     numArr = []
//     remArr = []
//     for (let i = 0; i <= count; i++) {
//         let num = document.getElementById(`num${i}`).value;
//         let rem = document.getElementById(`rem${i}`).value;
//         numArr.push(parseInt(num))
//         remArr.push(parseInt(rem))
//     }
//     console.log(numArr, remArr, count)
//     let x = findMinX(numArr, remArr, numArr.length)
//     document.getElementById('result').innerHTML = `<br><h3>The value of X is :${x}</h3>`
// }
// const addItem = () => {
//     let container = document.getElementById("sim-container")
//     window.event.preventDefault();
//     ++count;
//     container.innerHTML += `
//                     <br>
//                     <label for="fname">X % </label>
//                     <input type="text" id="num${count}" name="num${count}" placeholder="Number" required>
//                     <label for="lname">=</label>
//                     <input type="text" id="rem${count}" name="rem${count}" placeholder="Remainder">
//                     <button onclick="addItem()" class="add"><img width="35" src="./plus.png"></button>`
// }
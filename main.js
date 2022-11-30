

// A javascript program to demonstrate the working of Chinese remainder
// Theorem
	
// k is size of num and rem. Returns the smallest
// number x such that:
// x % num[0] = rem[0],
// x % num[1] = rem[1],
// ..................
// x % num[k-2] = rem[k-1]
// Assumption: Numbers in num are pairwise coprime
// (gcd for every pair is 1)
function findMinX(num , rem , k)
{
	var x = 1; // Initialize result

	// As per the Chinese remainder theorem,
	// this loop will always break.
	while (true)
	{
		// Check if remainder of x % num[j] is
		// rem[j] or not (for all j from 0 to k-1)
		var j;
		for (j=0; j<k; j++ )
			if (x%num[j] != rem[j])
			break;

		// If all remainders matched, we found x
		if (j == k)
			return x;

		// Else try next number
		x++;
	}

}

// Driver method
var numArr = [];
var remArr = [];
// console.log("x is " + findMinX(num, rem, k));
var count = 0;
const doCalc = ()=>{
    numArr=[]
    remArr=[]
    for (let i = 0; i <=count; i++) {
        let num = document.getElementById(`num${i}`).value;
        let rem = document.getElementById(`rem${i}`).value;
        numArr.push(parseInt(num))
        remArr.push(parseInt(rem))
    }
    console.log(numArr, remArr,count)
    let x = findMinX(numArr, remArr, numArr.length)
    document.getElementById('result').innerHTML = `<br><h3>The value of X is :${x}</h3>`
}
const addItem = ()=>{
    let container = document.getElementById("sim-container")
    window.event.preventDefault();
    ++count;
    container.innerHTML +=`
                    <br>
                    <label for="fname">X % </label>
                    <input type="text" id="num${count}" name="num${count}" placeholder="Number" required>
                    <label for="lname">=</label>
                    <input type="text" id="rem${count}" name="rem${count}" placeholder="Remainder">
                    <button onclick="addItem()" class="add"><img width="35" src="./plus.png"></button>`
}
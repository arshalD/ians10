$("#get_sol").hide();
$("#crt_sol").hide();

(function (window) {
    // Variables
    var dc = {};
    let count = 1;
    
    let getHtmlFormInputSnippet = (count) => `
        <div id="inputItem${count}" class="col-12 row mt-3">
            <div class="col-1 py-2">
                <div class="text-warning text-center">X</div>
            </div>
            <div class="col-1 py-2">
                <div class="text-warning text-center">%</div>
            </div>
            <div class="col-4">
                <label for="mod" class="visually-hidden">Divisor</label>
                <input type="number" class="form-control" id="mod${count}" placeholder="Divisor">
            </div>
            <div class="col-1 py-2">
                <div class="text-warning text-center">=</div>
            </div>
            <div class="col-4">
                <label for="rem" class="visually-hidden">Remainder</label>
                <input type="number" class="form-control" id="rem${count}" placeholder="Remainder">
            </div>
            <div class="col-1">
                <button onclick="$dc.addItem()" class="btn pt-0 float-end"><img width="35" src="./plus-circle.svg">
                </button>
            </div>
        </div>
    `;

    // Inverse of number using extended euclidean.
    function inv(div_r, div_t) {
        let x = 1, y = 0, z, r, a = Number.parseInt(div_r), m = Number.parseInt(div_t);
    
        while (true) {
            if (m == 0) {
                if (a != 1) {
                    crtError(`Relative prime error.`);
                    return -1;
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
        var M = 1, result = 0, t, temp, t_inv;
    
        for (var i = 0; i < size; i++) {
            M *= mod[i];
        }
        // Shows the value of M.
        $("#M_value").text(`M = ${M}`);
        
        for (var i = 0; i < size; i++) {
            t = M / mod[i];
            appendTableRow(2, i, t);
            t_inv = inv(t, mod[i]);
            if (t_inv == -1) {
                return -1;
            }
            appendTableRow(3, i, t_inv);
            temp = (rem[i] * t * t_inv);
            result += temp;
            console.log(temp);
        }
    
        result %= M;
        
        return (result < 0) ? (M + result) : result;
    }

    let crtResult = (result) => {
        $('#crt_result').addClass('mt-5');
        $("#crt_result").html(
            `<h3 class="text-warning text-center">
                ${result}
            </h3>`
        );
    };

    let crtError = (error) => {
        $('#crt_error').addClass('mt-5');
        $('#crt_error').html(
            `<h3 class="text-danger text-center">
                ${error}
            </h3>`
        );
    };

    let appendTableRow = (tableid, coli, value) => {
        $(`#table${tableid} > thead > tr`).append(`
            <th scope="col" style="min-width: 70px;">${coli}</th>
        `);
        $(`#table${tableid} > tbody > tr`).append(`
            <td style="min-width: 70px;">${value}</td>
        `);
    };

    let resetTableRow = (tableid, htmlText) => {
        $(`#table${tableid} > thead > tr`).html(`
            <th scope="row" style="min-width: 70px;">For i</th>
        `);
        $(`#table${tableid} > tbody > tr`).html(`
            <th scope="row" style="min-width: 70px;">
                ${htmlText}
            </th>
        `);
    };

    $(document).ready(function() {
        dc.doCalc = () => {
            crtError(``);
            $("#crt_error").removeClass('mt-5');
            crtResult(``);
            $("#crt_result").removeClass('mt-5');
            $("#get_sol").hide();
            $("#crt_sol").hide();
            resetTableRow(0, "<math>r<sub>i</sub></math>");
            resetTableRow(1,"<math>m<sub>i</sub></math>");
            resetTableRow(2, "<math>M<sub>i</sub></math>");
            resetTableRow(3, "<math>M<sub>i</sub><sup>-1</sup></math>");
            modArr = [];
            remArr = [];
            let x;
            for (let i = 0; i <= count; i++) {
                let mod = document.getElementById(`mod${i}`).value;
                let rem = document.getElementById(`rem${i}`).value;
                if (mod=='' || rem=='') {
                    crtError(`Input values`);
                    $("#get_sol").hide();
                    return;
                }
                modArr.push(parseInt(mod));
                remArr.push(parseInt(rem));
                appendTableRow(0, i, rem);
                appendTableRow(1, i, mod);
            }
            console.log(modArr, remArr, count);
            x = getCRT(modArr, remArr, modArr.length);
            if (x == -1) {
                $("#get_sol").hide();
                return ;
            }
            $(`#X_value > h5`).html(`<math>&#8756;</math> X = ${x}`);
            console.log(x);
            crtResult(`The value of X is ${x}`);
            $("#get_sol").show();
        };
        
        dc.addItem = () => {
            window.event.preventDefault();
            $(`#inputItem${count} :nth-child(6)`).html(
                `<button onclick="$dc.deleteItem(${count})" class="btn pt-0 float-end"><img width="35" src="./minus-circle.svg">
                </button>`
            );
            count++;
            $("#sim-container").append(getHtmlFormInputSnippet(count));
        };
        
        dc.deleteItem = (num) => {
            let i;
            count--;
            $(`#inputItem${num}`).remove();
            for (i=num; i<=count; i++) 
            {
                $(`#inputItem${i+1}`).attr("id", `inputItem${i}`);
                $(`#inputItem${i} :nth-child(3) > input`).attr("id", `mod${i}`);
                $(`#inputItem${i} :nth-child(5) > input`).attr("id", `rem${i}`);
                if (i!=count) {
                    $(`#inputItem${i} :nth-child(6) > button`).attr("onclick", `$dc.deleteItem(${i})`);
                }    
            }
        };

        dc.getSolution = () => {
            $("#crt_sol").show();

        };
    });

    window.$dc = dc;
})(window);


// // Test 
// var num = [3, 5, 7];
// var rem = [2, 3, 2];
// console.log("x is " + getCRT(num, rem, 3));

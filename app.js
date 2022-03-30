import "./style.scss";

document.addEventListener("DOMContentLoaded", ready());

function ready() {
    let mainField = document.createElement("div");
    mainField.classList.add("mainField");
    document.body.appendChild(mainField);
    for (var b = 0; b < 4; b++) {
        let bigDigit = document.createElement("div");
        bigDigit.classList.add("bigDigit");
        bigDigit.classList.add("b" + b);
        mainField.appendChild(bigDigit);
    }

    for (let index = 0; index < 60; index++) {
        let it = "" + index;
        let digit = it.length < 2 ? "0" + it : it;
        // console.log(digit, it.length);

        // if ((index / 4) % 4 == 0) {
        //     let bigDigit = document.createElement("div");
        //     bigDigit.classList.add("bigDigit" + index);
        //     mainField.appendChild(bigDigit);
        // }
        console.log(Math.floor(index / 15));
        let bigDigitClass = "b" + Math.floor(index / 15);
        let digitDiv = document.createElement("div");
        digitDiv.classList.add("digit" + digit);

        document.querySelector(`.${bigDigitClass}`).appendChild(digitDiv);
        let itmDigit = document.createElement("div");
        itmDigit.innerText = digit;
        digitDiv.appendChild(itmDigit);
        // }
    }

    loop();
}
let bigDigit = [
    { name: "0", value: ["x", "x", "x", "x", "x", "x", "_", "_", "_", "x", "x", "x", "x", "x", "x"] },
    { name: "1", value: ["x", "_", "_", "_", "x", "x", "x", "x", "x", "x", "_", "_", "_", "_", "x"] },
    { name: "2", value: ["x", "_", "x", "x", "x", "x", "_", "x", "_", "x", "x", "x", "x", "_", "x"] },
    { name: "3", value: ["x", "_", "x", "_", "x", "x", "_", "x", "_", "x", "x", "x", "x", "x", "x"] },
    { name: "4", value: ["x", "x", "x", "_", "_", "_", "_", "x", "_", "_", "x", "x", "x", "x", "x"] },
    { name: "5", value: ["x", "x", "x", "_", "x", "x", "_", "x", "_", "x", "x", "_", "x", "x", "x"] },
    { name: "6", value: ["x", "x", "x", "x", "x", "x", "_", "x", "_", "x", "x", "_", "x", "x", "x"] },
    { name: "7", value: ["x", "_", "_", "_", "_", "x", "_", "_", "_", "_", "x", "x", "x", "x", "x"] },
    { name: "8", value: ["x", "x", "x", "x", "x", "x", "_", "x", "_", "x", "x", "x", "x", "x", "x"] },
    { name: "9", value: ["x", "x", "x", "_", "x", "x", "_", "x", "_", "x", "x", "x", "x", "x", "x"] },
];

function loop() {
    let secDigits = document.querySelectorAll(".mainField > div>div");
    // console.log(secDigits);
    setInterval(() => {
        let d = new Date();
        d.sec = d.getSeconds();
        JSON.stringify(d.sec).length < 2 ? (d.sec = "0" + d.sec) : (d.sec = "" + d.sec);
        d.min = d.getMinutes();
        JSON.stringify(d.min).length < 2 ? (d.min = "0" + d.min) : (d.min = "" + d.min);
        d.hr = d.getHours();
        JSON.stringify(d.hr).length < 2 ? (d.hr = "0" + d.hr) : (d.hr = "" + d.hr);
        // console.log(d.hr, d.min, d.sec);
        let layoutArray = [];
        for (var i = 0; i < [...d.hr].length; i++) {
            // console.log(i, [...d.hr][i], bigDigit[Number([...d.hr][i])].value);
            let digitArray = bigDigit[Number([...d.hr][i])].value;
            digitArray.forEach(el => layoutArray.push(el));
        }
        for (var i = 0; i < [...d.min].length; i++) {
            let digitArray = bigDigit[Number([...d.min][i])].value;
            digitArray.forEach(el => layoutArray.push(el));
        }
        // console.log(layoutArray);
        // [...d.hr].forEach(e => console.log(bigDigit[e]));
        secDigits.forEach((elem, j) => {
            elem.classList.remove("active");
            elem.classList.remove("halfActive");
            // console.log(layoutArray[j]);
            let ii = j;
            JSON.stringify(j).length < 2 ? (ii = "0" + j) : (ii = "" + j);

            if (layoutArray[j] == "x")
                document.querySelector(`.mainField >.b${Math.floor(j / 15)}> div.digit${ii}`).classList.add("halfActive");
        });
        let currentDigit = document.querySelector(`.mainField>.b${Math.floor(d.sec / 15)} > div.digit${d.sec}`);
        currentDigit.classList.add("active");
    }, 500);
}
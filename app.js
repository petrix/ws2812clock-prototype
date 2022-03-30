import "./style.scss";
let checkBox = document.createElement("input");
let highPicker = document.createElement("input");
let lowPicker = document.createElement("input");

document.addEventListener("DOMContentLoaded", ready);

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

    // let lowPicker = document.createElement("input");
    lowPicker.id = "lowPicker";
    lowPicker.type = "color";
    let lowPickLabel = document.createElement("label");
    lowPickLabel.setAttribute("for", "lowPicker");
    lowPickLabel.innerText = "lowPicker";
    document.body.appendChild(lowPickLabel);
    document.body.appendChild(lowPicker);
    // let highPicker = document.createElement("input");
    highPicker.id = "highPicker";
    highPicker.type = "color";
    let highPickLabel = document.createElement("label");
    highPickLabel.setAttribute("for", "highPicker");
    highPickLabel.innerText = "highPicker";
    document.body.appendChild(highPickLabel);
    document.body.appendChild(highPicker);
    lowPicker.value = "#0b3c0f";
    highPicker.value = "#690000";
    // let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id = "hueRotation";
    let chkBoxLabel = document.createElement("label");
    chkBoxLabel.setAttribute("for", "hueRotation");
    chkBoxLabel.innerText = "Hue Rotation";
    document.body.appendChild(chkBoxLabel);
    document.body.appendChild(checkBox);
    lowPicker.addEventListener("change", e => {
        let hsl = RGBtoHSL(e.target.value);
        document.querySelector("#lowColor").innerText = `.halfActive > div {color: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);}`;

        // console.log(hsl);
    });
    highPicker.addEventListener("change", e => {
        let hsl = RGBtoHSL(e.target.value);
        document.querySelector("#highColor").innerText = `.active > div {color: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);}`;

        console.log(e.target.value);
    });
    checkBox.addEventListener("change", e => {
        if (e.target.checked) {}
        console.log(e.target.checked);
    });
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
        if (checkBox.checked) {
            let lowHSL = RGBtoHSL(document.querySelector("#lowPicker").value);
            let highHSL = RGBtoHSL(document.querySelector("#highPicker").value);
            document.querySelector("#lowColor").innerText = `.halfActive > div {color: hsl(${lowHSL.h + (d.sec / 60) * 360}, ${
				lowHSL.s
			}%, ${lowHSL.l}%);}`;
            document.querySelector("#highColor").innerText = `.active > div {color: hsl(${highHSL.h + (d.sec / 60) * 360}, ${
				highHSL.s
			}%, ${highHSL.l}%);}`;
        }
    }, 500);
}

const RGBtoHSL = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    (r /= 255), (g /= 255), (b /= 255);
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h,
        s,
        l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    var colorInHSL = "hsl(" + h + ", " + s + "%, " + l + "%)";
    // console.log(colorInHSL);
    return { h, s, l };
};
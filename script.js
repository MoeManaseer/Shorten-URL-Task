let itemNumber = 0;

function copyLink(id) {
    let button = document.getElementById(id.target.id);
    if (button.value === "Copy") {
        button.value = "Copied";
        button.innerHTML = "Copied!";
        let buttonList = document.querySelectorAll(".shortly-body__items .output .button");
        console.log(buttonList);
        buttonList.forEach((element)=>{
            console.log(element);
            if (element.value === "Copied" && element!=id.target) {
                element.value = "Copy";
                element.innerHTML = "Copy";
                element.classList.toggle("button--active")
            }
        })
    } else {
        button.value = "Copy";
        button.innerHTML = "Copy";
    }
    button.classList.toggle("button--active");
}

function shortenLink() {
    let link = document.form.link;
    console.log(link.value);
    console.log(validURL(link.value));

    if (link.value === "" || !validURL(link.value)) {
        let input = document.querySelector(".shortly-body__form .shortly-body__form__body .url input");
        input.classList.add("input--failed");
    } else {
        console.log("success");
        generateShortendLink(link.value);
    }
    return false;
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
}

function makeShortendUrl(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 function generateShortendLink(link) {
    let linkList = document.getElementById("list");
    let divHolder = document.createElement("div");
    let divInput = document.createElement("div");
    let divOutput = document.createElement("div");
    let linkInput = document.createElement("P");
    let linkOutput = document.createElement("A");
    let copyButton = document.createElement("BUTTON");
    let breakLine = document.createElement("HR");

    divHolder.className = "shortly-body__items";
    divInput.className = "shortly-body__items input";
    divOutput.className = "output";
    linkOutput.className = "shortend-link";
    copyButton.className = "button";
    copyButton.value = "Copy";
    copyButton.innerHTML = "Copy";
    breakLine.className = "br";
    copyButton.id = "button"+itemNumber;
    console.log(divInput);
    console.log("hello");
    console.log(linkList);

    linkInput.innerHTML = link;
    divInput.appendChild(linkInput);
    divHolder.appendChild(divInput);

    linkOutput.innerHTML = makeShortendUrl(10);
    divOutput.appendChild(breakLine);
    divOutput.appendChild(linkOutput);
    divOutput.appendChild(copyButton);
    copyButton.onclick = copyLink;
    divHolder.appendChild(divOutput);

    linkList.prepend(divHolder);
    itemNumber++;
 }
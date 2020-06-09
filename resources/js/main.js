let itemNumber = 0;

function copyLink(id) {
    let button = document.getElementById(id.target.id);
    if (button.value === "Copy") {
        button.value = "Copied";
        button.innerHTML = "Copied!";
        let link = document.getElementById("link"+id.target.id[id.target.id.length-1]).innerText;
        let tmp = document.createElement("textarea");
        document.body.appendChild(tmp);
        tmp.value = link;
        tmp.select();
        document.execCommand("copy");
        document.body.removeChild(tmp);
        let buttonList = document.querySelectorAll(".shortly-body__items .output .button");
        buttonList.forEach((element)=>{
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
    let input = document.querySelector(".shortly-body__form .shortly-body__form__body .url input");

    if (link.value === "" || !validURL(link.value)) {
        input.classList.add("input--failed");
    } else {
        sendLinkToApi(link.value);
        fetch('https://cu8.in/api/?action=short&urls=|'+link.value+'|')
        .then(res => res.json())
        .then(json => generateShortendLink(link.value,json.data.shortUrl.secure))
        if (input.classList.contains("input--failed")) {
            input.classList.toggle("input--failed");
        }
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

 function generateShortendLink(link,newLink) {
    let linkList = document.getElementById("list");
    let divHolder = document.createElement("div");
    let divInput = document.createElement("div");
    let divOutput = document.createElement("div");
    let linkInput = document.createElement("P");
    let linkOutput = document.createElement("P");
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
    linkOutput.id = "link"+itemNumber;

    linkInput.innerHTML = link;
    divInput.appendChild(linkInput);
    divHolder.appendChild(divInput);

    linkOutput.innerHTML = newLink;
    divOutput.appendChild(breakLine);
    divOutput.appendChild(linkOutput);
    divOutput.appendChild(copyButton);
    copyButton.onclick = copyLink;
    divHolder.appendChild(divOutput);

    linkList.prepend(divHolder);
    itemNumber++;
 }

 function sendLinkToApi(link) {
    console.log(link);
    const req = new XMLHttpRequest();
    req.open('POST','/shortenUrl');
    req.setRequestHeader("Content-Type","application/json");
    req.send(JSON.stringify({link: link}));
    req.addEventListener('load',(e) => {
        console.log("req done");
    });
    req.addEventListener('error', (e) => {
        console.log("something bad happend");
        console.log(e);
    });
    console.log(req.body);

 }

 function showNav() {
    let navBar = document.querySelector(".shortly-navbar__mobile");
    if (navBar.style["display"] === "none" || navBar.style["display"] === "") {
        navBar.style["display"] = "block";
    } else {
        navBar.style["display"] = "none";
    }
    console.log(navBar);
 }

const apiLink = "https://weerlive.nl/api/json-data-10min.php?key=demo&locatie=Amsterdam ";

const btn1 = document.getElementById("activate1");
const btn2 = document.getElementById("activate2");
const btn3 = document.getElementById("activate3");

let Information = document.getElementById("Information");

function MakeAjaxCall(url, methodType) {
    let promiseObj = new Promise(function (resolve, reject) {
        console.log(url)

        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open(methodType, url, true)
        xmlHttp.send();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState != 4) {
                console.log("Bezig met ophalen");
                return;
            }
            if (xmlHttp.status != 200) {
                reject(xmlHttp);
                console.log("er is iets fout gegaan")
                return;
            }
            console.log("Succesvol");
            let serverResponse = xmlHttp.responseText;
            console.log(serverResponse);
            resolve(serverResponse);
        }
    });
    return promiseObj;
}

btn1.addEventListener("click", () => {
    MakeAjaxCall(apiLink, "GET").then(function (JSONresponse) {
        Information.innerHTML = "";
        Information.innerHTML += JSONresponse;
    });
});
btn2.addEventListener("click", () => {
    MakeAjaxCall(apiLink, "GET").then(function (JSONresponse) {
        Information.innerHTML = "";
        let weatherObject = JSON.parse(JSONresponse);
        let complateData = "";
        for (const [key, value] of Object.entries(weatherObject.liveweer[0])) {
            // complateData += "Key: " + ket + " Value: " + value;
            Information.innerText += "Key: " + key + " Value: " + value + "\n";
        }
    });
});
btn3.addEventListener("click", () => {
    MakeAjaxCall(apiLink, "GET").then(function (JSONresponse) {
        Information.innerHTML = "";
        let weatherObject = JSON.parse(JSONresponse);
        Information.innerText += "Plaats: " + weatherObject.liveweer[0].plaats + "\n";
        Information.innerText += "temperatuur : " + weatherObject.liveweer[0].temp+ "\n";
        Information.innerText += "gem-temperatuur : " + weatherObject.liveweer[0].gtemp+ "\n";
        Information.innerText += "verwachting : " + weatherObject.liveweer[0].verw+ "\n";
        Information.innerText += "weerbeeld : " + weatherObject.liveweer[0].image+ "\n";
        Information.innerText += "kans op weerslag : " + weatherObject.liveweer[0].d0neerslag + "%" + "\n";
    });
});

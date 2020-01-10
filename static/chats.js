const ATJAUNOT = 5000;
async function lasiChatu(){
    const atbilde = await fetch('chats/lasi');
    const datuObjekts = await atbilde.json();
    raadiChatuVienkarsi(datuObjekts);

    await new Promise(reslove => setTimeout(reslove, ATJAUNOT));
    await lasiChatu();


}

function raadiChatuVienkarsi(dati){
    const jaunaRinda = "</br>";
    let chats = "";
    let chataDiv = document.getElementById("chats");

    for(let rinda of dati['chats']){
        chats = chats + rinda + jaunaRinda;
    }

    chataDiv.innerHTML = chats;
}

async function suutiZinju(){
    let zinjasElements = document.getElementById('zinja');
    let zinja = zinjasElements.value;

    zinjasElements.value = "";

    const atbilde = await fetch('/chats/suuti', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"chats": zinja})
    });
    const datuObjekts = await atbilde.json();

    raadiChatuVienkarsi(datuObjekts);
}


let ievadesLauks = document.getElementById("zinja");
ievadesLauks.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        suutiZinju();
    }

})
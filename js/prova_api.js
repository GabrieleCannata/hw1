
function onSuccess(response){
    console.log(response.status);
    if(!response.ok)
    {
        console.log('Risposta non valida');
        return null;
    }
    else    {return response.text();}
}

function onFail(error){
    console.log("Error: " + error);
}

function onJson(json){
    const cont = document.querySelector('#results');
    cont.classList.add('characters-list-wrapper');
    const parsed = JSON.parse(json);
    console.log(parsed);
    const dataset = parsed.data;
    const entries = Object.entries(dataset);
    const batchSize = 100;
    let startIndex = 0;

    while (startIndex < entries.length) 
    {
        const endIndex = Math.min(startIndex + batchSize, entries.length);
        const batch = entries.slice(startIndex, endIndex);

        for (const [key, value] of batch) {
            const cont2 = document.createElement('div');
            cont2.classList.add('champ-item-container');
            const cont3 = document.createElement('div');
            cont3.classList.add('character-wrapper');
            const id = value.id;
            const nome = value.name;
            const immagine = document.createElement('img');
            immagine.classList.add("character-icon");
            immagine.src = "/14.7.1/img/tft-champion/" + value.image.full;
            cont3.appendChild(immagine);
            cont2.appendChild(cont3);
            cont.appendChild(cont2);
        }

        startIndex += batchSize;
        
    }

    cont.appendChild(cont2);
}

const url = fetch("/js/tft-champion.json");
url.then(onSuccess, onFail).then(onJson);

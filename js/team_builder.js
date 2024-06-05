/*  Variabili globali   */ 
let dragged;
let drag_start_container;
let drag_end_container;
let drag_end_item_container;
let counter=0;
let x=0;
/*
Ciclo che implementa la creazione della board per la costruzione del team,
assegnazione delle classi agli elementi hex e composizione degli esagoni e indicizzazione
*/
for(let i=0; i<28; i++){
    const new_hex = document.createElement('div');

    new_hex.textContent='';
    new_hex.classList.add('hex');

    if(i===7 || i===21){
        new_hex.classList.add('shifted_hex');
    }
    new_hex.dataset.index = i+1;

    const container = document.querySelector('#four-row');
    container.appendChild(new_hex);

    new_hex.addEventListener("dragover", (event) => {event.preventDefault();}, false);
    new_hex.addEventListener("dragenter", (event) => {event.target.classList.add("dragover"); drag_end_container=new_hex;});
    new_hex.addEventListener("dragleave", (event) => {event.target.classList.remove("dragover");});
    new_hex.addEventListener("drop", (event) => {event.target.classList.remove("dragover"); swapBoard(dragged, drag_start_container, drag_end_container);});

    const new_top_hex = document.createElement('div');
    const new_bot_hex = document.createElement('div');
    new_top_hex.classList.add('top_hex');
    new_bot_hex.classList.add('bot_hex');

    new_hex.appendChild(new_top_hex);
    new_hex.appendChild(new_bot_hex);

    const new_div = document.createElement('div');
    new_div.classList.add('champ-item-container');

    const new_champ_wrapper = document.createElement('div');
    new_champ_wrapper.classList.add('character-wrapper');

    new_div.appendChild(new_champ_wrapper);
    new_hex.appendChild(new_div);

}

function removeChamp(x){
        x.style.backgroundImage = "none";
        x.classList.remove('filled-hex');
        x.classList.add('hex');
        const cont = x.querySelector('.champ-item-container .character-wrapper');
        cont.removeChild(cont.querySelector('img'));
        x.removeEventListener('click', removeChampBoard);
        if(x.querySelector('.champion-items'))     x.removeChild(x.querySelector('.champion-items'));
}

function removeItem(x){
    if(x.parentNode.parentNode.parentNode.getAttribute('data-items'))
        {
            x.parentNode.parentNode.parentNode.dataset.items--;
            x.parentNode.parentNode.remove(x.parentNode.parentNode);
        }
}

function onClickClear(){
    let hexes = document.querySelectorAll('.filled-hex');
    for(let i=0; i<hexes.length; i++)       removeChamp(hexes[i]);
    counter=0;
}

//Funzione di aggiunta alla lista degli item
function addItemBoard(){
    const container = drag_end_item_container;
    if(container.dataset.items == 3) return;
    const item_board = document.createElement('img');
    item_board.src= dragged.src;
    item_board.classList.add('character-icon');
    item_board.addEventListener('contextmenu', removeItemBoard);
    const new_div = document.createElement('div');
    new_div.classList.add('champion-items-container');

    const new_item_wrapper = document.createElement('div');
    new_item_wrapper.classList.add('character-wrapper');
    new_item_wrapper.appendChild(item_board);
    new_div.appendChild(new_item_wrapper);
    container.appendChild(new_div);
    container.dataset.items++;
}

/*
Funzione di aggiunta alla board dei campioni
*/ 
function addChampBoard(event){
    if(counter===28) return;
    const champ = event.target;
    const champ_board = document.createElement('img');
    
    const hex= document.querySelector('#four-row .hex');
    const cont = hex.querySelector('.champ-item-container .character-wrapper');
    hex.classList.remove('hex');
    hex.classList.add('filled-hex');
    hex.style.backgroundImage = "url("+champ.src+")";
    hex.addEventListener('dblclick', removeChampBoard);

    champ_board.src = champ.src;
    champ_board.classList.add('character-icon');

    if(hex.querySelector('.champion-items') == null){
        const item_container = document.createElement('div');
        item_container.classList.add('champion-items');
        item_container.dataset.items = 0;
        champ_board.addEventListener("dragover", (event) => {event.preventDefault(); event.stopPropagation();}, false);
        champ_board.addEventListener("dragenter", (event) => {event.preventDefault(); event.stopPropagation(); event.currentTarget.classList.add("dragover"); drag_end_item_container=item_container;});
        champ_board.addEventListener("dragleave", (event) => {event.preventDefault(); event.stopPropagation(); event.currentTarget.classList.remove("dragover");});
        champ_board.addEventListener("drop", (event) => {event.currentTarget.classList.remove("dragover"); addItemBoard(); event.stopPropagation();});
        hex.appendChild(item_container);
    }


    champ_board.addEventListener("dragstart", (event) => {dragged = event.target;   drag_start_container=hex;   event.target.classList.add("dragging");});
    champ_board.addEventListener("dragend", (event) => {event.target.classList.remove("dragging");});
    cont.appendChild(champ_board);
    counter++;
}

//Funzione che gestisce il passaggio da un esagono ad un altro  
function swapBoard(ch, start, end){
    let temp = start.querySelector('.champion-items');
    removeChamp(start);
    drag_end_container.classList.remove('hex');
    drag_end_container.classList.add('filled-hex');
    const champ_board = document.createElement('img');
    champ_board.classList.add('character-icon');
    
    champ_board.src = ch.src;
    champ_board.addEventListener("dragover", (event) => {event.preventDefault(); event.stopPropagation();}, false);
    champ_board.addEventListener("dragenter", (event) => {event.preventDefault(); event.stopPropagation(); event.currentTarget.classList.add("dragover"); drag_end_item_container=temp;});
    champ_board.addEventListener("dragleave", (event) => {event.preventDefault(); event.stopPropagation(); event.currentTarget.classList.remove("dragover");});
    champ_board.addEventListener("drop", (event) => {event.currentTarget.classList.remove("dragover"); addItemBoard(); event.stopPropagation();});
    drag_end_container.style.backgroundImage = "url("+ch.src+")";
    drag_end_container.addEventListener('dblclick', removeChampBoard);

    const cont = drag_end_container.querySelector('.champ-item-container .character-wrapper');
    cont.appendChild(champ_board);

    drag_end_container.appendChild(temp);

    champ_board.addEventListener("dragstart", (event) => {dragged = event.target;   drag_start_container=champ_board.parentNode.parentNode.parentNode;   event.target.classList.add("dragging");});
    champ_board.addEventListener("dragend", (event) => {event.target.classList.remove("dragging");});
}

//Funzione di rimozione dalla board dei campioni singola 
function removeChampBoard(event){
    const champ = event.currentTarget;
    removeChamp(champ);
}

function removeItemBoard(event){
    event.preventDefault();
    const item = event.currentTarget;
    removeItem(item);
}

function createContainer(path, root, f, nome){
        const new_img = document.createElement('img');
        new_img.src = path;
        new_img.dataset.name = nome;
        new_img.classList.add('character-icon');

        const new_div = document.createElement('div');
        new_div.classList.add('champ-item-container');
        
        if(f===0)             new_img.addEventListener('click', addChampBoard);
        else if(f===1)
            {
                new_img.addEventListener('dragstart', (event) => {dragged = event.target;});
            }
        const new_champ_wrapper = document.createElement('div');
        new_champ_wrapper.classList.add('character-wrapper');
        
        new_champ_wrapper.appendChild(new_img);
        new_div.appendChild(new_champ_wrapper);
        root.appendChild(new_div);
}

/*
Creazione degli elementi img che contengono i campioni e loro indicizzazione,
assegnazione delle classi e assegnazione al container

Creazione di onSuccess e onFail
*/
function loadChamp(item, nome){
    const root= document.querySelector('#champions-container .characters-list-wrapper');
    createContainer(item, root, 0, nome); 
}

function loadItem(item, nome){
    const root= document.querySelector('#item-container .characters-list-wrapper');
    createContainer(item, root, 1, nome);
}

function add_remove_container_class(element){
  element.classList.remove('unhighlighted'); 
  element.classList.add('highlighted');
}
function remove_add_container_class(element){
  element.classList.add('unhighlighted'); 
  element.classList.remove('highlighted');
}

function onJson(json){
    if(!json)   {   console.log("Nessun testo");    return;}
    const parsed = json;
    const batchSize = 100;
    let startIndex = 0;
    if(x===0)
    {
        const dataset = parsed.data;
        const entries = Object.entries(dataset);
        while (startIndex < entries.length) 
        {
            const endIndex = Math.min(startIndex + batchSize, entries.length);
            const batch = entries.slice(startIndex, endIndex);
            for (const [key, value] of batch) {
                const path = "../14.7.1/img/tft-champion/" + value.image.full;
                let nome=value.name.toLowerCase();
                nome = nome.replace("'","");
                if(nome == "xayah e rakan") nome = nome.replace("xayah e rakan","xayah");
                loadChamp(path,nome);
            }
            startIndex += batchSize;     
        }
        x++;
    }
    else if(x===1)
    {
        const dataset = parsed.data;
        const entries = Object.entries(dataset);
        while (startIndex < entries.length) 
        {
            const endIndex = Math.min(startIndex + batchSize, entries.length);
            const batch = entries.slice(startIndex, endIndex);
            for (const [key, value] of batch) {
                const path = "../14.7.1/img/tft-item/" + value.image.full;
                let nome=value.name.toLowerCase();
                loadItem(path, nome);
            }        
            startIndex += batchSize;     
        }
        x++;
    }else
    {
        const lista_container = document.querySelectorAll('#champions-container .characters-list-wrapper .champ-item-container');
        let counter=0;
        console.log(lista_container);
        if(document.querySelector("input[name='champion-searchbar']").value=="")
          {
            lista_container.forEach((element) => add_remove_container_class(element));
          }
        else{
          lista_container.forEach((element) => remove_add_container_class(element));
          while(counter < parsed.length)
            {
              const champion = document.querySelector("[data-name='"+parsed[counter].Nome+"']");
              champion.parentNode.parentNode.classList.remove('unhighlighted');
              champion.parentNode.parentNode.classList.add('highlighted');
              counter++;
            }
        }
        
    }
}

function onChange_ricerca_Campione(event){
    url = "../php/ricerca_campioni.php";
    const form_data = {method: 'post', body: new FormData(document.forms.ricerca_campione)};
    fetch(url, form_data).then(onSuccess).then(onJson);
    event.preventDefault();
}

function onSuccess(response){
    console.log(response.status);
    if(!response.ok)
    {
        console.log('Risposta non valida');
        return null;
    }
    else    {return response.json();}
}

function onFail(error){
    console.log("Error: " + error);
}

let album="";
let titolo="";

function onClickSave(event){
    const form_data = new FormData();
    let hex = document.querySelectorAll('[data-index]');
    for(let i=0; i<28; i++){
        if(hex[i].querySelector('.champion-items'))
            {
                console.log(hex[i].querySelector('.champion-items'));
                form_data.append('hex'+(i+1)+'', hex[i].style.backgroundImage);
                if(hex[i].querySelector('.champion-items').getAttribute('data-items')>0)
                    {
                        let j=0;
                        const oggetti = hex[i].querySelector('.champion-items').querySelectorAll('.character-icon');  
                        while(j<hex[i].querySelector('.champion-items').getAttribute('data-items'))
                        {
                            form_data.append('item'+(i+1)+"-"+(j+1),oggetti[j].src);
                            j++;
                        }
                        while(j<3){
                            form_data.append('item'+(i+1)+"-"+(j+1), null);
                            j++;
                        }
                    }
            }
    }
    form_data.append("Immagine_composizione", album);
    form_data.append("Titolo", titolo);
    
    const url = "../php/save_comp.php";
    fetch(url, {method: 'post', body: form_data}).then(onResponse).then(SaveSuccess);
}

function SaveSuccess(){
    alert("Salvataggio del team avvenuto con successo!");
}

const clear_btn = document.querySelector('#clear');
clear_btn.addEventListener('click', onClickClear);


const save_btn = document.querySelector('#save');
save_btn.addEventListener('click', onClickSave);

const champions_images_promise = fetch('../js/tft-champion.json');
champions_images_promise.then(onSuccess, onFail).then(onJson);

const items_images_promise = fetch('../js/tft-item.json');
items_images_promise.then(onSuccess, onFail).then(onJson);

const search_champion= document.forms.ricerca_campione;
search_champion.addEventListener('keyup', onChange_ricerca_Campione);


/*
Il codice seguente gestisce la parte delle REST API del sito che dovrà espletare la parte di ricerca delle informazioni dei giocatori
*/
function onRiot(json){
  const image = document.createElement('img');
  const icon = "../14.7.1/img/profileicon/"+json[0]+".png";
  const lvl = json[1];
  image.src = icon;
  modal_user.classList.remove('hidden');
  modal_user.classList.add('fl');
  overlay.appendChild(image);
  image.addEventListener('click', closeModal);

  const name_player = document.createElement('span');
  name_player.textContent = player.value;
  summoner_name_tag.appendChild(name_player);
  
  const txt = document.createElement('span');
  txt.textContent = lvl;
  overlay.appendChild(txt);

}
const summoner_name_tag = document.getElementById('summoner-name-tag');
const modal_user = document.getElementById('modal-user');
const overlay = document.getElementById("summoner-profile");

function closeModal(event){
  overlay.innerHTML='';
  summoner_name_tag.innerHTML='';
  modal_user.classList.add("hidden");
  modal_user.classList.remove("fl");
}

const player = document.querySelector('#player-search-bar');

function search(event){
    event.preventDefault();
    const riot_id = player.value.split('#');
    const riot_name = encodeURIComponent(riot_id[0]);
    const riot_tag = encodeURIComponent(riot_id[1]);
    const url = "../php/riot_api.php?riot_name="+riot_name+"&riot_tag="+riot_tag;
    fetch(url).then(onSuccess).then(onRiot);
}

const form1 = document.querySelector('#player');
form1.addEventListener('submit', search);

function onClickAlbum(event){
    album = event.currentTarget;
    titolo = album.nextElementSibling.textContent;
    album = album.src;
}

function onSpotifyJson(json) {
    const libreria = document.querySelector('#album-view');
    const parsed = JSON.parse(json);
    libreria.innerHTML = '';
    const risultati = parsed.albums.items;
    let num_res = risultati.length;
    if(num_res > 10)
      num_res = 10;
    for(let i=0; i<num_res; i++)
    {
        const album = document.createElement('div');
        album.classList.add('album');
        
        const img = document.createElement('img');
        img.addEventListener("click", onClickAlbum);
        img.style.cursor = "pointer";
        const album_data = risultati[i];
        const titolo = album_data.name;
        const selected_image = album_data.images[0].url;
      
        img.src = selected_image;
        const caption = document.createElement('span');
        caption.textContent = titolo;
        
        album.appendChild(img);
        album.appendChild(caption);
        libreria.appendChild(album);
    }
}
  
function searchSpotify(event)
  {
    event.preventDefault();
    const album_input = document.querySelector('#album-bar');
    fetch("../php/spotify_api.php?q="+album_input.value).then(onSuccess).then(onSpotifyJson);
}

function onResponse(response){
  return response.text();
}

const form2 = document.querySelector('#album');
form2.addEventListener('submit', searchSpotify);


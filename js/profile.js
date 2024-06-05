function onSuccess(response){
    console.log(response.status);
    if(!response.ok)
    {
        console.log('Risposta non valida');
        return null;
    }
    else    {return response.json();}
}

function onComposition(json){
    const compositions_container = document.getElementById('compositions-container');
    const items = json;
    const num_items = items.length;

    for(let i=0; i < num_items; i++){
        const comp_container = document.createElement('div');
        comp_container.classList.add('comp-container');

        const comp_img_container = document.createElement('div');
        comp_img_container.classList.add('comp-img-container');

        const comp_img = document.createElement('img');
        comp_img.src = items[i].Path;
        comp_img.classList.add('comp-img');
        comp_img.dataset.id = items[i].COMPID;
        comp_img.addEventListener("click", openComposition);

        const comp_name = document.createElement('span');
        comp_name.textContent = items[i].Nome;
        comp_name.classList.add('comp-name');

        const trash_container = document.createElement('div');
        trash_container.classList.add('trash-container');

        const trash = document.createElement('img');
        trash.classList.add('trash');
        trash.dataset.id = items[i].COMPID;
        trash.addEventListener("click", removeComposition);

        comp_img_container.appendChild(comp_img);
        comp_container.appendChild(comp_img_container);
        comp_container.appendChild(comp_name);
        trash_container.appendChild(trash);
        comp_container.appendChild(trash_container);
        compositions_container.appendChild(comp_container);
    }
}

function loadComposition(){
    const url = "../php/composition_loader.php";
    fetch(url).then(onSuccess).then(onComposition);
}

function removeComposition(event){
    event.preventDefault();
    const parentContainer = document.getElementById('compositions-container');
    const button = event.currentTarget;
    parentContainer.removeChild(button.parentNode.parentNode);
    const url = "../php/remove_composition.php?q="+button.dataset.id;
    fetch(url);
}

function create_board(json){
    console.log(json);
    let j=0;
    for(let i=0; i<28; i++){
        const container = document.querySelector('#four-row');
        
        const new_hex = document.createElement('div');
        new_hex.textContent='';
        new_hex.classList.add('hex');
        container.appendChild(new_hex);

        if(i===7 || i===21){
            new_hex.classList.add('shifted_hex');
        }
        new_hex.dataset.index = i+1;
        if(new_hex.dataset.index == json[j].Hexagon){
            const new_img = document.createElement('img');
            new_img.src = json[j].CampioneComp;
            new_img.classList.add('character-icon');
            new_hex.classList.remove('hex');
            new_hex.classList.add('filled-hex');
            new_hex.style.backgroundImage = "url("+new_img.src+")";

            const item_container = document.createElement('div');
            item_container.classList.add('champion-items');
            new_hex.appendChild(item_container);

            if(json[j].Item1 != ""){
                const item1_board = document.createElement('img');
                item1_board.src= json[j].Item1;
                item1_board.classList.add('character-icon');
                const new_div = document.createElement('div');
                new_div.classList.add('champion-items-container');
                const new_item_wrapper = document.createElement('div');
                new_item_wrapper.classList.add('character-wrapper');
                new_item_wrapper.appendChild(item1_board);
                new_div.appendChild(new_item_wrapper);
                item_container.appendChild(new_div);
            }

            if(json[j].Item2 != ""){
                const item2_board = document.createElement('img');
                item2_board.src= json[j].Item2;
                item2_board.classList.add('character-icon');
                const new_div = document.createElement('div');
                new_div.classList.add('champion-items-container');
                const new_item_wrapper = document.createElement('div');
                new_item_wrapper.classList.add('character-wrapper');
                new_item_wrapper.appendChild(item2_board);
                new_div.appendChild(new_item_wrapper);
                item_container.appendChild(new_div);
            }

            if(json[j].Item3 != ""){
                const item3_board = document.createElement('img');
                item3_board.src= json[j].Item3;
                item3_board.classList.add('character-icon');
                const new_div = document.createElement('div');
                new_div.classList.add('champion-items-container');
                const new_item_wrapper = document.createElement('div');
                new_item_wrapper.classList.add('character-wrapper');
                new_item_wrapper.appendChild(item3_board);
                new_div.appendChild(new_item_wrapper);
                item_container.appendChild(new_div);
            }
            j++;
        }
    
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
}
function openComposition(event){
    const id = event.currentTarget.dataset.id;
    modal_four_row.classList.remove('hidden');
    modal_four_row.classList.add('fl');
    const url = "../php/retrieve_composition.php?q="+id;
    fetch(url).then(onSuccess).then(create_board);
}

function closeModal(event){
    modal_four_row.classList.add("hidden");
    modal_four_row.classList.remove("fl");
    const four_row = document.getElementById('four-row');
    four_row.innerHTML='';
}

const modal_four_row = document.getElementById('modal-four-row');
modal_four_row.addEventListener('click', closeModal);
loadComposition();
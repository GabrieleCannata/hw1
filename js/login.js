function validazione(event)
{
    // Verifica se tutti i campi sono riempiti
    if(form.USER.value.length == 0 ||
       form.PW.value.length == 0)
    {
        event.preventDefault();
    }
}

// Riferimento al form
const form = document.forms['log-form'];
// Aggiungi listener
form.addEventListener('submit', validazione);
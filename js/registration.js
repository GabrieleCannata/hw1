function validatePassword(password) { 
    let passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(passwordRegExp.test(password))   return true; 
                                else    return false; 
}

function validateEmail(mail){
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (validRegex.test(mail))  return true;
                        else    return false; 
}

function validazione(event)
{
    const username = form.USER.value;
    const pw = form.PW.value;
    const mail = form.MAIL.value;
    const validation_pw = validatePassword(pw);
    const validation_mail = validateEmail(mail);  
    if(validation_pw && username.length > 0 && validation_mail)
    {
        event.preventDefault();
        const path ="../php/verifica_credenziali.php";
        const form_data = {method: 'post', body: new FormData(document.forms['log-form'])};
        fetch(path, form_data).then(onSuccess).then(onText);
        
    }
    else 
    {
        if(!validation_pw)  alert("La password non soddisfa i requisiti");
        if(!validation_mail)    alert("La mail non è corretta");
    }
}

function onText(text){
    if(text == "true") location.reload();
    else window.location.href = "../php/index.php";
}

function onSuccess(response){
    console.log(response.status);
    if(!response.ok)
    {
        console.log('Risposta non valida');
        return null;
    }
    else    {return response.text();}
}

// Riferimento al form
const form = document.forms['log-form'];
// Aggiungi listener
form.addEventListener('submit', validazione);
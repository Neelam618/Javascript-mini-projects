document.getElementById('addbtn').addEventListener('click', verifyAndDisplay);

function verifyAndDisplay(){
    
    let errorMsg = document.getElementById('error-msg');
    if(document.getElementById('inputtext').value !== ""){
            errorMsg.style.display = "none";
            displayNote();
    }
    else{
        errorMsg.style.display = "block";
        document.getElementById('inputtext').focus();
    }
}

function createNoteCard(inputValue){
    let cardDiv = document.createElement('div');
    cardDiv.className = 'notecard';
    let notePara = document.createElement('p');
    notePara.className = 'notepara';

    notePara.innerText = inputValue;

    cardDiv.appendChild(notePara);

    return cardDiv;


}
function displayNote(){

    let inputvalue = document.getElementById('inputtext').value;
    document.getElementById('display-container').appendChild(createNoteCard(inputvalue));
    document.getElementById('inputtext').value = "";
    document.getElementById('inputtext').focus();

}

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

function displayNote(){

    let valueFromInput = document.getElementById('inputtext').value;
        document.getElementById('row').appendChild(createNoteCard(valueFromInput));
    
    document.getElementById('inputtext').value = "";
    document.getElementById('inputtext').focus();

}

function createNoteCard(inputValue){

    let columnInRow = document.createElement('div');
    columnInRow.className ='col';

    let card = document.createElement('div');
    card.className = 'card';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerText = inputValue;

    let detailbtn = document.createElement('button');
    detailbtn.className = 'btn btn-primary';
    detailbtn.innerText = 'View detail';

    cardBody.appendChild(cardText);
    cardBody.appendChild(detailbtn);
    card.appendChild(cardBody);
    columnInRow.appendChild(card);
    
    return columnInRow;


}


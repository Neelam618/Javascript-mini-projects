function focusInput() {
    document.getElementById('inputtext').focus();
}
focusInput();

//click add button on keyboard enter
// Execute a function when the user releases a key on the keyboard
document.getElementById('inputtext').addEventListener("keyup", function(event) {                                //you can also remove event parameter and it works
    // Number 13 is the "Enter" key on the keyboard
    if(event.keyCode === 13){                                   
    // Trigger the add button element with a click
    verifyAndDisplay();
    }
});

document.getElementById('addbtn').addEventListener('click', verifyAndDisplay);

function verifyAndDisplay(){
    
    let errorMsg = document.getElementById('error-msg');
    if(document.getElementById('inputtext').value !== ""){
            errorMsg.style.display = "none";
            displayNote();
    }
    else{
        errorMsg.style.display = "block";
        focusInput();
    }
}

function displayNote(){

    let valueFromInput = document.getElementById('inputtext').value;
        document.getElementById('row').appendChild(createNoteCard(valueFromInput));
    
    document.getElementById('inputtext').value = "";
    focusInput();

}

function createNoteCard(inputValue){

    let columnInRow = document.createElement('div');
    columnInRow.className ='col';

    let card = document.createElement('div');
    card.className = 'card h-200';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerText = inputValue;

    let detailbtn = document.createElement('button');
    detailbtn.className = 'btn btn-primary';
    detailbtn.innerText = 'View detail';
    detailbtn.setAttribute("data-bs-toggle", "modal");
    detailbtn.setAttribute("data-bs-target", "#exampleModal");
    detailbtn.addEventListener('click', viewModal);


    cardBody.appendChild(cardText);
    cardBody.appendChild(detailbtn);
    card.appendChild(cardBody);
    columnInRow.appendChild(card);
    
    return columnInRow;
}

function viewModal(event){
    let paraText = event.target.previousElementSibling.textContent
    document.getElementsByClassName('modal-body')[0].innerHTML = paraText;
}

    
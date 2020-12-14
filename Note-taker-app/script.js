retrieveNoteText();

function focusInput() {
    document.getElementById('inputdes').focus();
}
focusInput();

//click add button on keyboard enter
// Execute a function when the user releases a key on the keyboard
document.getElementById('inputdes').addEventListener("keyup", function(event) {                                //you can also remove event parameter and it works
    // Number 13 is the "Enter" key on the keyboard
    if(event.keyCode === 13){                                   
    // Trigger the add button element with a click
    verifyAndDisplay();
    }
});

document.getElementById('addbtn').addEventListener('click', verifyAndDisplay);

function verifyAndDisplay(){
    
    let titleErrorMsg = document.getElementById('error-msg-title');
    let desErrorMsg = document.getElementById('error-msg-des');

    let inputTitleValue = document.getElementById('inputtitle').value;
    let inputDesValue = document.getElementById('inputdes').value;

    if(!inputTitleValue){
        titleErrorMsg.style.display = "block";
    }
    else if(!inputDesValue){
        if(inputTitleValue){
            desErrorMsg.style.display = "block";
        }
    }
    else{
        titleErrorMsg.style.display = "none";
        desErrorMsg.style.display = "none";

        displayNote();
        focusInput();
    }
}

function displayNote(){

    let valueFromTextInput = document.getElementById('inputdes').value;
    let valueFromTitleInput = document.getElementById('inputtitle').value;
 
    document.getElementById('row').appendChild(createNoteCard(valueFromTextInput, valueFromTitleInput));
    document.getElementById('inputdes').value = "";
    document.getElementById('inputtitle').value = "";

    storeNoteText();
    focusInput();

}

function createNoteCard(inputDesValue, inputTitleValue){

    let columnInRow = document.createElement('div');
    columnInRow.className ='col';

    let card = document.createElement('div');
    card.className = 'card h-200';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cardTitle = document.createElement('h3');
    cardTitle.className = 'card-title';
    cardTitle.innerText = inputTitleValue;

    let cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerText = inputDesValue;

    let detailBtn = document.createElement('button');
    detailBtn.className = 'btn btn-primary';
    detailBtn.innerText = 'View detail';
    detailBtn.setAttribute("data-bs-toggle", "modal");
    detailBtn.setAttribute("data-bs-target", "#exampleModal");
    detailBtn.addEventListener('click', viewModal);

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-primary mx-2';
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', deleteNote);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(detailBtn);
    cardBody.appendChild(deleteBtn); 
    card.appendChild(cardBody);
    columnInRow.appendChild(card);
    
    return columnInRow;
}

function viewModal(event){
    let paraText = event.target.previousElementSibling.textContent;
    let titleText = event.target.parentNode.firstChild.textContent;
    
    document.getElementsByClassName('modal-title')[0].innerHTML = titleText;
    document.getElementsByClassName('modal-body')[0].innerHTML = paraText;
}

function deleteNote(event){
    event.target.parentNode.parentNode.remove();
    storeNoteText(); 
    //to retrieve note cards on a clean slate
    document.getElementById('row').innerHTML = "";
    retrieveNoteText();
}

function storeNoteText(){
    let notes = [];
    document.querySelectorAll('#row .card-body .card-text').forEach(item => {
        notes.push(item.textContent);
    });
    localStorage.setItem("items", JSON.stringify(notes));
}

function retrieveNoteText(){
    let allNoteTextFromLS = JSON.parse(localStorage.getItem("items"));
    if(allNoteTextFromLS){
        allNoteTextFromLS.forEach(noteText => {
            document.getElementById('row').appendChild(createNoteCard(noteText));
        });
    }   

}

    
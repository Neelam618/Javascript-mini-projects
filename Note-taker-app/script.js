// retrieveNoteText();

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
    storeNoteText();

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

    let detailBtn = document.createElement('button');
    detailBtn.className = 'btn btn-primary';
    detailBtn.innerText = 'View detail';
    detailBtn.setAttribute("data-bs-toggle", "modal");
    detailBtn.setAttribute("data-bs-target", "#exampleModal");
    detailBtn.addEventListener('click', viewModal);

    // <button type="button" class="btn btn-primary">Delete</button>
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-primary mx-2';
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', deleteNote);

    
    cardBody.appendChild(cardText);
    cardBody.appendChild(detailBtn);
    cardBody.appendChild(deleteBtn); 
    card.appendChild(cardBody);
    columnInRow.appendChild(card);
    
    return columnInRow;
}

function viewModal(event){
    let paraText = event.target.previousElementSibling.textContent
    document.getElementsByClassName('modal-body')[0].innerHTML = paraText;
}

function deleteNote(event){
    event.target.parentNode.parentNode.remove();
    storeNoteText(); 
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

    
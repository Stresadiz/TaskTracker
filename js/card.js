const grid = document.getElementById("cards");
var cardDefault = document.getElementById("cardDefault");
const addNewCardBtn = document.getElementById("addNewCard");

const maxCards = 20;
const maxLenghtTitle = 20;
const maxLenghtTextCard = 140;
var title = "";
var text = "";

/* Objeto constructor de JSON*/
let arrayDeCards = new Array();
let arrayDeCardsParallel = new Array();
let objJson;
    
let numCard = 0;

addNewCardBtn.addEventListener("click", e =>{
    
    changeTextCard();

    const cardNodes = grid.querySelectorAll('div.card');
    
    if (cardNodes.length < maxCards) {
        
        let objCard = {titleCard:title, textCard:title, complete:false, id:numCard}
        arrayDeCards[numCard] = objCard;
        
        
        updateJson();

        renderCards(arrayDeCards);

        numCard++;

    } else{
        alert("no puedes agregar mas tasks");
    }

    resetValues();

})

function deleteInBtns() {
    var btnsDelete = grid.querySelectorAll(".btn-danger");

    btnsDelete.forEach(btn => {
        btn.addEventListener("click", e =>{
            grid.removeChild(btn.parentNode.parentNode);
        })
    });
}

function addEventUpdateCard() {
    let btnsEdit = grid.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            changeTextCard()
            arrayDeCards[index].titleCard = title;
            arrayDeCards[index].textCard = text;

            resetValues();
            renderCards(arrayDeCards)
        });
    });
}

function resetValues() {
    title = "";
    text = "";
}

function changeTextCard() {
    while (title == "" || title.length > maxLenghtTitle) {
        title = prompt("Ingrese el titulo aqui:");
        if (title.length > maxLenghtTitle) {
            alert("El texto a ingresar no puede superar los " + maxLenghtTitle + " caracteres")
        }
    }
    while (text == "" || text.length > maxLenghtTextCard) {
        text = prompt("Ingrese el texto aqui:");
        if (title.length > maxLenghtTitle) {
            alert("El texto a ingresar no puede superar los " + maxLenghtTextCard + " caracteres")
        }
    }

}

function assignCheckboxEvents() {
    let checkboxComplete = grid.querySelectorAll("input[name='Complete']");
    checkboxComplete.forEach((input) => {
        input.addEventListener('change', () => {
            completesChecks(checkboxComplete);
        });
    });
}

function completesChecks(array) {
    array.forEach((input, index) =>{
        arrayDeCards[index].complete = input.checked;
    })

    updateJson();
    validateValue();
}

function renderCards(array) {
        grid.innerHTML = "";

        array.forEach(card => {
            let checked = card.complete ? "checked" : ""
            var cardNew = document.createElement("div");
            cardNew.className = "card";
            cardNew.innerHTML = `
            <div class="card-body">
            <h2 class="card-title">${card.titleCard}</h2>  
            <p class="card-text">${card.textCard}</p>
            <button class="btn btn-danger">
            Delete
            </button>
            <div class="card-footer">
            <div class="footer-btn">
            <label for="Complete">Completada:</label><input type="checkbox" name="Complete" id="complete${card.id}" ${checked}>
            </div>
            <button class="btn btn-edit" id="btEdit${card.id}">
            Edit
            </button>
            </div> 
            </div>
            `
            grid.appendChild(cardNew);
        });

        grid.appendChild(cardDefault); 

        deleteInBtns();
        assignCheckboxEvents();
        addEventUpdateCard();

        updateJson();
}

function updateJson() {
    objJson = JSON.stringify(arrayDeCards, null, 2);
    document.getElementById("textJson").value = objJson;
}

function showCards(state) {
    if (state === "completes") {
        arrayDeCardsParallel = arrayDeCards.filter(card => card.complete);
    } else if (state === "noCompletes") {
        arrayDeCardsParallel = arrayDeCards.filter(card => !card.complete);
    } else if (state === "all") {
        arrayDeCardsParallel = arrayDeCards
    }

    renderCards(arrayDeCardsParallel);
}

function validateValue() {
    var selectValue = document.getElementById("cardFilter").value;
    showCards(selectValue)
}
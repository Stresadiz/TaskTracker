const grid = document.getElementById("cards");
var cardDefault = document.getElementById("cardDefault");
const addNewCardBtn = document.getElementById("addNewCard");

const maxCards = 20;

/* Funcionalidad de agregar cards */

addNewCardBtn.addEventListener("click", e =>{
    var cardNew = document.createElement("div");
    cardNew.className = "card";
    cardNew.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">Card Title</h2>  
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis esse aliquid hic.</p>
                    <button class="btn btn-danger">
                        Delete
                    </button>
                    <div class="card-footer">
                        <label for="Complete">Completada:</label><input type="checkbox" name="Complete" id="complete">
                    </div> 
                </div>
    `
    const cardNodes = grid.querySelectorAll('div.card');
    
    if (cardNodes.length < maxCards) {
        grid.removeChild(cardDefault);
        grid.appendChild(cardNew);
        grid.appendChild(cardDefault);
    } else{
        alert("no puedes agregar mas tasks");
    }
    
})
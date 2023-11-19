import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-d7829-default-rtdb.europe-west1.firebasedatabase.app/"
}


// Initialize Firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

// DOM elements
const shoppingList = document.getElementById('shopping-list');
const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');

// Event listeners
addButton.addEventListener("click", () => {
    let inputValue = inputField.value;

    push(shoppingListInDB, inputValue);

    clearInputField();

});

// Functions

onValue(shoppingListInDB, (snapshot) => {
    let itemsArray = Object.entries(snapshot.val());
    
    clearShoppingList();

    clearInputField();

    for(let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i];       
        
        appendItemToShoppingList(currentItem)
    }
})

function appendItemToShoppingList(item) {
    let itemId = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener("click", () => {
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemId}`)
        
        remove(exactLocationOfItemInDB)
    });

    shoppingList.append(newEl);
}

function clearInputField() {
    inputField.value = "";
}

function clearShoppingList() {
    shoppingList.innerHTML = "";
}


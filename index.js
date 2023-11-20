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
    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        clearShoppingList();
    
        for(let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]       
            
            appendItemToShoppingList(currentItem)
        }
    }
    else{
        shoppingList.innerHTML = "No items in the shopping list";
    }
})

function appendItemToShoppingList(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener("click", () => {
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`)
        
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


let items = [];

const itemsDiv = document.getElementById("items")
const input = document.getElementById("itemInput")

const storageKey = "items";

function renderItems() {
    itemsDiv.innerHTML = null;

        //creating a list
    for (const [idx, item] of Object.entries(items)) {
        const container = document.createElement("div")
        container.style.marginBottom = "10px"
        
        //create a light border with every new item added
        container.style.borderBottom = "1px solid lightgray";
        container.style.padding = "10px";

        //creates a new todo list entry
        const text = document.createElement("p")
        text.style.display = "inline"
        text.style.marginRight = "10px"
        text.textContent = item;

        //Creating a delete button next to text
        const button = document.createElement("button")
        button.textContent = "Delete"
        button.onclick = () => removeItem(idx)

        container.appendChild(text)
        container.appendChild(button)

        itemsDiv.appendChild(container)
    }
}

function saveItems() {
    const stringItems = JSON.stringify(items);
    localStorage.setItem(storageKey, stringItems)
}

function loadItems() {
    const oldItems = localStorage.getItem(storageKey)
    if(oldItems) items = JSON.parse(oldItems)
    renderItems()
}

//function to add an item
function addItem() {
    const value = input.value;

    if (!value) {
        alert("You cannot add an empty item")
        return
    }
    items.push(value) //pushes new item to end of an array, or bottom of list
    renderItems()
    input.value = ""
    saveItems()
}

//function to remove an item
function removeItem(idx) {
    items.splice(idx, 1)
    renderItems()
    saveItems()
}

document.addEventListener("DOMContentLoaded", loadItems)
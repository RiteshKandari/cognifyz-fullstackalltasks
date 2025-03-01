const API_URL = "http://localhost:3000/items";

// Fetch and display data
async function fetchItems() {
    const response = await fetch(API_URL);
    const items = await response.json();
    
    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name;
        itemList.appendChild(li);
    });
}

// Add new item
async function addItem() {
    const newItem = document.getElementById("newItem").value;
    if (!newItem) {
        alert("Please enter an item name.");
        return;
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newItem })
    });

    if (response.ok) {
        fetchItems();
        document.getElementById("newItem").value = "";
    }
}

// Load items on page load
window.onload = fetchItems;

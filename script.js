const checkReadynessBtn = document.getElementById('checkReadyness');
const overlay = document.getElementById('overlay');
const closePopupBtn = document.getElementById('closePopup');
const nearbyContainer = document.getElementById('nearbyContainer');

const addItemBtn = document.getElementById('addItem');
const removeItemBtn = document.getElementById('removeItem');
const inputField = document.getElementById('addOrRemove');
const inventoryItems = document.querySelector('.inventoryItems');
const nearbyItemsListContainer = document.querySelector('.nearbyItems');
const popupText = document.querySelector('#popup p');

checkReadynessBtn.addEventListener('click', () => {
    const items = Array.from(inventoryItems.querySelectorAll('ul')).map(i => i.textContent.trim().toLowerCase());
    const requiredItemsBattle = ['armour', 'potions', 'shield', 'sword'];
    const requiredItemsKnife = ['armour', 'potions', 'shield', 'knife'];
    
    if (items.length === 0) {
        popupText.textContent = "God complex?";
    } else if (items.length > 4) {
        popupText.textContent = "Still encumbered... Do you really need all these items?";
    } else if (items.length === 4 && requiredItemsBattle.every(req => items.includes(req))) {
        popupText.textContent = "You are ready for battle!";
    } else if (items.length === 4 && requiredItemsKnife.every(req => items.includes(req))) {
        popupText.textContent = "You call that a knife?";
    } else {
        popupText.textContent = "Encumbered and missing a weapon";
    }

    overlay.classList.add('show');
    nearbyContainer.classList.add('show');
});

closePopupBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
});

// Close when clicking outside the popup box
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.classList.remove('show');
    }
});

addItemBtn.addEventListener('click', () => {
    const itemName = inputField.value.trim();
    if (itemName !== '') {
        // Prevent duplicates
        const currentItems = Array.from(inventoryItems.querySelectorAll('ul')).map(i => i.textContent.trim().toLowerCase());
        if (currentItems.includes(itemName.toLowerCase())) {
            inputField.value = ''; 
            return; 
        }

        const newItem = document.createElement('ul');
        newItem.textContent = itemName; // E.g., "Old crooked stick"
        inventoryItems.appendChild(newItem);
        
        const nearbyItems = nearbyItemsListContainer.querySelectorAll('ul');
        for (let item of nearbyItems) {
            if (item.textContent.trim().toLowerCase() === itemName.toLowerCase()) {
                nearbyItemsListContainer.removeChild(item);
                break;
            }
        }
        
        inputField.value = '';
    }
});

removeItemBtn.addEventListener('click', () => {
    const itemName = inputField.value.trim().toLowerCase();
    if (itemName !== '') {
        const items = inventoryItems.querySelectorAll('ul');
        for (let item of items) {
            if (item.textContent.trim().toLowerCase() === itemName) {
                // Remove from inventory
                inventoryItems.removeChild(item);
                
                // Add it directly to nearby items
                const nearbyItem = document.createElement('ul');
                nearbyItem.textContent = item.textContent;
                nearbyItemsListContainer.appendChild(nearbyItem);
                
                inputField.value = '';
                break;
            }
        }
    }
});

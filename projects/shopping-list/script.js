const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const shoppingList = document.getElementById('shoppingList');
const clearCompleted = document.getElementById('clearCompleted');
const clearAll = document.getElementById('clearAll');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const allCount = document.getElementById('allCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');

let items = JSON.parse(localStorage.getItem('shoppingItems')) || [];
let currentFilter = 'all';

// Add item
function addItem() {
    const itemText = itemInput.value.trim();
    
    if (itemText === '') {
        itemInput.focus();
        return;
    }
    
    const item = {
        id: Date.now(),
        text: itemText,
        completed: false
    };
    
    items.push(item);
    saveItems();
    renderItems();
    itemInput.value = '';
    itemInput.focus();
}

// Delete item
function deleteItem(id) {
    items = items.filter(item => item.id !== id);
    saveItems();
    renderItems();
}

// Toggle item completion
function toggleItem(id) {
    items = items.map(item => {
        if (item.id === id) {
            return { ...item, completed: !item.completed };
        }
        return item;
    });
    saveItems();
    renderItems();
}

// Clear completed items
function clearCompletedItems() {
    items = items.filter(item => !item.completed);
    saveItems();
    renderItems();
}

// Clear all items
function clearAllItems() {
    if (confirm('Are you sure you want to clear all items?')) {
        items = [];
        saveItems();
        renderItems();
    }
}

// Save items to localStorage
function saveItems() {
    localStorage.setItem('shoppingItems', JSON.stringify(items));
}

// Update counts
function updateCounts() {
    const total = items.length;
    const completed = items.filter(item => item.completed).length;
    const active = total - completed;
    
    allCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
}

// Filter items
function filterItems(filter) {
    currentFilter = filter;
    
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    
    renderItems();
}

// Render items
function renderItems() {
    let filteredItems = items;
    
    if (currentFilter === 'active') {
        filteredItems = items.filter(item => !item.completed);
    } else if (currentFilter === 'completed') {
        filteredItems = items.filter(item => item.completed);
    }
    
    shoppingList.innerHTML = '';
    
    if (filteredItems.length === 0) {
        emptyState.classList.add('show');
        shoppingList.style.display = 'none';
    } else {
        emptyState.classList.remove('show');
        shoppingList.style.display = 'block';
        
        filteredItems.forEach(item => {
            const li = document.createElement('li');
            li.className = `list-item ${item.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="checkbox ${item.completed ? 'checked' : ''}" data-id="${item.id}">
                    <i class='bx bx-check'></i>
                </div>
                <span class="item-text">${item.text}</span>
                <button class="delete-btn" data-id="${item.id}">
                    <i class='bx bx-trash'></i>
                </button>
            `;
            shoppingList.appendChild(li);
        });
    }
    
    updateCounts();
}

// Event Listeners
addBtn.addEventListener('click', addItem);

itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

shoppingList.addEventListener('click', (e) => {
    if (e.target.closest('.checkbox')) {
        const id = parseInt(e.target.closest('.checkbox').getAttribute('data-id'));
        toggleItem(id);
    }
    
    if (e.target.closest('.delete-btn')) {
        const id = parseInt(e.target.closest('.delete-btn').getAttribute('data-id'));
        deleteItem(id);
    }
});

clearCompleted.addEventListener('click', clearCompletedItems);
clearAll.addEventListener('click', clearAllItems);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterItems(filter);
    });
});

// Initialize
renderItems();

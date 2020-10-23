// Storage Controller



// Item Controller
const ItemCtrl = (function(){
  // Item Constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  const data = {
    items: [
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookie', calories: 400},
      // {id: 2, name: 'Eggs', calories: 300}
    ],
    currentItem: null,
    totalCalories: 0
  };

  return {

    logData: function(){
      return data;
    },

    getItems: function(){
      return data.items;
    },

    addItem: function(name, calories){
      if(data.items.length > 0 ){
        ID = data.items[data.items.length - 1].id +1;
      } else {
        ID  = 0;
      }

      calories = parseInt(calories);

      let newItem = new Item(ID, name, calories);
      data.items.push(newItem);
      return newItem;
    },

    updateItem: function(name, calories){
      calories = parseInt(calories);

      let found = null;

      data.items.forEach((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },

    deleteItem: function(id){
      ids = data.items.map((item) => {
        return item.id;
      });

      const index = ids.indexOf(id);
      data.items.splice(index, 1);
    },

    clearAllItems: function(){
      data.items = [];
    },

    getTotalCalories: function(){
      let total = 0;

      data.items.forEach((item) => {
        total += item.calories;
      });

      data.totalCalories = total;

      return data.totalCalories;
    },

    getItemById: function(id){
      let found = null;

      data.items.forEach((item) => {
        if (item.id == id) {
          found = item;
        }
      });

      return found;
    },

    setCurrentItem: function(item){
      data.currentItem = item;
    },

    getCurrentItem: function(){
      return data.currentItem;
    }
  }
})();



// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    listItems: 'li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };

  return {

    populateItemList: function(items){
      let html = '';

      items.forEach(function(item) {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="fas fa-pencil-alt edit-item"></i></a>
        </li>
        `;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;      
    },

    addListItem: function(item){
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';

      // Create li element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="fas fa-pencil-alt edit-item"></i></a>
      `;
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    updateListItem: function(item){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems = Array.from(listItems);
      listItems.forEach((listItem) => {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="fas fa-pencil-alt edit-item"></i></a>
          `;
        }
      });
    },

    deleteListItem: function(id){
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    removeAllItems: function(){
      let listItems = document.querySelectorAll(UISelectors.listItems);

      listItems = Array.from(listItems);
      listItems.forEach((item) => {
        item.remove();
      });
    },

    getSelectors: function(){
      return UISelectors;
    },

    getItemInput: function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },

    clearInput: function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    addItemToForm: function(){
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;

      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

      UICtrl.showEditState();      
    },

    hideList: function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function(){
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    }
  };
})();



// App Controller
const App = (function(ItemCtrl, UICtrl){
  // Load event listeners
  const loadEventListeners = function(){
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddClick);

    // Disable Submit on Enter
    document.addEventListener('keypress', function(e){ 
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateClick);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteClick);

    // Clear all event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

    // Back button click event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
  };

  const itemAddClick = function(e) {
    e.preventDefault();

    const input = UICtrl.getItemInput();
  
    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem);

      // Get total kcal
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      // Clear fields
      UICtrl.clearInput();
    }   
  };

  const itemEditClick = function(e){
    e.preventDefault();

    if (e.target.classList.contains('edit-item')) {
      // Get item id
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArray = listId.split('-');
      const id = parseInt(listIdArray[1]);

      // Get item 
      const itemToEdit = ItemCtrl.getItemById(id);

      ItemCtrl.setCurrentItem(itemToEdit);
      
      UICtrl.addItemToForm();
    }
  };

  const itemUpdateClick = function(e){
    e.preventDefault();

    const input = UICtrl.getItemInput();

    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    
    UICtrl.updateListItem(updatedItem);

    // Get total kcal
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  };

  const itemDeleteClick = function(e){
    e.preventDefault();

    // Delete from data
    const currentItem = ItemCtrl.getCurrentItem();
    ItemCtrl.deleteItem(currentItem.id);
    
    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total kcal
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
  };

  const clearAllItemsClick = function(e){
    ItemCtrl.clearAllItems();

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.removeAllItems();

    // Hide UL
    UICtrl.hideList();
  };

  return {

    init: function(){
      // Set initial state
      UICtrl.clearEditState();

      console.log('Initializing App');

      loadEventListeners();
      
      const items = ItemCtrl.getItems();

      // Check if there are any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total kcal
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);
      
    }
  };

})(ItemCtrl, UICtrl);


App.init();
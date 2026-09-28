let listBox = document.getElementById("listContainer1");
let form = document.getElementById("expenseForm");
let descriptionBox = document.getElementById("description");

let amountBox = document.getElementById("addamount");
let categoryBox = document.getElementById("categorySelect");



let dateBox = document.getElementById("expenseDate");
let editIdBox = document.getElementById("editId");

let addButton = document.getElementById("submit");

let cancelButton = document.getElementById("cancelBtn");



let totalText = document.getElementById("total");
let searchBox = document.getElementById("search");

let filterBox = document.getElementById("filterCategory");

let emptyMessage = document.getElementById("emptyState");


let expenses = [];


let isEditing = false;


let storageName = "myExpenses";



function loadData() {
  var saved = localStorage.getItem(storageName);

    if (saved !== null) {
         expenses = JSON.parse(saved);
    } else {
         expenses = [];
  }
}

function saveData() {
      localStorage.setItem(storageName, JSON.stringify(expenses));
}



function makeId() {
      return "exp_" + Date.now();
}


function showMoney(number) {
       return Number(number).toFixed(2);
}


function showDate(dateText) {
        var d = new Date(dateText + "T00:00:00");
     var day = d.getDate();
       var month = d.getMonth() + 1;
      var year = d.getFullYear();

     if (day < 10) {
       day = "0" + day;
     }
     if (month < 10) {
       month = "0" + month;
     }

      return day + "/" + month + "/" + year;
}


 function setToday() {
         var today = new Date();
     var year = today.getFullYear();
         var month = today.getMonth() + 1;
     var day = today.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
 
    dateBox.value = year + "-" + month + "-" + day;
}  

  
function clearErrors() {
     descriptionBox.classList.remove("invalid");
  amountBox.classList.remove("invalid");
    categoryBox.classList.remove("invalid");
     dateBox.classList.remove("invalid");
}

  
function checkForm() {
         clearErrors();
      var isOk = true;

  if (descriptionBox.value.trim() === "") {
         descriptionBox.classList.add("invalid");
       isOk = false;
  }

    var amountNumber = parseFloat(amountBox.value);
  if (amountBox.value === "" || isNaN(amountNumber) || amountNumber <= 0) {
    amountBox.classList.add("invalid");
      isOk = false;
  }

  if (categoryBox.value === "") {
      categoryBox.classList.add("invalid");
     isOk = false;
  }

  if (dateBox.value === "") {
    dateBox.classList.add("invalid");
    isOk = false;
  }

  if (isOk === false) {
       alert("Please fill all fields with valid values.");
  }

  return isOk;
}


function clearForm() {
  form.reset();
    editIdBox.value = "";
  isEditing = false;
    addButton.textContent = "＋ Add Expense";
    cancelButton.hidden = true;
    clearErrors();
    setToday();
}




function getFilteredList() {
  var searchText = searchBox.value.trim().toLowerCase();
  var selectedCategory = filterBox.value;
  var result = [];

  for (var i = 0; i < expenses.length; i++) {
    var item = expenses[i];
   
         var matchSearch = false;

      if (searchText === "") {
      matchSearch = true;
    } else {
              if (item.description.toLowerCase().indexOf(searchText) !== -1) {
        matchSearch = true;
        }
      if (item.category.toLowerCase().indexOf(searchText) !== -1) {
          matchSearch = true;
      }
        if (String(item.amount).indexOf(searchText) !== -1) {
        matchSearch = true;
        }
    }
   
    var matchCategory = false;
  
    if (selectedCategory === "all") {
         matchCategory = true;
    }   else if (item.category === selectedCategory) {
        matchCategory = true;
    }
  
    if (matchSearch === true && matchCategory === true) {
         result.push(item);
    }
  }  

  return result;
}



function updateTotal() {
     var sum = 0;

     for (var i = 0; i < expenses.length; i++) {
       sum = sum + Number(expenses[i].amount);
  }

      totalText.textContent = showMoney(sum);
}

function makeCard(expense) {
       var card = document.createElement("div");
    card.className = "listContainer2";

     var desc = document.createElement("span");
      desc.className = "exp-desc";
    desc.textContent = expense.description;

  var amount = document.createElement("span");
  amount.className = "exp-amount";
  amount.textContent = "₹" + showMoney(expense.amount);

     var cat = document.createElement("span");
    cat.className = "exp-category";
  cat.textContent = expense.category;
   
    var date = document.createElement("span");
    date.className = "exp-date";
     date.textContent = showDate(expense.date);
  
    var actions = document.createElement("div");
    actions.className = "actions";
  
    var editBtn = document.createElement("button");
       editBtn.className = "editIcon";
          editBtn.type = "button";
    editBtn.textContent = "✎";
       editBtn.title = "Edit";
    editBtn.onclick = function () {
     startEdit(expense);
  };

  var deleteBtn = document.createElement("button");
     deleteBtn.className = "deleteIcon";
      deleteBtn.type = "button";
     deleteBtn.textContent = "🗑️";
  deleteBtn.title = "Delete";
       deleteBtn.onclick = function () {
    deleteExpense(expense.id);
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

     card.appendChild(desc);
    card.appendChild(amount);
  card.appendChild(cat);
     card.appendChild(date);
     card.appendChild(actions);

  return card;
}

function showList() {
  var filtered = getFilteredList();

  listBox.innerHTML = "";

  if (filtered.length === 0) {
    emptyMessage.hidden = false;

    if (expenses.length === 0) {
      emptyMessage.textContent = "No expenses found. Add one above!";
    } else {
      emptyMessage.textContent = "No matching expenses. Try a different search or filter.";
    }
  } else {
    emptyMessage.hidden = true;

    for (var i = 0; i < filtered.length; i++) {
      var card = makeCard(filtered[i]);
      listBox.appendChild(card);
    }
  }

  updateTotal();
}




function addExpense(data) {
  var newItem = {
    id: makeId(),
     description: data.description,
        amount: data.amount,
        category: data.category,
    date: data.date
  };

  expenses.unshift(newItem);
  saveData();
  showList();
}

function updateExpense(id, data) {
  for (var i = 0; i < expenses.length; i++) {
    if (expenses[i].id === id) {
        expenses[i].description = data.description;
         expenses[i].amount = data.amount;
       expenses[i].category = data.category;
       expenses[i].date = data.date;
      break;
    }
  }

  saveData();
  showList();
}

function deleteExpense(id) {
  var ok = confirm("Delete this expense?");

  if (ok === false) {
    return;
  }

  var newList = [];

  for (var i = 0; i < expenses.length; i++) {
    if (expenses[i].id !== id) {
      newList.push(expenses[i]);
    }
  }

  expenses = newList;
  saveData();
  showList();
}

function startEdit(expense) {
     isEditing = true;
     editIdBox.value = expense.id;
       descriptionBox.value = expense.description;
  amountBox.value = expense.amount;
     categoryBox.value = expense.category;
     dateBox.value = expense.date;
            addButton.textContent = "Update Expense";
  cancelButton.hidden = false;
    descriptionBox.focus();
       window.scrollTo(0, 0);
}




form.onsubmit = function (event) {
  event.preventDefault();

  if (checkForm() === false) {
    return;
  }

  var data = {
      description: descriptionBox.value.trim(),
        amount: parseFloat(amountBox.value).toFixed(2),
      category: categoryBox.value,
    date: dateBox.value
  };

      if (isEditing === true) {
          updateExpense(editIdBox.value, data);
  } else {
    addExpense(data);
  }

    clearForm();
};

     cancelButton.onclick = function () {
    clearForm();
};

         searchBox.oninput = function () {
     showList();
};

     filterBox.onchange = function () {
    showList();
};

            descriptionBox.oninput = function () {
           descriptionBox.classList.remove("invalid");
};

amountBox.oninput = function () {
     amountBox.classList.remove("invalid");
};

  categoryBox.onchange = function () {
     categoryBox.classList.remove("invalid");
};

   dateBox.onchange = function () {
    dateBox.classList.remove("invalid");
};




    loadData();
 setToday();
  showList();
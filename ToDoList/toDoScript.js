// script.js

function getListKey(name) {
  return `shoppingList_${name}`;
}

function getCurrentKey() {
  const listName =
    document.getElementById("listName").value.trim() || "default";
  return getListKey(listName);
}

document.addEventListener("DOMContentLoaded", () => {
  const addItemBtn = document.getElementById("addItem");
  const clearListBtn = document.getElementById("clearList");
  const deleteListBtn = document.getElementById("deleteList");
  const renameListBtn = document.getElementById("renameList");
  const itemInput = document.getElementById("itemInput");
  const shoppingList = document.getElementById("shoppingList");
  const listNameInput = document.getElementById("listName");
  const listSelector = document.getElementById("listSelector");

  let items = [];

  function updateLocalStorage() {
    localStorage.setItem(getCurrentKey(), JSON.stringify(items));
    refreshListSelector();
  }

  function loadList(name) {
    const key = getListKey(name);
    const saved = localStorage.getItem(key);
    items = saved ? JSON.parse(saved) : [];
    renderList();
  }

  function renderList() {
    shoppingList.innerHTML = "";
    items.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      if (item.purchased) li.classList.add("purchased");
      li.textContent = item.text;

      const deleteBtn = document.createElement("span");
      deleteBtn.textContent = "✕";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        items.splice(index, 1);
        updateLocalStorage();
        renderList();
      });

      li.appendChild(deleteBtn);
      li.addEventListener("click", () => {
        items[index].purchased = !items[index].purchased;
        updateLocalStorage();
        renderList();
      });

      shoppingList.appendChild(li);
    });
  }

  function refreshListSelector() {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("shoppingList_")
    );
    listSelector.innerHTML = "";
    keys.forEach((key) => {
      const name = key.replace("shoppingList_", "");
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      listSelector.appendChild(option);
    });

    const current = getCurrentKey().replace("shoppingList_", "");
    listSelector.value = current;
  }

  addItemBtn.addEventListener("click", () => {
    const itemText = itemInput.value.trim();
    if (itemText === "") return;

    items.push({ text: itemText, purchased: false });
    updateLocalStorage();
    renderList();
    itemInput.value = "";
  });

  clearListBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the entire list?")) {
      items = [];
      updateLocalStorage();
      renderList();
    }
  });

  deleteListBtn.addEventListener("click", () => {
    const key = getCurrentKey();
    if (confirm("Delete this entire list permanently?")) {
      localStorage.removeItem(key);
      listNameInput.value = "default";
      loadList("default");
      refreshListSelector();
    }
  });

  renameListBtn.addEventListener("click", () => {
    const oldKey = getCurrentKey();
    const oldName = listNameInput.value.trim();
    const newName = prompt("Enter new name for the list:", oldName);

    if (newName && newName !== oldName) {
      const newKey = getListKey(newName);
      localStorage.setItem(newKey, localStorage.getItem(oldKey));
      localStorage.removeItem(oldKey);
      listNameInput.value = newName;
      refreshListSelector();
    }
  });

  listNameInput.addEventListener("change", () => {
    loadList(listNameInput.value.trim());
    refreshListSelector();
  });

  listSelector.addEventListener("change", () => {
    listNameInput.value = listSelector.value;
    loadList(listSelector.value);
  });

  loadList(listNameInput.value.trim() || "default");
  refreshListSelector();
});

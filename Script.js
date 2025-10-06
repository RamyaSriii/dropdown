let counter = 1;
let todos = [];

// Format date as DD/MM/YYYY
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Render table
function renderTable() {
  const table = document.getElementById("todoTable");
  table.innerHTML = "";

  todos.forEach(todo => {
    const row = table.insertRow();

    row.insertCell(0).innerText = todo.id;
    row.insertCell(1).innerText = todo.title;
    row.insertCell(2).innerText = todo.postedDate;
    row.insertCell(3).innerText = todo.targetDate;

    // Status dropdown
    const statusCell = row.insertCell(4);
    const select = document.createElement("select");
    ["Pending", "In Progress", "Completed"].forEach(status => {
      const option = document.createElement("option");
      option.value = status;
      option.text = status;
      if (status === todo.status) option.selected = true;
      select.appendChild(option);
    });
    select.disabled = !todo.isEditing; // disable unless editing
    select.onchange = (e) => todo.status = e.target.value;
    statusCell.appendChild(select);

    // Action buttons
    const actionCell = row.insertCell(5);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "action-btn edit-btn";
    editBtn.onclick = () => {
      todo.isEditing = true;
      renderTable();
    };

    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";
    updateBtn.className = "action-btn update-btn";
    updateBtn.disabled = !todo.isEditing;
    updateBtn.onclick = () => {
      todo.isEditing = false;
      renderTable();
    };

    actionCell.appendChild(editBtn);
    actionCell.appendChild(updateBtn);
  });
}

// Add task
document.getElementById("todoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const taskName = document.getElementById("taskName").value.trim();
  const targetDate = document.getElementById("targetDate").value;

  if (!taskName || !targetDate) {
    alert("Please fill in all fields!");
    return;
  }

  const newTodo = {
    id: counter++,
    task: taskName,
    postedDate: formatDate(new Date()),
    targetDate: formatDate(targetDate),
    status: "Pending",
    isEditing: false
  };

  todos.push(newTodo);
  renderTable();
  this.reset();
});







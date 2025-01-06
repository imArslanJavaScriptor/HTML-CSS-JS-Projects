const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseType = document.getElementById("expenseType");
const expenseList = document.getElementById("expenseList");
const totalBalance = document.getElementById("totalBalance");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Update UI
function updateUI() {
  expenseList.innerHTML = "";
  let balance = 0;

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${expense.name} - $${expense.amount} (${expense.type})</span>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);

    balance += expense.type === "income" ? expense.amount : -expense.amount;
  });

  totalBalance.textContent = `$${balance}`;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Add Expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newExpense = {
    name: expenseName.value.trim(),
    amount: +expenseAmount.value,
    type: expenseType.value,
  };

  expenses.push(newExpense);
  updateUI();
  expenseForm.reset();
});

// Delete Expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  updateUI();
}

// Initial UI Load
updateUI();

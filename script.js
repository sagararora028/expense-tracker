document.addEventListener("DOMContentLoaded", () => {
    const expenseNameInput = document.getElementById("expenseName");
    const expenseAmountInput = document.getElementById("expenseAmount");
    const expenseForm = document.getElementById("expenseForm");
    const totalAmountDisplay = document.getElementById("totalAmount");
    const expenseList = document.getElementById("expenseList");
    
    let expenses = JSON.parse(localStorage.getItem("expense")) || [];
    let totalAmount = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id : Date.now(),
                name,
                amount,
            }
            expenses.push(newExpense);
            saveExpensestoLocal();
            updateTotal();
            renderExpenses();

            expenseAmountInput.value = "";
            expenseNameInput.value = "";
        }

    })

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            const li = document.createElement("li");
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        })
    }

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0)
    }

    function saveExpensestoLocal() {
        localStorage.setItem("expense", JSON.stringify(expenses))
    }

    function updateTotal() {
        totalAmount = calculateTotal()
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    expenseList.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter((expense) => expense.id !== expenseId);

            saveExpensestoLocal();
            renderExpenses();
            updateTotal();
        }
    })

})




const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");

const form = document.getElementById("form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");


function init() {
    incomeList.innerHTML = "";
    expenseList.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

function updateLocalStorage() {
    localStorage.setItem("transactions",
        JSON.stringify(transactions));
}

function clearInput(){
    descriptionInput.value = "";
    amountInput.value = "";
}

function removeTransaction(id) {
    transactions = transactions.filter (transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}



let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc +item, 0)
        .toFixed(2);

    const expense = ( amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc +item, 0) * -1)
        .toFixed(2);

    balance.innerText = `R$ ${total}`;
    moneyPlus.innerText = `R$ ${income}`;
    moneyMinus.innerText = `R$ ${expense}`;
    
    clearInput()

}  

function addTransactionDOM(transaction) {
    const li = document.createElement("li");

    const sing = transaction.amount < 0 ? "-" : "+";

    li.classList.add(transaction.amount < 0 ? "minus" : "plus");

    li.innerHTML = `${transaction.description}
    <span>${sing} R$ ${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`;

    if (transaction.amount < 0) {
        expenseList.appendChild(li);
    } else {
        incomeList.appendChild(li);
    }
    
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = Number(amountInput.value);

    const transaction = {
        id: Math.floor(Math.random() * 1000000),
        description: description,
        amount: amount
    };

    transactions.push(transaction);

    updateLocalStorage();

    init();

    clearInput()
});

init();

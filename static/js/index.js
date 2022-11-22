//Ini
let montantBudget = 0;
let amountExpense = 0;
let amountBalance = 0;

//Grab elements
//Inputs
const budgetInput = document.querySelector("#budget");
const labelExpenseInput = document.querySelector("#depense");
const montantInput = document.querySelector("#montant");
//Buttons
const btn = document.querySelector(".add-btn");
const btnErase = document.querySelector(".reset-btn");
//Positions 
const budgetPos = document.querySelector(".income > span");
const expensePos = document.querySelector(".expense > span");
const balancePos = document.querySelector(".balance > span");
const newDivPos =  document.querySelector(".expenses-list");

//Hide the button when starting
btn.classList.add("hide");
 
//Events
budgetInput.addEventListener("keyup",CreateBudget)
btn.addEventListener("click", addExpense);
btnErase.addEventListener("click",AllReset);

//------------------- Functions
function CreateBudget()
{
 //Checking if the input is a number
    if(!isNaN(budgetInput.value)){
        montantBudget = +budgetInput.value;
        budgetPos.textContent = montantBudget;
        btn.classList.remove("hide");         
    }else{
        //If the user changes the value of the input with an invalid type
    btn.classList.add("hide");
    }
}

function addExpense()
{
    if( montantBudget>0 && montantInput.value >0 && labelExpenseInput.value !="" ){ 
        amountExpense += +montantInput.value;
        expensePos.textContent = amountExpense;

        calculateBalance();
        CreateDiv()
        ResetInputExpense();

        //If one expense was done the budget is fixed
        budgetInput.disabled=true;
    } 
}
 
function calculateBalance()
{
    amountBalance = montantBudget - amountExpense;
    balancePos.textContent = amountBalance;
    if(amountBalance<0)
    {
        balancePos.classList.add("negative-balance");
        //On bloque
        btn.classList.add("hide");
    }
}

 
function CreateDiv()
{
    let newDiv = document.createElement("div");
    newDiv.classList.add("expenses-item")
    newDiv.textContent = labelExpenseInput.value +" "+ montantInput.value +" €"
    newDivPos.prepend(newDiv);
}

function ResetInputExpense()
{
    labelExpenseInput .value="";
    montantInput.value="";
}

function AllReset()
{
      montantBudget = 0;
      amountExpense = 0;
      amountBalance = 0;
      ResetInputExpense() // :O
      budgetInput.value="";
      btn.classList.add("hide");
      budgetPos.textContent=""
      expensePos.textContent=""
      balancePos.textContent=""
   
      //Delete Div created
      let flushNewDiv = document.querySelectorAll(".expenses-list > div");
      for(i=0;i<flushNewDiv.length;i++)
      {
        flushNewDiv[i].remove();
      }

      //Activate the budget input for a new try
      budgetInput.disabled=false;
}
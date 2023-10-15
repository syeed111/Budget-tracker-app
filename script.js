//////////////////////
function register_events(){
  const addBtn=document.getElementById("add-amount");
  addBtn.addEventListener("click",addAmount)
  // console.log(amountArray);

  
}


const amountArray=[];

// ============amount input============
////////////////////////
function addAmount(e){


const amountInput =document.getElementById("amount");
const amount=parseInt(amountInput.value);
let item={};

if(amount>0)

  item={
      type:"income",
      value:amount
  }        
    
  else if(amount<0){
    
  item={
        type:"expense",
        value:Math.abs(amount)
      }

  }
  
  amountArray.push({
    id:amountArray.length,
    ...item
  }) 
  updateUi();
}


///////////////////////////
function updateCalculation(){
  const income=document.getElementById("income");
  const expense=document.getElementById("expense");

  const incomeLists=amountArray.filter(item=>item.type==="income");
  const expenseLists =amountArray.filter(item=>item.type==="expense");

  const incomeSum=incomeLists.reduce((previous,current)=>{return previous +current.value},0);
  const expenseSum=expenseLists.reduce((previous,current)=>{return previous +current.value},0);

   
   income.textContent="Income :"+incomeSum;
   expense.textContent="Expense :"+expenseSum;

}


  ////////////////////
  function renderList(amountArray){
  const listContainer=document.getElementById('amountList');
  let listHtml="";

  for(let item of amountArray)
  {
    console.log(item.id);
    listHtml+=`
    <div id="item-${item.id}"class="item">
    <div>
      <span>${item.value}</span> 
    </div>
    <div> 
    <span>${item.type}</span> 
  </div>
  <div>
    <span> <button>Delete</button>&nbsp <button>Edit</button></span>
  </div>
  </div>`
  }

  listContainer.innerHTML=listHtml;
}


/////////////////////
function updateUi()
{
 updateCalculation();
 renderList(amountArray);
}


register_events();

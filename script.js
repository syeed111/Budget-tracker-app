///////////Global variable
let amountArray=[];

let editState={
  id:-1,
  enabled:false
}
///////////function define///////////
  function register_events(){    



  const addBtn=document.getElementById("add-amount");
  const editBtn=document.getElementById("edit-amount");
  const cancelBtn=document.getElementById("cancel-edit");
  const listContainer=document.getElementById('amountList');

  if(!addBtn)return ;
  addBtn.addEventListener("click",addAmount);
  listContainer.addEventListener("click",updateAction);
  editBtn.addEventListener("click",updateAmount);
  cancelBtn.addEventListener("click",cancelEdit);
   
  
}

////////////////////////
function storeInLocal(){
localStorage.setItem("amountArray",JSON.stringify(amountArray));
}


/////////////////////////
  function cancelEdit(e){

    const addBtn=document.getElementById("add-amount");
    const editBtn=document.getElementById("edit-amount");
    const cancelBtn=document.getElementById("cancel-edit");
    const amountInput =document.getElementById("amount");

    editBtn.style.display="none";
    addBtn.style.display="initial";
    cancelBtn.style.display="none";
    amountInput.value="";


  }

////////////////////////////////============amount input============
function addAmount(e){
const amountInput =document.getElementById("amount");

const amount=parseInt(amountInput.value);

let item={};
let d = new Date();
let time = d.getTime();
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
    id:time,
    ...item
  }) 

  amountInput.value="";
  updateUi();
}

//////////////////////////////////
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

///////////////////////////////////
  function renderList(amountArray){
  const listContainer=document.getElementById('amountList');
  let listHtml="";

  for(let item of amountArray)
  {
    
    listHtml+=`
    <div id="item-${item.id}" class="item">
      <span class="item-amount">${item.value}</span> 
      <span class="valueType">${item.type}</span> 
    <div id="buttons"> 
    <span>
      <button id="delete">Delete</button>&nbsp 
      <button id="edit">Edit</button>
    </span>
    </div>
    </div>`
  }

  listContainer.innerHTML=listHtml;
  storeInLocal();
}
///////////////////////////////////
function updateUi()
{
 updateCalculation();
 renderList(amountArray);
}
////////////////////////////////////
function updateAction(e)
{
 //(e.target.parentElement.parentElement.id);
 if(e.target.id==="delete")
 deleteItem(e.target);
else if(e.target.id==="edit")
{
  editItem(e.target);
}
}

function getItemId(item){
  const parent=item.parentElement.parentElement.parentElement;
  const index=parent.id;
  const  idSplit=index.split("-");
  const itemId=parseInt(idSplit.pop()); 
  return itemId;
}
///////////////////////////////////
function deleteItem(item)
{
  const itemId=getItemId(item);
   //parent.remove();
  amountArray=amountArray.filter(item=>item.id!==itemId);
  
  renderList(amountArray);
  updateCalculation();
} 

/////////////////////////////
function updateAmount(e){
 const itemId=editState.id;
 const transectionItem=amountArray.find(item=>item.id===itemId);

 const amountInput =document.getElementById("amount");

 const amount=parseInt(amountInput.value);

 
 if(amount<0)
 {
  transectionItem.type="expense";
  transectionItem.value=Math.abs(amount) ;
 }
else {
  transectionItem.type="income";
  transectionItem.value=amount ;
}


 let transectionIndex=amountArray.findIndex(item=>item.id===itemId);
  
  amountArray[transectionIndex]=transectionItem;

  
  renderList(amountArray);
  updateCalculation();

  const addBtn=document.getElementById("add-amount");
  const editBtn=document.getElementById("edit-amount");
  const cancelBtn=document.getElementById("cancel-edit");

  editBtn.style.display="none";
  addBtn.style.display="initial";
  cancelBtn.style.display="none";
  amountInput.value="";
  editState={
    id:-1,
  enabled:false
  }
}

function editItem(item){

  const editBtn=document.getElementById("edit-amount");
  editBtn.style.display="initial";
  const cancelBtn=document.getElementById("cancel-edit");
  cancelBtn.style.display="initial";
  const addBtn=document.getElementById("add-amount");
  addBtn.style.display="none";
  const  itemId=getItemId(item);
  const transectionItem=amountArray.find(item=>item.id===itemId);
  
  
  let amountInput =document.getElementById("amount");
 
  if(transectionItem.type==="expense")
  {
    amountInput.value=-1*transectionItem.value;
  }
  else 
  amountInput.value=transectionItem.value;

  editState={
    ...editState,
    id:itemId,
    enabled:true
  }

}
function populateFromLocal(){
  const itemString=localStorage.getItem("amountArray");
  if(itemString){
    const items=JSON.parse(itemString);
    amountArray=[...items];
    renderList(amountArray);
    updateCalculation();
  }
}
populateFromLocal();
register_events();
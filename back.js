let listContainer1=document.getElementById("listContainer1");



let addexpensename=document.getElementById("addexpensename");
let addamount=document.getElementById("addamount");
let submit=document.getElementById("submit");

let total=document.getElementById("total")
let counter=0





submit.onclick=function(event){
    event.preventDefault()

    if (addexpensename.value==="" || addamount.value==="" ){
        alert("Please Enter The Values")
        return
      }

    counter=counter+parseInt(addamount.value)
    total.textContent=counter

    let listContainer2=document.createElement("div")
   
    listContainer2.class="listcontainer2"
    listContainer2.classList.add("listContainer2")

    let tName=document.createElement("h5")
    let tAmount=document.createElement("span")
    let deleteIcon=document.createElement("button")
    let editIcon=document.createElement("button")
    editIcon.className="editIcon"
    deleteIcon.className="deleteIcon"
    


    tName.innerText=addexpensename.value+": ";
    tAmount.innerText=addamount.value;
    editIcon.innerText="✎"
    deleteIcon.innerText="🗑️"
   

    listContainer2.appendChild(tName)
    listContainer2.appendChild(tAmount)
    listContainer2.appendChild(editIcon)
    listContainer2.appendChild(deleteIcon)

    listContainer1.appendChild(listContainer2)
   


    deleteIcon.addEventListener("click",function(){
    listContainer1.removeChild(listContainer2)
    })

    editIcon.addEventListener("click",function(){
        tName.setAttribute("contentEditable","true")
        
    })
     
    let data={
        category:tName.value ,
        amount:tAmount.value
    }

    localStorage.setItem("list",data)


      }
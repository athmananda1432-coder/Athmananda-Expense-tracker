let listContainer=document.getElementById("listContainer");
let addexpensename=document.getElementsById("addexpensename");
let addamount=document.getElementById("addamount");
let submit=document.getElementById("submit");


submit.onclick=function(){

    if (addexpensename.value==="" || addamount.value==="" ){
        alert("Please Enter The Values")
    }
}
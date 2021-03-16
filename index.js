const app=document.getElementById('app');
var total_cost=0;
async function fetchdata(){
     await fetch('./data.json')
         .then((response)=> response.json())
         .then((data)=>{
             showContent(data);
         });
}

fetchdata();




function showContent(data){
var x;
data.forEach(post =>{  
 
 item_quantity=post.quantity;

 app.innerHTML+=`
 <div class ="items">
 <table>
     <tr>
         <td> <img src=${post.image} width=150px height=100px></td>
         <td> ${post.name} </td>
         <td> ${post.price} </td>
         <td>
         <button id="decrease-button" onclick="decrease_quantity(${post.id},${post.price})">-</button>
         <input id=${post.id} type="text" size="1" min="1" value="${item_quantity}">
         <button id='increase-button' onclick="increase_quantity(${post.id},${post.price})">+</button>     
        
        </td>
         <td>
             <p>TOTAL</p> 
             <p id="t${post.id}">${post.price}<p></td>
     </tr>
 </table>
<hr>
</div>`
total_cost=total_cost+parseInt(post.price);
total(total_cost);
});

}



function increase_quantity(item,price)
{

id="t"+item;
document.getElementById(item).value=parseInt(document.getElementById(item).value)+1;

change_cost(id,item,price);

total_cost=total_cost+parseInt(price);
total(total_cost);
}



function decrease_quantity(item,price)
{

id="t"+item;
quantity=parseInt(document.getElementById(item).value)-1;
if (quantity<0)
{
    quantity=0;
}
document.getElementById(item).value=quantity;
change_cost(id,item,price);

 total_cost=total_cost-parseInt(price);
 total(total_cost);
}



function change_cost(id,item,price)
{
    cost=price*parseInt(document.getElementById(item).value);
    document.getElementById(id).innerHTML=cost;
}



function total(price)
{
  
  document.getElementById("subtotal").innerHTML="Subtotal price :  Rs.  "+ price;
 document.getElementById("total").innerHTML="Total price :  Rs.  "+ price;
}
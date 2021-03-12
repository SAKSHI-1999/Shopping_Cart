const app=document.getElementById('app');
var t=0;
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
 
 q=post.quantity;

 app.innerHTML+=`
 <div class ="items">
 <table>
     <tr>
         <td> <img src=${post.image} width=150px height=100px></td>
         <td> ${post.name} </td>
         <td> ${post.price} </td>
         <td>
         <button id="decrease-button" onclick="decrease(${post.id},${post.price})">-</button>
         <input id=${post.id} type="text" size="1" min="1" value="${q}">
         <button id='increase-button' onclick="increase(${post.id},${post.price})">+</button>     
        
        </td>
         <td>
             <p>TOTAL</p> 
             <p id="t${post.id}">${post.price}<p></td>
     </tr>
 </table>
<hr>
</div>`
t=t+parseInt(post.price);
total(t);
});

}

function increase(item,p)
{

y="t"+item;
document.getElementById(item).value=parseInt(document.getElementById(item).value)+1;
c=p*parseInt(document.getElementById(item).value);
document.getElementById(y).innerHTML=c;
console.log(document.getElementById(y).innerHTML);
t=t+parseInt(p);
total(t);
}

function decrease(item,p)
{
// console.log(d)
y="t"+item;
quantity=parseInt(document.getElementById(item).value)-1;
if (quantity<0)
{
    quantity=0;
}
document.getElementById(item).value=quantity;
c=p*parseInt(document.getElementById(item).value);
document.getElementById(y).innerHTML=c;
console.log(document.getElementById(y).innerHTML);
 t=t-parseInt(p);
 total(t);
}

function total(price)
{
  
  document.getElementById("subtotal").innerHTML="Subtotal price :  Rs.  "+ price;
 document.getElementById("tot").innerHTML="Total price :  Rs.  "+ price;
}

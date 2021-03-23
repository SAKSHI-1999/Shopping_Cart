
const display_items=document.getElementById('cartItems');
var total_cost=0;
var items;
var model=
{
   fetchdata :async function ()
     {
        await fetch("/data/datas.json")
         .then((response)=> response.json())
         .then((data)=>{
            controller.showdata(data);
         });
    
        
     },
     init: function(data)
     {
        items=localStorage.getItem('product');
        model.fetchdata();
     }


}

var controller={


    init:function()
    {   model.init();
    
    },

    showdata:function(data)
    {
      view.showContent(data,items);
    }

}



var view={

    showContent:function(data,items){
     var x;

     data.forEach(post =>{  
 
    q=post.quantity;
 
     x=parseInt(post.id);
     
   if(items.includes(x))
 {
 display_items.innerHTML+=`
 <div class ="items">
 <table>
     <tr>
         <td> <img src=${post.image} width=150px height=100px></td>
         <td> ${post.name} </td>
         <td> Rs. ${post.price} </td>
         <td>
         <button id="decrease-button" onclick="view.decrease_quantity(${post.id},${post.price})">-</button>
         <input id=${post.id} type="text" size="1" min="1" value="${q}">
         <button id='increase-button' onclick="view.increase_quantity(${post.id},${post.price})">+</button>     
        
        </td>
         <td>
             <p>TOTAL</p> 
             <p id="t${post.id}">Rs. ${post.price}<p></td>
     </tr>
 </table>
<hr>
</div>`
total_cost=total_cost+parseInt(post.price);
view.total(total_cost);
 }
});

},

increase_quantity:function(item,price)
{

id="t"+item;
document.getElementById(item).value=parseInt(document.getElementById(item).value)+1;

view.change_cost(id,item,price);

total_cost=total_cost+parseInt(price);
view.total(total_cost);
},



decrease_quantity: function(item,price)
{

id="t"+item;
quantity=parseInt(document.getElementById(item).value)-1;
if (quantity<0)
{
    quantity=0;
}
document.getElementById(item).value=quantity;
view.change_cost(id,item,price);

 total_cost=total_cost-parseInt(price);
 view.total(total_cost);
},



change_cost:function(id,item,price)
{
    cost=price*parseInt(document.getElementById(item).value);
    document.getElementById(id).innerHTML=cost;
},



total:function(price)
{
  
  document.getElementById("subtotal").innerHTML="Subtotal price :  Rs.  "+ price;
 document.getElementById("total").innerHTML="Total price :  Rs.  "+ price;
}
}

controller.init();


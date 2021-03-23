const display=document.getElementById('items');


var t=0;
var product=[];

var model={
         fetchdata: async function (){
            await fetch("/data/datas.json")
         .then((response)=> response.json())
         .then((data)=>{
             controller.show(data);
         });
         
    },

    addProduct:function(post)
    {
        
        product.push(post);
        localStorage.setItem('product',product);
    },

    deleteProduct: function(value)
    {
    product= product.filter(item => item !== value);
    localStorage.setItem('product',product);
    },
    
    init: function()
    {
     //product=[];
     localStorage.setItem('product',product);
    }

}
    


var controller={

     init : function()
        {
        model.init();
        document.getElementById("cartbutton").addEventListener("click", view.navigateFromHomeToCart);
        model.fetchdata();


        },


    show:function(data)
        {
        view.showContent(data);
        },
     
    addingProduct:function(id)
    {   
        model.addProduct(id);
    },  
    

    deletingProduct : function(id)
    {
        model.deleteProduct(id)
    }

}





var view={

    navigateFromHomeToCart:function(){
    window.location.href= "/html/carts.html";
    },

    showContent: function(data){
        var x;
        data.forEach(post =>{  
         
         q=post.quantity;
        
        display.innerHTML+=`
         <div class ="items">
                <img src=${post.image} width=150px height=100px></td>
                 <p> ${post.name} <p>
                 <p>Rs. ${post.price} <p>
                
                 <button id="add" onclick="controller.addingProduct(${post.id})">add to cart</button>
                 <button id="delete" onclick="controller.deletingProduct(${post.id})">remove</button>
        
        </div>`
        //document.getElementById("add").onclick
        });
        
        }
    }

controller.init();

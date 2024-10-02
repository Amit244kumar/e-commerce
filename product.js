productItme=[
    {
        id:1,
        image:"/image1.jpg",
        title:"DOUBLE LAYER WIRE CLEANING CLOT",
        review:"5.0",
        price:91
    },
    {
        id:2,
        image:"/image2.jpg",
        title:"APPLE CASE PACK OF 2",
        review:"5.0",
        price:52
    },
    {
        id:3,
        image:"/image3.jpg",
        title:"SILICONE CHOPPING BOARD",
        review:"5.0",
        price:170
    }
]
parent=document.getElementById("parent")
const newCard = document.createElement('div');
productItme.map((value)=>{
    const newCard = document.createElement('div');
    newCard.innerHTML=`<div class="card">
                    <div class="card-header">
                      <img
                        src=${value.image}
                        alt="Random product"
                        class="product-image"
                      />
                      <span class="badge-icon" onclick="addToCart(${value.id})" style="position: relative;">
                        <i class="fa-solid fa-cart-shopping icon"></i>
                      </span>
                    </div>
                    <div class="card-content">
                      <div class="product-header">
                        <h2 class="product-title">${value.title}</h2>
                        <span class="badge" onclick="addToCart(${value.id})" ><i class="fa-solid fa-cart-shopping icon"></i></span>
                      </div>
                      
                      <div class="product-rating">
                        <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 sm:w-5 h-5 text-yellow-400">
                           <path d="M12 .587l3.668 7.568L23.5 9.748l-5.732 5.704L19.335 24 12 20.347 4.665 24l1.568-8.548L.5 9.748l7.832-1.593L12 .587z"/>
                        </svg>
                        <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 sm:w-5 h-5 text-yellow-400">
                           <path d="M12 .587l3.668 7.568L23.5 9.748l-5.732 5.704L19.335 24 12 20.347 4.665 24l1.568-8.548L.5 9.748l7.832-1.593L12 .587z"/>
                        </svg>
                        <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 sm:w-5 h-5 text-yellow-400">
                           <path d="M12 .587l3.668 7.568L23.5 9.748l-5.732 5.704L19.335 24 12 20.347 4.665 24l1.568-8.548L.5 9.748l7.832-1.593L12 .587z"/>
                        </svg>
                        <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 sm:w-5 h-5 text-yellow-400">
                           <path d="M12 .587l3.668 7.568L23.5 9.748l-5.732 5.704L19.335 24 12 20.347 4.665 24l1.568-8.548L.5 9.748l7.832-1.593L12 .587z"/>
                        </svg>
                        <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 sm:w-5 h-5 text-yellow-400">
                           <path d="M12 .587l3.668 7.568L23.5 9.748l-5.732 5.704L19.335 24 12 20.347 4.665 24l1.568-8.548L.5 9.748l7.832-1.593L12 .587z"/>
                        </svg>
                        <span class="reviews">${value.review} </span>
                      </div>
                      <p class="product-price">Rs ${value.price}</p>
                    </div>
                </div>`   
     parent.appendChild(newCard);
})

// expanding form 
document.getElementById('btn').addEventListener("click",()=>{
    document.getElementById('frm').style.display="block"
    document.getElementById("btn").style.display="none"
})
//showing cart
document.getElementById('item').addEventListener("click",()=>{
    document.getElementById("itemcart").style.display="block"
    document.getElementsByTagName("body")[0].style.overflow="hidden"
    display()
    
})
// hiding cart

document.getElementById('close-btn').addEventListener('click',()=>{
     document.getElementById("itemcart").style.display="none"
    document.getElementsByTagName("body")[0].style.overflow="scroll"
})



// implementing add to cart functionality
var item=JSON.parse(localStorage.getItem('cart'))?JSON.parse(localStorage.getItem('cart')):null;
var total=0
function addToCart(id) {
    let pr=JSON.parse(localStorage.getItem('cart'))
    let cartItems =pr?pr:[];
    // Check if the product already exists in the cart
    let productIndex =-1// pr==[]?cartItems.findIndex(pr=> Number(pr.id) === Number(id)):-1;
    for (const element of cartItems) {
      if(element.id === id){
        productIndex=true
      }
    }
    let product=null
    if (productIndex === -1) {
      // Product doesn't exist in the cart, so add it
      product=findproduct(id)
      product.quantity=1;
      product.total=product.price
      total+=product.total
      cartItems.push(product);
      const toaster=document.getElementById("toaster")
      toaster.innerHTML="item added successfully"
      toaster.style.backgroundColor="green"
      showToaster()
    } else {
        const toaster=document.getElementById("toaster")
        toaster.innerHTML="item already added"
        toaster.style.backgroundColor="red"
        showToaster()
        return 
    }
    //Save the updated cart to local storage
    localStorage.setItem('cart',JSON.stringify(cartItems))
    item=JSON.parse(localStorage.getItem('cart'))
    display()
}

function findproduct(id){
    for (const element of productItme) {
        if(element.id==id)
            return element
    }
}
function display() {
    parent=document.getElementById("par")
    parent.innerHTML=''
    item.map((value)=>{
        const newCard = document.createElement('div');
        newCard.innerHTML=`<div class="cart-item">
                <div class="item-details">
                  <img src=${value.image} class="item-image">
                  <div class="item-info">
                    <h3>${value.title}</h3>
                    <p>Price: ${value.price}</p>
                    <p >total: <span id="t${value.id}">${value.total}</span></p>
                    <div class="quantity-controls">
                      <button class="quantity-button" onclick="decrement(${value.id})">-</button>
                      <input type="number" value=${value.quantity} id="input${value.id}" class="quantity-input">
                      <button class="quantity-button" onclick="increment(${value.id})">+</button>
                    </div>
                    <button class="remove-button" onclick="removeItem(${value.id})">Remove</button>
                  </div>
                </div>
              </div>`   
        parent.appendChild(newCard);
    })
    document.getElementById('i').innerText=item.length
    document.getElementById("total").innerText=total

}

function removeItem(id){
    let i
    for (const element of item) {
        if(element.id == id){
            i=item.indexOf(element)
            break;
        }
    }
    item.splice(i,1)
    localStorage.setItem('cart',JSON.stringify(item))
    document.getElementById('i').innerText=item.length
    total=0
    for (const element of item) {
        total+=element.total
    }
    document.getElementById("total").innerText=total
    display()
    const toaster=document.getElementById("toaster")
    toaster.innerHTML="item remove successfully"
    toaster.style.backgroundColor="red"
    showToaster()
}

window.onload=function(){
    document.getElementById('i').innerText=item.length
    for (const element of item) {
        total+=element.total
    }
    document.getElementById("total").innerText=total
}


function increment(id){
   const input=document.getElementById("input"+id)
   input.value++
   for (const element of item) {
        if(element.id==id){
            element.quantity++;
            element.total+=element.price
            total+=element.price
            document.getElementById("t"+id).innerText=element.total
            break;
        }
   }
   document.getElementById("total").innerText=total
   localStorage.setItem('cart',JSON.stringify(item))
}

function decrement(id){
    
    const input=document.getElementById("input"+id)
    if(input.value==1)
        return
    input.value--
    for (const element of item) {
         if(element.id==id){
             element.quantity--;
             element.total-=element.price
             total-=element.price
             document.getElementById("t"+id).innerText=element.total
             break
         }
    }
    document.getElementById("total").innerText=total
    localStorage.setItem('cart',JSON.stringify(item))
    display()
}




function showToaster() {
    const toaster = document.getElementById('toaster');
    toaster.classList.remove('hidden');
    toaster.classList.add('show');
  
    // Hide the toaster after 3 seconds
    setTimeout(() => {
      toaster.classList.remove('show');
      toaster.classList.add('hidden');
    }, 2000);
}
  
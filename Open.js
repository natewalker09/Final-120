const image =
"https://via.placeholder.com/180x120?text=Food";

const menuItems = [

{category:"Tacos",name:"Beef Taco",price:3.50,image:image},
{category:"Tacos",name:"Chicken Taco",price:3.00,image:image},
{category:"Tacos",name:"Steak Taco",price:4.00,image:image},

{category:"Quesadillas",name:"Cheese Quesadilla",price:8.00,image:image},
{category:"Quesadillas",name:"Chicken Quesadilla",price:10.00,image:image},
{category:"Quesadillas",name:"Steak Quesadilla",price:12.00,image:image},

{category:"Burritos",name:"Beef Burrito",price:10.50,image:image},
{category:"Burritos",name:"Chicken Burrito",price:11.00,image:image},
{category:"Burritos",name:"Steak Burrito",price:12.50,image:image},

{category:"Appetizers",name:"Beef Nachos",price:10.00,image:image},
{category:"Appetizers",name:"Loaded Chicken Nachos",price:12.00,image:image},
{category:"Appetizers",name:"Guacamole & Chips",price:7.00,image:image},
{category:"Appetizers",name:"Mexican Street Corn",price:5.50,image:image},

{category:"Rice Bowls",name:"Mexican Rice Bowl",price:9.50,image:image},

{category:"Fajitas",name:"Chicken Fajitas",price:14.00,image:image},
{category:"Fajitas",name:"Steak Fajitas",price:16.00,image:image},

{category:"Combo Meals",name:"Combo Plate (Taco, Burrito & Rice)",price:15.00,image:image},

{category:"Enchiladas",name:"Beef Enchiladas (3)",price:13.00,image:image},
{category:"Enchiladas",name:"Chicken Enchiladas (3)",price:13.50,image:image},

{category:"Desserts",name:"Churros (2)",price:5.00,image:image}

];

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function displayMenu(){

const menu =
document.getElementById("menu");

menu.innerHTML = "";

const categories =
[...new Set(menuItems.map(item=>item.category))];

categories.forEach(category=>{

const section =
document.createElement("div");

section.classList.add("category");

section.innerHTML =
`<h2>${category}</h2>`;

menuItems
.filter(item=>item.category===category)
.forEach(item=>{

const div =
document.createElement("div");

div.classList.add("menu-item");

div.innerHTML = `
<img src="${item.image}" alt="${item.name}">
<h3>${item.name}</h3>
<p>$${item.price.toFixed(2)}</p>

<button onclick="addToCart('${item.name}', ${item.price})">
Add To Cart
</button>
`;

section.appendChild(div);

});

menu.appendChild(section);

});

}

function addToCart(name,price){

cart.push({
name:name,
price:price
});

saveCart();

updateCart();

}

function removeFromCart(index){

cart.splice(index,1);

saveCart();

updateCart();

}

function updateCart(){

const cartList =
document.getElementById("cart");

cartList.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

const li =
document.createElement("li");

li.innerHTML = `
${item.name} - $${item.price.toFixed(2)}

<button onclick="removeFromCart(${index})">
Remove
</button>
`;

cartList.appendChild(li);

total += item.price;

});

document.getElementById("total").innerText =
total.toFixed(2);

}

function processPayment(){

const name =
document.getElementById("name").value;

const card =
document.getElementById("cardNumber").value;

const exp =
document.getElementById("expDate").value;

const cvv =
document.getElementById("cvv").value;

if(name && card && exp && cvv){

document.getElementById("message").innerHTML =
"✅ Payment Successful! Order Submitted.";

cart = [];

saveCart();

updateCart();

}
else{

document.getElementById("message").innerHTML =
"❌ Please fill out all payment information.";

}

}

displayMenu();
updateCart();
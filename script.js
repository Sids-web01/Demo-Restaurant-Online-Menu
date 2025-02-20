

 const navLinks = document.querySelectorAll('header nav a')
const logo = document.querySelector('.logo')
const sections = document.querySelectorAll('section')
const menuicon = document.querySelector('#menu-icon')
const navbar = document.querySelector('header nav')
const goToMenuBtn = document.querySelector('.btn')  // Select your custom button

menuicon.addEventListener('click', () => {
    menuicon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
})

const activiepage = () => {
    const header = document.querySelector('header')
    const barsbox = document.querySelector('.bars-box')

    header.classList.remove('active')
    setTimeout(() => {
        header.classList.add('active')
    }, 1100)

    navLinks.forEach(link => {
        link.classList.remove('active')
    })

    barsbox.classList.remove('active')
    setTimeout(() => {
        barsbox.classList.add('active')
    }, 1100)

    sections.forEach(section => {
        section.classList.remove('active')
    })
    menuicon.classList.remove('bx-x')
    navbar.classList.remove('active')
}

// Existing navigation logic for navbar links
navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activiepage()

            link.classList.add('active')

            setTimeout(() => {
                sections[idx].classList.add('active')
            }, 1100)
        }
    })
})

logo.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activiepage()

        navLinks[0].classList.add('active')
        setTimeout(() => {
            sections[0].classList.add('active')  // Corrected this line to use `sections[0]`
        }, 1100)
    }
})

const resumebtns = document.querySelectorAll('.resume-btn')

resumebtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail')

        resumebtns.forEach(btn => {
            btn.classList.remove('active')
        })
        btn.classList.add('active')

        resumeDetails.forEach(detail => {
            detail.classList.remove('active')
        })
        resumeDetails[idx].classList.add('active')
    })
})

// New button functionality to go to the Menu section
goToMenuBtn.addEventListener('click', () => {
    activiepage()  // Call the existing function to reset the active states

    // Find the Menu section and add the 'active' class to it
    const targetSection = document.querySelector('#menu')
    targetSection.classList.add('active')

    // Optionally, make the button active if you want
    goToMenuBtn.classList.add('active')
})

// Select your 'Go to Order' button
const goToOrderBtn = document.querySelector('.order-check');

goToOrderBtn.addEventListener('click', () => {
    activiepage();  // Call the existing function to reset active states

    // Find the Order section and make it active
    const targetSection = document.querySelector('#review');
    targetSection.classList.add('active');

    // Optionally, make the button active (if you want this effect)
    goToOrderBtn.classList.add('active');
});






    // search function in menu page

// order to whatapps js
// Function to collect order details from the table

// order to WhatsApp js
// Function to collect order details from the table
function collectOrderDetails() {
  const tableRows = document.querySelectorAll('#cart-items tr');
  let orderDetails = '🛒 *Order Summary:*\n\n';

  if (tableRows.length === 0) {
      alert("Your cart is empty! Please add items before ordering.");
      return null; // Stop execution if no items in cart
  }

  tableRows.forEach(row => {
      const itemName = row.cells[0]?.innerText || "Unknown Item";
      const itemQuantity = row.cells[1]?.innerText || "1";
      const itemPrice = row.cells[2]?.innerText || "0";
      orderDetails += `🍔 *${itemName}* - ${itemQuantity} x ${itemPrice}\n`;
  });

  // Get user details
  const userName = document.querySelector('#user-name').value.trim();
  const tableNumber = document.querySelector('#table-number').value.trim();
  const additionalInstructions = document.querySelector('#additional-instructions').value.trim();

  if (!userName || !tableNumber) {
      alert("Please fill in all required fields (Name and Table Number).");
      return null; // Stop execution if user details are missing
  }

  // Add user details
  orderDetails += `\n👤 *Customer Name:* ${userName}\n🪑 *Table Number:* ${tableNumber}`;

  // Add additional instructions if provided
  if (additionalInstructions) {
      orderDetails += `\n📝 *Additional Instructions:* ${additionalInstructions}`;
  }

  // Add pricing details
  const totalPrice = document.querySelector('#total-price')?.innerText || "Total: Le 0";
  const deliveryFee = document.querySelector('#delivery-fee')?.innerText || "Delivery Fee: Le 0";
  const finalTotal = document.querySelector('#final-total')?.innerText || "Final Total: Le 0";

  orderDetails += `\n\n💰 ${totalPrice}\n🚚 ${deliveryFee}\n💵 ${finalTotal}`;

  return orderDetails;
}

// Function to send the order via WhatsApp
function handleOrderNow() {
  const orderMessage = collectOrderDetails();
  if (!orderMessage) return; // Stop if order details are null

  const phoneNumber = '23279728028'; // Change to your restaurant's WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage)}`;

  window.open(whatsappUrl, '_blank');
}

// Attach function to the "Order Now" button
document.querySelector('#order-now-btn').addEventListener('click', handleOrderNow);


    

    // menu cart system
 let cart = [];
 let total = 0;
 const deliveryFee = 5;
 
 document.querySelectorAll('.add-to-cart').forEach(button => {
   button.addEventListener('click', () => {
     const name = button.getAttribute('data-name');
     const price = parseInt(button.getAttribute('data-price'));
     
     // Check if item already exists in cart
     const existingItem = cart.find(item => item.name === name);
     if (existingItem) {
       existingItem.quantity += 1;
       existingItem.totalPrice += price;
     } else {
       cart.push({ name, price, quantity: 1, totalPrice: price });
     }
 
     total += price;
     updateCart();
   });
 });
 
 function updateCart() {
   const cartItems = document.getElementById('cart-items');
   cartItems.innerHTML = ''; // Clear current cart
 
   cart.forEach(item => {
     const tr = document.createElement('tr');
     tr.innerHTML = `
       <td>${item.name}</td>
       <td>${item.quantity}</td>
       <td>Le ${item.totalPrice}</td>
     `;
     cartItems.appendChild(tr);
   });
 
   // Update total and final total (with delivery fee)
   const finalTotal = total + deliveryFee;
   document.getElementById('total-price').textContent = `Total: Le ${total}`;
   document.getElementById('final-total').textContent = `Final Total: Le ${finalTotal}`;
 }



 //other menu js
 const cartIndicator = document.querySelector('.cart-indicator');
 const addToCartButtons = document.querySelectorAll('.add-to-cart');
 const searchInput = document.getElementById('search');
 const foodFilterBtn = document.getElementById('food-filter');
 const drinkFilterBtn = document.getElementById('drink-filter');
 const menuResults = document.getElementById('menu-results');
 
 let cartCount = 0;
 
 // Add to cart functionality
 addToCartButtons.forEach(button => {
   button.addEventListener('click', function() {
     cartCount++;
     cartIndicator.textContent = cartCount;
     
   });
 });

 // Search functionality
 searchInput.addEventListener('input', function() {
   const query = searchInput.value.toLowerCase();
   const menuCards = document.querySelectorAll('.menu-card');
   menuCards.forEach(card => {
     const name = card.getAttribute('data-name').toLowerCase();
     if (name.includes(query)) {
       card.style.display = 'block';
     } else {
       card.style.display = 'none';
     }
   });
 });

 // Filter functionality
 foodFilterBtn.addEventListener('click', function() {
   const foodItems = document.querySelectorAll('.menu-card.food');
   const drinkItems = document.querySelectorAll('.menu-card.drink');
   foodItems.forEach(item => item.style.display = 'block');
   drinkItems.forEach(item => item.style.display = 'none');
 });

 drinkFilterBtn.addEventListener('click', function() {
   const foodItems = document.querySelectorAll('.menu-card.food');
   const drinkItems = document.querySelectorAll('.menu-card.drink');
   foodItems.forEach(item => item.style.display = 'none');
   drinkItems.forEach(item => item.style.display = 'block');
 });

 

/*shoes dropdown menu*/
const subMenu = document.querySelector('.sub-menu');

subMenu.addEventListener('click', showSubMenu);

function showSubMenu() {
  const subMenuProducts = document.querySelectorAll('.product');

  subMenuProducts.forEach((product) => {
    product.classList.toggle('product-active');
  });
}

/*add product/products to cart*/

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach((individualButton) => {
  individualButton.addEventListener('click', addProductsToCart)
});

function addProductsToCart(event) {
  const getDataFromProduct = event.target.parentElement.children;
  const productImage = getDataFromProduct[0].src;
  const productHeading = getDataFromProduct[1].innerText;
  const productPrice = getDataFromProduct[2].innerText;
  const cartTable = document.querySelector('.cart-table');
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');

  const cartRowContents = 
  `
    <img src="${productImage}"/>
    <h3>${productHeading}</h3>
    <span>${productPrice}</span>
    <i class="fa fa-trash delete-button" aria-hidden="true"></i>
  `;

  cartRow.innerHTML = cartRowContents;
  cartTable.append(cartRow);

  calculateTotalPrice('add', productPrice);
  removeProduct(productPrice);
}

/* remove product/products from cart*/

function removeProduct(productPrice) {
  const deleteButtons = document.querySelectorAll('.delete-button');

  deleteButtons.forEach((individualDeleteButton) => {
    individualDeleteButton.addEventListener('click', removeProductFromTheCart);
  });

  function removeProductFromTheCart(event) {
    event.stopImmediatePropagation();
    const productForRemoving = event.target.parentElement.remove();

    calculateTotalPrice('remove', productPrice);
  };
};

/* calculate total price */
let sumOfPrices = 0;

function calculateTotalPrice(action, productPrice){
  let totalPrice;

  if(action === 'add') {
    totalPrice = document.querySelector('.price');
    let convertProductPrice = parseFloat(productPrice.replace(' $', ''));
    sumOfPrices += convertProductPrice;
  };
  
  if(action === 'remove') {
    totalPrice = document.querySelector('.price');
    let convertProductPrice = parseFloat(productPrice.replace(' $', ''));
    sumOfPrices = sumOfPrices - convertProductPrice;
  };

  if(action === 'purchase'){
    totalPrice = document.querySelector('.price');
    sumOfPrices = 0;
  };

  totalPrice.innerText = `Total: ${sumOfPrices} $`;

  return sumOfPrices;
};

const purchaseButton = document.querySelector('.purchase');

purchaseButton.addEventListener('click', clearProductsInCart);

function clearProductsInCart(event) {
  const cartTable = Array.from(event.target.parentElement.children[1].children);

  for(let key in cartTable) {
    cartTable[key].remove();
  };

  calculateTotalPrice('purchase', 0);
};






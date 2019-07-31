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

  removeProduct(productPrice);
  calculatTotalPrice(productPrice);
}

/* remove product/products from cart*/

function removeProduct(productPrice) {
  const deleteButtons = document.querySelectorAll('.delete-button');

  deleteButtons.forEach((individualDeleteButton) => {
    individualDeleteButton.addEventListener('click', removeProductFromTheCart);
  });

  function removeProductFromTheCart(event) {
    const convertedProductPrice = productPrice.replace(' $', '');
    const productForRemoving = event.target.parentElement.remove();

    let getTotalPrice = document.querySelector('.price').innerText.split(' ')[1];

    const updatedTotalPrice = getTotalPrice - parseFloat(convertedProductPrice);

    console.log(productPrice);
    return document.querySelector('.price').innerText = `Total: ${updatedTotalPrice} $`;
  };
};

/* calculate total price */
let sumOfPrices = 0;

function calculatTotalPrice(productPrice){
  let convertProductPrice = parseFloat(productPrice.replace(' $', ''));
  
  sumOfPrices += convertProductPrice;

  const totalPrice = document.querySelector('.price');

  totalPrice.innerText = `Total: ${sumOfPrices} $`;

  return sumOfPrices;
}






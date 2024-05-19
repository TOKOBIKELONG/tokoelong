let cart = [];

document.querySelectorAll('.buyButton').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        const price = parseInt(this.getAttribute('data-price'));

        cart.push({ product, price });
        updateCart();
    });
});

document.getElementById('checkoutButton').addEventListener('click', function() {
    document.getElementById('cart-section').style.display = 'none';
    document.getElementById('form-section').style.display = 'block';

    const productList = cart.map(item => `${item.product} - Rp${item.price}`).join(', ');
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    document.getElementById('product').value = productList;
    document.getElementById('total').value = totalPrice;
});

document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const product = document.getElementById('product').value;
    const total = document.getElementById('total').value;

    emailjs.init("xlxJfK3Ztwkwf1K0F");

    emailjs.send("service_thoagyl", "template_ctngphc", {
        name,
        address,
        item: product,
        price: total
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('purchaseForm').style.display = 'none';
        document.getElementById('confirmationMessage').style.display = 'block';
    }, function(error) {
        console.error('FAILED...', error);
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.product} - Rp${item.price} <span class="removeButton" data-index="${index}">Hapus</span>`;
        cartItems.appendChild(listItem);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById('total-price').innerText = `Rp${totalPrice}`;

    document.querySelectorAll('.removeButton').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });

    if (cart.length > 0) {
        document.getElementById('cart-section').style.display = 'block';
    } else {
        document.getElementById('cart-section').style.display = 'none';
    }
}

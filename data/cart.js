export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'

    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
}



export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(addQuantity, productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += addQuantity;
    } else {
        cart.push({
            productId: productId,
            quantity: addQuantity,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function ChangeQuantityOnCart(addQuantity, productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity = addQuantity;
    } else {
        cart.push({
            productId: productId,
            quantity: addQuantity,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId
        ) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

export function numberOfItemsInCart() {
    var length = 0;

    cart.forEach((cartItem) => {
        length += cartItem.quantity;
    });

    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    if (cartQuantityElement) {
        cartQuantityElement.innerHTML = length;
    }

    return length;
}

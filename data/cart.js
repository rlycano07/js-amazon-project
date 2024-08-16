export const cart = [];

export function addToCart(addQuantity, productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += addQuantity;
    } else {
        cart.push({
            productId: productId,
            quantity: addQuantity
        });
    }
}
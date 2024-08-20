import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let cartSummaryHtml = '';

cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHtml += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchingProduct)}
            </div>
        </div>
    </div>`
});

function deliveryOptionsHtml(matchingProduct) {

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.id, 'days');
        const deliveryDateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryOption.priceCents)}`

        html +=
            `<div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${deliveryDateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString}
                </div>
                </div>
            </div>`
    });

    return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
    });
});
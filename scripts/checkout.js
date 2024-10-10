import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSymmary.js";
import { numberOfItemsInCart } from "../data/cart.js";
import '../data/cart-class.js';

renderOrderSummary();
renderPaymentSummary();
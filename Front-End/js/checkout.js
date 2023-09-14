//variables

const cartBtn = document.querySelector("#cart-open");
const closeCartBtn = document.querySelector("#close-cart");
const clearCartBtn = document.querySelector("#clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
// const productDOM = document.querySelector('.product-center');
const electricProductDOM = document.querySelector("#electric");
const homeProductDom = document.querySelector("#home");
const furnitureProductDom = document.querySelector("#furniture");
const outdoorProductDom = document.querySelector("#outdoor");
const autoProductDom = document.querySelector("#auto");

//cart
let cart = [];

// Getting Products
class Products {
  async getProducts() {
    try {
      let result = await fetch("./json/products.json");
      let data = await result.json();
      let allProducts = data.allItems;

      allProducts = allProducts.map((allItems) => {
        const { title, price, stock, imgCount, imgLinks } = allItems.fields;
        const { id } = allItems.sys;
        const { url } = allItems.fields.image.fields.file;
        return { title, price, stock, imgCount, imgLinks, id, url };
      });

      return [
        allProducts,
      ];
    } catch (error) {
      console.log(error);
    }
  }
}

//display products
class UI {
  //Update the number that is displayed over the cart icon
  static updateCartNum() {
    let totalCartNum = 0;
    let cartCheckList = [];
    let isCartCheckList = JSON.parse(
      window.localStorage.getItem("cartCheckList")
    );
    let cartTotalNumOfItems = document.querySelector("#cartTotalNumOfItems");
    let cartTotalNumOfItemsDropdown = document.querySelector(
      "#cartTotalNumOfItemsDropdown"
    );

    if (isCartCheckList == null) {
      console.log("isCartCheckList is null.");
    } else {
      cartCheckList = JSON.parse(window.localStorage.getItem("cartCheckList"));
      //console.log(isCartCheckList);
    }
    for (let i = 0; i < cartCheckList.length; i++) {
      totalCartNum += cartCheckList[i].amount;
    }
    cartTotalNumOfItems.innerHTML = `${totalCartNum}`;
    cartTotalNumOfItemsDropdown.innerHTML = `${totalCartNum}`;
  }

  //display the cart and dont close the cart until the x is clicked
  static openAndCloseCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
    console.log("open and close Cart");
    UI.removeFromCart();

    // closeCartBtn.addEventListener("click", () => {
    //   // cartOverlay.classList.remove("transparentBcg");
    //   // cartDOM.classList.remove("showCart");
    //   UI.checkoutPage();
    // });
    UI.removeFromCart();
  }

  //open the cart when the cart icon is clicked
  static cartBtn() {
    const cartBtnDropdown = document.querySelector("#cart-dropdown");
    const cartBtn = document.querySelector(".cart-nondropdown");
    cartBtn.addEventListener("click", () => {
      UI.openAndCloseCart();
    });
    cartBtnDropdown.addEventListener("click", () => {
      UI.openAndCloseCart();
      console.log("cartbtn calling open and close Cart");
    });
  }

  // display the items that are in the cart
  static displayCart() {
    const cartContent = document.querySelector(".cart-content");
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    let itemsResults = "";
    if (cartItems == null) {
      console.log("its null");
    } else {
      cartItems.forEach((cartItems) => {
        itemsResults += `<div id="${cartItems.id}" class="cart-item">
          <img src="${cartItems.url}" alt="">
          <div>
              <h4>${cartItems.title}</h4>
              <h5>$${cartItems.price}</h5>
              <span id="remove${cartItems.id}" class="remove-item">remove</span>
          </div>
          <div>
              <i onclick="UI.addQtyInCart(${cartItems.id})" class="bi bi-chevron-up"></i>
              <p id="Amount${cartItems.id}" class="item-amount">${cartItems.amount}</p>
              <i onclick="UI.subQtyInCart(${cartItems.id})" class="bi bi-chevron-down"></i>
          </div>
      </div>`;
      });
    }

    cartContent.innerHTML = itemsResults;
  }

  // display the items that are in the cart
  static displayCheckoutCart() {
    const checkoutCartDom = document.querySelector("#checkoutCart");
    const checkoutCartNum = document.querySelector(".rounded-pill");
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    let itemsResults = "";
    let cartTotal = JSON.parse(window.localStorage.getItem("cartTotal"));
    cartTotal = (Math.round(cartTotal * 100) / 100).toFixed(2);
    let cartNum = 0;

    if (cartItems == null) {
      console.log("its null");
    } else {
      cartItems.forEach((cartItems) => {
        cartNum += cartItems.amount;
        itemsResults += `<li class="list-group-item d-flex justify-content-between lh-sm">
        <div class="cart-item">
          <img src="${cartItems.url}" alt="">
        <div>
          <p style="font-weight: bolder;">${cartItems.title}</p>
          <h5>$${cartItems.price}</h5>
          
        </div>
        <div>
          
          <p class="item-amount">${cartItems.amount}</p>
          
        </div>
      </div>
      </li>`;
      });
    }
    itemsResults += `<li class="list-group-item d-flex justify-content-between bg-light">
    <div class="text-success">
      <h6 class="my-0">Shipping</h6>
      <!-- <small>FREE SHIPPING</small> -->
    </div>
    <span class="text-success">FREE SHIPPING</span>
    </li>
    <li class="list-group-item d-flex justify-content-between">
      <span>Total (USD)</span>
      <strong>${cartTotal}</strong>
    </li>
    `;
    checkoutCartDom.innerHTML = itemsResults;
    checkoutCartNum.innerHTML = cartNum;
  }

  //adding functinality to the up buttons to add qty
  static addQtyInCart(id) {
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    let cartCheckList = JSON.parse(
      window.localStorage.getItem("cartCheckList")
    );
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == id) {
        console.log(cartItems[i].amount);
        console.log("adding 1");
        cartItems[i].amount += 1;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        let amount = document.querySelector(`#Amount${cartItems[i].id}`);
        amount.innerHTML = cartItems[i].amount;
      } else {
        //console.log('not the item');
      }
    }

    for (let i = 0; i < cartCheckList.length; i++) {
      if (cartCheckList[i].id == id) {
        cartCheckList[i].amount += 1;
        localStorage.setItem("cartCheckList", JSON.stringify(cartCheckList));
      } else {
        //console.log('not the item');
      }
    }
    UI.updateCartNum();
    UI.cartTotalCost();
  }

  //adding functinality to the down buttons to subtract qty
  static subQtyInCart(id) {
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    let cartCheckList = JSON.parse(
      window.localStorage.getItem("cartCheckList")
    );
    console.log(id);
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id == id) {
        if (cartItems[i].amount == 1) {
          //console.log('not sub');
        } else {
          console.log(cartItems[i].amount);
          cartItems[i].amount += -1;
          localStorage.setItem("cart", JSON.stringify(cartItems));
          let amount = document.querySelector(`#Amount${cartItems[i].id}`);
          amount.innerHTML = cartItems[i].amount;
        }
      } else {
        //console.log('not the item');
      }
    }

    for (let i = 0; i < cartCheckList.length; i++) {
      if (cartCheckList[i].id == id) {
        if (cartCheckList[i].amount == 1) {
          //console.log("not sub");
        } else {
          cartCheckList[i].amount += -1;
          localStorage.setItem("cartCheckList", JSON.stringify(cartCheckList));
        }
      } else {
        //console.log('not the item');
      }
    }
    UI.updateCartNum();
    UI.cartTotalCost();
  }

  static removeFromCart() {
    const removeFromCartBtn = [...document.querySelectorAll(".remove-item")];
    removeFromCartBtn.forEach((removeFromCartBtn) => {
      removeFromCartBtn.addEventListener("click", () => {
        let cartItems = JSON.parse(window.localStorage.getItem("cart"));
        let cartItemsCopy = cartItems;
        let cartCheckList = JSON.parse(
          window.localStorage.getItem("cartCheckList")
        );
        let cartCheckListCopy = cartCheckList;

        for (let i = 0; i < cartItemsCopy.length; i++) {
          if (`remove${cartItemsCopy[i].id}` == removeFromCartBtn.id) {
            cartItems.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
          } else {
            console.log("dont got it");
          }
        }
        for (let i = 0; i < cartCheckListCopy.length; i++) {
          if (`remove${cartCheckListCopy[i].id}` == removeFromCartBtn.id) {
            cartCheckList.splice(i, 1);
            localStorage.setItem(
              "cartCheckList",
              JSON.stringify(cartCheckList)
            );
          } else {
            console.log("dont got it");
          }
        }
        UI.displayCart();
        UI.updateCartNum();
        //UI.justOpenCart();
        UI.cartTotalCost();
      });
    });
  }
  static cartTotalCost() {
    let cartTotalDom = document.querySelector(".cart-total");
    let cartTotal = 0;
    localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    if (cartItems == null || cartItems == undefined) {
      localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
      cartTotal = JSON.parse(window.localStorage.getItem("cartTotal"));
      cartTotal = 0;
      cartTotalDom.innerHTML = cartTotal;
    } else {
      for (let i = 0; i < cartItems.length; i++) {
        cartTotal += cartItems[i].amount * cartItems[i].price;
      }
      localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
      cartTotal = JSON.parse(window.localStorage.getItem("cartTotal"));
      cartTotal = (Math.round(cartTotal * 100) / 100).toFixed(2);
      cartTotalDom.innerHTML = cartTotal;
    }
  }

  //adds functinality to the button "Shipping address is the same as my billing address"
  static shipAndBillAddress() {
    let shippingOnlyDom = document.querySelector(".showShipping");
    let sameAddress = document.querySelector("#same-address");
    if (sameAddress.checked) {
      shippingOnlyDom.innerHTML = ``;
      console.log("checked");
    } else {
      shippingOnlyDom.innerHTML = `<div class="row g-3">
        <div class="col-sm-6">
          <label for="firstName" class="form-label">First name</label>
          <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
          <div class="invalid-feedback">
            Valid first name is required.
          </div>
        </div>

        <div class="col-sm-6">
          <label for="lastName" class="form-label">Last name</label>
          <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
          <div class="invalid-feedback">
            Valid last name is required.
          </div>
        </div>


        <div class="col-12">
          <label for="address" class="form-label">Address</label>
          <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
          <div class="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>

        <div class="col-12">
          <label for="address2" class="form-label">Address 2 <span class="text-muted">(Optional)</span></label>
          <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
        </div>

        <div class="col-md-5">
          <label for="country" class="form-label">Country</label>
          <select class="form-select" id="country" required>
            <option value="">Choose...</option>
            <option>United States</option>
          </select>
          <div class="invalid-feedback">
            Please select a valid country.
          </div>
        </div>

        <div class="col-md-4">
          <label for="state" class="form-label">State</label>
          <select class="form-select" id="state" required>
            <option value="">Choose...</option>
            <option>California</option>
          </select>
          <div class="invalid-feedback">
            Please provide a valid state.
          </div>
        </div>

        <div class="col-md-3">
          <label for="zip" class="form-label">Zip</label>
          <input type="text" class="form-control" id="zip" placeholder="" required>
          <div class="invalid-feedback">
            Zip code required.
          </div>
        </div>
      </div>
        `;
      //console.log('not checked');
    }
  }

  static checkoutPage() {
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    if (cartItems == null || cartItems[0] == undefined) {
      window.location.href = "emptyCart.html";
    } else {
      window.location.href = "checkout.html";
    }
  }

  static paymentDetails() {
    let shippingInfoDom = document.querySelector("#shippingInfo");
    let paymentElemntDom = document.querySelector("#paymentDetailsElement");
    let customerInfoDom = document.querySelector("#customerInfo");
    let proceedToPaymentBtnDom = document.querySelector("#proceedToPaymentBtn");
    // let createPaymentElementDom = document.querySelector

    let firstName = document.querySelector("#firstName");
    let lastName = document.querySelector("#lastName");
    let address = document.querySelector("#address");
    let state = document.querySelector("#state");
    let zip = document.querySelector("#zip");
    let email = document.querySelector("#email");

    customerInfoDom.classList.add("hide");
    // paymentElemntDom.classList.remove("hide");
    proceedToPaymentBtnDom.classList.add("hide");
    shippingInfoDom.classList.remove("hide");

    shippingInfoDom.innerHTML = `<div style="border: 1px solid #ced4da; border-radius: 0.375rem; padding: 0.375rem 0.75rem"
    class="my-3">
      <div class="form-check">
        <input type="radio" class="form-check-input text-weight-bold" checked required>
        <label style="font-weight: bold;" class="form-check-label text-weight-bold text-capitalize" for="credit">${firstName.value} ${lastName.value}</label>
        <p style="font-weight: bold;" class="mb-0 text-capitalize text-weight-bold">${address.value}</p>
        <p style="font-weight: bold;" class="mb-0 text-capitalize text-weight-bold">${state.value} ${zip.value}</p>
        <p style="font-weight: bold;" class="text-weight-bold">${email.value}</p>
        <p style="text-decoration: underline;" class="text-primary pointer mb-0" onclick="UI.changeCustomerInfo()" >Change</p>
      </div>
    </div>`;

    paymentElemntDom.innerHTML = `
          <div style="border: 1px solid #ced4da; border-radius: 0.375rem; padding: 0.375rem 0.75rem" class="my-3">
          <h4 class="mb-3">Payment</h4>
          <p>All transactions are secure and encrypted.</p>

          <!-- Display a payment form -->

          <form id="payment-form">
            <div id="payment-element">

              <!--Stripe.js injects the Payment Element-->
              
            </div>
            <button id="submit" class="w-100 btn btn-primary btn-lg my-4">
              <div class="spinner hidden" id="spinner"></div>
              <span id="button-text">Complete Checkout</span>
            </button>
            <div id="payment-message" class="hidden"></div>
          </form>

        </div>
      `;

    StripeInt.stripeFunc();
  }

  static changeCustomerInfo() {
    let shippingInfoDom = document.querySelector("#shippingInfo");
    let paymentElemntDom = document.querySelector("#paymentDetailsElement");
    let customerInfoDom = document.querySelector("#customerInfo");
    let proceedToPaymentBtnDom = document.querySelector("#proceedToPaymentBtn");

    customerInfoDom.classList.remove("hide");
    proceedToPaymentBtnDom.classList.remove("hide");
    shippingInfoDom.classList.add("hide");

    paymentElemntDom.innerHTML = ``;
  }
}

//Storage
class Storage {
  static saveProducts(allProducts) {
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
  }
  static getProductById(id) {
    let allProducts = JSON.parse(localStorage.getItem("allProducts"));

    return allProducts.find((allProducts) => allProducts.id === id);
  }

  static electric() {
    localStorage.setItem("cat", JSON.stringify("electric"));
    window.location.href = "shop.html";
  }

  static furniture() {
    localStorage.setItem("cat", JSON.stringify("furniture"));
    window.location.href = "shop.html";
  }

  static home() {
    localStorage.setItem("cat", JSON.stringify("home"));
    window.location.href = "shop.html";
  }

  static outdoor() {
    localStorage.setItem("cat", JSON.stringify("outdoor"));
    window.location.href = "shop.html";
  }

  static auto() {
    localStorage.setItem("cat", JSON.stringify("auto"));
    window.location.href = "shop.html";
  }
}

//TEST
class Test {
  static testGet() {
    const response = fetch(
      "https://v1eo8d5bmd.execute-api.us-east-1.amazonaws.com/dev/items",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);
  }
}

// Stripe
// class StripeInt {
//   static stripeFunc() {

// // This is your publishable API key.
//     const stripe = Stripe(
//       "pk_live_51LZ75OJecRuvcSJVG2Tnqv60IZ3AiIFDtVtx3OG4UjL8f4xi2gsMsgusfEVXyjl2o1eW2Yd1WGJljJmh1oipSz7s00SDpzIpOs"
//     );

//     // const stripe = Stripe(
//     //   "pk_test_51LZ75OJecRuvcSJV5H3HC7xYi4FRRq3CypOecOnhLBG5g5oUgjoeJdIDwZcJnVA6DIAQKHfNBtnHGatuoRQM1Gvt00dg6WbwNH"
//     // );

//     // The items the customer wants to buy
//     let cartItems = JSON.parse(window.localStorage.getItem("cart"));
//     console.log("cart is not null");
//     console.log(cartItems[0]);

//     let elements;

//     initialize();
//     checkStatus();

//     document.querySelector("#payment-form");
//     document.addEventListener("submit", handleSubmit);

//     // Fetches a payment intent and captures the client secret
//     async function initialize() {
//       let cartItems = JSON.parse(window.localStorage.getItem("cart"));
//       //const response = await fetch("/create", {
//       const response = await fetch(
//         "https://9ob4lub4d6.execute-api.us-east-1.amazonaws.com/default/create-payment-intent",
//         {
//           // const response = await fetch("http://localhost:5000/create-payment-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(cartItems),
//         }
//       );
//       const { clientSecret } = await response.json();

//       const appearance = {
//         theme: "stripe",
//       };
//       elements = stripe.elements({ appearance, clientSecret });

//       const paymentElement = elements.create("payment");
//       paymentElement.mount("#payment-element");
//     }

//     async function handleSubmit(e) {
//       let cartCheckList = JSON.parse(
//         window.localStorage.getItem("cartCheckList")
//       );
//       const firstName = document.querySelector("#firstName");
//       const lastName = document.querySelector("#lastName");
//       const email = document.querySelector("#email");
//       const address = document.querySelector("#address");
//       const state = document.querySelector("#state");
//       const zip = document.querySelector("#zip");
//       let shippingInfo = [
//         {
//           FirstName: firstName.value,
//           LastName: lastName.value,
//           Email: email.value,
//           Address: address.value,
//           State: state.value,
//           Zip: zip.value,
//         },
//       ];
//       let shippingNItem = { cartCheckList, ...shippingInfo };
//       console.log(shippingNItem);
//       const response = fetch("./shipping.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(shippingNItem),
//       });
//       e.preventDefault();
//       setLoading(true);
//       const { error } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           // Make sure to change this to your payment completion page
//           return_url: "https://usacloseoutgroup.com/thankyou.html",
//         },
//       });
//       // This point will only be reached if there is an immediate error when
//       // confirming the payment. Otherwise, your customer will be redirected to
//       // your `return_url`. For some payment methods like iDEAL, your customer will
//       // be redirected to an intermediate site first to authorize the payment, then
//       // redirected to the `return_url`.
//       if (error.type === "card_error" || error.type === "validation_error") {
//         showMessage(error.message);
//       } else {
//         showMessage("An unexpected error occurred.");
//       }

//       setLoading(false);
//     }

//     // Fetches the payment intent status after payment submission
//     async function checkStatus() {
//       const clientSecret = new URLSearchParams(window.location.search).get(
//         "payment_intent_client_secret"
//       );

//       if (!clientSecret) {
//         return;
//       }

//       const { paymentIntent } = await stripe.retrievePaymentIntent(
//         clientSecret
//       );

//       switch (paymentIntent.status) {
//         case "succeeded":
//           showMessage("Payment succeeded!");
//           break;
//         case "processing":
//           showMessage("Your payment is processing.");
//           break;
//         case "requires_payment_method":
//           showMessage("Your payment was not successful, please try again.");
//           break;
//         default:
//           showMessage("Something went wrong.");
//           break;
//       }
//     }

//     // ------- UI helpers -------

//     function showMessage(messageText) {
//       const messageContainer = document.querySelector("#payment-message");

//       messageContainer.classList.remove("hidden");
//       messageContainer.textContent = messageText;

//       setTimeout(function () {
//         messageContainer.classList.add("hidden");
//         messageText.textContent = "";
//       }, 4000);
//     }

//     // Show a spinner on payment submission
//     function setLoading(isLoading) {
//       if (isLoading) {
//         // Disable the button and show a spinner
//         document.querySelector("#submit").disabled = true;
//         document.querySelector("#spinner").classList.remove("hidden");
//         document.querySelector("#button-text").classList.add("hidden");
//       } else {
//         document.querySelector("#submit").disabled = false;
//         document.querySelector("#spinner").classList.add("hidden");
//         document.querySelector("#button-text").classList.remove("hidden");
//       }
//     }
//   }
// }

class StripeInt {
  static stripeFunc() {

    //REPLACE WITH STRIPE LIKE API PUBLISHABLE KEY
    const stripe = Stripe(
      "pk_test_51LZ75OJecRuvcSJV5H3HC7xYi4FRRq3CypOecOnhLBG5g5oUgjoeJdIDwZcJnVA6DIAQKHfNBtnHGatuoRQM1Gvt00dg6WbwNH"
    );

    // The items the customer wants to buy
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    console.log("cart is not null");
    console.log(cartItems[0]);

    let elements;

    initialize();
    checkStatus();

    // document
    //   .querySelector("#payment-form")
    //   .addEventListener("submit", handleSubmit);
    let sumbitBtnDom = document.querySelector("#submit");
    sumbitBtnDom.addEventListener("click", (event) => {
      handleSubmit(event);
    });
    const emailDom = document.querySelector("#email");
    var emailAddress = emailDom.value;
    console.log(emailAddress);
    // Fetches a payment intent and captures the client secret
    async function initialize() {
      let cartItems = JSON.parse(window.localStorage.getItem("cart"));
      const response = await fetch(
        "REPLACE WITH LAMDA API URL",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartItems),
        }
      );
      const { clientSecret } = await response.json();

      const appearance = {
        theme: "stripe",
      };
      elements = stripe.elements({ appearance, clientSecret });

      const paymentElementOptions = {
        layout: "tabs",
      };

      const firstName = document.querySelector("#firstName");
      const lastName = document.querySelector("#lastName");
      const email = document.querySelector("#email");
      const address = document.querySelector("#address");
      const state = document.querySelector("#state");
      const zip = document.querySelector("#zip");
      const addressElement = elements.create("address", {
        mode: "shipping",
        defaultValues: {
          name: `${firstName.value} ${lastName.value}`,
          address: {
            line1: `${address.value}`,
            line2: '',
            city: '',
            state: `${state.value}`,
            postal_code: `${zip.value}`,
            country: 'US',
          },
        },
      });

      const paymentElement = elements.create("payment", paymentElementOptions);
      paymentElement.mount("#payment-element");
    }

    async function handleSubmit(e) {
      let cartCheckList = JSON.parse(
        window.localStorage.getItem("cartCheckList")
      );
      const firstName = document.querySelector("#firstName");
      const lastName = document.querySelector("#lastName");
      const email = document.querySelector("#email");
      const address = document.querySelector("#address");
      const state = document.querySelector("#state");
      const zip = document.querySelector("#zip");
      let shippingInfo = [
        {
          FirstName: firstName.value,
          LastName: lastName.value,
          Email: email.value,
          Address: address.value,
          State: state.value,
          Zip: zip.value,
        },
      ];
      let shippingNItem = { cartCheckList, ...shippingInfo };
      console.log(shippingNItem);
      const response = fetch("./shipping.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shippingNItem),
      });
      e.preventDefault();
      setLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "https://usacloseoutgroup.com/thankyou.html",
          receipt_email: document.querySelector("#email").value,
        },
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
      } else {
        showMessage("An unexpected error occurred.");
      }

      setLoading(false);
    }

    // Fetches the payment intent status after payment submission
    async function checkStatus() {
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) {
        return;
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      switch (paymentIntent.status) {
        case "succeeded":
          showMessage("Payment succeeded!");
          break;
        case "processing":
          showMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          showMessage("Your payment was not successful, please try again.");
          break;
        default:
          showMessage("Something went wrong.");
          break;
      }
    }

    // ------- UI helpers -------

    function showMessage(messageText) {
      const messageContainer = document.querySelector("#payment-message");

      messageContainer.classList.remove("hidden");
      messageContainer.textContent = messageText;

      setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageText.textContent = "";
      }, 4000);
    }

    // Show a spinner on payment submission
    function setLoading(isLoading) {
      if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
      } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  const storage = new Storage();
  let allProducts = "";

  products.getProducts().then((products) => {
    allProducts = products[0].concat(
      products[1],
      products[2],
      products[3],
      products[4]
    );
    Storage.saveProducts(allProducts);
    UI.updateCartNum();
    UI.cartBtn();
    UI.displayCart();
    UI.displayCheckoutCart();
    UI.cartTotalCost();
    // UI.shipAndBillAddress();
    // StripeInt.stripeFunc();
    // UI.paymentDetails();
  });
});

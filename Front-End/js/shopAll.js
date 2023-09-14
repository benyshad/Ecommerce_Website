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
const allProductDOM = document.querySelector("#all");


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
  displayProducts(products) {
    let allProducts = products[0];

    let allResult = "";

    allProducts.forEach((allProducts) => {
      allResult += `
        <div class="col-md card-flyer">
          <div class="card-body text-center productImg" id="${allProducts.id}">
            <div class="pt-4">
              <img src=${allProducts.url} alt="">
            </div>
            <div class="productTitleAndPrice">
              
                <h4 style="color:black;" class="card-text pt-2"> ${allProducts.title} </h4>
                <h4 style="color: #82001e; " class="pt-3"> $${allProducts.price} </h4>
              
            </div>
          </div>
        </div>
            `;
    });

    allProductDOM.innerHTML = allResult;
  }

  //Display Cart Items
  getCartItems() {
    let cart = [];
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  getProductPageLink() {
    const productPage = [...document.querySelectorAll(".productImg")];
    productPage.forEach((productPage) => {
      let id = productPage.id;

      productPage.addEventListener("click", (Event) => {
        let clickedItem = { ...Storage.getProductById(id) };
        localStorage.setItem("clickedItem", JSON.stringify(clickedItem));
        window.location.href = "productPage.html";
      });
    });
  }

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

    closeCartBtn.addEventListener("click", () => {
      cartOverlay.classList.remove("transparentBcg");
      cartDOM.classList.remove("showCart");
    });
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
        UI.justOpenCart();
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
      console.log(cartItems);
    }else{  
      for (let i = 0; i < cartItems.length; i++) {
        cartTotal += cartItems[i].amount * cartItems[i].price;
      }
      localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
      cartTotal = JSON.parse(window.localStorage.getItem("cartTotal"));
      cartTotal = (Math.round(cartTotal * 100) / 100).toFixed(2);
      cartTotalDom.innerHTML = cartTotal;
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

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  const storage = new Storage();
  let allProducts = "";

  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      allProducts = products[0].concat(
        products[1],
        products[2],
        products[3],
        products[4]
      );
      Storage.saveProducts(allProducts);
    })
    .then(() => {
      ui.getProductPageLink();
      UI.updateCartNum();
      UI.cartBtn();
      UI.displayCart();
      UI.cartTotalCost();
    });
});

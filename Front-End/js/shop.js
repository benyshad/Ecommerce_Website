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
      let electricProducts = data.electricItems;
      let homeProducts = data.homeItems;
      let furnitureProducts = data.furnitureItems;
      let outdoorProducts = data.outdoorItems;
      let autoProducts = data.autoItems;

      electricProducts = electricProducts.map((electricItems) => {
        const { title, price, stock, imgCount, imgLinks } =
          electricItems.fields;
        const { id } = electricItems.sys;
        const { url } = electricItems.fields.image.fields.file;
        return { title, price, stock, imgCount, imgLinks, id, url };
      });

      homeProducts = homeProducts.map((homeItems) => {
        const { title, price, stock, imgCount, imgLinks } = homeItems.fields;
        const { id } = homeItems.sys;
        const { url } = homeItems.fields.image.fields.file;
        return { title, price, stock, imgCount, imgLinks, id, url };
      });

      furnitureProducts = furnitureProducts.map((furnitureItems) => {
        const { title, price, stock, imgCount, imgLinks } =
          furnitureItems.fields;
        const { id } = furnitureItems.sys;
        const { url } = furnitureItems.fields.image.fields.file;
        return { title, price, stock, imgCount, imgLinks, id, url };
      });

      outdoorProducts = outdoorProducts.map((outdoorItems) => {
        const { title, price, stock, imgCount, imgLinks } = outdoorItems.fields;
        const { id } = outdoorItems.sys;
        const { url } = outdoorItems.fields.image.fields.file;
        return { title, price, stock, imgCount, imgLinks, id, url };
      });

      autoProducts = autoProducts.map((autoItems) => {
        const { title, price, stock, imgCount, imgLinks } = autoItems.fields;
        const { id } = autoItems.sys;
        const { url } = autoItems.fields.image.fields.file;
        return { title, price, stock, imgCount, imgLinks, id, url };
      });
      return [
        electricProducts,
        homeProducts,
        furnitureProducts,
        outdoorProducts,
        autoProducts,
      ];
    } catch (error) {
      console.log(error);
    }
  }
}

//display products
class UI {
  displayProducts(products) {
    let electricProducts = products[0];
    let homeProducts = products[1];
    let furnitureProducts = products[2];
    let outdoorProducts = products[3];
    let autoProducts = products[4];

    let electricResult = "";
    let homeResult = "";
    let furnitureResult = "";
    let outdoorResult = "";
    let autoResult = "";

    const displayDom = document.querySelector("#display");
    let cat = JSON.parse(window.localStorage.getItem("cat"));

    if (cat == "electric") {
      displayDom.innerHTML = `<H2 class="text-center"><br>Electronics and Accessories <br></H2>
      <div id="electric" class="row text-center g-4 "></div>`;
      const electricProductDOM = document.querySelector("#electric");
      electricProducts.forEach((electricProducts) => {
        electricResult += `
        <div class="col-md card-flyer">
          <div class="card-body text-center productImg" id="${electricProducts.id}">
            <div class="pt-4">
              <img src=${electricProducts.url} alt="">
            </div>
            <div class="productTitleAndPrice">
              
                <h4 style="color:black;" class="card-text pt-2"> ${electricProducts.title} </h4>
                <h4 style="color: #82001e; " class="pt-3"> $${electricProducts.price} </h4>
              
            </div>
          </div>
        </div>
            `;
      });
      electricProductDOM.innerHTML = electricResult;
    }
    if (cat == "home") {
      displayDom.innerHTML = `<H2 class="text-center"><br>Home<br></H2>
    <div id="home" class="row text-center g-4 "></div>`;
      const homeProductDom = document.querySelector("#home");

      homeProducts.forEach((homeProducts) => {
        homeResult += `
        <div class="col-md card-flyer">
          <div class="card-body text-center productImg" id="${homeProducts.id}">
            <div class="pt-4">
              <img src=${homeProducts.url} alt="">
            </div>
            <div class="productTitleAndPrice">
              
                <h4 style="color:black;" class="card-text pt-2"> ${homeProducts.title} </h4>
                <h4 style="color: #82001e; " class="pt-3"> $${homeProducts.price} </h4>
              
            </div>
          </div>
        </div>
          `;
      });
      homeProductDom.innerHTML = homeResult;
    }

    if (cat == "furniture") {
      displayDom.innerHTML = `<H2 class="text-center"><br>Furniture <br></H2>
      <div id="furniture" class="row text-center g-4 "></div>`;
      const furnitureProductDom = document.querySelector("#furniture");

      furnitureProducts.forEach((furnitureProducts) => {
        furnitureResult += `
        <div class="col-md card-flyer">
          <div class="card-body text-center productImg" id="${furnitureProducts.id}">
            <div class="pt-4">
              <img src=${furnitureProducts.url} alt="">
            </div>
            <div class="productTitleAndPrice">
              
                <h4 style="color:black;" class="card-text pt-2"> ${furnitureProducts.title} </h4>
                <h4 style="color: #82001e; " class="pt-3"> $${furnitureProducts.price} </h4>
              
            </div>
          </div>
        </div>
          `;
      });
      furnitureProductDom.innerHTML = furnitureResult;
    }

    if (cat == "outdoor") {
      displayDom.innerHTML = `<H2 class="text-center"><br>Outdoor <br></H2>
      <div id="outdoor" class="row text-center g-4 "></div>`;
      const outdoorProductDom = document.querySelector("#outdoor");
      outdoorProducts.forEach((outdoorProducts) => {
        outdoorResult += `
        <div class="col-md card-flyer">
          <div class="card-body text-center productImg " id="${outdoorProducts.id}" >
            <div class="pt-4">
              <img src=${outdoorProducts.url} alt="">
            </div>
            <div class="productTitleAndPrice">
              
                <h4 style="color:black;" class="card-text pt-2"> ${outdoorProducts.title} </h4>
                <h4 style="color: #82001e; " class="pt-3"> $${outdoorProducts.price} </h4>
              
            </div>
          </div>
        </div>
          `;
      });
      outdoorProductDom.innerHTML = outdoorResult;
    }

    if (cat == "auto") {
      displayDom.innerHTML = `<H2 class="text-center"><br>Auto And Accessories <br></H2>
      <div id="auto" class="row text-center g-4 "></div>`;
      const autoProductDom = document.querySelector("#auto");

      autoProducts.forEach((autoProducts) => {
        autoResult += `
      <div class="col-md card-flyer">
        <div class="card-body text-center productImg" id="${autoProducts.id}">
          <div class="pt-4 ">
            <img src=${autoProducts.url} alt="">
          </div>
          <div class="productTitleAndPrice">
            
              <h4 style="color:black;" class="card-text pt-2"> ${autoProducts.title} </h4>
              <h4 style="color: #82001e; " class="pt-3"> $${autoProducts.price} </h4>
            
          </div>
        </div>
      </div>
          `;
      });
      autoProductDom.innerHTML = autoResult;
    }
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
              <h5>${cartItems.price}</h5>
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

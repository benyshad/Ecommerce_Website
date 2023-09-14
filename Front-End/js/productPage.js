const title = document.querySelector("#title");
const price = document.querySelector("#price");
let stockDom = document.querySelector("#stock");
const carouselButtons = document.querySelector(".carousel-indicators");
const carouselActiveImg = document.querySelector("#carouselActiveImg");
const carouselImg = document.querySelector(".carousel-inner");
const description = document.querySelector(".description");

//variables

const addToCart = document.querySelector(".add-to-cart");
const removeFromCartBtn = document.querySelectorAll(".remove-item");
const freezBody = document.body;
const closeCartBtn = document.querySelector("#close-cart");
const clearCartBtn = document.querySelector("#clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-item");
let cartTotalDom = document.querySelector(".cart-total");
//const cartTotalNumOfItems = document.querySelectorAll('#cartTotalNumOfItems');
const cartContent = document.querySelector(".cart-content");
// const productDOM = document.querySelector('.product-center');
const electricProductDOM = document.querySelector("#electric");
const homeProductDom = document.querySelector("#home");
const furnitureProductDom = document.querySelector("#furniture");
const outdoorProductDom = document.querySelector("#outdoor");
const autoProductDom = document.querySelector(log("#auto"));
let reviewsDom = document.querySelector("#reviews");
// Dom for the average starts
let averageStarsDom = document.querySelectorAll(".averageStars");
// Dom for average rating number
let averageStarsNum = document.querySelectorAll(".averageStarsNum");
//cart

function log(v, t = "") {
  console.log(t + "" + v);
  return v;
}

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
  getProductPageLink() {
    const productPage = [...document.querySelectorAll(".productImg")];
    productPage.forEach((productPage) => {
      let id = productPage.id;

      productPage.addEventListener("click", (Event) => {
        let clickedItem = { ...Storage.getProductById(id) };
        console.log(clickedItem);
        localStorage.setItem("clickedItem", JSON.stringify(clickedItem));
      });
    });
  }

  //add item to cart when add to cart button is clicked
  addToCart() {
    const addToCart = document.querySelector(".add-to-cart");
    const qty = document.querySelector("#qty");
    let cartCheckList = [];
    let tests = [];

    addToCart.addEventListener("click", (Event) => {
      let cartItems = JSON.parse(window.localStorage.getItem("cart"));
      let isCartCheckListNull = JSON.parse(
        window.localStorage.getItem("cartCheckList")
      );
      let clickedItem = JSON.parse(window.localStorage.getItem("clickedItem"));
      let id = clickedItem.id;
      let getQty = parseInt(qty.value);
      let isItemInCart = "no";

      if (isCartCheckListNull == null) {
        console.log("isCartCheckList is null.");
      } else {
        cartCheckList = JSON.parse(
          window.localStorage.getItem("cartCheckList")
        );
        //console.log(isCartCheckList);
      }

      for (let i = 0; i < cartCheckList.length; i++) {
        if (cartCheckList[i].id == id) {
          //console.log(cartCheckList[i]);
          isItemInCart = "yes";
        } else {
          console.log("else");
        }
      }

      if (isItemInCart == "no") {
        console.log("not yet in cart");
        cartCheckList.push({
          id: clickedItem.id,
          amount: getQty,
        });
        localStorage.setItem("cartCheckList", JSON.stringify(cartCheckList));

        if (cartItems == null) {
          console.log("its null");
          cartItems = [{ ...clickedItem, amount: getQty }];
          localStorage.setItem("cart", JSON.stringify(cartItems));
        } else {
          cartItems.push({ ...clickedItem, amount: getQty });
          localStorage.setItem("cart", JSON.stringify(cartItems));
        }
      } else {
        for (let i = 0; i < cartItems.length; i++) {
          let cartItemIdCheck = Number(
            JSON.parse(JSON.stringify(cartItems[i].id))
          );
          if (cartItemIdCheck == id) {
            if (
              clickedItem.stock >= cartItems[i].amount + getQty ||
              clickedItem.stock == 10
            ) {
              //console.log(`Found the item in cartItems ${JSON.stringify(cartItems[i])}`);
              cartItems[i].amount += getQty;
              localStorage.setItem("cart", JSON.stringify(cartItems));
            }
          } else {
            //console.log('not the item');
          }
        }
        for (let i = 0; i < cartCheckList.length; i++) {
          let cartCheckListIdCheck = Number(
            JSON.parse(JSON.stringify(cartCheckList[i].id))
          );
          if (cartCheckListIdCheck == id) {
            if (
              clickedItem.stock >= cartCheckList[i].amount + getQty ||
              clickedItem.stock == 10
            ) {
              cartCheckList[i].amount += getQty;
              console.log(
                Number(JSON.parse(JSON.stringify(cartCheckList[i].amount)))
              );
              localStorage.setItem(
                "cartCheckList",
                JSON.stringify(cartCheckList)
              );
            }
          } else {
            console.log("not the item in cartCheckList");
          }
        }
      }
      UI.updateCartNum();
      UI.displayCart();
      UI.openAndCloseCart();
      UI.cartTotalCost();
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
        if (
          cartItems[i].stock > cartItems[i].amount ||
          cartItems[i].stock == 10
        ) {
          console.log(cartItems[i].amount);
          console.log("adding 1");
          cartItems[i].amount += 1;
          localStorage.setItem("cart", JSON.stringify(cartItems));
          let amount = document.querySelector(`#Amount${cartItems[i].id}`);
          amount.innerHTML = cartItems[i].amount;
        } else {
          console.log(`Only ${cartItems[i].stock} In Stock`);
        }
      } else {
        //console.log('not the item');
      }
    }

    for (let i = 0; i < cartCheckList.length; i++) {
      if (
        cartItems[i].stock > cartCheckList[i].amount ||
        cartItems[i].stock == 10
      ) {
        if (cartCheckList[i].id == id) {
          cartCheckList[i].amount += 1;
          localStorage.setItem("cartCheckList", JSON.stringify(cartCheckList));
        } else {
          //console.log('not the item');
        }
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
    //for each remove from cart button in the cart add an event listener
    removeFromCartBtn.forEach((removeFromCart) => {
      removeFromCart.addEventListener("click", () => {
        let cartItems = JSON.parse(window.localStorage.getItem("cart"));
        let cartItemsCopy = cartItems;
        let cartCheckList = JSON.parse(
          window.localStorage.getItem("cartCheckList")
        );
        let cartCheckListCopy = cartCheckList;

        for (let i = 0; i < cartItemsCopy.length; i++) {
          if (`remove${cartItemsCopy[i].id}` == removeFromCart.id) {
            cartItems.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
          } else {
            console.log("dont got it");
          }
        }
        for (let i = 0; i < cartCheckListCopy.length; i++) {
          if (`remove${cartCheckListCopy[i].id}` == removeFromCart.id) {
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
        // UI.justOpenCart();
        UI.cartTotalCost();
        UI.removeFromCart();
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

  static checkoutPage() {
    let cartItems = JSON.parse(window.localStorage.getItem("cart"));
    if (cartItems == null || cartItems[0] == undefined) {
      window.location.href = "emptyCart.html";
    } else {
      window.location.href = "checkout.html";
    }
  }

  // Get customer reviews stored in json and print them on DOM
  static getCustomerReview() {
    // Dom where html for the reviews will be
    let reviewsDom = document.querySelector("#reviews");
    // reviews are stored in json in the folder of the products folder, folder name is by id
    let clickedItem = JSON.parse(window.localStorage.getItem("clickedItem"));
    let clickedItemID = parseInt(clickedItem.id);
    // creat var to store html before its placed in the dom
    let reviews = ``;
    // get json fie with reviews
    fetch(`./products/${clickedItemID}/reviews.json`)
      .then((response) => response.json())
      .then((data) => {
        // Do something with your data
        // loop through each customer review
        data.forEach((review) => {
          // check to see which how many starts and set var with a specific value which will later be set as a class for the stars in the dom
          let starOne = "emptyStar";
          let starTwo = "emptyStar";
          let starThree = "emptyStar";
          let starFour = "emptyStar";
          let starFive = "emptyStar";

          if (review.stars == 1) {
            starOne = "fullStar";
          }

          if (review.stars == 2) {
            starOne = "fullStar";
            starTwo = "fullStar";
          }

          if (review.stars == 3) {
            starOne = "fullStar";
            starTwo = "fullStar";
            starThree = "fullStar";
          }

          if (review.stars == 4) {
            starOne = "fullStar";
            starTwo = "fullStar";
            starThree = "fullStar";
            starFour = "fullStar";
          }

          if (review.stars == 5) {
            starOne = "fullStar";
            starTwo = "fullStar";
            starThree = "fullStar";
            starFour = "fullStar";
            starFive = "fullStar";
          }
          // set reviews var to the html needed for each review
          reviews += `
              <div class="ms-4 pb-5">
                <div class="row text-start">
                  <div class="col-1"><img src="./images/reviewAvatar.jpeg" style="height: 30px; width: 30px;"></div>
                  <div class="col-11 pl-m-0 ps-4">${review.name}</div>
                  <div>
                    <span class="fa fa-star ${starOne} "></span>
                    <span class="fa fa-star ${starTwo} "></span>
                    <span class="fa fa-star ${starThree} "></span>
                    <span class="fa fa-star ${starFour} "></span>
                    <span class="fa fa-star ${starFive} "></span>
                    <p class="h6" style="color:#5c5959">Reviewed in the United States on ${review.date} </p>
                  </div>
                </div>
                <div class="pe-md-0 pe-3">
                  ${review.message}
                </div>
            </div>`;
        });
        // set the dom with reviews var
        reviewsDom.innerHTML = reviews;
      });
  }

  // Calculate average stars per customer, set bar fill for overall customers and amount of each star
  static overAllReviews() {
    //var to store total amount of each star
    let totalFiveStarsDom = document.querySelector("#totalFiveStars");
    let totalFourStarsDom = document.querySelector("#totalFourStars");
    let totalThreeStarsDom = document.querySelector("#totalThreeStars");
    let totalTwoStarsDom = document.querySelector("#totalTwoStars");
    let totalOneStarsDom = document.querySelector("#totalOneStars");

    let totalAmountFiveStars = 0;
    let totalAmountFourStars = 0;
    let totalAmountThreeStars = 0;
    let totalAmountTwoStars = 0;
    let totalAmountOneStars = 0;

    let fiveStarBarDom = document.querySelector("#fiveStarBar");
    let fourStarBarDom = document.querySelector("#fourStarBar");
    let threeStarBarDom = document.querySelector("#threeStarBar");
    let twoStarBarDom = document.querySelector("#twoStarBar");
    let oneStarBarDom = document.querySelector("#oneStarBar");

    // Dom for the average starts
    let averageStarsDom = document.querySelectorAll(".averageStars");
    // Dom for average rating number
    let averageStarsNum = document.querySelectorAll(".averageStarsNum");
    // var which stores the total amount of stars
    let totalStars = 0;

    // reviews are stored in json in the folder of the products folder, folder name is by id
    let clickedItem = JSON.parse(window.localStorage.getItem("clickedItem"));
    let clickedItemID = parseInt(clickedItem.id);

    // get json fie with reviews
    fetch(`./products/${clickedItemID}/reviews.json`)
      .then((response) => response.json())
      .then((reviews) => {
        // Do something with your data
        reviews.forEach((review) => {
          totalStars += review.stars;

          if (review.stars == 1) {
            totalAmountOneStars += 1;
          }

          if (review.stars == 2) {
            totalAmountTwoStars += 1;
          }

          if (review.stars == 3) {
            totalAmountThreeStars += 1;
          }

          if (review.stars == 4) {
            totalAmountFourStars += 1;
          }

          if (review.stars == 5) {
            totalAmountFiveStars += 1;
          }
        });

        //round average to the nearst half number
        let averageReviewStars =
          Math.round((totalStars / reviews.length) * 2) / 2;
        // check to see which how many starts and set var with a specific value which will later be set as a class for the stars in the dom
        let starOne = "emptyStar";
        let starTwo = "emptyStar";
        let starThree = "emptyStar";
        let starFour = "emptyStar";
        let starFive = "emptyStar";

        if (averageReviewStars == 1) {
          starOne = "fullStar";
        }

        if (averageReviewStars == 1.5) {
          starOne = "fullStar";
          starTwo = "halfStar";
        }

        if (averageReviewStars == 2) {
          starOne = "fullStar";
          starTwo = "fullStar";
        }

        if (averageReviewStars == 2.5) {
          starOne = "fullStar";
          starTwo = "fullStar";
          starThree = "halfStar";
        }

        if (averageReviewStars == 3) {
          starOne = "fullStar";
          starTwo = "fullStar";
          starThree = "fullStar";
        }

        if (averageReviewStars == 3.5) {
          starOne = "fullStar";
          starTwo = "fullStar";
          starThree = "fullStar";
          starFour = "halfStar";
        }

        if (averageReviewStars == 4) {
          starOne = "fullStar";
          starTwo = "fullStar";
          starThree = "fullStar";
          starFour = "fullStar";
        }

        if (averageReviewStars == 4.5) {
          starOne = "fullStar";
          starTwo = "fullStar";
          starThree = "fullStar";
          starFour = "fullStar";
          starFive = "halfStar";
        }

        if (averageReviewStars == 5) {
          starOne = "fullStar";
          starTwo = "fullStar";
          starThree = "fullStar";
          starFour = "fullStar";
          starFive = "fullStar";
        }
        // set average stars
        averageStarsDom.forEach((element) => {
          element.innerHTML = `
          <span class="fa fa-star ${starOne} "></span>
          <span class="fa fa-star ${starTwo} "></span>
          <span class="fa fa-star ${starThree} "></span>
          <span class="fa fa-star ${starFour} "></span>
          <span class="fa fa-star ${starFive} "></span>
           `;
        });

        // set number average rating
        averageStarsNum.forEach((element) => {
          element.innerHTML = `${averageReviewStars} of 5`;
        });

        // set number of each rating
        totalFiveStarsDom.innerHTML = totalAmountFiveStars;
        totalFourStarsDom.innerHTML = totalAmountFourStars;
        totalThreeStarsDom.innerHTML = totalAmountThreeStars;
        totalTwoStarsDom.innerHTML = totalAmountTwoStars;
        totalOneStarsDom.innerHTML = totalAmountOneStars;

        // fill bar for number of each rating
        oneStarBarDom.style.width = `${
          (100 * totalAmountOneStars) / reviews.length
        }%`;
        twoStarBarDom.style.width = `${
          (100 * totalAmountTwoStars) / reviews.length
        }%`;
        threeStarBarDom.style.width = `${
          (100 * totalAmountThreeStars) / reviews.length
        }%`;
        fourStarBarDom.style.width = `${
          (100 * totalAmountFourStars) / reviews.length
        }%`;
        fiveStarBarDom.style.width = `${
          (100 * totalAmountFiveStars) / reviews.length
        }%`;
      });
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

  static getClickedItemImg() {
    let clickedItem = JSON.parse(window.localStorage.getItem("clickedItem"));
    console.log(clickedItem.imgLinks);
    carouselActiveImg.innerHTML = `<img src="${clickedItem.imgLinks[0]}" class="d-block w-100 ms-4 ps-4" style="max-height:600px; max-width:600px;" alt="...">`;
    for (let i = 1; i < clickedItem.imgCount; i++) {
      carouselButtons.innerHTML += `<button style="background-color: black;" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="${i}" aria-label="Slide ${i + 1}"></button>`;
      carouselImg.innerHTML += `<div class="carousel-item">
            <img src="${clickedItem.imgLinks[i]}" class="d-block w-100 ms-4 ps-4" style="max-height:600px; max-width:600px;" alt="...">
          </div>`;
    }
  }

  static getClickedItem() {
    let stockDom = document.querySelector("#stock");
    let clickedItem = JSON.parse(window.localStorage.getItem("clickedItem"));
    title.innerHTML = clickedItem.title;
    price.innerHTML = `USD $${clickedItem.price}`;
    let clickedItemID = parseInt(clickedItem.id);
    let qtySelectorDom = document.querySelector("#qty");

    fetch(`./products/${clickedItemID}/description.txt`)
      .then((response) => response.text())
      .then((data) => {
        // Do something with your data
        description.innerHTML = data;
      });

    if (clickedItem.stock == 10) {
      stockDom.innerHTML = `<p><b>Availability:</b> ${clickedItem.stock}+ In Stock</p> `;
    } else {
      stockDom.innerHTML = `<div class="row">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-2 col-3 p-md-0 p-sm-0 ps-0 pe-0" style="margin-left: 13px;">
        <p><b>Availability:</b> </p>
      </div>
      <div class="col-xl-2 col-lg-3 col-md-3 col-sm-2 col-3 ps-lg-0 p-md-0 m-md-0 text-center red">
        <p>Only ${clickedItem.stock} Left</p>
      </div>
      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-3 p-0">
        <p>In Stock</p>
      </div>
    </div>`;
    }

    for (let i = 1; i <= clickedItem.stock; i++) {
      qtySelectorDom.innerHTML += `
      <option value="${i}">${i}</option>
      `;
    }
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

  products.getProducts().then((products) => {
    allProducts = products[0].concat(
      products[1],
      products[2],
      products[3],
      products[4]
    );
    Storage.saveProducts(allProducts);
    Storage.getClickedItem();
    Storage.getClickedItemImg();
    UI.updateCartNum();
    ui.addToCart();
    UI.cartBtn();
    UI.displayCart();
    UI.cartTotalCost();
    UI.getCustomerReview();
    UI.overAllReviews();
  });
});

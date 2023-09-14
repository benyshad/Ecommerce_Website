// Last updated on 10-28-2022
const nonhamburger = document.querySelector("#nonhamburger");
const nonhamburgerdropdown = document.querySelector("#nonhamburgerDropdown");
const hamburger = document.querySelector("#hamburger");
const footer = document.querySelector("#footer");

document.addEventListener("DOMContentLoaded", () => {
  nonhamburger.innerHTML = `<a style="margin-left:1em;" href="index.html" class="navbar-brand"><img src="images/logo/logo100w.png"
    alt=""></a>
<div class="collapse navbar-collapse flex-column">
<ul class="navbar-nav ms-auto">
    <li class="nav-item">
        <a style="position: absolute; margin-left: -44.5%; white-space: nowrap; color: red; font-size: x-large; "
            href="ShopNow.html" class="nav-link ">FREE SHIPPING ALL DAY EVERYDAY!</a>
    </li>
    <li class="nav-item">
        <a href="about.html" class="nav-link white">About Us</a>
    </li>
    <li class="nav-item">
        <a href="contact.html" class="nav-link white">Contact Us</a>
    </li>
    <li class="nav-item">
         <div style="margin-right: 1em;" class="nav-link cart-nondropdown"><img
                src="images/Shopping Cart30w.png" alt="">
                 <div id="cartTotalNumOfItems" class="cart-items">0</div></div>
    </li>
</ul>


<ul style="margin-left:-12%" class="navbar-nav ">
    <li class="nav-item">
        <a href="ShopNow.html" style="color: white!important; font-size: x-large!important; cursor: pointer;" class="nav-link paddingtz">Shop Today's Deals</a>
    </li>
</ul>
</div>`;

  nonhamburgerdropdown.innerHTML = `<a style="margin-left:1em;" href="index.html" class="navbar-brand"><img src="images/logo1.png" alt=""></a>
        <div style="padding-top: 0; padding-bottom: 0;" class="collapse navbar-collapse flex-column">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a style="position: absolute; margin-left: -62%; white-space: nowrap; color: red; font-size: large; padding-top: 0; padding-bottom: 0em;"
                        href="ShopNow.html" class="nav-link">FREE SHIPPING ALL DAY EVERYDAY!</a>
                </li>
        
                <li id="cart-dropdown" class="nav-item">
                     <div style="margin-right: 1em; padding-top: 0.5em;" class="nav-link cart-dropdown"><img  src="images/Shopping Cart30w.png" alt=""><div id="cartTotalNumOfItemsDropdown" class="cart-items-dropdown">0</div></div>
                </li>
            </ul>
        
        
            <ul style="padding-top: 1em; margin-left: -13%;" class="navbar-nav ">
                <li class="nav-item">
                    <a href="ShopNow.html" class="nav-link white">Shop Today's Deals</a>
                </li>
            </ul>
        </div>`;

  hamburger.innerHTML = `
            <div class="nav navbar-header">
                <div class="navbar-header">
            
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                        <span class="navbar-toggler-icon"></span>
                    </button>
            
                </div>
            
            
            
                <div id="navmenu" class="collapse navbar-collapse flex-column hamburger" style="padding-left:1em">
                    <ul class="navbar-nav ">
                        <li class="nav-item">
                            <a href="ShopNow.html" class="nav-link">Shop Today's Deals</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <div id="open-cart" onclick="UI.openAndCloseCart()" style="margin-right: 1em;" class="nav-link"><img
                                    src="images/Shopping Cart30g.png" alt=""></div>
                        </li>
                        <li class="nav-item">
                            <a href="about.html" class="nav-link">About Us</a>
                        </li>
                        <li class="nav-item">
                            <a href="contact.html" class="nav-link">Contact Us</a>
                        </li>
                    </ul>
                </div>
        
            </div>
        `;
  footer.innerHTML = `<div class="flex-column">
    <p style="display: inline;"><a href="terms.html" class=" decNon text-white ps-5">Billing Terms & Condition</a> </p>
    <p style="display: inline;"><a href="return.html" class=" decNon text-white ps-5">Return and Refund Policy</a> </p>
    <p style="display: inline;"><a href="about.html" class="decNon text-white ps-5">About Us</a> </p>
    <p style="display: inline;"><a href="contact.html" class="decNon text-white ps-5">Contact Us</a> </p>
</div>
<div class="flex-column pt-2 pb-1">
    <p class="text-black" style="display: inline;">Copyright &copy; 2022</p>
    <p class="text-white" style="display: inline;"> USA Clouseout Group</p>
</div>`;
});

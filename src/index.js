import './main.css';
import styles from './custom.module.sass';
import products from './input.json';
import { cart } from './cart.js';
const cartItems = new cart();
cartItems.init();
const prodbox = document.querySelector('#prod-box');

const addProduct = (product) => {
  alert(product);
}
let messagetimer;
const popmessage = document.querySelector('.pop-message');
document.addEventListener('click', function (event) {
	if (event.target.matches('.addtocart')) {
    if(Boolean(Number(event.target.dataset.value))){
      popmessage.style.display = "block";
      clearTimeout(messagetimer);
      messagetimer = setTimeout(function(){
        popmessage.style.display = "none";
        
      }, 3000)
      popmessage.innerHTML = event.target.dataset.pid + " added to cart";
      cartItems.add(event.target.dataset.pid)
    } else {
      cartItems.sub(event.target.dataset.pid)
    }
	}
}, false);

products.forEach(function(product){
     var template = ' <div class="column">' +
                        '<div class="prod-container">' +
                          '<div class="prod-body">'+
                            '<div class="off-lable">$'+ product.discount +'%</div>'+
                            '<img src="'+  product.image +'" alt="image">'+ 
                          '</div>'+
                          '<div class="prod-footer">'+
                            '<div class="left-item">'+
                              '<div class="product-title">'+
                                product.name +
                              '</div>'+
                              '<div class="product-price">'+
                                  '<span class="strike-price">$' + product.price.display +  ' </span> &nbsp;'+  
                                  '<span class="off-price">$'+  product.price.actual + '</span>'+
                              '</div>'+
                            '</div>'+
                            '<div class="right-item">'+
                              '<button class="addtocart" data-value="1" data-pid="' + product.name + '">Add to cart</button>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>';
        prodbox.insertAdjacentHTML('beforeend',template);
});
       

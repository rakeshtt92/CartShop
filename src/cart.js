import allProducts from './input.json';

export const cart = () => ({
    details : {
        total : 0,
        discount : 0,
        grandTotal : 0
    },
    items : {},
    products : {},
    init : function(){
        for(var i=0;i<=allProducts.length;i++){
            if(allProducts[i] !== undefined)
                this.products[allProducts[i].name] = allProducts[i];

            console.log(this.products)
        }
        this.list();
    },
    save : function () {
        const { products, items } = this;
        
        const sumTotal = Object.keys(this.items).reduce((sum, item) => sum + products[item].price.actual * items[item], 0)
        const discount = Object.keys(this.items).reduce((sum, item) => sum + ((products[item].price.actual/100) * products[item].discount)  * items[item], 0)
        let grandTotal = sumTotal - discount;
        grandTotal = grandTotal < 0 ? 0 : grandTotal;
        this.details = {
            total : Math.round(sumTotal,2),
            discount : Math.round(discount,2),
            grandTotal : Math.round(grandTotal,2)
        }
        
        localStorage.setItem("cart", JSON.stringify({ details : this.details, items : this.items}));
    },
    load : function () {
        this.items = localStorage.getItem("cart");
        if (this.items == null) { this.items = {}; 
        this.details = {
            total : 0,
            discount : 0,
            grandTotal : 0
        }}
        else { 
            const all = JSON.parse(this.items); 
            this.items = all.items;
            this.details = all.details;
        }
    },
    list : function () {
        const { products, items, details } = this;
        const tblcart = document.querySelector('.tbl-cart tbody')
        const totlcart = document.querySelector('.totl-cart')
       
        tblcart.querySelectorAll('*').forEach(n => n.remove())
        if(Object.keys(this.items).length > 0)
            Object.keys(this.items).forEach(function(item){
                var template = '<tr>'+
                '<td valign="middle">'+
                    '<a href="#">'+
                        '<img src="'+  products[item].image + '" title="" width="47" height="47">'+
                        products[item].name +
                    '</a>'+
                '</td>'+
                '<td>'+
                '<div class="input-group">'+
                    '<button data-pid="'+ products[item].name +'" data-value="0" class="addtocart input-group-btn">-</button>'+
                    '<input readonly type="text" name="" value="'+  items[item] +'" />'+
                    '<button data-pid="'+  products[item].name +'" data-value="1" class="addtocart input-group-btn">+</button>'+
                '</div>'+
                '</td>'+
                '<td class="price">$' + products[item].price.display + '</td>'+
                '</tr>';
                tblcart.insertAdjacentHTML('beforeend',template);
            });
        else {
            var template = '<tr><td colspan="3">no items in cart<td></tr>';
            tblcart.insertAdjacentHTML('beforeend',template);
        }

        var templatetl = 
        '<tr>'+
        '<tr>'+
          '<td colspan="2">Total</td>'+
        '</tr>'+
        '<tr>'+
          '<td>Items('+ Object.keys(this.items).length +')</td>'+
          '<td class="price"> $'+ details.total +'</td>'+
        '</tr>'+
        '<tr>'+
          '<td>Discount</td>'+
          '<td class="price"> $'+ details.discount +'</td>'+
        '</tr>'+
        '<tfoot>'+
          '<tr>'+
            '<td>Grand Total</td>'+
            '<td class="price"> $'+ details.grandTotal +'</td>'+
          '</tr>'+
      '</tfoot>'+
      '</tr>';
      totlcart.querySelectorAll('*').forEach(n => n.remove())
      totlcart.insertAdjacentHTML('beforeend',templatetl);
       
    },
    change : function(){
         
      this.save();
      this.load();
      this.list();
    },
    add : function (name) {
       
      if (this.items[name] == undefined) {
        this.items[name] = 1;
      } else {
        this.items[name]++;
      }

      this.change();
     
    },
    sub : function (name) {
       
        if (this.items[name] == undefined) {
          this.items[name] = 1;
        } else {
          this.items[name]--;
        }

        if(this.items[name] <= 0)
            this.remove(name);
        else
            this.change();
     
    },
    remove : function (name) {
      delete this.items[name];
      this.change();
    }
});

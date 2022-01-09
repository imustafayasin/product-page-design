const add_to_cart_button = document.querySelector(".add-to-cart");
const quantity = document.querySelector(".qty input");
const basket = document.querySelector(".basket .content");
const main_image = document.querySelector(".product-images .main-image img");
const lightbox = document.querySelector(".lightbox");
const product_thumbnails = document.querySelectorAll(".thumbnail img");



const product_item = {
    name: 'Fall Limited Edition Sneakers',
    qty: Number(quantity.value),
    price: 125.00,
    img: '/images/image-product-1-thumbnail.jpg'
}

const cart = [];

add_to_cart_button.addEventListener('click', function () {
    Product.cart.clear();
    Product.cart.add();
});

main_image.addEventListener('click', function () {
    Product.lightbox.show()
})


product_thumbnails.forEach((item, index) => {
    item.addEventListener('click', () => {
        Product.clickThumbnail(item, main_image)
    })
})
let index = 0;
const sliderArrows = document.querySelectorAll(".slider-arrow .arrow");

for (let item of sliderArrows) {
    item.addEventListener('click', function () {

        item.classList.contains('next') ? index += 1 : index -= 1;
        index = index > product_thumbnails.length - 1 || index < 0 ? 0 : index;

        document.querySelector(" .main-image img").src = product_thumbnails[index].src.replace('-thumbnail', '');
    })
}

const Product = {
    initSlider: function (arrows) {

        arrows.classList.contains('next') ? index += 1 : index -= 1;
        index = index > product_thumbnails.length - 1 || index < 0 ? 0 : index;

        document.querySelector(".lightbox .main-image img").src = product_thumbnails[index].src.replace('-thumbnail', '');
    },
    lightbox: {
        show: function () {
            lightbox.classList.add("active")
            if (lightbox.querySelector(".product-images")) {
                lightbox.querySelector(".product-images").parentNode.removeChild(lightbox.querySelector(".product-images"));
            }
            lightbox.innerHTML += document.querySelector("main .product-images").outerHTML;
            document.querySelector('.lightbox img.close').addEventListener('click', this.hide);
            document.querySelectorAll(".lightbox .thumbnail img").forEach((item, index) => {
                item.addEventListener('click', () => {
                    Product.clickThumbnail(item, document.querySelector(".lightbox .product-images .main-image img"))
                })
            })

            const sliderArrows = document.querySelectorAll(".lightbox .slider-arrow .arrow");

            for (let item of sliderArrows) {
                item.addEventListener('click', function () {
                    Product.initSlider(this)
                })
            }
        },
        hide: function () {
            lightbox.classList.remove("active")
        }
    },
    clickThumbnail: function (thum, main) {

        product_thumbnails.forEach((rmClass, index) => rmClass.parentElement.classList.remove("active"));
        thum.parentElement.classList.add('active');
        main.src = thum.src.replace('-thumbnail', '')
    },
    cart: {
        add: function (product) {

            var isAdded = cart.find(p => p.name == product_item.name);
            !isAdded ? cart.push(product_item) : product_item.qty += 1;
            basket.classList.remove("empty");
            for (let product of cart) {
                basket.innerHTML += `
                 <div class="product-item">
                    <div class="image"><img src="${product.img}"></div>
                    <div class="price">${product.name}<br> $${product.price} x ${product.qty} <span class="total"><b>$${product.price * product.qty}</b></span></div>
                    <div class="remove"><img src="/images/icon-delete.svg"></div>
                    </div>
                `;
            }
            basket.innerHTML += `<button class="checkout-button">Checkout</button>`;
            this.show();
            document.querySelector('.product-item .remove').addEventListener('click', () => {
                this.remove();
            })
        },
        remove: function () {
            basket.classList.add('empty');
            basket.innerHTML = 'Your cart is empty';
            cart = [];
        },
        show: function () {
            document.querySelector(".cart").focus()
        },
        clear: function () {
            basket.innerHTML = '';

        }
    },
    mobile_menu: function () { }
}
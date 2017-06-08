import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart-provider/cart-provider';
//import { ImageModal } from '../../components/image-modal/image-modal';
import { CartPage } from '../cart/cart';
import { StorageProvider } from '../..//providers/storage-provider/storage-provider';


@Component({
    selector: 'page-products',
    templateUrl: 'product.details.html',
})

export class ProductDetailPage {
    selectedProduct: any = [];
    quantity: number;
    product: any;
    cartSize: number = 0;
    slidingOptions = {
        pager: true,
        lopp: true
    };
    constructor(private location: Location,
        private cartService: CartProvider,
        private navController: NavController,
        private navParams: NavParams, private modalCtrl: ModalController, private storage: StorageProvider) {
        this.quantity = 1;
        this.product = this.navParams.get("product");
    }

    ionViewDidEnter() {
       this.updateCartSize();
    }

    addToCart(product) {
        let cartItem = {
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.picture,
            price: product.mrp,
            price_discount: product.price,
            quantity: 1,
        }
        this.cartService.addToCart(cartItem);
        this.updateCartSize();
    }

    goBack() {
        this.location.back()
    }

    openImages(product) {
        //let modal = this.modalCtrl.create(ImageModal, { images: this.product.picture});
        //modal.present(modal);
    }

    openCart() {
        this.navController.setRoot(CartPage);
    }
    updateCartSize() {
        if (this.storage.getObject("cart") != null) {
            this.cartSize = this.storage.getObject("cart").length;
        }
    }
}
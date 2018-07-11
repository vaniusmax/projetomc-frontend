import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produtos.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[]
  constructor(public navCtrl: NavController
            , public navParams: NavParams
            , public cartservice: CartService
            , public produtoService: ProdutoService ) {
  }

  ionViewDidLoad() {
    let cart = this.cartservice.getCart();
    this.items = cart.item;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
        },
        error => {});
    }
  }  


  removeProduto(produto: ProdutoDTO){
    this.items = this.cartservice.removeProduto(produto).item;
  }

  increaseQuantity(produto: ProdutoDTO){
    this.items = this.cartservice.increaseQuantity(produto).item;
  }

  decreaseQuantity(produto: ProdutoDTO){
    this.items = this.cartservice.decreaseQuantity(produto).item;
  }

  total() :number{
    return this.cartservice.total();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage');
  }
  checkout(){
    this.navCtrl.push('PickAddressPage');
  }
}

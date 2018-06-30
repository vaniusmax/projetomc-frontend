import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Carts } from "../../models/carts";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService{

    constructor(public storage: StorageService){

    }

    createOrClearCart(): Carts{
      let cart: Carts = {item: []}
      this.storage.setCart(cart); 
      return cart;
    }

    getCart(): Carts{
      let cart = this.storage.getCart();
      if (cart == null){
          cart = this.createOrClearCart();
      }
      return cart;
    }

    addProduto(produto: ProdutoDTO): Carts{
      let cart = this.getCart();
      let position = cart.item.findIndex(x => x.produto.id == produto.id)

      if(position == -1){
          cart.item.push({quantidade: 1, produto: produto})
      }
      this.storage.setCart(cart);
      return cart;
    }
}
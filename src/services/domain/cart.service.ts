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

    removeProduto(produto: ProdutoDTO): Carts{
      let cart = this.getCart();
      let position = cart.item.findIndex(x => x.produto.id == produto.id)

      if(position != -1){
          cart.item.splice(position, 1)
      }
      this.storage.setCart(cart);
      return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Carts{
      let cart = this.getCart();
      let position = cart.item.findIndex(x => x.produto.id == produto.id)

      if(position != -1){
          cart.item[position].quantidade++
      }
      this.storage.setCart(cart);
      return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Carts{
      let cart = this.getCart();
      let position = cart.item.findIndex(x => x.produto.id == produto.id)

      if(position != -1){
          cart.item[position].quantidade--
          if(cart.item[position].quantidade < 1){
             cart = this.removeProduto(produto);
          }
      }
      this.storage.setCart(cart);
      return cart;
    }

    total() :number{
       let cart = this.storage.getCart();
       let sum = 0;
       for(var i=0; i<cart.item.length; i++){
         sum += cart.item[i].produto.preco * cart.item[i].quantidade;
       }
       return sum;
    }
}
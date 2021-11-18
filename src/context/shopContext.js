import React, { Component } from "react";
import Client from "shopify-buy";

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

const ShopContext = React.createContext("Testing Context");

class ShopProvider extends Component {
  state = {
    product: {},
    products: [],
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
  };

  componentDidMount() {
    const checkoutId = localStorage.getItem("checkout_id");

    if (checkoutId) this.fetchCheckout(checkoutId);
    else this.createCheckout();
  }

  async createCheckout() {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout-id", checkout.id);
    this.setState({ checkout: checkout });
  }

  async fetchCheckout(checkoutId) {
    const checkout = await client.checkout.fetch(checkoutId);
    this.setState({ checkout: checkout });
  }

  async fetchAllProducts() {
    const products = await client.product.fetchAll();
    this.setState({ products: products });
  }
  async fetchProductWithHandle(handle) {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product: product });
  }

  async addItemToCart() {}

  async removeLineItem(lineItemsIdsToRemove) {}

  openCart() {}

  closeCart() {}

  openMenu() {}

  closeMenu() {}

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts.bind(this),
          fetchProductWithHandle: this.fetchProductWithHandle.bind(this),
          addItemToCart: this.addItemToCart.bind(this),
          removeLineItem: this.removeLineItem,
          openCart: this.openCart,
          closeCart: this.closeCart,
          openMenu: this.openMenu,
          closeMenu: this.closeMenu,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

// const ShopConsumer = ShopContext.Consumer;

export { ShopProvider, ShopContext };

export default ShopProvider;

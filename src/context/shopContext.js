import React, { Component } from "react";
import Client from "shopify-buy";

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

const ShopContext = React.createContext();

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

  async addItemToCheckout(variantId, quantity) {
    const checkoutId = this.state.checkout.id;
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ];

    const checkout = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );

    this.setState({ checkout: checkout });
    this.openCart();
  }

  async removeLineItem(lineItemsIdsToRemove) {}

  openCart() {
    this.setState({ isCartOpen: true });
  }

  closeCart() {
    this.setState({ isCartOpen: false });
  }

  openMenu() {}

  closeMenu() {}

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts.bind(this),
          fetchProductWithHandle: this.fetchProductWithHandle.bind(this),
          addItemToCheckout: this.addItemToCheckout.bind(this),
          removeLineItem: this.removeLineItem.bind(this),
          openCart: this.openCart.bind(this),
          closeCart: this.closeCart.bind(this),
          openMenu: this.openMenu.bind(this),
          closeMenu: this.closeMenu.bind(this),
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

export { ShopProvider, ShopContext };

export default ShopProvider;

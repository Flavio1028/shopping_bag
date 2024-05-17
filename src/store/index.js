import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    productsInBag: []
  },
  getters: {
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products;
    },
    loadBag(state, products ){
      state.productsInBag = products;
    },
    addToBag(state, product) {
      state.productsInBag.push(product);
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    },
    romevoFromBag(state, id) {
      var updatedBag = state.productsInBag.filter(item => item.id != id);
      state.productsInBag = updatedBag;
      localStorage.setItem('productsInBag', JSON.stringify(updatedBag));
    },
    updateQuantity(state, { index, quantity }) {
      var updatedBag = state.productsInBag[index];
      updatedBag.quantity = quantity;
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag));
    }
  },
  actions: {
    loadProducts( { commit } ) {
      axios.get('https://fakestoreapi.com/products')
        .then(response => {
          commit('loadProducts', response.data);
        }).catch(e => console.log(e));
    },
    loadBag( { commit } ) {
      if (localStorage.getItem('productsInBag')) {
        commit('loadBag', JSON.parse(localStorage.getItem('productsInBag')));
      }      
    },
    addToBag( { commit } , product) {
      commit('addToBag', product);
    },
    romevoFromBag({ commit } , id) {
      if (confirm('Are you sure you want to remove the item from bag ?')) {
        commit('romevoFromBag', id);
      }
    },
    updateQuantity({ commit } , { index, quantity }) {
      commit('updateQuantity', { index, quantity });
    }
  },
  modules: {
  }
})

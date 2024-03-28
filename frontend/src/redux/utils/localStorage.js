 const getCartFromLocalStorage  = ()=>{
    return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')):[]
  }
  
 const saveCartToLocalStorage = (cart)=>{
    localStorage.setItem('cart', JSON.stringify(cart));
}


export { getCartFromLocalStorage, saveCartToLocalStorage}
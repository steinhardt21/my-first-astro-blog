import { computed, map } from 'nanostores'

export const $cart = map<Record<number, CartItem>>({})

export function addItemToCard(item: ShopItem){
  const cartItem = $cart.get()[item.id] // check if the item exists in the cart
  const quantity = cartItem ? cartItem.quantity : 0

  $cart.setKey(item.id, {
    item,
    quantity: quantity + 1
  })
}

export function removeItemFromCart(itemId: number) {
  // @ts-ignore
  $cart.setKey(itemId, undefined)
}

export const subtotal = computed($cart, entries => { // we compute an additional store based on the value of a different store
  let subtotal = 0
  Object.values(entries).forEach(entry => {
    if(!entry) {
      return
    }

    subtotal += entry.quantity * entry.item.price
  })

  return subtotal
}) 
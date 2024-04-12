/** @jsxImportSource react */
// This to overwritte tsconfig

import { addItemToCard } from "../stores/cart";

export const AddToCart = ({ item }: { item: ShopItem }) => {
  return (
    <button className="big-link" onClick={() => addItemToCard(item)}>
      Add To Cart
    </button>
  )
}
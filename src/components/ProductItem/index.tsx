import { MdAddShoppingCart } from "react-icons/md";
import { ProductFormatted } from "../../types";


interface ProductProps {
  product: ProductFormatted;
  amount?: number;
  addProduct: () => void;
}

export function ProductItem({ product, amount, addProduct }: ProductProps) {
  return (
    <li>
        <img src={product.image} alt={product.title} />
        <strong>{product.title}</strong>
        <span>{product.priceFormatted}</span>
        <button
          type="button"
          data-testid="add-product-button"
          onClick={() => addProduct()}
        >
          <div data-testid="cart-product-quantity">
            <MdAddShoppingCart size={16} color="#FFF" />
            { amount || 0 }
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
  );
}
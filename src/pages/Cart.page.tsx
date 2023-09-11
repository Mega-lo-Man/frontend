import HeaderComponent from "../features/products/components/Header.component";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";

const CartPage = () => {
  const {cart, products} = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  return (
    <div>
      <HeaderComponent />
    </div>
  )
}

export default CartPage;
import React from "react";
import { ChevronDoubleRightOutline } from "@graywolfai/react-heroicons";
import { useSessionStorage } from "../sessionStorage";
import { Link } from "react-router-dom";

const { useEffect, useState } = React;

function CartItemRow(props) {
  const { idx, id, name, price, reducedPrice } = props;

  const actualPrice = reducedPrice || price;

  return (
    <div className="table-row">
      <div className="table-cell text-right px-2">{idx + 1}</div>
      <div className="table-cell text-right px-2">{id}</div>
      <div className="table-cell text-left px-2">{name}</div>
      <div className="table-cell text-right px-2">
        ₹{" "}
        {actualPrice.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
}

function calculateTotalCost(products) {
  return products.reduce(
    (prev, curr) => prev + (curr.reducedPrice || curr.price),
    0
  );
}

function Cart() {
  const [cart, setCart] = useSessionStorage("cart", {
    addedProductIds: {},
    products: [],
  });
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    setTotalCost(calculateTotalCost(cart.products));
  }, [cart]);

  if (!cart.products || !totalCost) {
    return (
      <div>
        <div className="p-2 text-4xl">Your cart is empty.</div>
        <div className="p-2 text-sm font-semibold">
          Add products to your cart to see them here.
        </div>
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="table w-full p-2">
        <div className="table-header-group text-sm">
          <div className="table-row font-semibold text-gray-600">
            <div className="table-cell text-right px-2 border-b-2">#</div>
            <div className="table-cell text-right px-2 border-b-2">
              Product Id
            </div>
            <div className="table-cell text-left px-2 border-b-2">
              Product Name
            </div>
            <div className="table-cell text-right px-2 border-b-2">Price</div>
          </div>
        </div>
        <div className="table-row-group text-sm">
          {cart.products.map((product, idx) => (
            <CartItemRow key={product.id} idx={idx} {...product} />
          ))}
        </div>
        <div className="table-footer-group">
          <div className="table-row font-semibold">
            <div className="table-cell text-right px-2 border-t-2"></div>
            <div className="table-cell text-right px-2 border-t-2"></div>
            <div className="table-cell text-left px-2 border-t-2">Subtotal</div>
            <div className="table-cell text-right px-2 border-t-2">
              ₹{" "}
              {totalCost.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="table-row font-semibold text-gray-600 text-sm">
            <div className="table-cell text-right px-2"></div>
            <div className="table-cell text-right px-2"></div>
            <div className="table-cell text-left px-2">
              Delivery and shipping charges
            </div>
            <div className="table-cell text-right px-2 text-green-600 font-bold">
              Free
            </div>
          </div>
          <div className="table-row font-semibold text-lg">
            <div className="table-cell text-right px-2 border-t-2"></div>
            <div className="table-cell text-right px-2 border-t-2"></div>
            <div className="table-cell text-left px-2 border-t-2">Total</div>
            <div className="table-cell text-right px-2 border-t-2">
              ₹{" "}
              {totalCost.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex mt-4 mb-4">
          <Link
            to="/checkout"
            className="rounded-md p-1 flex border-2 border-blue-500 bg-blue-200 hover:bg-blue-500 hover:text-white font-medium"
          >
            Continue and check out{" "}
            <ChevronDoubleRightOutline className="h-4 w-4 ml-1 inline self-center" />
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Cart;

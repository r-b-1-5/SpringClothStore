import React from "react";
import { Link } from "react-router-dom";
import { useSessionStorage } from "../sessionStorage";
import SETTINGS from "../settings";

const { useEffect, useState } = React;

function DiscountCard(props) {
  const [cart, setCart] = useSessionStorage("cart", {
    addedProductIds: {},
    products: [],
  });

  const {
    id,
    imageUrl,
    name,
    price,
    discountPercentage,
    reducedPrice,
    description,
    footnote,
  } = props.product;

  const handleAddToCart = () => {
    if (!cart.addedProductIds[id]) {
      const cartCopy = { ...cart };
      cartCopy.addedProductIds[id] = true;
      cartCopy.products.push(props.product);
      setCart(cartCopy);
    }
  };

  return (
    <div className="p-2 bg-white border-r-2 last:border-r-0 bg-green-100" >
      <div className="">
        <img
          src={`${SETTINGS.STATIC_ROOT_URL}/${imageUrl}`}
          alt={name}
          className="rounded-lg h-60 ml-auto mr-auto"
        />
      </div>
      <div className="flex justify-between mt-1 text-lg lg:text-xl">
        <div className="font-semibold">{name}</div>
        <div className="text-gray-500 font-medium">
          ₹ {reducedPrice.toLocaleString("en-IN")}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm font-semibold bg-green-300 rounded-sm p-0.5">
          {discountPercentage}% off
        </div>
        <div className="text-sm text-gray-500 p-0.5">
          <s>₹ {price.toLocaleString("en-IN")}</s>
        </div>
      </div>
      <div className="text-gray-700 text-sm mt-4">{description}</div>
      <div className="flex mt-4 mb-4">
        <Link
          to={`/products/${id}`}
          className="rounded-md p-1 border-2 border-blue-200 mr-4 bg-blue-200 hover:bg-blue-500 hover:border-blue-500 hover:text-white font-medium bg-green-100"
        >
          View details
        </Link>
        <button
          onClick={() => handleAddToCart()}
          className="rounded-md p-1 border-2 border-blue-500 hover:bg-blue-500 hover:text-white font-medium bg-green-100"
        >
          Add to cart
        </button>
      </div>
      <div className="text-sm text-gray-500">{footnote}</div>
    </div>
  );
}

async function fetchDiscountedProducts(setDiscountedProducts) {

  const productsRaw = await fetch(`${SETTINGS.BASE_URL}/products`);
  const products = await productsRaw.json();
  const discountedProducts = products.filter(
    (product) => product.discountPercentage
  );

  setDiscountedProducts(discountedProducts);
}

function Discounts() {
  const [discountedProducts, setDiscountedProducts] = useState(null);

  useEffect(() => {
    fetchDiscountedProducts(setDiscountedProducts);
  }, []);

  if (!discountedProducts) {
    return <div></div>;
  }

  return (
    <div className="py-2 px-4 max-w-full">
      <div className="text-3xl mb-2">
        <span className="border-b-2 border-blue-600">Deals</span> of the day
      </div>
      <div>
        <div className="flex flex-row justify-evenly">
          {discountedProducts.map((discountedProduct) => (
            <DiscountCard
              key={discountedProduct.id}
              product={discountedProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Discounts;

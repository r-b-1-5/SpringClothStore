import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSessionStorage } from "../sessionStorage";
import SETTINGS from "../settings";

const { useEffect, useState } = React;

function ProductDetailCard(props) {
  const [cart, setCart] = useSessionStorage("cart", {
    addedProductIds: {},
    products: [],
  });

  const {
    id,
    imageUrl,
    name,
    description,
    isNewArrival,
    price,
    discountPercentage,
    reducedPrice,
    category,
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

  const renderPriceSection = () => {
    if (discountPercentage) {
      return (
        <>
          <div className="text-xl text-gray-500 font-medium">
            ₹ {reducedPrice.toLocaleString("en-IN")}
          </div>
          <div className="text-sm text-gray-500 p-1">
            <s>₹ {price.toLocaleString("en-IN")}</s>
          </div>
          <div className="text-sm font-semibold bg-green-300 rounded-sm p-1">
            {discountPercentage}% off
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="text-xl text-gray-500 font-medium">
            ₹ {price.toLocaleString("en-IN")}
          </div>
        </>
      );
    }
  };

  const renderCategorySection = () => {
    if (isNewArrival) {
      return (
        <>
          <div className="text-sm font-medium text-blue-600">
            Flopkart exclusive
          </div>
          <div className="flex">
            <div className="text-sm bg-yellow-300 rounded-sm p-0.5">
              New in <span className="font-medium">{category}</span>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="text-sm">
            In <span className="font-medium">{category}</span>
          </div>
        </>
      );
    }
  };

  return (
    <div className="flex p-2 border-b-2 last:border-b-0">
      <div className="max-w-xs w-80">
        <img
          src={`${SETTINGS.STATIC_ROOT_URL}/${imageUrl}`}
          alt={name}
          className="rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col pl-4">
        <div className="font-semibold text-xl">{name}</div>
        <div className="flex">{renderPriceSection()}</div>
        {renderCategorySection()}
        <div className="text-gray-700 text-sm mt-4">{description}</div>
        <div className="flex mt-4 mb-4">
          <button
            onClick={() => handleAddToCart()}
            className="rounded-md p-1 border-2 border-blue-500 hover:bg-blue-500 hover:text-white font-medium"
          >
            Add to cart
          </button>
        </div>
        <div className="text-sm text-gray-500">{footnote}</div>
      </div>
    </div>
  );
}

async function fetchProduct(id, setProduct) {
  const productRaw = await fetch(`${SETTINGS.BASE_URL}/products/${id}`);
  const product = await productRaw.json();

  setProduct(product);
}

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(id, setProduct);
  }, [id]);

  if (!product) {
    return <div></div>;
  }

  return (
    <div className="flex">
      <ProductDetailCard product={product} />
    </div>
  );
}

export default ProductDetail;

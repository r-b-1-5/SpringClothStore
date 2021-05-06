import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLocalStorage } from "../localStorage";
import { useSessionStorage } from "../sessionStorage";
import SETTINGS from "../settings";

const { useEffect, useState } = React;

function ProductSummaryCard(props) {
  const [cart, setCart] = useSessionStorage("cart", {
    addedProductIds: {},
    products: [],
  });

  const {
    id,
    imageUrl,
    name,
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
          className="rounded-lg max-h-80 ml-auto mr-auto"
        />
      </div>
      <div className="flex-1 flex flex-col pl-4">
        <div className="font-semibold text-xl">{name}</div>
        <div className="flex">{renderPriceSection()}</div>
        {renderCategorySection()}
        <div className="flex-1" />
        <div className="flex mt-4 mb-4">
          <Link
            to={`/products/${id}`}
            className="rounded-md p-1 border-2 border-blue-200 mr-4 bg-blue-200 hover:bg-blue-500 hover:border-blue-500 hover:text-white font-medium"
          >
            View details
          </Link>
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

async function fetchProducts(
  setProducts,
  searchQuery,
  filterNewArrivalsFlag,
  filterDiscountedItemsFlag
) {
  const productsRaw = await fetch(`${SETTINGS.BASE_URL}/products`);
  const products = await productsRaw.json();

  const filteredProducts = products.filter((product) => {
    if (filterNewArrivalsFlag && filterDiscountedItemsFlag)
      return product.isNewArrival && product.discountPercentage;

    if (filterNewArrivalsFlag) return product.isNewArrival;

    if (filterDiscountedItemsFlag) return product.discountPercentage;

    return true;
  });

  if (searchQuery) {
    const searchMatches = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
    );

    setProducts(searchMatches);
    return;
  }

  setProducts(filteredProducts);
}

function Products() {
  const [products, setProducts] = useState(null);
  const [filterNewArrivalsFlag, setFilterNewArrivalsFlag] = useState(false);
  const [filterDiscountedItemsFlag, setFilterDiscountedItemsFlag] = useState(
    false
  );
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get(
    "productSearchQuery"
  );

  const [activity, setActivity] = useLocalStorage("activity", {
    viewNewArrivalsCount: 0,
    viewDiscountedItemsCount: 0,
  });

  const handleNewArrivalsChecked = () => {
    if (!filterNewArrivalsFlag) {
      setActivity((curr) => ({
        ...curr,
        viewNewArrivalsCount: curr.viewNewArrivalsCount + 1,
      }));
    }
  };

  const handleDiscountedItemsChecked = () => {
    if (!filterDiscountedItemsFlag) {
      setActivity((curr) => ({
        ...curr,
        viewDiscountedItemsCount: curr.viewDiscountedItemsCount + 1,
      }));
    }
  };

  useEffect(() => {
    fetchProducts(
      setProducts,
      searchQuery,
      filterNewArrivalsFlag,
      filterDiscountedItemsFlag
    );
  }, [searchQuery, filterNewArrivalsFlag, filterDiscountedItemsFlag]);

  if (!products) {
    return <div></div>;
  }

  const renderOptionalSearchSection = () => {
    if (searchQuery) {
      return (
        <div className="p-2 font-semibold">
          Search results for{" "}
          <span className="border-b-2 border-dashed border-red-600 p-1">
            {searchQuery}
          </span>
        </div>
      );
    }
  };

  const renderProductsList = () => {
    if (products.length === 0) {
      return (
        <div>
          <div className="p-2 text-4xl">No products were found.</div>
          <div className="p-2 text-sm font-medium">
            {searchQuery
              ? "Try another search, remove filters or check your internet."
              : "Remove filters or check your internet."}
          </div>
        </div>
      );
    }

    return products.map((product) => (
      <ProductSummaryCard key={product.id} product={product} />
    ));
  };

  return (
    <div className="flex flex-col">
      <div className="flex p-2 border-b-2">
        <div className="mr-8 font-bold">Filters</div>
        <div className="mr-4">
          <input
            type="checkbox"
            className="mr-1"
            onChange={() => {
              handleNewArrivalsChecked();
              setFilterNewArrivalsFlag((val) => !val);
            }}
          />
          <span className=" text-sm font-semibold text-gray-600">
            New Arrivals
          </span>
        </div>
        <div className="">
          <input
            type="checkbox"
            className="mr-1"
            onChange={() => {
              handleDiscountedItemsChecked();
              setFilterDiscountedItemsFlag((val) => !val);
            }}
          />
          <span className="text-sm font-semibold text-gray-600">Deals</span>
        </div>
      </div>
      <div className="flex-1">
        {renderOptionalSearchSection()}
        {renderProductsList()}
      </div>
    </div>
  );
}

export default Products;

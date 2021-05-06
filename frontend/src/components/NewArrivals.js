import React from "react";
import { Link } from "react-router-dom";
import { useSessionStorage } from "../sessionStorage";
import SETTINGS from "../settings";

const { useEffect, useState } = React;

function NewArrivalCard(props) {
  const [cart, setCart] = useSessionStorage("cart", {
    addedProductIds: {},
    products: [],
  });

  const {
    id,
    imageUrl,
    name,
    price,
    category,
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
    <div className="p-2 bg-white border-r-2 last:border-r-0 bg-pink-200" >
      <div>
        <img
          src={`${SETTINGS.STATIC_ROOT_URL}/${imageUrl}`}
          alt={name}
          className="rounded-lg h-60 ml-auto mr-auto"
        />
      </div>
      <div className="flex justify-between mt-1 text-lg lg:text-xl">
        <div className="font-semibold">{name}</div>
        <div className="text-gray-500 font-medium">
          ₹ {price.toLocaleString("en-IN")}
        </div>
      </div>
      <div className="flex">
        <div className="text-sm font-medium text-blue-600">
          Flopkart exclusive
        </div>
      </div>
      <div className="flex">
        <div className="text-sm bg-yellow-300 rounded-sm p-0.5">
          New in <span className="font-medium">{category}</span>
        </div>
      </div>
      <div className="text-gray-700 text-sm mt-4">{description}</div>
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
  );
}

async function fetchNewArrivals(setNewArrivals) {
  // const newArrival = {
  //   id: 1,
  //   name: "Lenovo Legion",
  //   imageUrl: process.env.PUBLIC_URL + "/images/lenovo-legion.jpg",
  //   price: 69999,
  //   category: "Laptops",
  //   description:
  //     "The new Lenovo Legion comes packed with the state-of-the-art processors from Intel and AMD. Combined with the latest graphics from NVIDIA and a 16GB DDR4 memory, it can handle even the heaviest of workloads. And yes, it can run Crysis.",
  //   footnote: "Free shipping till 25th December",
  // };
  // const newArrivals = [
  //   newArrival,
  //   { ...newArrival, id: 2 },
  //   { ...newArrival, id: 3 },
  // ];

  const productsRaw = await fetch(`${SETTINGS.BASE_URL}/products`);
  const products = await productsRaw.json();
  const newArrivals = products.filter((product) => product.isNewArrival);

  setNewArrivals(newArrivals);
}

function NewArrivals() {
  const [newArrivals, setNewArrivals] = useState(null);

  useEffect(() => {
    fetchNewArrivals(setNewArrivals);
  }, []);

  if (!newArrivals) {
    return <div></div>;
  }

  return (
    <div className="py-2 px-4 max-w-full">
      <div className="text-3xl mb-2">
        <span className="border-b-2 border-blue-600">New</span> arrivals
      </div>
      <div>
        <div className="flex flex-row justify-evenly">
          {newArrivals.map((newArrival) => (
            <NewArrivalCard key={newArrival.id} product={newArrival} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;

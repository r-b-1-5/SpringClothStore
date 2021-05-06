import React from "react";
import { useLocalStorage } from "../localStorage";
import Discounts from "./Discounts";
import NewArrivals from "./NewArrivals";

function Home() {
  const [activity, setActivity] = useLocalStorage("activity", {
    viewNewArrivalsCount: 0,
    viewDiscountedItemsCount: 0,
  });

  const renderBody = () => {
    const { viewNewArrivalsCount, viewDiscountedItemsCount } = activity;

    if (viewNewArrivalsCount > viewDiscountedItemsCount)
      return (
        <div>
          <NewArrivals />
          <Discounts />
        </div>
      );

    if (viewNewArrivalsCount < viewDiscountedItemsCount)
      return (
        <div>
          <Discounts />
          <NewArrivals />
        </div>
      );

    if (Math.random() < 0.5)
      return (
        <div>
          <NewArrivals />
          <Discounts />
        </div>
      );
    else
      return (
        <div>
          <Discounts />
          <NewArrivals />
        </div>
      );
  };

  return renderBody();
}

export default Home;

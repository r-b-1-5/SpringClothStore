import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../auth";
import {
  ChevronDoubleRightOutline,
  ChevronDoubleLeftOutline,
  RefreshOutline,
} from "@graywolfai/react-heroicons";
import { useSessionStorage } from "../sessionStorage";
import SETTINGS from "../settings";

function CheckoutShippingInfoForm(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;

    const updatedValues = {
      emailAddress: form.emailField.value,
      mobileNumber: form.contactField.value,
      firstName: form.firstName.value,
      lastName: form.lastNameField.value,
      address: form.addressField.value,
      city: form.cityField.value,
      state: form.stateField.value,
      country: form.countryField.value,
      zipCode: form.zipCodeField.value,
      deliveryMethod: form.expressDeliveryCheckbox.checked
        ? "express"
        : "normal",
    };

    props.setStage(1);
    props.setOrderDetails((curr) => ({ ...curr, ...updatedValues }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="text-gray-500 font-light text-lg">Basic details</div>
          <div className="border-b flex-grow"></div>
        </div>
        <div className="flex mb-1 mt-1">
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-600"
            >
              Email address
            </label>
            <input
              required
              type="email"
              name="emailField"
              id="email"
              defaultValue={props.orderDetails.emailAddress}
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="w-4"></div>
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="contact"
              className="text-sm font-semibold text-gray-600"
            >
              Contact number
            </label>
            <input
              required
              type="text"
              name="contactField"
              id="contact"
              defaultValue={props.orderDetails.mobileNumber}
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="firstName"
              className="text-sm font-semibold text-gray-600"
            >
              First name
            </label>
            <input
              required
              type="text"
              name="firstNameField"
              id="firstName"
              defaultValue={props.orderDetails.firstName}
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="w-4"></div>
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="lastName"
              className="text-sm font-semibold text-gray-600"
            >
              Last name
            </label>
            <input
              required
              type="text"
              name="lastNameField"
              id="lastName"
              defaultValue={props.orderDetails.lastName}
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-gray-500 font-light text-lg">
            Shipping information
          </div>
          <div className="border-b flex-grow"></div>
        </div>
        <div className="flex mb-1 mt-1">
          <div className="flex flex-col flex-grow-2">
            <label
              htmlFor="address"
              className="text-sm font-semibold text-gray-600"
            >
              Shipping address
            </label>
            <input
              required
              type="text"
              name="addressField"
              id="address"
              defaultValue={props.orderDetails.address}
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="w-4"></div>
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="zipCode"
              className="text-sm font-semibold text-gray-600"
            >
              Zip code
            </label>
            <input
              required
              type="text"
              name="zipCodeField"
              id="zipCode"
              defaultValue={props.orderDetails.zipCode}
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="city"
              className="text-sm font-semibold text-gray-600"
            >
              City
            </label>
            <input
              required
              type="text"
              name="cityField"
              id="city"
              defaultValue={props.orderDetails.city}
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="w-4"></div>
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="state"
              className="text-sm font-semibold text-gray-600"
            >
              State
            </label>
            <input
              required
              type="text"
              name="stateField"
              id="state"
              defaultValue={props.orderDetails.state}
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="w-4"></div>
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="country"
              className="text-sm font-semibold text-gray-600"
            >
              Country
            </label>
            <input
              required
              type="text"
              name="countryField"
              id="country"
              defaultValue={props.orderDetails.country}
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="expressDeliveryCheckbox"
            defaultChecked={props.deliveryMethod === "express"}
          />
          <div className="text-sm font-semibold text-gray-600 ml-1">
            Express delivery (₹ 500)
          </div>
        </div>
        <div>
          <button
            // type="button"
            className="rounded-md p-1 flex border-2 border-blue-300 bg-blue-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white font-medium"
          >
            Next{" "}
            <ChevronDoubleRightOutline className="h-4 w-4 ml-1 inline self-center" />
          </button>
        </div>
      </form>
    </div>
  );
}

function CheckoutCardDetailsForm(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;

    const updatedValues = {
      cardNumber: form.cardNumberField.value,
      cardCvv: form.cvvField.value,
      cardExpiration: `${form.expirationMonthField.value}/${form.expirationYearField.value}`,
      cardFirstName: form.cardFirstName.value,
      cardLastName: form.cardLastName.value,
    };

    props.setStage(2);
    props.setOrderDetails((curr) => ({ ...curr, ...updatedValues }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="text-gray-500 font-light text-lg">
            Payment details
          </div>
          <div className="border-b flex-grow"></div>
        </div>
        <div className="flex mb-1 mt-1">
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="cardNumber"
              className="text-sm font-semibold text-gray-600"
            >
              Card number
            </label>
            <input
              required
              type="text"
              name="cardNumberField"
              id="cardNumber"
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex mb-1">
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="expirationMonth"
              className="text-sm font-semibold text-gray-600"
            >
              Expiration month
            </label>
            <input
              required
              type="text"
              name="expirationMonthField"
              id="expirationMonth"
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="w-4"></div>
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="expirationYear"
              className="text-sm font-semibold text-gray-600"
            >
              Expiration year
            </label>
            <input
              required
              type="text"
              name="expirationYearField"
              id="expirationYear"
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="w-4"></div>
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="cvv"
              className="text-sm font-semibold text-gray-600"
            >
              CVV
            </label>
            <input
              required
              type="text"
              name="cvvField"
              id="cvv"
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="cardFirstName"
              className="text-sm font-semibold text-gray-600"
            >
              First name
            </label>
            <input
              required
              type="text"
              name="cardFirstNameField"
              id="cardFirstName"
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="w-4"></div>
          <div className="flex flex-col flex-grow">
            <label
              htmlFor="cardLastName"
              className="text-sm font-semibold text-gray-600"
            >
              Last name
            </label>
            <input
              required
              type="text"
              name="cardLastNameField"
              id="cardLastName"
              className="p-1 rounded-md border-2 border-blue-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={() => props.setStage(0)}
            className="rounded-md p-1 flex border-2 border-blue-500 hover:bg-blue-500 hover:text-white font-medium"
          >
            <ChevronDoubleLeftOutline className="h-4 w-4 mr-1 inline self-center" />
            Previous
          </button>
          <button className="rounded-md ml-4 p-1 flex border-2 border-blue-300 bg-blue-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white font-medium">
            Confirm payment{" "}
            <ChevronDoubleRightOutline className="h-4 w-4 ml-1 inline self-center" />
          </button>
        </div>
      </form>
    </div>
  );
}

async function placeOrderRequest(
  data,
  authToken,
  setProcessing,
  setCompleted,
  setCart
) {
  console.log("start of function");

  const res = await fetch(`${SETTINGS.BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(data),
  });

  console.log("res");

  if (!res.ok) {
    const errorJson = await res.json();
    console.log(errorJson);
  }

  setCart({ addedProductIds: {}, products: [] });
  setCompleted(true);
  setProcessing(false);
}

function PlaceOrder(props) {
  const auth = useAuth();
  console.log({ auth });

  const [cart, setCart] = useSessionStorage("cart", {
    addedProductIds: {},
    products: [],
  });

  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!processing && !completed) {
      setProcessing(true);
      const productIds = cart.products.map((product) => product.id);
      const data = { ...props.orderDetails, productIds: productIds };
      placeOrderRequest(
        data,
        auth.user.token,
        setProcessing,
        setCompleted,
        setCart
      );
    }
  }, [auth, cart, setCart, props.orderDetails, processing, completed]);

  if (!completed) {
    return (
      <div>
        <div className="flex justify-center">
          <div className="font-thin text-2xl">Processing</div>
        </div>
        <div className="flex justify-center">
          <div>
            <RefreshOutline className="-animate-spin h-20 w-20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-4xl font-light text-center">
        Order placed successfully! 🎉
      </div>
    </div>
  );
}

function TopHeader(props) {
  const lhsOptionalCss =
    props.stage === 0 ? "border-blue-500" : "text-gray-400";
  const rhsOptionalCss =
    props.stage === 1 ? "border-blue-500" : "text-gray-400";

  return (
    <div className="flex text-sm font-semibold uppercase mb-2">
      <div className={"flex-grow text-center border-b-4 " + lhsOptionalCss}>
        Shipping details
      </div>
      <div className={"flex-grow text-center border-b-4 " + rhsOptionalCss}>
        Payment details
      </div>
    </div>
  );
}

function Checkout() {
  const auth = useAuth();

  const [stage, setStage] = useState(0);

  const [orderDetails, setOrderDetails] = useState({
    emailAddress: "",
    mobileNumber: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",

    deliveryMethod: "normal",

    cardNumber: "",
    cardCvv: "",
    cardExpiration: "",
    cardFirstName: "",
    cardLastName: "",
  });

  if (!auth.user) {
    return <Redirect to="/login" />;
  }

  const renderFormSection = () => {
    if (stage === 0) {
      return (
        <CheckoutShippingInfoForm
          setStage={setStage}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
        />
      );
    }
    if (stage === 1) {
      return (
        <CheckoutCardDetailsForm
          setStage={setStage}
          orderDetails={orderDetails}
          setOrderDetails={setOrderDetails}
        />
      );
    }
    if (stage === 2) {
      return <PlaceOrder orderDetails={orderDetails} />;
    }
  };

  // return (
  //   <div>
  //     <div className="p-2 text-4xl">Checkout page is not implemented yet.</div>
  //     <div className="p-2 text-sm font-semibold">Here's a GIF meanwhile...</div>
  //     <div className="p-2">
  //       <img
  //         src="https://media.giphy.com/media/Kx82Lvb7wcYNO/giphy.gif"
  //         alt="nyan cat"
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex justify-center p-4">
      <div className="p-2 min-w-3/4">
        <TopHeader stage={stage} />
        {renderFormSection()}
      </div>
    </div>
  );
}

export default Checkout;

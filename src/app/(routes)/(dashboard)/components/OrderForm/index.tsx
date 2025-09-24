"use client";

import React from "react";

type Props = {
  type: "create" | "update";
};

const OrdersForm: React.FC<Props> = ({ type }) => {
  if (type === "create") {
    return (
      <div className="w-full max-w-md">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Order Name"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
          <input
            type="text"
            placeholder="Customer Name"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />

            <button
            type="submit"
            className="bg-[#3cac84] hover:bg-[#2f8f6f] text-white px-5 py-2 rounded-md w-full font-medium transition"
            >
            Create Order
            </button>
        </form>
      </div>
    );
  }

  if (type === "update") {
    return (
      <div className="w-full max-w-md">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Order ID"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
          <input
            type="text"
            placeholder="Updated Order Name"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
          <input
            type="number"
            placeholder="Updated Quantity"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />

           <button
            type="submit"
            className="bg-[#021d12] hover:bg-[#064e3b] text-white px-5 py-2 rounded-md w-full font-medium transition"
            >
            Update Order
            </button>
        </form>
      </div>
    );
  }

  return null;
};

export default OrdersForm;

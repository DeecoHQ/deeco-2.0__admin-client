"use client";

import React from "react";

type Props = {
  type: "create" | "update";
};

const BrandForm: React.FC<Props> = ({ type }) => {
  if (type === "create") {
    return (
      <div className="w-full max-w-md">
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Brand Name"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
          <textarea
            placeholder="Brand Description"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
          <button
            type="submit"
            className="bg-[#3cac84] hover:bg-[#2f8f6f] text-white px-5 py-2 rounded-md w-full font-medium transition"
          >
            Create Brand
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
            placeholder="Brand ID"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
          <input
            type="text"
            placeholder="Updated Brand Name"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
          <textarea
            placeholder="Updated Description"
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
          <button
            type="submit"
            className="bg-[#021d12] hover:bg-[#064e3b] text-white px-5 py-2 rounded-md w-full font-medium transition"
          >
            Update Brand
          </button>
        </form>
      </div>
    );
  }

  return null;
};

export default BrandForm;

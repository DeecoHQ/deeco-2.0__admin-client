"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "@/app/rtk-base/slices/counter-slice";

export default function Home() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Redux Counter Example 🚀
      </h1>

      <p className="text-lg text-gray-600 text-center max-w-xl mb-8">
        This counter is powered by Redux Toolkit.
      </p>

      <div className="text-center">
        <p className="text-2xl font-bold mb-4 text-black">Count: {count}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => dispatch(increment())}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch(decrement())}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Decrement
          </button>
          <button
            onClick={() => dispatch(reset())}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}

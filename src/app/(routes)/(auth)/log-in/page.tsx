"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="login-page pt-12 pb-16 my-20 sm:my-32 mx-3 px-3 rounded border sm:w-[400px] sm:mx-auto">
      <div className="flex flex-col sm:px-3 gap-8">
        <div className="poppins logo-wrapper poppins font-bold text-purple-800 text-xl sm:text-3xl text-center">
          Deeco/login
        </div>

        <p className="mt-2 text-[14px] w-full mx-auto leading-7 text-center">
          “Productivity is being able to do things that you were never able to
          do before.”
          <br />
          <span className="font-bold">~ Franz Kafka</span>
        </p>

        <form>
          <div className="input-group flex flex-col mb-6 text-[12px] sm:text-[14px]">
            <label htmlFor="email">Email</label>
            <input
              className="mt-2 px-3 py-2 border outline-none rounded"
              type="email"
              required
              placeholder="please input your username"
              id="email"
            />
          </div>

          <div className="input-group flex flex-col mb-6 text-[12px] sm:text-[14px]">
            <label htmlFor="password">Password</label>
            <input
              className="mt-2 px-3 py-2 border outline-none rounded"
              type="password"
              required
              placeholder="please input your password"
              id="password"
            />
          </div>

          <button
            type="submit"
            className="submit text-center bg-green-500 py-3 text-[12px] sm:text-[14px] text-white rounded w-full"
          >
            Submit
          </button>

          <p className="text-center text-[12px] sm:text-[14px] mt-4">
            New to Deeco?{" "}
            <Link href="/sign-up" className="underline text-purple-800">
              sign-up instead
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

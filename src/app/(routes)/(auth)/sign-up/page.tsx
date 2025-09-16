import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="login-page mx-3 px-3 pt-12 pb-16 my-20 sm:my-32 rounded border sm:w-[400px] sm:mx-auto">
      <div className="flex sm:px-3 flex-col gap-8">
        <div className="poppins logo-wrapper poppins font-bold text-purple-800 text-xl sm:text-3xl text-center">
          Deeco/sign up
        </div>
        <p className="mt-2 text-[14px] w-full mx-auto leading-7 text-center">
          “The tragedy in life doesn’t lie in not reaching your goal. The tragedy lies in having no goal to reach.”
          <br />
          <span className="font-bold">~ Benjamin E. Mays</span>
        </p>

        <form>
          <div className="full-name input-group flex flex-col mb-6 text-[12px] sm:text-[14px]">
            <label htmlFor="full-name">Full name</label>
            <input
              className="mt-2 px-3 py-2 border outline-none rounded"
              type="text"
              required
              placeholder="please input your full name"
              id="fullName"
            />
          </div>
          <div className="email input-group flex flex-col mb-6 text-[12px] sm:text-[14px]">
            <label htmlFor="email">Email</label>
            <input
              className="mt-2 px-3 py-2 border outline-none rounded"
              type="email"
              required
              placeholder="please add your email address"
              id="email"
            />
          </div>
          <div className="password input-group flex flex-col mb-6 text-[12px] sm:text-[14px]">
            <label htmlFor="password">Password</label>
            <input
              className="mt-2 px-3 py-2 border outline-none rounded"
              type="password"
              required
              placeholder="please input your password"
              id="password"
            />
          </div>
          <div className="confirm-password input-group flex flex-col mb-6 text-[12px] sm:text-[14px]">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              className="mt-2 px-3 py-2 border outline-none rounded"
              type="password"
              required
              placeholder="re-enter password to confirm"
              id="confirm-password"
            />
          </div>
          <button
            type="button"
            className="submit text-center bg-green-500 py-3 text-[12px] sm:text-[14px] text-white rounded w-full"
          >
            Submit
          </button>
          <p className="text-center text-[12px] sm:text-[14px] mt-4">
            Have an account?{" "}
            <Link href="/log-in" className="underline text-purple-800">
              log-in instead
            </Link>{" "}
          </p>
        </form>
      </div>
    </main>
  );
}

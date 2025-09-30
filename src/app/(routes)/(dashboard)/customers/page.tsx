import PageRoutesIndicator from "../components/PageRoutesIndicator";

export default function CustomersPage() {
  return (
    <main className='min-h-screen flex flex-col'>
      <section className='border-b-[1px] pb-1 border-gray-200'>
        <PageRoutesIndicator
          pageRoutes='Admin / Customers'
          pageTitle='Customers'
        />
      </section>
      <div className='flex mt-[150px] items-center justify-center'>
        <div className='text-center md:w-[80%] xl:w-[70%] md:mx-auto'>
          <h2 className='text-2xl font-semibold mb-2'>Customers</h2>
          <p className='text-gray-600'>
            You customers will show here where you begin to make sales. <br />
            <br />
            Good Luck!!!
          </p>
        </div>
      </div>
    </main>
  );
}

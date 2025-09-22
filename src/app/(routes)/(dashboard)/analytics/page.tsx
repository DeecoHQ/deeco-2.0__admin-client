import PageRoutesIndicator from "../components/PageRoutesIndicator";

export default function AnalyticsPage() {
  return (
    <main className='min-h-screen flex flex-col'>
      <PageRoutesIndicator
        pageRoutes='Home / Analytics Page'
        pageTitle='Analytics'
      />
      <div className='flex-1 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-semibold mb-2'>Analytics Overview</h2>
          <p className='text-gray-600'>
            This is some dummy text for the analytics page. You can replace it
            with your actual content.
          </p>
        </div>
      </div>
    </main>
  );
}

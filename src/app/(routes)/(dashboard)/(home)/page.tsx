import PageRoutesIndicator from "../components/PageRoutesIndicator";

export default function Home() {
  return (
  <>
   <main className="p-6 min-h-screen flex flex-col">
     <PageRoutesIndicator pageRoutes="Admin / Dashboard Home" pageTitle="Dashboard Home" />
       <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Home Overview</h2>
            <p className="text-gray-600">
              This is some dummy text for the Home  page.
            </p>
          </div>
      </div>
    </main> 
  </>
   
  );
}

"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '@/app/rtk-base/store';
import { increment, decrement, reset } from "@/app/rtk-base/slices/counter-slice";
import PageRoutesIndicator from "../components/PageRoutesIndicator";

export default function Home() {

const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

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

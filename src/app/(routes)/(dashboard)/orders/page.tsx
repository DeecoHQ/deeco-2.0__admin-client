// import PageRoutesIndicator from "../components/PageRoutesIndicator";

// export default function OrdersPage() {
//   return (
//     <main className="p-6 min-h-screen flex flex-col">
//       <PageRoutesIndicator pageRoutes="Admin / Orders Page" pageTitle="Orders Page" />
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold mb-2">Orders Overview</h2>
//           <p className="text-gray-600">This is some dummy text for the Orders page.</p>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import PageRoutesIndicator from "../components/PageRoutesIndicator";
import { MdLibraryAdd, MdOutlineNoteAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/rtk-base/slices/entityFormSlice";
import FloatingActionGroup from "./../components/FloatingActionGroup";

export default function OrdersPage() {
  const dispatch = useDispatch();

  return (
    <main className="p-6 min-h-screen flex flex-col">
      <PageRoutesIndicator
        pageRoutes="Admin / Orders Page"
        pageTitle="Orders Page"
      />

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Orders Overview</h2>
          <p className="text-gray-600">
            This is some dummy text for the Orders page.
          </p>
        </div>
      </div>

      {/* ✅ Reusable Floating Buttons */}
      <FloatingActionGroup
        actions={[
          {
            icon: <MdOutlineNoteAlt size={32} />,
            onClick: () =>
              dispatch(showModal({ type: "update", entity: "orders" })),
            label: "Update Order",
          },
          {
            icon: <MdLibraryAdd size={32} />,
            onClick: () =>
              dispatch(showModal({ type: "create", entity: "orders" })),
            label: "Create Order",
          },
        ]}
      />
    </main>
  );
}

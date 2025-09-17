'use client';
import Link from 'next/link';
import {
  HiHome,
  HiShoppingBag,
  HiMiniSquaresPlus,
  HiUserGroup,
  HiMiniWrenchScrewdriver,
  HiMiniViewColumns,
  HiClipboardDocumentList,
  HiBuildingStorefront,
  HiQueueList,
  HiChartBar,
  HiCog6Tooth,
  HiPlusCircle,
  HiOutlineXMark,
} from 'react-icons/hi2';

const sidebarLinks = [
  { path: '/', label: 'Home', icon: <HiHome className="text-[18px]" /> },
  { path: '/orders', label: 'Orders', icon: <HiShoppingBag className="text-[18px]" /> },
  { path: '/products', label: 'Products', icon: <HiMiniSquaresPlus className="text-[18px]" /> },
  { path: '/customers', label: 'Customers', icon: <HiUserGroup className="text-[18px]" /> },
  { path: '/brands', label: 'Brands', icon: <HiMiniViewColumns className="text-[18px]" /> },
  { path: '/categories', label: 'Categories', icon: <HiBuildingStorefront className="text-[18px]" /> },
  { path: '/analytics', label: 'Analytics', icon: <HiChartBar className="text-[18px]" /> },
];

type NavLinksProps = {
  toggleSideBar: () => void;
};


const MobileNavLinksArea = ({ toggleSideBar }: NavLinksProps) => {

  return (
    <aside className="p-2">
      <div className="text-[12px] flex justify-end">
        <section onClick={toggleSideBar} className="w-[40px] h-[40px] border-[1px] rounded-full flex items-center justify-center">
          <HiOutlineXMark className="text-[25px]" />
        </section>
      </div>
      <div className=" py-4">
        <ul className="flex flex-col gap-y-1">
          {sidebarLinks.map(({ path, label, icon }) => (
            <li key={path}>
              <Link onClick={toggleSideBar}
                href={path}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 text-sm font-medium text-gray-800"
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider sections */}
        <div className="mt-6 text-xs font-semibold text-gray-500 px-3">Sales channels</div>
        <ul className="mt-2 flex flex-col gap-y-1">
          <li>
            <Link
              href="/online-store"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 text-sm text-gray-800"
            >
              <HiBuildingStorefront className="text-[18px]" />
              <span>Online Store</span>
            </Link>
          </li>
        </ul>

        <div className="mt-6 text-xs font-semibold text-gray-500 px-3">Apps</div>
        <ul className="mt-2 flex flex-col gap-y-1">
          <li>
            <Link
              href="/apps/add"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 text-sm text-gray-800"
            >
              <HiPlusCircle className="text-[18px]" />
              <span>Add</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom settings */}
      <div className="px-3 py-4 border-t border-gray-200">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 text-sm text-gray-800"
        >
          <HiCog6Tooth className="text-[18px]" />
          <span>Settings</span>
        </Link>
      </div>
    {/* // </nav> */}
     </aside>
  );
};

export default MobileNavLinksArea;

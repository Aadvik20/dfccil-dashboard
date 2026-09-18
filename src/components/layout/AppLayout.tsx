import { Outlet } from "react-router-dom";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f8f9ff]">

      <Header />

      <div className="">
        <Sidebar />
        <main className="min-h-screen flex-1 md:ml-64">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
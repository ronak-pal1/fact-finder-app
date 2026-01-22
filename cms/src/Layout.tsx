import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#F5F7F8] font-sans">
            <Sidebar />

            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 ml-64 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout;
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBook, FiVideo, FiUsers, FiLogOut } from "react-icons/fi";

const sidebarLinks = [
    {
        title: "Dashboard",
        path: "/",
        icon: <FiHome size={20} />,
    },
    {
        title: "Users",
        path: "/users",
        icon: <FiUsers size={20} />,
    },
    {
        title: "Courses",
        path: "/courses",
        icon: <FiBook size={20} />,
    },
    {
        title: "Videos",
        path: "/videos",
        icon: <FiVideo size={20} />,
    },
    {
        title: "Bookings",
        path: "/bookings",
        icon: <FiUsers size={20} />,
    },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 bottom-0 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="p-8 pb-4">
                <h1 className="text-2xl font-bold tracking-tight text-[#1B2B2D] font-['Outfit']">
                    Fact Finder
                </h1>
                <span className="text-[10px] font-bold text-[#5C7174] uppercase tracking-[0.2em] mt-1 block">Admin Portal</span>
            </div>

            <nav className="flex-1 py-6 px-4">
                <ul className="space-y-2">
                    {sidebarLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                                        ? "bg-[#1B2B2D] text-white shadow-lg shadow-[#1B2B2D]/20"
                                        : "text-[#5C7174] hover:bg-gray-50 hover:text-[#1B2B2D]"
                                        }`}
                                >
                                    <span className={`text-xl ${isActive ? "text-white" : "text-[#5C7174] group-hover:text-[#1B2B2D]"}`}>
                                        {link.icon}
                                    </span>
                                    <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{link.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-100 m-4">
                <button className="flex items-center justify-center w-full gap-2 text-[#5C7174] hover:text-[#1B2B2D] hover:bg-gray-50 p-3 rounded-xl transition-all">
                    <FiLogOut size={20} />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
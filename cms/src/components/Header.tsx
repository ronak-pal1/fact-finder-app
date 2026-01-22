
const Header = () => {
    return (
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 py-4 ml-64">
            <div>
                <h2 className="text-xl font-semibold text-[#1B2B2D]">Overview</h2>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#1B2B2D] font-bold border border-[#4CAF50]">
                    A
                </div>
            </div>
        </header>
    );
};

export default Header;

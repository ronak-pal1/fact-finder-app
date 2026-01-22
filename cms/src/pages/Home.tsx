

const Home = () => {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#1B2B2D]">Dashboard</h1>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-[#5C7174]">
                        Last 30 Days
                    </button>
                    <button className="px-4 py-2 bg-[#1B2B2D] text-white rounded-lg text-sm font-medium hover:bg-[#2c4346]">
                        Download Report
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Courses", value: "12", change: "+2 this month" },
                    { label: "Total Students", value: "1,234", change: "+12% vs last month" },
                    { label: "Total Revenue", value: "$45,231.89", change: "+5% vs last month" },
                ].map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-sm font-medium text-[#5C7174] mb-2">{stat.label}</h3>
                        <p className="text-3xl font-bold text-[#1B2B2D] mb-4">{stat.value}</p>
                        <span className="text-xs font-medium text-[#4CAF50] bg-[#E8F5E9] px-2 py-1 rounded-full">
                            {stat.change}
                        </span>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Sections */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#1B2B2D]">Recent Courses</h2>
                    <button className="text-sm font-medium text-[#4CAF50] hover:text-[#388E3C] transition-colors">
                        View All
                    </button>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-[#E8F5E9] transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                    {/* Thumbnail Placeholder */}
                                    <div className="w-full h-full bg-[#1B2B2D] opacity-10"></div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#1B2B2D] group-hover:text-[#4CAF50] transition-colors">Complete Web Development Bootcamp 2024</h4>
                                    <p className="text-sm text-[#5C7174]">Updated 2 hours ago</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-[#5C7174]">$49.99</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;
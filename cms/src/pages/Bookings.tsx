const Bookings = () => {
    return (
        <div className="space-y-8 font-['Inter']">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#1B2B2D] font-['Outfit']">Bookings</h1>
                    <p className="text-[#5C7174] mt-1">Track student enrollments and payments</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-[#5C7174]">
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-[#5C7174] text-sm">Student</th>
                            <th className="px-6 py-4 font-semibold text-[#5C7174] text-sm">Course</th>
                            <th className="px-6 py-4 font-semibold text-[#5C7174] text-sm">Date</th>
                            <th className="px-6 py-4 font-semibold text-[#5C7174] text-sm">Status</th>
                            <th className="px-6 py-4 font-semibold text-[#5C7174] text-sm">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#4CAF50] text-xs font-bold">
                                            SJ
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#1B2B2D] text-sm">Sarah Jenkins</p>
                                            <p className="text-xs text-[#5C7174]">sarah@example.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#1B2B2D]">Complete React Guide</td>
                                <td className="px-6 py-4 text-sm text-[#5C7174]">Oct 24, 2024</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Confirmed
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-[#1B2B2D]">$49.99</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;

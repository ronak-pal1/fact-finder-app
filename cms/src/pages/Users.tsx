import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiSearch, FiFilter } from "react-icons/fi";

const Users = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234 567 8900", kycStatus: "verified", joinDate: "2024-01-15" },
        { id: 2, name: "Alice Smith", email: "alice@example.com", phone: "+1 987 654 3210", kycStatus: "pending", joinDate: "2024-02-01" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "+1 555 123 4567", kycStatus: "rejected", joinDate: "2024-02-10" },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "verified": return "bg-green-100 text-green-700";
            case "pending": return "bg-orange-100 text-orange-700";
            case "rejected": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="space-y-8 font-['Inter']">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#1B2B2D] font-['Outfit']">Users</h1>
                    <p className="text-[#5C7174] mt-1">Manage registered users and KYC verification</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2B2D] w-64"
                        />
                    </div>
                    <button className="px-4 py-2.5 bg-white border border-gray-200 text-[#1B2B2D] rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2">
                        <FiFilter /> Filter
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 font-semibold text-[#5C7174] text-sm">User Details</th>
                            <th className="px-8 py-5 font-semibold text-[#5C7174] text-sm">Contact Info</th>
                            <th className="px-8 py-5 font-semibold text-[#5C7174] text-sm">Join Date</th>
                            <th className="px-8 py-5 font-semibold text-[#5C7174] text-sm">KYC Status</th>
                            <th className="px-8 py-5 font-semibold text-[#5C7174] text-sm text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#4CAF50] font-bold text-sm">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#1B2B2D]">{user.name}</p>
                                            <p className="text-xs text-[#5C7174]">ID: #{user.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <p className="text-sm text-[#1B2B2D]">{user.email}</p>
                                    <p className="text-xs text-[#5C7174] mt-0.5">{user.phone}</p>
                                </td>
                                <td className="px-8 py-5 text-sm text-[#5C7174]">{user.joinDate}</td>
                                <td className="px-8 py-5">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(user.kycStatus)}`}>
                                        {user.kycStatus}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <Link
                                        to={`/users/${user.id}/kyc`}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1B2B2D] text-white rounded-lg text-xs font-medium hover:bg-[#2c4346] transition-colors shadow-lg shadow-[#1B2B2D]/20"
                                    >
                                        <FiEye /> View KYC
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;

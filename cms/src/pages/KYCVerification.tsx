import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiX, FiUser, FiSmartphone, FiMapPin } from "react-icons/fi";

const KYCVerification = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    // Mock Data
    const user = {
        name: "Alice Smith",
        email: "alice@example.com",
        phone: "+1 987 654 3210",
        address: "123 Main St, New York, NY 10001",
        kycStatus: "pending",
        documents: {
            selfie: "https://via.placeholder.com/300x400?text=Selfie",
            aadharFront: "https://via.placeholder.com/400x250?text=Aadhar+Front",
            aadharBack: "https://via.placeholder.com/400x250?text=Aadhar+Back",
        }
    };

    const handleApprove = () => {
        // Call API
        alert("KYC Approved");
        navigate("/users");
    };

    const handleReject = () => {
        // Call API
        alert("KYC Rejected");
        navigate("/users");
    };

    return (
        <div className="space-y-8 font-['Inter'] max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate("/users")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-[#5C7174]">
                        <FiArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-[#1B2B2D] font-['Outfit']">KYC Verification</h1>
                        <p className="text-[#5C7174] mt-1">Review documents for user #{userId}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleReject}
                        className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-100 transition-all flex items-center gap-2"
                    >
                        <FiX /> Reject
                    </button>
                    <button
                        onClick={handleApprove}
                        className="px-6 py-3 bg-[#4CAF50] text-white rounded-xl font-bold hover:bg-[#43A047] transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
                    >
                        <FiCheck /> Approve
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Info Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#4CAF50] text-2xl font-bold mb-4 mx-auto">
                            {user.name.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold text-[#1B2B2D] text-center mb-1">{user.name}</h2>
                        <span className="block text-center text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full w-fit mx-auto mb-6">
                            {user.kycStatus.toUpperCase()}
                        </span>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                <FiUser className="mt-1 text-[#5C7174]" />
                                <div>
                                    <p className="text-xs text-[#5C7174] font-medium uppercase tracking-wider">Email</p>
                                    <p className="text-[#1B2B2D] font-medium">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                <FiSmartphone className="mt-1 text-[#5C7174]" />
                                <div>
                                    <p className="text-xs text-[#5C7174] font-medium uppercase tracking-wider">Phone</p>
                                    <p className="text-[#1B2B2D] font-medium">{user.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                <FiMapPin className="mt-1 text-[#5C7174]" />
                                <div>
                                    <p className="text-xs text-[#5C7174] font-medium uppercase tracking-wider">Address</p>
                                    <p className="text-[#1B2B2D] font-medium">{user.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documents Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Selfie */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-[#1B2B2D] mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center text-[#4CAF50] text-sm">1</span>
                            Selfie Verification
                        </h3>
                        <div className="aspect-[3/4] max-w-sm bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 mx-auto">
                            <img src={user.documents.selfie} alt="Selfie" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Aadhar Cards */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-[#1B2B2D] mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-[#E8F5E9] flex items-center justify-center text-[#4CAF50] text-sm">2</span>
                            Aadhar Card Documents
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-[#5C7174] ml-1">Front Side</p>
                                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200">
                                    <img src={user.documents.aadharFront} alt="Aadhar Front" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-[#5C7174] ml-1">Back Side</p>
                                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200">
                                    <img src={user.documents.aadharBack} alt="Aadhar Back" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KYCVerification;

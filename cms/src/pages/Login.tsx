import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="flex flex-col md:flex-row w-full bg-white rounded-[40px] overflow-hidden shadow-xl h-screen">

            {/* Left Side */}
            <div className="w-full md:w-1/2 bg-[#E8F5E9] p-12 flex flex-col items-center justify-center text-center">


            </div>

            {/* Right Side: Login Form */}
            <div className="w-full md:w-1/2 p-12 flex flex-col items-center justify-center">
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-12">
                        <span className="text-2xl  tracking-widest text-[#1B2B2D]">
                            Fact Finder Admin
                        </span>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#5C7174] ml-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="johnsmith007"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#5C7174] ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="***********"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#1B2B2D] text-white py-4 rounded-lg font-semibold hover:bg-[#2c4346] transition-colors mt-4"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Login;
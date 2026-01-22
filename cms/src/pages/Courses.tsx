import { Link } from "react-router-dom";
import { useState } from "react";
import { FiPlus, FiVideo, FiEdit3, FiMoreHorizontal, FiBook } from "react-icons/fi";

// Mock Data
const sections = [
    {
        id: 1,
        title: "Web Development",
        courses: [
            { id: 101, title: "Complete React Guide", price: 49.99, videos: 24, thumbnail: "" },
            { id: 102, title: "Advanced Node.js", price: 59.99, videos: 18, thumbnail: "" }
        ]
    },
    {
        id: 2,
        title: "Mobile App Development",
        courses: [
            { id: 201, title: "Flutter Zero to Hero", price: 39.99, videos: 40, thumbnail: "" },
        ]
    }
];

const Courses = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [courseSections, setCourseSections] = useState(sections);

    return (
        <div className="space-y-8 font-['Inter']">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#1B2B2D] font-['Outfit']">Courses</h1>
                    <p className="text-[#5C7174] mt-1">Manage your course sections and content</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white border border-gray-200 text-[#1B2B2D] rounded-xl font-medium hover:bg-gray-50 transition-all shadow-sm">
                        + Add Section
                    </button>
                    <Link to="/courses/add" className="px-5 py-2.5 bg-[#1B2B2D] text-white rounded-xl font-medium hover:bg-[#2c4346] transition-all shadow-lg shadow-[#1B2B2D]/20">
                        + Add Course
                    </Link>
                </div>
            </div>

            <div className="space-y-10">
                {courseSections.map((section) => (
                    <div key={section.id} className="animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-[#1B2B2D] font-['Outfit']">{section.title}</h2>
                            <button className="text-sm font-medium text-[#5C7174] hover:text-[#1B2B2D]">Edit Section</button>
                        </div>

                        <div className="flex flex-wrap gap-8">
                            {section.courses.map((course) => (
                                <div key={course.id} className="w-full sm:w-[340px] md:w-[360px] group bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer flex flex-col h-full shrink-0">
                                    <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-4">
                                        <div className="absolute inset-0 bg-[#1B2B2D]/5 group-hover:bg-[#1B2B2D]/0 transition-colors" />
                                        {/* Placeholder for thumbnail */}
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <FiBook size={48} />
                                        </div>
                                        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-[#1B2B2D] shadow-sm">
                                            <FiMoreHorizontal />
                                        </button>
                                    </div>

                                    <div className="px-2 pb-2 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1B2B2D] line-clamp-1 group-hover:text-[#4CAF50] transition-colors mb-2">{course.title}</h3>
                                            <div className="flex items-center gap-4 text-sm text-[#5C7174]">
                                                <div className="flex items-center gap-1.5">
                                                    <FiVideo />
                                                    <span>{course.videos} Videos</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                                            <span className="text-2xl font-bold text-[#1B2B2D]">${course.price}</span>
                                            <button className="text-sm font-medium text-[#4CAF50] hover:underline">Manage</button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add Course Card Placeholder */}
                            <Link to="/courses/add" className="w-full sm:w-[340px] md:w-[360px] flex flex-col items-center justify-center aspect-video rounded-3xl border-2 border-dashed border-gray-200 hover:border-[#4CAF50] hover:bg-green-50/30 transition-all group cursor-pointer h-full min-h-[340px] shrink-0">
                                <div className="w-16 h-16 rounded-full bg-gray-50 group-hover:bg-[#E8F5E9] flex items-center justify-center text-gray-400 group-hover:text-[#4CAF50] transition-colors mb-4">
                                    <FiPlus size={32} />
                                </div>
                                <span className="text-base font-medium text-[#5C7174] group-hover:text-[#4CAF50]">Add Course to {section.title}</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;

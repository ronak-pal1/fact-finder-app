import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
    const navigate = useNavigate();
    const [sections, setSections] = useState([{ id: 1, title: "", videos: [] }]);

    const addSection = () => {
        setSections([...sections, { id: Date.now(), title: "", videos: [] }]);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Add save logic here
        navigate("/courses");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#1B2B2D]">Add New Course</h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate("/courses")}
                        className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-[#5C7174]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-[#1B2B2D] text-white rounded-lg text-sm font-medium hover:bg-[#2c4346]"
                    >
                        Publish Course
                    </button>
                </div>
            </div>

            <form className="space-y-8" onSubmit={handleSave}>
                {/* Basic Info */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold text-[#1B2B2D] mb-6 border-b border-gray-100 pb-4">Course Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#5C7174] ml-1">Title</label>
                            <input type="text" placeholder="e.g. Advanced Web Development" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#5C7174] ml-1">Price ($)</label>
                            <input type="number" placeholder="49.99" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[#5C7174] ml-1">Description</label>
                        <textarea rows={4} placeholder="Course description..." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#5C7174] ml-1">Thumbnail</label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-[#4CAF50] transition-colors cursor-pointer bg-gray-50">
                                <p className="text-sm text-[#5C7174]">Click to upload thumbnail</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#5C7174] ml-1">Preview Video</label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-[#4CAF50] transition-colors cursor-pointer bg-gray-50">
                                <p className="text-sm text-[#5C7174]">Click to upload video</p>
                                <p className="text-xs text-gray-400 mt-1">MP4 up to 50MB</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#1B2B2D]">Course Content</h2>
                        <button
                            type="button"
                            onClick={addSection}
                            className="text-sm font-medium text-[#4CAF50] hover:text-[#388E3C]"
                        >
                            + Add Section
                        </button>
                    </div>

                    {sections.map((section, index) => (
                        <div key={section.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="w-8 h-8 flex items-center justify-center bg-[#E8F5E9] text-[#4CAF50] font-bold rounded-lg text-sm">
                                    {index + 1}
                                </span>
                                <input
                                    type="text"
                                    placeholder="Section Title (e.g. Introduction)"
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all"
                                />
                            </div>

                            <div className="pl-12">
                                <div className="border-2 border-dashed border-gray-100 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                                    <span className="text-sm text-[#5C7174]">+ Upload Episode Video</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default AddCourse;

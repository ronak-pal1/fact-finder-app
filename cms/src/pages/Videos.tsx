const Videos = () => {
    return (
        <div className="space-y-8 font-['Inter']">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#1B2B2D] font-['Outfit']">Video Library</h1>
                    <p className="text-[#5C7174] mt-1">Manage all your uploaded video assets</p>
                </div>
                <button className="px-5 py-2.5 bg-[#1B2B2D] text-white rounded-xl font-medium hover:bg-[#2c4346] transition-all shadow-lg shadow-[#1B2B2D]/20">
                    Upload Video
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center py-20">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-gray-300">🎥</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B2B2D] mb-2">No videos uploaded yet</h3>
                <p className="text-[#5C7174] max-w-md mx-auto mb-6">Upload videos to your library to use them in your courses. You can bulk upload multiple files at once.</p>
                <button className="text-[#4CAF50] font-medium hover:underline">
                    Browse Files
                </button>
            </div>
        </div>
    );
};

export default Videos;

const SiteLoading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
            <div className="spinner">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default SiteLoading;

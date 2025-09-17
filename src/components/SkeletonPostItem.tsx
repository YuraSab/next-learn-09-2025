const SkeletonPostItem = () => {
    return (
        <div className="h-35 p-4 border border-gray-200 rounded-md">
            <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2 animate-pulse" />
            <div className="h-4 bg-blue-500 rounded-md w-1/16 animate-pulse" />
        </div>
    );
};

export default SkeletonPostItem;
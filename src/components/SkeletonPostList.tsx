import SkeletonPostItem from "@/components/SkeletonPostItem";

const SkeletonPostList = () => {
    return (
        <div className={"space-y-4 w-full"}> {/* Додано клас w-full */}
            <h4 className={"text-2xl font-bold mb-4"}>Post list</h4>
            {
                Array.from({length: 10}).map((_, index) => <SkeletonPostItem key={index}/>)
            }
        </div>
    );
};

export default SkeletonPostList;
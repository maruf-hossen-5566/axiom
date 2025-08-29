import {Skeleton} from "@/components/ui/skeleton.jsx";

function SingleCommentSkeleton() {
    return (<div className="w-full pt-5 pb-5 flex items-start gap-2">
            <div className="w-full">
                <div className="w-full flex items-center justify-between gap-4">
                    <Skeleton className="size-8 shrink-0 rounded-full"/>

                    <div className="w-full flex flex-col gap-1">
                        <Skeleton className="h-3 w-24 rounded-full"/>
                        <Skeleton className="h-2.5 w-16 rounded-full"/>
                    </div>
                </div>

                <div className="text-sm mt-3 leading-relaxed">
                    <Skeleton className="h-3 mb-2 w-full rounded-full"/>
                    <Skeleton className="h-3 mb-2 w-full rounded-full"/>
                    <Skeleton className="h-3 w-4/5 rounded-full"/>
                </div>

                <div className="mt-5 w-full flex items-center justify-start gap-4">
                    <Skeleton className="h-7 w-12 rounded-full"/>
                    <Skeleton className="h-7 w-12 rounded-full"/>
                </div>
            </div>
        </div>
    )
};

export default SingleCommentSkeleton;
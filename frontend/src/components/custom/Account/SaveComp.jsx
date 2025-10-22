import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {cn} from "@/lib/utils.js";

const SaveComp = ({className = "", loading = false, setData, handleUpdate}) => {
    return (
        <div className={cn("w-full  bg-background flex items-start justify-between gap-4", className)}>
            {
                setData &&
                <Button
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => setData()}
                    disabled={loading}
                >
                    Reset
                </Button>
            }
            <Button
                className="ml-auto rounded-full"
                onClick={(e) => handleUpdate(e)}
                disabled={loading}
            >
                Update
            </Button>
        </div>
    );
};

export default SaveComp;
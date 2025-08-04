import React from 'react';
import {Button} from "@/components/ui/button.jsx";

const Publish = () => {


    return (<>
        <div className={"w-full fixed bottom-0 max-xs:hidden border-t"}>
            <div className={"max-w-screen-md w-full mx-auto flex justify-between py-2 px-2 xs:px-8 bg-white dark:bg-background"}>
                <Button
                    variant={"ghost"}
                    className={"rounded-full"}
                >Cancel</Button>
                <Button className={"rounded-full"}>Publish</Button>
            </div>
        </div>
    </>);
};

export default Publish;
import {Button} from "@/components/ui/button.jsx";
import PublishButton from "@/components/custom/Post/New/PublishButton.jsx";

const Publish = () => {


    return (<>
        <div className={"w-full fixed bottom-0 max-xs:hidden border-t"}>
            <div className={"max-w-screen-md w-full mx-auto flex justify-between py-2 px-2 xs:px-8 bg-white dark:bg-background"}>
                <Button
                    variant={"ghost"}
                    className={"rounded-full"}
                >Cancel</Button>
                <PublishButton/>
            </div>
        </div>
    </>);
};

export default Publish;
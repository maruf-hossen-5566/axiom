import {Bell, Sun} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";

const NotificationButton = () => {
    return (
        <Button
            size={"icon"}
            variant={"ghost"}
            className={"cursor-pointer rounded-full duration-0"}
        >
            <Bell/>
        </Button>
    );
};

export default NotificationButton;
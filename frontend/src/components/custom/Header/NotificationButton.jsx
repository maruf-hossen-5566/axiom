import {Bell, Sun} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";

const NotificationButton = () => {
    return (
        <Button
            size="icon"
            variant="ghost"
            className="max-sm:hidden cursor-pointer rounded-full duration-0"
            asChild
        >
            <Link to="/notification">
                <Bell/>
            </Link>
        </Button>
    );
};

export default NotificationButton;

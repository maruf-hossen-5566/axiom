import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";

const AuthButtons = () => {
    return (<>
        <Button asChild className={"rounded-full duration-0"}>
            <Link to={"login"}>
                Login
            </Link>
        </Button>
        <Button asChild className={"rounded-full duration-0"}>
            <Link to={"signup"}>
                Sign Up
            </Link>
        </Button>
    </>);
};

export default AuthButtons;
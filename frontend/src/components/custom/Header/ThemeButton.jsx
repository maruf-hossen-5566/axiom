import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {Sun} from "lucide-react";

const ThemeButton = () => {
    return (
        <div>
            <Button size={"icon"} variant={"ghost"} className={"cursor-pointer"}>
                <Sun/>
            </Button>
        </div>
    );
};

export default ThemeButton;
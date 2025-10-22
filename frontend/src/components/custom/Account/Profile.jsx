import PageHeader from "@/components/custom/Dashboard/PageHeader.jsx";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import useUserStore from "@/store/userStore.js";
import {Image} from "lucide-react";
import CustomInput from "./CustomInput";
import {useRef, useState} from "react";
import {toast} from "sonner";
import {updateProfile} from "@/api/authApi.js";
import {multiToast} from "@/utils/toast.js";
import SaveComp from "@/components/custom/Account/SaveComp.jsx";

export const Profile = () => {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const [loading, setLoading] = useState(false);
    const initialData = {
        avatar: user?.avatar,
        full_name: user?.full_name,
        username: user?.username,
        email: user?.email,
        bio: user?.bio || "",
        location: user?.location || "",
        website: user?.website || "",
    }
    const [data, setData] = useState(initialData);
    const avatarRef = useRef(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const fileTypes = ["image/jpeg", "image/png"];

        if (file) {
            const validFileType = fileTypes.includes(file.type);
            if (!validFileType) {
                e.target.value = "";
                toast.error("Invalid file type");
                return;
            }

            const validFileSize = file.size <= 1024 * 1024;
            if (!validFileSize) {
                e.target.value = "";
                toast.error("File size shouldn't exceed 1MB");
                return;
            }

            const reader = new FileReader();

            reader.onloadend = () => {
                avatarRef.current.src = reader.result;
            };
            reader.readAsDataURL(file);

            setData({...data, avatar: file})
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true);

        const formData = new FormData()

        Object.keys(data)?.map((key) => {
            if (key === "avatar") {
                if (typeof data[key] === "object") {
                    formData.append(key, data[key])
                }
            } else {
                formData.append(key, data[key])
            }
        })


        try {
            const res = await updateProfile(formData);
            setUser(res?.data?.user);
            toast?.success(
                res?.data?.detail || "Profile updated successfully."
            );
        } catch (error) {
            setData(initialData)
            multiToast(error?.response?.data, "Failed to update profile.")
        }
        setLoading(false)
    };

    const handleInputChange = (key, e) => {
        setData({
            ...data,
            [key]: e.target.value,
        });
    };

    return (
        <div className="w-full flex flex-col items-start justify-start">
            <PageHeader
                title="Profile"
                subtitle="Manage your profile settings."
            />
            <div className="w-full flex flex-col items-start justify-start gap-8 pt-8 border-t">
                <div className="w-full flex flex-col items-start gap-3">
                    <Label htmlFor="avatar">Avatar</Label>
                    <div className="dark:bg-input/30 shadow-xs p-4 w-full flex items-center gap-6 border rounded-lg">
                        <img
                            ref={avatarRef}
                            src={
                                data?.avatar || "https://github.com/shadcn.png"
                            }
                            alt="Avatar"
                            className="size-20 rounded-full"
                        />
                        <Input
                            type="file"
                            accept="image/jpeg, image/png"
                            id="avatar"
                            className="hidden"
                            onChange={(e) => handleAvatarChange(e)}
                        />
                        <div className="flex flex-col gap-4">
                            <Button
                                asChild
                                variant="outline"
                                className="rounded-full"
                            >
                                <Label htmlFor="avatar">
                                    <Image/> Change Avatar
                                </Label>
                            </Button>
                            <p className="text-xs">PNG, JPEG: 1MB</p>
                        </div>
                    </div>
                </div>
                <CustomInput
                    label="Name"
                    htmlFor="name"
                    value={data?.full_name}
                    valueChange={(e) => handleInputChange("full_name", e)}
                />
                <CustomInput
                    label="Username"
                    htmlFor="username"
                    value={data?.username}
                    valueChange={(e) => handleInputChange("username", e)}
                />
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="bio">Your Bio</Label>
                    <Textarea
                        className="min-h-28 resize-none"
                        id="bio"
                        placeholder="Brief description about you..."
                        value={data?.bio}
                        onChange={(e) => handleInputChange("bio", e)}
                    />
                </div>
                <CustomInput
                    label="Location"
                    htmlFor="location"
                    value={data?.location}
                    placeholder="New York, USA"
                    valueChange={(e) => handleInputChange("location", e)}
                />
                <CustomInput
                    label="Website"
                    htmlFor="website"
                    value={data?.website}
                    placeholder="https://website.com"
                    valueChange={(e) => handleInputChange("website", e)}
                />

                <SaveComp
                    className="!sticky !bottom-0 py-6 border-t"
                    loading={loading}
                    setData={() => setData(initialData)}
                    handleUpdate={(e) => handleUpdate(e)}
                />
            </div>
        </div>
    );
};

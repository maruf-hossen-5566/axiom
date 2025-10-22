import React, {useRef, useState} from 'react';
import PageHeader from "@/components/custom/Dashboard/PageHeader.jsx";
import CustomInput from "@/components/custom/Account/CustomInput.jsx";
import SaveComp from "@/components/custom/Account/SaveComp.jsx";
import useUserStore from "@/store/userStore.js";
import {Checkbox} from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {multiToast} from "@/utils/toast.js";
import {changePassword, deleteAccount, updateProfile} from "@/api/authApi.js";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {removeTokens} from "@/utils/token.js";

const Security = () => {
    const user = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);
    const setUser = useUserStore((state) => state.setUser);
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false);
    const initialPass = {
        old: "", new: "", confNew: ""
    }
    const [pass, setPass] = useState(initialPass);
    const [email, setEmail] = useState(user?.email)
    const navigate = useNavigate()


    const handleEmailChange = async () => {
        setLoading(true)
        try {
            const data = {...user, ["email"]: email}
            delete data["avatar"]
            const res = await updateProfile(data)
            setUser(res?.data?.user)
            toast.success("Account updated successfully.")
        } catch (error) {
            multiToast(error?.response?.data, "Failed to update email.")
        }
        setLoading(false)
    }

    const handlePasswordChange = async () => {
        setLoading(true)

        const anyEmptyInput = Object.keys(pass)?.some(key => pass[key]?.trim() === "")

        if (anyEmptyInput) {
            toast.warning("Fill the input box properly.")
            setLoading(false)
            return
        }


        if (pass["new"] !== pass["confNew"]) {
            toast.warning("New passwords do not match.")
            setLoading(false)
            return
        }
        const toastId = toast.loading("Loading...")

        try {
            const res = await changePassword(pass)

            toast.loading("Logging out...", {
                id: toastId, duration: Infinity,
            });

            navigate("/");
            removeTokens()
            setTimeout(() => {
                logout();
                toast.success(res?.data?.detail, {
                    id: toastId, duration: 4000,
                });
            }, 500);

        } catch (error) {
            console.log("Error: ", error)
            toast.success(error?.response?.data?.detail, {
                id: toastId, duration: 4000,
            });
        }
        setLoading(false)
    }

    const handleDeleteAccount = async () => {
        setLoading(true)
        if (!confirm("Do you really want to delete your account?")) {
            return
        }

        const toastId = toast.loading("Loading...")
        // toastId.

        try {
            await deleteAccount()
            navigate("/");
            removeTokens()
            setTimeout(() => {
                logout();
                toast.dismiss(toastId)
            }, 500);
        } catch (error) {
            console.log("Error: ", error)
            toast.error(error?.response?.data?.detail, {id: toastId, duration: 4000})
        }
        setLoading(false)
    }


    const handlePassChange = (key, e) => {
        setPass({...pass, [key]: e?.target?.value?.trim()})
    };

    return (<div className="w-full flex flex-col items-start justify-start">
        <PageHeader
            title="Security"
            subtitle="Manage your security settings."
        />
        <div className="w-full pb-8 flex flex-col items-start justify-start gap-8 divide-y">
            <div className="w-full flex flex-col items-start justify-start py-8 border-t">
                <h2 className="w-full mb-8 text-lg">Verification info</h2>
                <div className="w-full flex flex-col items-start justify-start gap-8 ">
                    <CustomInput
                        label="Email"
                        type="email"
                        htmlFor="email"
                        value={email}
                        valueChange={(e) => setEmail(e?.target?.value)}
                    />
                    <SaveComp
                        loading={loading}
                        handleUpdate={(e) => handleEmailChange(e)}
                    />
                </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start pb-8">
                <h2 className="w-full mb-8 text-lg">Set new password</h2>
                <div className="w-full flex flex-col items-start justify-start gap-8">
                    <CustomInput
                        type={showPass ? "text" : "password"}
                        label="Current password"
                        htmlFor="old"
                        value={pass?.old}
                        valueChange={(e) => handlePassChange("old", e)}
                    />
                    <CustomInput
                        type={showPass ? "text" : "password"}
                        label="New password"
                        htmlFor="new"
                        value={pass?.new}
                        valueChange={(e) => handlePassChange("new", e)}
                    />
                    <CustomInput
                        type={showPass ? "text" : "password"}
                        label="Confirm new password"
                        htmlFor="conf-new"
                        value={pass?.confNew}
                        valueChange={(e) => handlePassChange("confNew", e)}
                    />
                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="show-pass"
                            checked={showPass}
                            onClick={() => setShowPass(!showPass)}
                        />
                        <Label htmlFor="show-pass">Show password</Label>
                    </div>

                    <SaveComp
                        className="pt- border-"
                        loading={loading}
                        handleUpdate={(e) => handlePasswordChange(e)}
                    />
                </div>
            </div>
            <div className="w-full flex flex-col items-start justify-start pb-8 border-b">
                <h2 className="w-full mb-8 text-lg">Danger zone</h2>
                <div className="w-full flex flex-col items-start justify-start ">
                    <h3 className="w-full text-destructive text-shadow-md">Delete account</h3>
                    <p className="w-full text-sm mt-2 text-muted-foreground">
                        If you delete your account, all your personal data, posts, and comments will be permanently
                        removed. This action cannot be undone, so please back up any content you want to keep before
                        proceeding. Once deleted, you will lose access to your account and all related features.</p>
                    <Button
                        variant="destructive"
                        className="mt-6 ml-auto"
                        onClick={handleDeleteAccount}
                    >Delete account</Button>
                </div>
            </div>
        </div>
    </div>);
};

export default Security;
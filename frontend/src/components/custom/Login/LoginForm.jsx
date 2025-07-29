import {LoginForm as LForm} from "@/components/login-form.jsx";
import {useState} from "react";
import {toast} from "sonner";
import {login} from "@/api/authApi.js";

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({email: "", password: ""})
    const [formError, setFormError] = useState({email: [], password: []})


    const handleLogin = async (e) => {
        e.preventDefault()

        if (Object.keys(formData).some(key => formData[key].trim() === "")) {
            toast.warning("Please fill the form properly.")
            return
        }

        const toastId = toast.loading("Loading...", {duration: Infinity})

        try {
            setLoading(true)
            const res = await login(formData)
            toast.success(res?.data?.detail || "Login in was successful.", {id: toastId, duration: 4000})
            Object.keys(formData).map((key) => (setFormData(pre => ({...pre, [key]: ""}))))
        } catch (error) {
            toast.error(error?.response?.data?.detail || "Failed to login.", {id: toastId, duration: 4000})
        }
        setLoading(false)
    }

    return (
        <>
            <LForm
                loading={loading}
                data={formData}
                setData={setFormData}
                error={formError}
                setError={setFormError}
                handleSubmit={handleLogin}
            />
        </>
    );
};

export default LoginForm;
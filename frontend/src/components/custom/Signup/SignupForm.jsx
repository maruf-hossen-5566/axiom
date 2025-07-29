import {LoginForm as SForm} from "@/components/login-form.jsx";
import {useState} from "react";
import {toast} from "sonner";
import {signup} from "@/api/authApi.js";

const SignupForm = () => {
    const [formData, setFormData] = useState({full_name: "", username: "", email: "", password: "",})
    const [formError, setFormError] = useState({full_name: [], username: [], email: [], password: [],})
    const [loading, setLoading] = useState(false)

    const setError = (name, value) => {
        setFormError((prev) => ({
            ...prev, [name]: value
        }))
    }


    const handleSignup = async (e) => {
        e.preventDefault()

        if (Object.keys(formData).some(key => formData[key].trim() === "")) {
            toast.warning("Please fill the form properly.")
            return
        }

        try {
            setLoading(true)
            const res = await signup(formData)
            toast.success(res?.data?.detail)
            Object.keys(formData).map((key) => (setFormData(pre => ({...pre, [key]: ""}))))
        } catch (error) {
            Object.keys(error?.response?.data).map((key) => setError(key, error?.response?.data[key]))
        }
        setLoading(false)
    }


    return (<SForm
        loading={loading}
        data={formData}
        setData={setFormData}
        error={formError}
        setError={setFormError}
        handleSubmit={(e) => handleSignup(e)}
    />);
};

export default SignupForm;
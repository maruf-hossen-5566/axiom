import {LoginForm as SForm} from "@/components/login-form.jsx";
import {useState} from "react";
import {toast} from "sonner";
import {signupApi} from "@/api/authApi.js";
import {clearForm, emptyForm} from "@/utils/form.js";
import {useNavigate} from "react-router-dom";

const SignupForm = () => {
    const [formData, setFormData] = useState({full_name: "", username: "", email: "", password: "",})
    const [formError, setFormError] = useState({full_name: [], username: [], email: [], password: [],})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const setError = (name, value) => {
        setFormError((prev) => ({
            ...prev, [name]: value
        }))
    }


    const handleSignup = async (e) => {
        e.preventDefault()

        if (emptyForm(formData)) {
            toast.warning("Please fill the form properly.")
            return
        }

        try {
            setLoading(true)
            const res = await signupApi(formData)
            toast.success(res?.data?.detail)
            clearForm(formData, setFormData)
            navigate("/login")
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
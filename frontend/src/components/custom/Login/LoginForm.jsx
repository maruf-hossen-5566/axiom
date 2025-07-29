import {LoginForm as LForm} from "@/components/login-form.jsx";
import {useState} from "react";
import {toast} from "sonner";

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({email: "", password: ""})
    const [formError, setFormError] = useState({email: [], password: []})


    const handleLogin = async (e) => {
        e.preventDefault()

        // toast.info(`${JSON.stringify(formData)}`)
        toast(`${JSON.stringify(formData)}`)

        console.log("Data", formData)
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
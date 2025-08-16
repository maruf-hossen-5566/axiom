import { LoginForm as LForm } from "@/components/forms/login-form.jsx";
import { useState } from "react";
import { toast } from "sonner";
import { loginApi } from "@/api/authApi.js";
import useUserStore from "@/store/userStore.js";
import { clearForm, emptyForm } from "@/utils/form.js";
import { setTokens } from "@/utils/token.js";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [formError, setFormError] = useState({ email: [], password: [] });
	const login = useUserStore((state) => state.login);
	const setFollowingIds = useUserStore((state) => state.setFollowingIds);
	const setBlockedIds = useUserStore((state) => state.setBlockedIds);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		if (emptyForm(formData)) {
			toast.warning("Please fill the form properly.");
			return;
		}

		try {
			setLoading(true);
			const res = await loginApi(formData);
			login(res?.data?.user);
			setFollowingIds(res?.data?.following_ids);
			setBlockedIds(res?.data?.blocked_ids);
			setTokens(res?.data?.tokens);
			localStorage.setItem("reloadTab", Date.now().toString());
			navigate("/");
			toast.success(res?.data?.detail || "Log in was successful.");
			clearForm(formData, setFormData);
		} catch (error) {
			console.error("Error: ", error);
			toast.error(error?.response?.data?.detail || "Failed to login.");
		}
		setLoading(false);
	};

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

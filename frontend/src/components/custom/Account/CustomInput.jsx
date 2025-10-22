import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CustomInput = ({
	label,
	htmlFor,
	value,
	valueChange,
	placeholder,
	type = "text",
	disabled = false,
}) => {
	return (
		<div className="grid w-full items-center gap-3">
			<Label htmlFor={htmlFor}>{label}</Label>
			<Input
				type={type}
				id={htmlFor}
				placeholder={placeholder || label}
				value={value}
				onChange={(e) => valueChange(e)}
				disabled={disabled}
			/>
		</div>
	);
};

export default CustomInput;

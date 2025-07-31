export const emptyForm = (formData) => {
    return Object.keys(formData).some((key) => formData[key].trim() === "");
}

export const clearForm = (formData, setFormData) => {
    Object.keys(formData).map((key) => (setFormData((prev) => ({
        ...prev, [key]: ""
    }))))
}




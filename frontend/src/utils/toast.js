import {toast} from "sonner";

export const multiToast = (errors, defaultMessage) => {
    return Object.keys(errors)?.map((error) => (
        toast.error(errors[error] || defaultMessage)
    ))
}
import { toast } from "react-toastify";
import { handleLogic } from "./script.js";

let emailUser;
export default async function validateUser() {
    const checkValidatedResult = await checkValidated();
    if (!checkValidatedResult) {
        const patternEmail =
            /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        emailUser = window.prompt("Vui lòng nhập email của bạn");
        const checkEmail = patternEmail.test(emailUser);
        if (!emailUser) {
            toast.error("Vui lòng nhập email của bạn!");
            setTimeout(() => {
                validateUser();
            }, 1000);
        } else if (!checkEmail) {
            toast.error("Định dạng email không hợp lệ");
            setTimeout(() => {
                validateUser();
            }, 1000);
        } else {
            const getAPIKeyResult = await handleLogic.getAPIKey({
                email: emailUser,
            });
            if (getAPIKeyResult.status_code === "SUCCESS") {
                toast.success("Thành công");
            } else if (getAPIKeyResult.status_code === "FAILED") {
                toast.error("Email chưa được đăng kí, vui lòng nhập lại!");
                setTimeout(() => {
                    validateUser();
                }, 1000);
            }
        }
    }
}

export async function checkValidated() {
    const data = await handleLogic.getListTodo();
    if (data.status_code === "SUCCESS") {
        return true;
    } else if (data.status_code === "FAILED") {
        return false;
    }
}

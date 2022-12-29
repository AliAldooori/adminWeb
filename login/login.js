import { commitLogin } from "../security/manage-login.js";
import { successLogin } from "../index.js";

const admin_name_input = $('#admin-name-input')
const pass_input = $('#pass-input')
const login_btn = $('#login-btn')

login_btn.click(async()=>{
    await commitLogin(admin_name_input.val(), pass_input.val())
            .then((res)=>{
                if(res.success === true)
                successLogin()
            })
})
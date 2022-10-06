export function LoginViewTemplate() {
    return `
        <form action="" id="log_in_form" class="form-auth bordered-container">
            <h2>Log In</h2>
                <div class="formControl">
                    <input type="text" name="username" placeholder="Username">
                </div>
                <div class="formControl">
                    <input type="password" name="password" placeholder="Password">
                </div>
                <div class="form_actions flex align-center space-between">
                    <button type="submit" id="submitLogIn" class="btn btn_filled">Log In</button>
                    <button class="form_toggler">or register</button>
                </div>
        </form>
    `;
}
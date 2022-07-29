export function UserEditFormTemplate() {
    const formContainer = document.createElement('form');
    formContainer.classList.add('bordered-container', 'indent');
    formContainer.innerHTML = `
        <div class="formControl">
            <textarea
                name="about"
                placeholder="About You"
                rows="5"
                cols="25"
                maxlength="125"
            ></textarea>
        </div>
        <div class="formControl">
            <input type="text" name="location" placeholder="Your Location">
        </div>
        <div class="formControl">
            <input type="number" min="0" max="150" name="age" placeholder="Age">
        </div>
        <div class="form_actions justify-end flex align-center">
            <button type="submit" id="submitUserDetails" class="btn btn_filled">Submit</button>
        </div>
    `;
    return formContainer;
};

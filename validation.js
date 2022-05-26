export const registerFormValidationSchema = {
    username: {
        validate: (value) => {
            return /(.*[a-z0-9]){3}/gi.test(value)
        },
        errorMessage: 'Too short name',
    },
    email: {
        validate: (value) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        errorMessage: 'Wrong email'
    },
    password: {
        validate: (value) => {
            return /(.*[a-z0-9]){3}/gi.test(value)
        },
        errorMessage: 'Too weak password'
    },
    repeat_password: {
        validate: (value, elements) => {
            return value === elements.password.value
        },
        errorMessage: 'Passwords are not the same'
    },
};

function removeFormControlErrors(formControlNode) {
    const errors = formControlNode.getElementsByClassName('errorMessage');
    for (const error of errors) {
        error.remove();
    }
}

export function validateForm(formNode, validationSchema) {
    const {
        elements
    } = formNode;
    let formValid = true;

    for (const el in elements) {
        if (!validationSchema[el]) continue;

        const $node = elements[el];
        const elValid = !!$node.value && validationSchema[el].validate($node.value, elements);
        const $formControl = $node.parentElement;

        removeFormControlErrors($formControl);

        if (!elValid) {
            formValid = false;
            $node.classList.add('invalidValue');

            const $error = document.createElement('div')

            $error.classList.add('errorMessage');
            $error.innerText = validationSchema[el].errorMessage;
            $formControl.append($error);
        }else{
            $node.classList.remove('invalidValue');
        }
    }

    return formValid;
}
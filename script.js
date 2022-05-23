const $registerForm = document.getElementById('register_form');
const $logInForm = document.getElementById('log_in_form');

document.addEventListener('click', handleToggleForms);
document.addEventListener('submit', (e) => e.preventDefault());

function handleToggleForms(event) {
    if (event.target.classList.contains('form_toggler')) {
        event.preventDefault();
        $registerForm.classList.toggle('active');
        $logInForm.classList.toggle('active');
    }
}
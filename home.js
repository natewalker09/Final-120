const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const messageDisplay = document.getElementById('message');

if (signupBtn){
    signupBtn.addEventListener('click', function() {
        const username = document.getElementById('user-signup');
        const password = document.getElementById('pass-signup');
        const confirmPassword = document.getElementById('pass-confirm');

        if(!username.value || !password.value || !confirmPassword.value){
            messageDisplay.textContent = 'Please fill in all fields.';
            return;
        }
        if(password.value !== confirmPassword.value){
            messageDisplay.textContent = 'Passwords do not match.';
            return;
        }
        
        const userdata={
            username: username.value,
            password: password.value
        };

        localStorage.setItem('userdata', JSON.stringify(userdata));
        messageDisplay.textContent = 'Signup successful!';
    });
}


if (loginBtn){
    loginBtn.addEventListener('click', function(){
        const username = document.getElementById('user-login');
        const password = document.getElementById('pass-login');
        const storedData = localStorage.getItem('userdata');

        if (!username.value || !password.value) {
            messageDisplay.textContent = 'Please fill in all fields.';
            return;
        }
        if (!storedData) {
            messageDisplay.textContent = 'Please sign up first.';
            return;
        }

        const userData = JSON.parse(storedData);

        if (userData.username === username.value && userData.password === password.value) {
            window.location.href = 'home.html';
        } else {
            messageDisplay.textContent = 'Wrong username or password.';
        }
    });
}
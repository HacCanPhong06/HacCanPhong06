const adminEmail = "sachcuameonho@gmail.com"; 

function register() {
    const email = document.getElementById('register-email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    localStorage.setItem(email, JSON.stringify({ username, password, role: email === adminEmail ? "admin" : "user" }));
    alert("Đăng ký thành công! Hãy đăng nhập.");
    window.location.href = "index.html";
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = JSON.parse(localStorage.getItem(email));
    
    if (!user || user.password !== password) {
        alert("Sai tài khoản hoặc mật khẩu!");
        return;
    }

    localStorage.setItem("currentUser", email);
    window.location.href = "home.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

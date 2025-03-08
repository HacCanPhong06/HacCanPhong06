document.addEventListener("DOMContentLoaded", function() {
    const authTitle = document.getElementById("auth-title");
    const authButton = document.getElementById("auth-button");
    const toggleAuth = document.getElementById("toggle-auth");
    let isLogin = true;

    toggleAuth.addEventListener("click", function() {
        isLogin = !isLogin;
        authTitle.textContent = isLogin ? "Đăng nhập" : "Đăng ký";
        authButton.textContent = isLogin ? "Đăng nhập" : "Đăng ký";
        toggleAuth.innerHTML = isLogin 
            ? 'Chưa có tài khoản? <a href="#">Đăng ký</a>' 
            : 'Đã có tài khoản? <a href="#">Đăng nhập</a>';
    });

    authButton.addEventListener("click", function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (isLogin) {
            loginUser(email, password);
        } else {
            registerUser(email, password);
        }
    });
});

function registerUser(email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.email === email)) {
        alert("Email này đã được đăng ký!");
        return;
    }

    users.push({ email, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công! Hãy đăng nhập.");
}

function loginUser(email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    } else {
        alert("Sai email hoặc mật khẩu!");
    }
}
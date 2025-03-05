document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const registerLink = document.getElementById("register-link");
    const loginLink = document.getElementById("login-link");

    registerLink.addEventListener("click", function (e) {
        e.preventDefault();
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    });

    loginLink.addEventListener("click", function (e) {
        e.preventDefault();
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Xử lý đăng ký
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let email = document.getElementById("reg-email").value;
        let username = document.getElementById("reg-username").value;
        let password = document.getElementById("reg-password").value;
        let confirmPassword = document.getElementById("reg-confirm-password").value;

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.email === email)) {
            alert("Email đã được đăng ký!");
            return;
        }

        users.push({ email, username, password, role: "user" });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Đăng ký thành công! Hãy đăng nhập.");
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Xử lý đăng nhập
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            alert("Email hoặc mật khẩu không đúng!");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const userEmail = document.getElementById("user-email");
    const userRole = document.getElementById("user-role");
    const logoutBtn = document.getElementById("logout-btn");

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "login.html";
    } else {
        userEmail.textContent = currentUser.email;
        userRole.textContent = currentUser.role === "sachcuameonho@gmail.com" ? "Admin" : "Người dùng";
    }

    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("currentUser");
        alert("Bạn đã đăng xuất!");
        window.location.href = "login.html";
    });
});
function checkAdmin() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "index.html";
    }
    const user = JSON.parse(localStorage.getItem(currentUser));
    if (user.role !== "admin") {
        alert("Bạn không có quyền truy cập!");
        window.location.href = "home.html";
    }
}
checkAdmin();

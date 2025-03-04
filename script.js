// ĐỊNH NGHĨA EMAIL CỦA ADMIN
const ADMIN_EMAIL = "sachcuameonho@gmail.com"; // Thay bằng email của bạn

// XỬ LÝ ĐĂNG KÝ NGƯỜI DÙNG
document.getElementById("register-btn").addEventListener("click", function () {
    let username = document.getElementById("username").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (users.some(user => user.email === email)) {
        alert("Email đã tồn tại!");
        return;
    }

    // Kiểm tra nếu email là của admin
    let role = email === ADMIN_EMAIL ? "admin" : "user";

    users.push({ username, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Hãy đăng nhập.");
});

// XỬ LÝ ĐĂNG NHẬP NGƯỜI DÙNG
document.getElementById("login-btn").addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Sai email hoặc mật khẩu!");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    // Nếu là admin, chuyển đến trang quản lý (dashboard)
    if (user.role === "admin") {
        window.location.href = "dashboard.html";
    } else {
        window.location.href = "index.html";
    }
});

// KIỂM TRA QUYỀN HẠN KHI TẢI TRANG
window.onload = function () {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
        document.getElementById("user-info").textContent = `Xin chào, ${user.username} (${user.email})`;

        if (user.role === "admin") {
            document.getElementById("admin-panel").style.display = "block"; // Hiện giao diện admin
        } else {
            document.getElementById("admin-panel").style.display = "none"; // Ẩn nếu không phải admin
        }
    }
};
// ĐĂNG KÝ NGƯỜI DÙNG
document.getElementById("register-btn").addEventListener("click", function () {
    let username = document.getElementById("username").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (users.some(user => user.email === email)) {
        alert("Email đã tồn tại!");
        return;
    }

    users.push({ username, email, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Hãy đăng nhập.");
});

// ĐĂNG NHẬP NGƯỜI DÙNG
document.getElementById("login-btn").addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Sai email hoặc mật khẩu!");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "admin") {
        window.location.href = "dashboard.html";
    } else {
        window.location.href = "index.html";
    }
});

// ĐĂNG XUẤT
document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
});

// LOAD DỮ LIỆU TRUYỆN
function loadStories() {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let storyList = document.getElementById("hot-stories");
    
    storyList.innerHTML = "";
    stories.forEach(story => {
        let storyDiv = document.createElement("div");
        storyDiv.innerHTML = `<h3>${story.title}</h3><p>${story.category}</p>`;
        storyList.appendChild(storyDiv);
    });
}

// ADMIN THÊM TRUYỆN
document.getElementById("add-story-btn").addEventListener("click", function () {
    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.push({ title, category, description });
    localStorage.setItem("stories", JSON.stringify(stories));

    loadStories();
});

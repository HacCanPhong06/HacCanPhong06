const adminEmail = "sachcuameonho@gmail.com"; // Thay email admin của bạn vào đây

// Đăng ký tài khoản
function register() {
    const email = document.getElementById('register-email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
    }

    // Xác định vai trò của người dùng
    const role = email === adminEmail ? "admin" : "user";
    localStorage.setItem(email, JSON.stringify({ username, password, role }));

    alert("Đăng ký thành công! Hãy đăng nhập.");
    window.location.href = "index.html";
}

// Đăng nhập
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = JSON.parse(localStorage.getItem(email));

    if (!user || user.password !== password) {
        alert("Sai tài khoản hoặc mật khẩu!");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "home.html";
}

// Đăng xuất
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// Kiểm tra quyền admin
function checkAdmin() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "index.html"; // Nếu chưa đăng nhập, quay lại trang login
        return;
    }

    if (currentUser.role === "admin") {
        document.getElementById("admin-section").style.display = "block"; // Hiển thị khu vực Admin
    }

    renderStories();
}

// Hiển thị danh sách truyện
function renderStories() {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let storyList = document.getElementById("story-list");
    storyList.innerHTML = "";

    stories.forEach(story => {
        let div = document.createElement("div");
        div.innerHTML = `
            <p>${story.title}</p>
            <button onclick="deleteStory(${story.id})">Xoá</button>
        `;
        storyList.appendChild(div);
    });
}

// Thêm truyện (chỉ Admin mới có quyền)
function addStory() {
    const storyTitle = document.getElementById("new-story-title").value;
    if (!storyTitle) return;

    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.push({ title: storyTitle, id: Date.now() });

    localStorage.setItem("stories", JSON.stringify(stories));
    renderStories();
}

// Xoá truyện (chỉ Admin mới có quyền)
function deleteStory(id) {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories = stories.filter(story => story.id !== id);
    
    localStorage.setItem("stories", JSON.stringify(stories));
    renderStories();
}

// Khi trang chủ tải xong, kiểm tra quyền
document.addEventListener("DOMContentLoaded", function () {
    checkAdmin();
});

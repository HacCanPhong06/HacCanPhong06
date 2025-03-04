// Kiểm tra đăng nhập
window.onload = function() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("user-info").textContent = `Chào, ${user.username} (${user.email})`;
        checkAdmin(user.email);
    }
    loadPosts();
};

// Hiển thị form đăng nhập
function showLogin() {
    document.getElementById("auth-form").classList.toggle("hidden");
}

// Đăng ký
function register() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
        alert("Email này đã được đăng ký!");
        return;
    }
    
    users.push({ email, username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công, hãy đăng nhập!");
}

// Đăng nhập
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        location.reload();
    } else {
        alert("Sai email hoặc mật khẩu!");
    }
}

// Đăng xuất
function logout() {
    localStorage.removeItem("user");
    location.reload();
}

// Kiểm tra quyền admin
function checkAdmin(email) {
    let adminEmail = "sachcuameonho@gmail.com";
    if (email === adminEmail) {
        document.getElementById("story-form").classList.remove("hidden");
    }
}

// Đăng truyện
function addPost() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let category = document.getElementById("category").value;
    let coverFile = document.getElementById("cover").files[0];
    let coverURL = coverFile ? URL.createObjectURL(coverFile) : "";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift({ title, content, category, cover: coverURL, comments: [] });
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadPosts();
}

// Hiển thị truyện
function loadPosts() {
    let postList = document.getElementById("post-list");
    postList.innerHTML = "";

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach((post, index) => {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            ${post.cover ? `<img src="${post.cover}" class="cover-img">` : ""}
            <h3>${post.title}</h3>
            <p><b>Thể loại:</b> ${post.category}</p>
            <p>${post.content}</p>
            <button onclick="deletePost(${index})">Xóa</button>
            <div class="comment-section">
                <h4>Bình luận</h4>
                <div id="comments-${index}">
                    ${post.comments.map(comment => `<p>${comment}</p>`).join("")}
                </div>
                <input type="text" id="comment-${index}" placeholder="Nhập bình luận">
                <button onclick="addComment(${index})">Gửi</button>
            </div>
        `;
        postList.appendChild(postDiv);
    });
}

// Xóa truyện
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Bình luận
function addComment(index) {
    let comment = document.getElementById(`comment-${index}`).value.trim();
    if (!comment) return;

    let posts = JSON.parse(localStorage.getItem("posts"));
    posts[index].comments.push(comment);
    localStorage.setItem("posts", JSON.stringify(posts));

    loadPosts();
    }

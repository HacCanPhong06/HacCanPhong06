// Định nghĩa email admin
const adminEmail = "sachcuameonho@gmail.com"; // Thay bằng email admin

// Xử lý đăng nhập Google
function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let email = profile.getEmail();

    localStorage.setItem("userEmail", email);
    document.getElementById("user-info").textContent = `Chào, ${profile.getName()} (${email})`;
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "block";

    checkAdmin(email);
}

function checkAdmin(email) {
    if (email === adminEmail) {
        document.getElementById("story-form").style.display = "block"; // Hiển thị form cho admin
    } else {
        document.getElementById("story-form").style.display = "none"; // Ẩn form nếu không phải admin
    }
}

// Đăng xuất
function signOut() {
    localStorage.removeItem("userEmail");
    location.reload();
}

// Kiểm tra đăng nhập khi tải trang
window.onload = function() {
    let savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("user-info").textContent = `Chào, ${savedEmail}`;
        checkAdmin(savedEmail);
    }
};

// Bắt sự kiện đăng xuất
document.getElementById("logout-btn").addEventListener("click", signOut);

// Thêm truyện mới (Chỉ admin mới được phép đăng)
document.getElementById("add-story-btn").addEventListener("click", function() {
    let email = localStorage.getItem("userEmail");

    if (email !== adminEmail) {
        alert("Bạn không có quyền đăng truyện!");
        return;
    }

    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let content = document.getElementById("content").value;

    if (!title || !content || !category) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let post = `
        <div class="post">
            <h2>${title}</h2>
            <p><strong>Thể loại:</strong> ${category}</p>
            <p>${content}</p>
        </div>
    `;

    document.getElementById("post-list").innerHTML += post;

    // Xóa dữ liệu sau khi đăng
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
});

// Bộ lọc thể loại
document.getElementById("filter-btn").addEventListener("click", function() {
    let selectedCategory = document.getElementById("category").value;
    let posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        if (selectedCategory === "" || post.innerHTML.includes(selectedCategory)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
});

// Thêm bình luận
document.getElementById("add-comment-btn").addEventListener("click", function() {
    let comment = document.getElementById("comment-input").value;
    if (!comment) {
        alert("Vui lòng nhập nội dung bình luận!");
        return;
    }

    let commentDiv = document.createElement("div");
    commentDiv.textContent = comment;
    document.getElementById("comment-list").appendChild(commentDiv);

    document.getElementById("comment-input").value = "";
});

// Chuyển chế độ tối
document.getElementById("toggle-mode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

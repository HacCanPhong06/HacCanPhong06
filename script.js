// 🟢 Cấu hình Google Login
function signIn() {
    gapi.auth2.getAuthInstance().signIn().then(googleUser => {
        let profile = googleUser.getBasicProfile();
        let email = profile.getEmail();

        localStorage.setItem("userEmail", email);
        document.getElementById("user-info").textContent = `Chào, ${profile.getName()} (${email})`;
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";

        checkAdmin(email);
    });
}

// 🟢 Kiểm tra Admin
function checkAdmin(email) {
    let adminEmail = "sachcuameonho@gmail.com"; 
    document.getElementById("story-form").style.display = (email === adminEmail) ? "block" : "none";
}

// 🟢 Đăng xuất
function signOut() {
    gapi.auth2.getAuthInstance().signOut().then(() => {
        localStorage.removeItem("userEmail");
        location.reload();
    });
}

// 🟢 Đăng truyện
function addPost() {
    let title = document.getElementById("title").value.trim();
    let content = document.getElementById("content").value.trim();
    let category = document.getElementById("category").value;
    let coverFile = document.getElementById("cover").files[0];

    if (!title || !content || !category) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let posts = JSON.parse(localStorage.getItem("posts") || "[]");
        posts.unshift({ title, content, category, cover: e.target.result, comments: [] });
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    };
    if (coverFile) {
        reader.readAsDataURL(coverFile);
    } else {
        let posts = JSON.parse(localStorage.getItem("posts") || "[]");
        posts.unshift({ title, content, category, cover: "", comments: [] });
        localStorage.setItem("posts", JSON.stringify(posts));
        loadPosts();
    }
}

// 🟢 Hiển thị truyện
function loadPosts() {
    let postList = document.getElementById("post-list");
    postList.innerHTML = "";

    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.forEach((post, index) => {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            ${post.cover ? `<img src="${post.cover}" class="cover-img">` : ""}
            <h3>${post.title}</h3>
            <p><b>Thể loại:</b> ${post.category}</p>
            <p>${post.content}</p>
            <button onclick="deletePost(${index})">Xóa</button>
            <input type="text" id="comment-${index}" placeholder="Nhập bình luận">
            <button onclick="addComment(${index})">Gửi</button>
        `;
        postList.appendChild(postDiv);
    });
}

// 🟢 Xóa truyện
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// 🟢 Bình luận
function addComment(index) {
    let commentInput = document.getElementById(`comment-${index}`);
    let commentText = commentInput.value.trim();

    if (!commentText) {
        alert("Bình luận không được để trống!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts[index].comments.push(commentText);
    localStorage.setItem("posts", JSON.stringify(posts));

    commentInput.value = "";
    loadPosts();
}

// 🟢 Lọc truyện
document.getElementById("filter-btn").addEventListener("click", function() {
    let category = document.getElementById("filter-category").value;
    let postElements = document.querySelectorAll(".post");

    postElements.forEach(post => {
        let postCategory = post.querySelector("p:nth-child(2)").textContent.split(": ")[1];
        post.style.display = (!category || postCategory === category) ? "block" : "none";
    });
});

// 🟢 Dark Mode
document.getElementById("toggle-mode").addEventListener("click", function() {
    document.body.classList.toggle("light-mode");
});

// 🟢 Tải dữ liệu khi mở trang
window.onload = function () {
    let email = localStorage.getItem("userEmail");
    if (email) {
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("user-info").textContent = `Chào, ${email}`;
        checkAdmin(email);
    }
    loadPosts();
};

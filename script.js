// Kiểm tra nếu Local Storage chưa có dữ liệu thì tạo mới
if (!localStorage.getItem("posts")) {
    localStorage.setItem("posts", JSON.stringify([]));
}

// Hàm đăng truyện
function addPost() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    if (title.trim() === "" || content.trim() === "") {
        alert("Vui lòng nhập đủ tiêu đề và nội dung!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts"));
    posts.unshift({ title: title, content: content, comments: [] }); // Thêm mảng comments
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadPosts();
}

// Hàm hiển thị truyện
function loadPosts() {
    let postList = document.getElementById("post-list");
    postList.innerHTML = "";

    let posts = JSON.parse(localStorage.getItem("posts"));
    posts.forEach((post, index) => {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
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

// Hàm xóa truyện
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Hàm thêm bình luận
function addComment(index) {
    let commentInput = document.getElementById(`comment-${index}`);
    let commentText = commentInput.value.trim();

    if (commentText === "") {
        alert("Không được để trống bình luận!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts"));
    posts[index].comments.push(commentText);
    localStorage.setItem("posts", JSON.stringify(posts));

    commentInput.value = "";
    loadPosts();
}

// Tải truyện khi mở trang
window.onload = loadPosts;

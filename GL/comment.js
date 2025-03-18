document.addEventListener("DOMContentLoaded", function() {
    checkLogin();
    loadComments();
});

const ADMIN = "HCP06"; // Tài khoản admin

// Đăng nhập
function login() {
    let username = document.getElementById("username").value.trim();
    if (username === "") {
        alert("Vui lòng nhập tên!");
        return;
    }

    localStorage.setItem("currentUser", username);
    location.reload();
}

// Kiểm tra đăng nhập
function checkLogin() {
    let user = localStorage.getItem("currentUser");
    if (!user) {
        document.querySelector(".login-section").style.display = "block";
        document.querySelector(".comment-section").style.display = "none";
    } else {
        document.querySelector(".login-section").style.display = "none";
        document.querySelector(".comment-section").style.display = "block";
    }
}

// Thêm bình luận
function addComment(parentIndex = null) {
    let commentInput = document.getElementById("commentInput");
    let commentText = commentInput.value.trim();
    let user = localStorage.getItem("currentUser");

    if (!user) {
        alert("Bạn cần đăng nhập để bình luận!");
        return;
    }

    if (commentText === "") {
        alert("Bình luận không được để trống!");
        return;
    }

    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let newComment = {
        user: user,
        text: commentText,
        likes: 0,
        dislikes: 0,
        replies: []
    };

    if (parentIndex !== null) {
        comments[parentIndex].replies.push(newComment);
        showNotification(comments[parentIndex].user, user);
    } else {
        comments.push(newComment);
    }

    localStorage.setItem("comments", JSON.stringify(comments));

    commentInput.value = "";
    loadComments();
}

// Hiển thị bình luận
function loadComments() {
    let commentList = document.getElementById("commentList");
    commentList.innerHTML = "";

    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    comments.forEach((comment, index) => {
        let commentDiv = createCommentElement(comment, index);
        commentList.appendChild(commentDiv);
    });
}

// Xóa bình luận
function deleteComment(index, parentIndex = null) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    if (parentIndex === null) {
        // Xóa bình luận chính
        comments.splice(index, 1);
    } else {
        // Xóa bình luận con (trả lời)
        comments[parentIndex].replies.splice(index, 1);
    }

    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
}

// Cập nhật lại phần tạo bình luận để gọi đúng hàm deleteComment()
function createCommentElement(comment, index, parentIndex = null) {
    let commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    commentDiv.innerHTML = `
        <div>
            <strong>${comment.user}</strong>
            <p>${comment.text}</p>
            <div class="actions">
                <button onclick="likeComment(${index}, ${parentIndex})">👍 ${comment.likes}</button>
                <button onclick="dislikeComment(${index}, ${parentIndex})">👎 ${comment.dislikes}</button>
                <button onclick="replyComment(${index})">💬 Trả lời</button>
                ${comment.user === localStorage.getItem("currentUser") || localStorage.getItem("currentUser") === ADMIN ? `<button onclick="deleteComment(${index}, ${parentIndex})">🗑️ Xóa</button>` : ""}
            </div>
            <div id="replies-${index}"></div>
        </div>
    `;

    // Hiển thị bình luận phản hồi (con)
    comment.replies.forEach((reply, replyIndex) => {
        let replyDiv = createCommentElement(reply, replyIndex, index);
        commentDiv.querySelector(`#replies-${index}`).appendChild(replyDiv);
    });

    return commentDiv;
}

// Tạo phần tử bình luận
function createCommentElement(comment, index, isReply = false) {
    let commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    if (isReply) commentDiv.classList.add("reply-section");

    commentDiv.innerHTML = `
        <div>
            <strong>${comment.user}</strong>
            <p>${comment.text}</p>
            <div class="actions">
                <button onclick="likeComment(${index})">👍 ${comment.likes}</button>
                <button onclick="dislikeComment(${index})">👎 ${comment.dislikes}</button>
                <button onclick="replyComment(${index})">💬 Trả lời</button>
                ${comment.user === localStorage.getItem("currentUser") || localStorage.getItem("currentUser") === ADMIN ? `<button onclick="deleteComment(${index})">🗑️ Xóa</button>` : ""}
            </div>
            <div id="replies-${index}"></div>
        </div>
    `;

    comment.replies.forEach((reply, replyIndex) => {
        let replyDiv = createCommentElement(reply, replyIndex, true);
        commentDiv.querySelector(`#replies-${index}`).appendChild(replyDiv);
    });

    return commentDiv;
}

// Thông báo khi có phản hồi
function showNotification(originalUser, replier) {
    let notification = document.getElementById("notification");
    notification.innerText = `${replier} đã phản hồi bình luận của bạn!`;
    notification.classList.remove("hidden");

    setTimeout(() => {
        notification.classList.add("hidden");
    }, 3000);
}

// Trả lời bình luận
function replyComment(index) {
    let replyText = prompt("Nhập nội dung trả lời:");
    if (replyText) addComment(index);
}

// Các chức năng khác (Like, Dislike, Xóa) tương tự...
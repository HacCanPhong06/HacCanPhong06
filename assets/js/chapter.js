document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = urlParams.get("id");

    function loadChapter() {
        fetch("data/chapters.json")
            .then(response => response.json())
            .then(chapters => {
                const chapter = chapters.find(c => c.id == chapterId);
                if (chapter) {
                    document.getElementById("chapter-title").textContent = chapter.title;
                    document.getElementById("chapter-text").textContent = chapter.content;
                    document.getElementById("story-title").textContent = "Tên truyện"; // Cập nhật sau khi có API
                } else {
                    document.getElementById("chapter-content").innerHTML = "<p>Chương không tồn tại.</p>";
                }
            });
    }

    // Chuyển chương
    document.getElementById("prev-chapter").addEventListener("click", function () {
        let prevId = parseInt(chapterId) - 1;
        window.location.href = `chapter.html?id=${prevId}`;
    });

    document.getElementById("next-chapter").addEventListener("click", function () {
        let nextId = parseInt(chapterId) + 1;
        window.location.href = `chapter.html?id=${nextId}`;
    });

    // Cài đặt đọc
    document.getElementById("font-size").addEventListener("input", function () {
        document.getElementById("chapter-text").style.fontSize = this.value + "px";
    });

    document.getElementById("theme").addEventListener("change", function () {
        document.body.className = this.value;
    });

    // Đánh giá truyện
    document.getElementById("submit-rating").addEventListener("click", function () {
        let rating = document.getElementById("rating-score").value;
        if (rating >= 1 && rating <= 10) {
            alert("Cảm ơn bạn đã đánh giá!");
        } else {
            alert("Điểm không hợp lệ!");
        }
    });

    loadChapter();
});

document.addEventListener("DOMContentLoaded", function () {
    const chapterId = new URLSearchParams(window.location.search).get("id");
    const commentsList = document.getElementById("comments-list");
    const newCommentInput = document.getElementById("new-comment");
    const postCommentBtn = document.getElementById("post-comment");

    function loadComments() {
        let comments = JSON.parse(localStorage.getItem(`comments_${chapterId}`)) || [];
        commentsList.innerHTML = "";

        comments.forEach((comment, index) => {
            let commentEl = document.createElement("div");
            commentEl.classList.add("comment");
            commentEl.innerHTML = `
                <p>${comment.text}</p>
                <button onclick="likeComment(${index})">👍 ${comment.likes}</button>
                <button onclick="dislikeComment(${index})">👎 ${comment.dislikes}</button>
                ${comment.isAdmin ? '<button onclick="deleteComment(' + index + ')">❌ Xóa</button>' : ""}
            `;
            commentsList.appendChild(commentEl);
        });
    }

    function saveComment(text) {
        let comments = JSON.parse(localStorage.getItem(`comments_${chapterId}`)) || [];
        comments.push({ text: text, likes: 0, dislikes: 0, isAdmin: false });
        localStorage.setItem(`comments_${chapterId}`, JSON.stringify(comments));
        loadComments();
    }

    function likeComment(index) {
        let comments = JSON.parse(localStorage.getItem(`comments_${chapterId}`));
        comments[index].likes++;
        localStorage.setItem(`comments_${chapterId}`, JSON.stringify(comments));
        loadComments();
    }

    function dislikeComment(index) {
        let comments = JSON.parse(localStorage.getItem(`comments_${chapterId}`));
        comments[index].dislikes++;
        localStorage.setItem(`comments_${chapterId}`, JSON.stringify(comments));
        loadComments();
    }

    function deleteComment(index) {
        let comments = JSON.parse(localStorage.getItem(`comments_${chapterId}`));
        comments.splice(index, 1);
        localStorage.setItem(`comments_${chapterId}`, JSON.stringify(comments));
        loadComments();
    }

    postCommentBtn.addEventListener("click", function () {
        let text = newCommentInput.value.trim();
        if (text) {
            saveComment(text);
            newCommentInput.value = "";
        }
    });

    loadComments();
});

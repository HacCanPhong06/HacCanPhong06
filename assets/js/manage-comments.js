document.addEventListener("DOMContentLoaded", function () {
    loadComments();
});

function loadComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let tbody = document.querySelector("#comments-table tbody");
    tbody.innerHTML = "";

    comments.forEach((comment, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${comment.user}</td>
            <td>${comment.content}</td>
            <td>${comment.storyTitle}</td>
            <td><button onclick="deleteComment(${index})">❌ Xóa</button></td>
        `;
        tbody.appendChild(row);
    });
}

function deleteComment(index) {
    if (confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.splice(index, 1);
        localStorage.setItem("comments", JSON.stringify(comments));
        loadComments();
    }
}

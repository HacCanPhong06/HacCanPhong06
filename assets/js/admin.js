document.addEventListener("DOMContentLoaded", function () {
    const adminEmail = "sachcuameonho@gmail.com"; // Email admin

    function checkAdmin() {
        let user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!user || user.email !== adminEmail) {
            alert("Bạn không có quyền truy cập trang này!");
            window.location.href = "../index.html";
        }
    }

function loadStories() {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let tbody = document.querySelector("#story-table tbody");
    tbody.innerHTML = "";

    stories.forEach((story, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${story.title}</td>
            <td>${story.category}</td>
            <td>${story.views}</td>
            <td>
                <button onclick="location.href='edit-story.html?index=${index}'">✏ Sửa</button>
                <button onclick="deleteStory(${index})">❌ Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

    function deleteStory(index) {
        if (confirm("Bạn có chắc muốn xóa truyện này?")) {
            let stories = JSON.parse(localStorage.getItem("stories")) || [];
            stories.splice(index, 1);
            localStorage.setItem("stories", JSON.stringify(stories));
            loadStories();
        }
    }

    function logout() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "../index.html";
    }

    checkAdmin();
    loadStories();
});

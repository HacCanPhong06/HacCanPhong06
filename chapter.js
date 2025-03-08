document.addEventListener("DOMContentLoaded", function() {
    loadChapter();
});

function getParams() {
    let params = new URLSearchParams(window.location.search);
    return { storyId: params.get("id"), chapterIndex: parseInt(params.get("chapter")) };
}

function loadChapter() {
    let { storyId, chapterIndex } = getParams();
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let story = stories.find(s => s.id === storyId);

    if (!story || !story.chapters[chapterIndex]) {
        document.body.innerHTML = "<h2>Không tìm thấy chương!</h2>";
        return;
    }

    document.getElementById("story-title").textContent = `📖 Truyện: ${story.title}`;
    document.getElementById("chapter-title").textContent = `Chương ${chapterIndex + 1}: ${story.chapters[chapterIndex].title}`;
    document.getElementById("chapter-content").textContent = story.chapters[chapterIndex].content;

    let prevBtn = document.getElementById("prev-chapter");
    let nextBtn = document.getElementById("next-chapter");

    prevBtn.style.display = chapterIndex > 0 ? "inline-block" : "none";
    nextBtn.style.display = chapterIndex < story.chapters.length - 1 ? "inline-block" : "none";

    prevBtn.onclick = () => changeChapter(chapterIndex - 1);
    nextBtn.onclick = () => changeChapter(chapterIndex + 1);
}

function changeChapter(newIndex) {
    let { storyId } = getParams();
    window.location.href = `chapter.html?id=${storyId}&chapter=${newIndex}`;
}document.addEventListener("DOMContentLoaded", function() {
  const userEmail = document.getElementById("user-email");
  const userRole = document.getElementById("user-role");
  const logoutBtn = document.getElementById("logout-btn");
  
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  if (!currentUser) {
    alert("Bạn chưa đăng nhập!");
    window.location.href = "login.html";
  } else {
    userEmail.textContent = currentUser.email;
    userRole.textContent = currentUser.role === "admin" ? "Admin" : "Người dùng";
  }
  
  logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("currentUser");
    alert("Bạn đã đăng xuất!");
    window.location.href = "login.html";
  });
});
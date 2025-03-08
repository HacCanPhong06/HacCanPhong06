document.addEventListener("DOMContentLoaded", function() {
    loadStory();
    loadComments();
});

function getStoryId() {
    let params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function loadStory() {
    let storyId = getStoryId();
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let story = stories.find(s => s.id === storyId);

    if (!story) {
        document.body.innerHTML = "<h2>Không tìm thấy truyện!</h2>";
        return;
    }

    document.getElementById("story-cover").src = story.cover;
    document.getElementById("story-title").textContent = story.title;
    document.getElementById("story-author").textContent = `✍ Tác giả: ${story.author}`;
    document.getElementById("story-genre").textContent = `📚 Thể loại: ${story.genre}`;
    document.getElementById("story-description").textContent = story.description;
    document.getElementById("story-likes").textContent = story.likes;
    document.getElementById("story-rating").textContent = story.rating.toFixed(1);

    let chapterList = document.getElementById("chapter-list");
    chapterList.innerHTML = story.chapters.map((chapter, index) =>
        `<li onclick="openChapter(${index})">Chương ${index + 1}: ${chapter.title}</li>`
    ).join("");
}

function openChapter(index) {
    let storyId = getStoryId();
    window.location.href = `chapter.html?id=${storyId}&chapter=${index}`;
}

function likeStory() {
    let storyId = getStoryId();
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    let story = stories.find(s => s.id === storyId);

    if (story) {
        story.likes += 1;
        localStorage.setItem("stories", JSON.stringify(stories));
        document.getElementById("story-likes").textContent = story.likes;
    }
}

function loadComments() {
    let storyId = getStoryId();
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    let storyComments = comments.filter(c => c.storyId === storyId);

    document.getElementById("comment-list").innerHTML = storyComments.map(comment => 
        `<p><strong>${comment.user}</strong>: ${comment.text}</p>`
    ).join("");
}

function addComment() {
    let storyId = getStoryId();
    let commentInput = document.getElementById("comment-input");
    let commentText = commentInput.value.trim();

    if (!commentText) return;

    let currentUser = localStorage.getItem("currentUser") || "Khách";
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    
    comments.push({ storyId, user: currentUser, text: commentText });
    localStorage.setItem("comments", JSON.stringify(comments));

    loadComments();
    commentInput.value = "";
}
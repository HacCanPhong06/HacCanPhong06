document.addEventListener("DOMContentLoaded", function() {
    // Load danh sách truyện từ file JSON (giả lập)
    fetch("data/stories.json")
        .then(response => response.json())
        .then(data => {
            const featuredList = document.getElementById("featured-list");
            const topLikes = document.getElementById("top-likes");
            const topRated = document.getElementById("top-rated");

            data.truyen.sort((a, b) => b.luot_xem - a.luot_xem).slice(0, 10).forEach(truyen => {
                featuredList.innerHTML += `<p>${truyen.ten} - ${truyen.tac_gia} (${truyen.luot_xem} lượt xem)</p>`;
            });

            data.truyen.sort((a, b) => b.luot_tim - a.luot_tim).slice(0, 5).forEach(truyen => {
                topLikes.innerHTML += `<p>${truyen.ten} (${truyen.luot_tim} tim)</p>`;
            });

            data.truyen.sort((a, b) => b.diem_tb - a.diem_tb).slice(0, 5).forEach(truyen => {
                topRated.innerHTML += `<p>${truyen.ten} (${truyen.diem_tb}/10 điểm)</p>`;
            });
        });

    // Load bình luận giả lập
    fetch("data/comments.json")
        .then(response => response.json())
        .then(data => {
            const commentsList = document.getElementById("comments-list");
            data.comments.slice(0, 10).forEach(comment => {
                commentsList.innerHTML += `<p>${comment.user}: ${comment.text}</p>`;
            });
        });
});
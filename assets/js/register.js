document.addEventListener("DOMContentLoaded", function () {
    const registerBtn = document.getElementById("register-btn");

    if (registerBtn) {
        registerBtn.addEventListener("click", function (e) {
            e.preventDefault(); // Ngăn chặn tải lại trang

            const email = document.getElementById("register-email").value.trim();
            const username = document.getElementById("register-username").value.trim();
            const password = document.getElementById("register-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            // Kiểm tra dữ liệu nhập vào
            if (!email || !username || !password || !confirmPassword) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            if (password !== confirmPassword) {
                alert("Mật khẩu xác nhận không khớp!");
                return;
            }

            // Tạo đối tượng user
            const newUser = {
                email: email,
                username: username,
                password: password, // Lưu mật khẩu trực tiếp (chỉ demo, thực tế cần mã hóa)
                role: "user" // Mặc định user thường
            };

            // Lấy danh sách người dùng từ LocalStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Kiểm tra xem email đã tồn tại chưa
            if (users.some(user => user.email === email)) {
                alert("Email này đã được đăng ký!");
                return;
            }

            // Lưu user vào LocalStorage
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            window.location.href = "login.html"; // Chuyển hướng về trang đăng nhập
        });
    }
});

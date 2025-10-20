// js/admin.js - JavaScript cho trang quản lý Admin

document.addEventListener("DOMContentLoaded", () => {
  // ========== MENU TOGGLE ==========
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("adminSidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });

    // Đóng sidebar khi click bên ngoài trên mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 991) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove("active");
        }
      }
    });
  }

  // ========== NAVIGATION ACTIVE STATE ==========
  const navLinks = document.querySelectorAll(".nav-link");
  const pageTitle = document.querySelector(".page-title");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Loại bỏ active class từ tất cả các nav-item
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Thêm active class vào nav-item được click
      link.parentElement.classList.add("active");

      // Cập nhật page title
      const navText = link.querySelector(".nav-text").textContent;
      if (pageTitle && !link.getAttribute("href").includes(".html")) {
        pageTitle.textContent = navText;
      }

      // Đóng sidebar trên mobile
      if (window.innerWidth <= 991) {
        sidebar.classList.remove("active");
      }
    });
  });

  // ========== ACTION BUTTONS ==========
  // Xem chi tiết
  const viewButtons = document.querySelectorAll(".btn-view");
  viewButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const rowData = getRowData(row);
      showAlert("Xem chi tiết", `Đang xem: ${rowData.name || rowData.id}`);
    });
  });

  // Chỉnh sửa
  const editButtons = document.querySelectorAll(".btn-edit");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const rowData = getRowData(row);
      showAlert("Chỉnh sửa", `Đang chỉnh sửa: ${rowData.name || rowData.id}`);
    });
  });

  // Xóa
  const deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const rowData = getRowData(row);

      if (
        confirm(`Bạn có chắc chắn muốn xóa "${rowData.name || rowData.id}"?`)
      ) {
        // Animation xóa
        row.style.transition = "all 0.3s ease";
        row.style.opacity = "0";
        row.style.transform = "translateX(-20px)";

        setTimeout(() => {
          row.remove();
          showAlert(
            "Đã xóa",
            `Đã xóa thành công: ${rowData.name || rowData.id}`,
            "success"
          );
        }, 300);
      }
    });
  });

  // ========== ADD PRODUCT BUTTON ==========
  const addProductBtn = document.querySelectorAll(".btn-primary");
  addProductBtn.forEach((btn) => {
    if (btn.textContent.includes("Thêm")) {
      btn.addEventListener("click", () => {
        showAlert(
          "Thêm mới",
          "Chức năng thêm mới đang được phát triển...",
          "info"
        );
      });
    }
    if (btn.textContent.includes("Xem tất cả")) {
      btn.addEventListener("click", () => {
        showAlert("Xem tất cả", "Đang chuyển đến trang danh sách...", "info");
      });
    }
  });

  // ========== HELPER FUNCTIONS ==========
  function getRowData(row) {
    const cells = row.querySelectorAll("td");
    return {
      id: cells[0]?.textContent.trim() || "",
      name: cells[1]?.textContent.trim() || cells[2]?.textContent.trim() || "",
    };
  }

  function showAlert(title, message, type = "info") {
    // Tạo alert element
    const alertDiv = document.createElement("div");
    alertDiv.className = `custom-alert alert-${type}`;
    alertDiv.innerHTML = `
            <div class="alert-content">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
            <button class="alert-close">×</button>
        `;

    // Thêm styles nếu chưa có
    if (!document.getElementById("custom-alert-styles")) {
      const style = document.createElement("style");
      style.id = "custom-alert-styles";
      style.textContent = `
                .custom-alert {
                    position: fixed;
                    top: 90px;
                    right: 20px;
                    min-width: 300px;
                    max-width: 400px;
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 15px;
                }
                .custom-alert.alert-success {
                    border-left: 4px solid #27ae60;
                }
                .custom-alert.alert-info {
                    border-left: 4px solid #3498db;
                }
                .custom-alert.alert-warning {
                    border-left: 4px solid #f39c12;
                }
                .custom-alert.alert-danger {
                    border-left: 4px solid #e74c3c;
                }
                .alert-content strong {
                    display: block;
                    margin-bottom: 5px;
                    color: #1a1a1a;
                    font-size: 1rem;
                }
                .alert-content p {
                    margin: 0;
                    color: #666;
                    font-size: 0.9rem;
                }
                .alert-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #999;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                    transition: all 0.2s;
                }
                .alert-close:hover {
                    background-color: #f5f5f5;
                    color: #333;
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
                @media (max-width: 767px) {
                    .custom-alert {
                        right: 10px;
                        left: 10px;
                        min-width: auto;
                        max-width: none;
                    }
                }
            `;
      document.head.appendChild(style);
    }

    // Thêm vào body
    document.body.appendChild(alertDiv);

    // Close button
    const closeBtn = alertDiv.querySelector(".alert-close");
    closeBtn.addEventListener("click", () => {
      alertDiv.style.animation = "slideOut 0.3s ease";
      setTimeout(() => alertDiv.remove(), 300);
    });

    // Auto remove sau 4 giây
    setTimeout(() => {
      if (document.body.contains(alertDiv)) {
        alertDiv.style.animation = "slideOut 0.3s ease";
        setTimeout(() => alertDiv.remove(), 300);
      }
    }, 4000);
  }

  // ========== TABLE ROW HOVER EFFECT ==========
  const tableRows = document.querySelectorAll(".data-table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.01)";
      this.style.transition = "transform 0.2s ease";
    });

    row.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // ========== STAT CARDS ANIMATION ==========
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "all 0.5s ease";

      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 50);
    }, index * 100);
  });

  // ========== SEARCH FUNCTIONALITY (Optional Enhancement) ==========
  function addSearchFunctionality() {
    const tables = document.querySelectorAll(".data-table");

    tables.forEach((table) => {
      const section = table.closest(".content-section");
      const header = section.querySelector(".section-header");

      // Tạo search input
      const searchWrapper = document.createElement("div");
      searchWrapper.style.cssText =
        "flex: 1; max-width: 300px; margin: 0 20px;";
      searchWrapper.innerHTML = `
                <input type="text" 
                       class="table-search" 
                       placeholder="Tìm kiếm..." 
                       style="width: 100%; padding: 10px 15px; border: 1px solid #ddd; border-radius: 6px; font-family: 'Montserrat', sans-serif;">
            `;

      header.insertBefore(searchWrapper, header.querySelector(".btn-primary"));

      const searchInput = searchWrapper.querySelector(".table-search");

      searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach((row) => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      });
    });
  }

  // Uncomment để kích hoạt search
  // addSearchFunctionality();

  // ========== CONSOLE LOG ==========
  console.log("🎉 Admin panel đã được khởi tạo thành công!");
  console.log(
    "📊 Tổng số đơn hàng:",
    document.querySelectorAll(".data-table tbody tr").length
  );
});

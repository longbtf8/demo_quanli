document.addEventListener("DOMContentLoaded", function () {
  const data = {
    products: [
      {
        id: 1,
        name: "Áo thun đen in hình",
        category: "Áo Thun & T-shirt",
        price: 320000,
        stock: 45,
        status: "Còn hàng",
      },
      {
        id: 7,
        name: "Áo thun trơn màu be",
        category: "Áo Thun & T-shirt",
        price: 250000,
        stock: 100,
        status: "Còn hàng",
      },
      {
        id: 2,
        name: "Áo sơ mi trắng công sở",
        category: "Áo Sơ Mi",
        price: 450000,
        stock: 28,
        status: "Còn hàng",
      },
      {
        id: 8,
        name: "Áo sơ mi lụa tay dài",
        category: "Áo Sơ Mi",
        price: 550000,
        stock: 15,
        status: "Sắp hết",
      },
      {
        id: 3,
        name: "Áo khoác denim rách",
        category: "Áo Khoác",
        price: 790000,
        stock: 5,
        status: "Sắp hết",
      },
      {
        id: 4,
        name: "Quần jean xanh slim-fit",
        category: "Quần Jeans",
        price: 680000,
        stock: 0,
        status: "Hết hàng",
      },
      {
        id: 9,
        name: "Quần jean baggy",
        category: "Quần Jeans",
        price: 720000,
        stock: 22,
        status: "Còn hàng",
      },
      {
        id: 5,
        name: "Quần short kaki",
        category: "Quần Shorts",
        price: 280000,
        stock: 50,
        status: "Còn hàng",
      },
    ],
    categories: [
      { id: 1, name: "Áo Thun & T-shirt", productCount: 25 },
      { id: 2, name: "Áo Sơ Mi", productCount: 18 },
      { id: 3, name: "Áo Khoác", productCount: 12 },
      { id: 4, name: "Quần Jeans", productCount: 15 },
      { id: 5, name: "Quần Shorts", productCount: 10 },
    ],
    orders: [
      {
        id: "DH001",
        customer: "Nguyễn Văn A",
        total: 320000,
        status: "Đã giao",
        date: "20/10/2025",
      },
      {
        id: "DH002",
        customer: "Trần Thị B",
        total: 680000,
        status: "Đang xử lý",
        date: "19/10/2025",
      },
      {
        id: "DH003",
        customer: "Lê Văn C",
        total: 790000,
        status: "Chờ xác nhận",
        date: "18/10/2025",
      },
    ],
    customers: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nva@email.com",
        phone: "0912345678",
        orders: 5,
      },
      {
        id: 2,
        name: "Trần Thị B",
        email: "ttb@email.com",
        phone: "0923456789",
        orders: 3,
      },
      {
        id: 3,
        name: "Lê Văn C",
        email: "lvc@email.com",
        phone: "0934567890",
        orders: 8,
      },
    ],
  };

  // --- CÁC HÀM LOAD DỮ LIỆU ---
  function loadProductsByCategory(category, tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    if (!tableBody) return;

    const getStatusClass = (status) => {
      if (status === "Còn hàng") return "success";
      if (status === "Sắp hết") return "warning";
      return "danger";
    };

    const productsToDisplay = data.products.filter(
      (p) => p.category === category
    );

    tableBody.innerHTML = productsToDisplay
      .map(
        (p) => `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price.toLocaleString()}đ</td>
                <td>${p.stock}</td>
                <td><span class="badge badge-${getStatusClass(p.status)}">${
          p.status
        }</span></td>
                <td>
                    <button class="btn btn-small btn-warning">Sửa</button>
                    <button class="btn btn-small btn-danger">Xóa</button>
                </td>
            </tr>
        `
      )
      .join("");
  }

  function loadCategories() {
    const tableBody = document.getElementById("categoriesTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = data.categories
      .map(
        (c) => `
            <tr>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.productCount}</td>
                <td>
                    <button class="btn btn-small btn-warning">Sửa</button>
                    <button class="btn btn-small btn-danger">Xóa</button>
                </td>
            </tr>
        `
      )
      .join("");
  }

  function loadOrders() {
    const tableBody = document.getElementById("ordersTableBody");
    if (!tableBody) return;
    const getStatusClass = (status) => {
      if (status === "Đã giao") return "success";
      if (status === "Đang xử lý") return "warning";
      return "danger";
    };
    tableBody.innerHTML = data.orders
      .map(
        (o) => `
            <tr>
                <td>${o.id}</td>
                <td>${o.customer}</td>
                <td>${o.total.toLocaleString()}đ</td>
                <td><span class="badge badge-${getStatusClass(o.status)}">${
          o.status
        }</span></td>
                <td>${o.date}</td>
                <td>
                    <button class="btn btn-small btn-success">Chi tiết</button>
                </td>
            </tr>
        `
      )
      .join("");
  }

  function loadCustomers() {
    const tableBody = document.getElementById("customersTableBody");
    if (!tableBody) return;
    tableBody.innerHTML = data.customers
      .map(
        (c) => `
            <tr>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.email}</td>
                <td>${c.phone}</td>
                <td>${c.orders}</td>
                <td>
                    <button class="btn btn-small btn-warning">Sửa</button>
                    <button class="btn btn-small btn-danger">Xóa</button>
                </td>
            </tr>
        `
      )
      .join("");
  }

  function loadAllData() {
    loadProductsByCategory("Áo Thun & T-shirt", "productsTshirtTableBody");
    loadProductsByCategory("Áo Sơ Mi", "productsSomiTableBody");
    loadProductsByCategory("Áo Khoác", "productsKhoacTableBody");
    loadProductsByCategory("Quần Jeans", "productsJeansTableBody");
    loadProductsByCategory("Quần Shorts", "productsShortsTableBody");
    loadCategories();
    loadOrders();
    loadCustomers();
  }

  // --- CÁC HÀM HỖ TRỢ (Navigation, Logout, Modal...) ---
  window.navigateToPage = function (pageId) {
    document
      .querySelectorAll(".page-content")
      .forEach((p) => p.classList.add("hidden"));
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) targetPage.classList.remove("hidden");
    else document.getElementById("dashboard-page").classList.remove("hidden");

    document
      .querySelectorAll(".nav-item")
      .forEach((item) => item.classList.remove("active"));
    const activeLink = document.querySelector(
      `.nav-link[data-page="${pageId}"]`
    );
    if (activeLink) activeLink.parentElement.classList.add("active");

    if (window.innerWidth <= 991)
      document.getElementById("sidebar").classList.remove("active");
  };

  function logout() {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      alert("Đăng xuất thành công!");
      window.location.href = "../login.html";
    }
  }

  window.openModal = function (modalId) {
    document.getElementById(modalId).classList.add("active");
  };

  window.closeModal = function (modalId) {
    document.getElementById(modalId).classList.remove("active");
  };

  // --- GÁN SỰ KIỆN ---
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      navigateToPage(this.dataset.page);
    });
  });

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  }

  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("active");
    });
  }

  // --- KHỞI CHẠY ---
  loadAllData();
  navigateToPage("dashboard");
});

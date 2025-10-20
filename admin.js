const data = {
  products: [
    {
      id: 1,
      name: "Áo thun đen",
      category: "Áo Thun & T-shirt",
      price: 320000,
      stock: 45,
      status: "Còn hàng",
    },
    {
      id: 2,
      name: "Áo sơ mi trắng",
      category: "Áo Sơ Mi",
      price: 450000,
      stock: 28,
      status: "Còn hàng",
    },
    {
      id: 3,
      name: "Áo khoác denim",
      category: "Áo Khoác",
      price: 790000,
      stock: 5,
      status: "Sắp hết",
    },
    {
      id: 4,
      name: "Quần jean xanh",
      category: "Quần Jeans",
      price: 680000,
      stock: 0,
      status: "Hết hàng",
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

// Load initial data
function loadTableData() {
  loadProducts();
  loadCategories();
  loadOrders();
  loadCustomers();
}

function loadProducts() {
  const tbody = document.getElementById("productsTableBody");
  tbody.innerHTML = data.products
    .map(
      (p) => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.price.toLocaleString()}đ</td>
            <td>${p.stock}</td>
            <td><span class="badge badge-${getStatusClass(p.status)}">${
        p.status
      }</span></td>
            <td>
                <button class="btn btn-small btn-warning" onclick="editItem('product', ${
                  p.id
                })">Sửa</button>
                <button class="btn btn-small btn-danger" onclick="deleteItem('product', ${
                  p.id
                })">Xóa</button>
            </td>
        </tr>
    `
    )
    .join("");
}

function loadCategories() {
  const tbody = document.getElementById("categoriesTableBody");
  tbody.innerHTML = data.categories
    .map(
      (c) => `
        <tr>
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.productCount}</td>
            <td>
                <button class="btn btn-small btn-warning" onclick="editItem('category', ${c.id})">Sửa</button>
                <button class="btn btn-small btn-danger" onclick="deleteItem('category', ${c.id})">Xóa</button>
            </td>
        </tr>
    `
    )
    .join("");
}

function loadOrders() {
  const tbody = document.getElementById("ordersTableBody");
  tbody.innerHTML = data.orders
    .map(
      (o) => `
        <tr>
            <td>${o.id}</td>
            <td>${o.customer}</td>
            <td>${o.total.toLocaleString()}đ</td>
            <td><span class="badge badge-${getOrderStatusClass(o.status)}">${
        o.status
      }</span></td>
            <td>${o.date}</td>
            <td>
                <button class="btn btn-small btn-success" onclick="viewOrder('${
                  o.id
                }')">Chi tiết</button>
            </td>
        </tr>
    `
    )
    .join("");
}

function loadCustomers() {
  const tbody = document.getElementById("customersTableBody");
  tbody.innerHTML = data.customers
    .map(
      (c) => `
        <tr>
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.orders}</td>
            <td>
                <button class="btn btn-small btn-warning" onclick="editItem('customer', ${c.id})">Sửa</button>
                <button class="btn btn-small btn-danger" onclick="deleteItem('customer', ${c.id})">Xóa</button>
            </td>
        </tr>
    `
    )
    .join("");
}

// Navigation
function navigateToPage(page) {
  document
    .querySelectorAll(".page-content")
    .forEach((p) => p.classList.add("hidden"));
  document.getElementById(`${page}-page`).classList.remove("hidden");

  document
    .querySelectorAll(".nav-item")
    .forEach((item) => item.classList.remove("active"));
  document
    .querySelector(`[data-page="${page}"]`)
    .parentElement.classList.add("active");

  if (window.innerWidth <= 991) {
    document.getElementById("sidebar").classList.remove("active");
  }
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// Helper functions
function getStatusClass(status) {
  if (status === "Còn hàng") return "success";
  if (status === "Sắp hết") return "warning";
  return "danger";
}

function getOrderStatusClass(status) {
  if (status === "Đã giao") return "success";
  if (status === "Đang xử lý") return "warning";
  return "danger";
}

function editItem(type, id) {
  alert(
    `Chỉnh sửa ${type} ID: ${id}\n\nChức năng này sẽ được tích hợp với ASP backend`
  );
}

function deleteItem(type, id) {
  if (confirm(`Bạn có chắc muốn xóa ${type} này?`)) {
    alert(`Đã xóa ${type} ID: ${id}`);
    loadTableData();
  }
}

function viewOrder(id) {
  alert(
    `Xem chi tiết đơn hàng: ${id}\n\nChức năng này sẽ được tích hợp với ASP backend`
  );
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  loadTableData();

  // Navigation
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const page = this.dataset.page;
      navigateToPage(page);
    });
  });

  // Menu toggle for mobile
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // Close modal when clicking outside
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active");
      }
    });
  });

  // Form submissions
  document
    .getElementById("productForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const product = {
        id: data.products.length + 1,
        name: formData.get("name"),
        category: this.querySelector('[name="category"] option:checked').text,
        price: parseInt(formData.get("price")),
        stock: parseInt(formData.get("stock")),
        status: parseInt(formData.get("stock")) > 10 ? "Còn hàng" : "Sắp hết",
      };

      data.products.push(product);
      loadProducts();
      closeModal("productModal");
      this.reset();
      alert("Đã thêm sản phẩm thành công!");
    });

  document
    .getElementById("categoryForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const category = {
        id: data.categories.length + 1,
        name: formData.get("name"),
        productCount: 0,
      };

      data.categories.push(category);
      loadCategories();
      closeModal("categoryModal");
      this.reset();
      alert("Đã thêm danh mục thành công!");
    });

  document
    .getElementById("customerForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const customer = {
        id: data.customers.length + 1,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        orders: 0,
      };

      data.customers.push(customer);
      loadCustomers();
      closeModal("customerModal");
      this.reset();
      alert("Đã thêm khách hàng thành công!");
    });
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", function (e) {
  if (window.innerWidth <= 991) {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");

    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  }
});

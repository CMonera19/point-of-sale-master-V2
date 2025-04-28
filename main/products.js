document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");
    const productTableBody = document.getElementById("productTableBody");
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function saveProducts() {
        localStorage.setItem("products", JSON.stringify(products));
    }

    function renderProducts() {
        productTableBody.innerHTML = "";
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button onclick="editProduct(${index})">Edit</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });
    }

    window.editProduct = function (index) {
        const product = products[index];
        document.getElementById("productId").value = index;
        document.getElementById("productName").value = product.name;
        document.getElementById("productQuantity").value = product.quantity;
        document.getElementById("productPrice").value = product.price;
    };

    window.deleteProduct = function (index) {
        products.splice(index, 1);
        saveProducts();
        renderProducts();
    };

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const productId = document.getElementById("productId").value;
        const name = document.getElementById("productName").value;
        const quantity = parseInt(document.getElementById("productQuantity").value);
        const price = parseFloat(document.getElementById("productPrice").value);

        if (productId) {
            products[productId] = { name, quantity, price };
        } else {
            products.push({ name, quantity, price });
        }

        saveProducts();
        renderProducts();
        productForm.reset();
        document.getElementById("productId").value = "";
    });

    renderProducts();
});

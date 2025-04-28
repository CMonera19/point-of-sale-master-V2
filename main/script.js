function showReports() {
    document.getElementById('content').innerHTML = `
      <h2>Sales Report</h2>

      <div class="sales-summary">
        <div><strong>Total Sales:</strong> <p id="totalSales">0</p></div>
        <div><strong>Total Revenue:</strong> <p id="totalRevenue">$0.00</p></div>
        <div><strong>Average Order Value:</strong> <p id="averageOrder">$0.00</p></div>
      </div>

      <div class="filter-container">
        <input type="date" id="startDate"> 
        <input type="date" id="endDate">
        <button onclick="filterSales()">Filter</button>
        <button class="export-btn" onclick="exportToCSV()">Export CSV</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity Sold</th>
            <th>Total Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody id="salesTable"></tbody>
      </table>

      <canvas id="salesChart"></canvas>
    `;

    generateDummySales();
    updateSalesSummary();
    generateSalesChart();
}

const salesData = [
    { name: "Laptop", quantity: 5, price: 1000, date: "2025-03-01" },
    { name: "Mouse", quantity: 10, price: 20, date: "2025-03-02" },
    { name: "Keyboard", quantity: 7, price: 50, date: "2025-03-03" }
];

function generateDummySales() {
    const salesTable = document.getElementById('salesTable');
    salesTable.innerHTML = "";
    salesData.forEach(sale => {
        salesTable.innerHTML += `
          <tr>
            <td>${sale.name}</td>
            <td>${sale.quantity}</td>
            <td>$${sale.quantity * sale.price}</td>
            <td>${sale.date}</td>
          </tr>`;
    });
}

function updateSalesSummary() {
    let totalSales = salesData.length;
    let totalRevenue = salesData.reduce((acc, sale) => acc + (sale.quantity * sale.price), 0);
    let averageOrder = totalRevenue / (totalSales || 1);

    document.getElementById("totalSales").innerText = totalSales;
    document.getElementById("totalRevenue").innerText = `$${totalRevenue.toFixed(2)}`;
    document.getElementById("averageOrder").innerText = `$${averageOrder.toFixed(2)}`;
}

function generateSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: salesData.map(sale => sale.name),
            datasets: [{
                label: 'Total Sales ($)',
                data: salesData.map(sale => sale.quantity * sale.price),
                backgroundColor: '#232857',
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
}

function exportToCSV() {
    let csvContent = "Product Name,Quantity Sold,Total Price,Date\n";
    salesData.forEach(sale => {
        csvContent += `${sale.name},${sale.quantity},$${sale.quantity * sale.price},${sale.date}\n`;
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csvContent], { type: "text/csv" }));
    link.download = "sales_report.csv";
    link.click();
}

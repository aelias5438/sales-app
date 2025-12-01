// Initialize chart variables
let productlineChart;
let countryChart;

async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
}

function formatCurrency(num) {
    return "$" + num.toLocaleString();
}

async function loadMetrics() {
    // Total Sales
    const salesData = await fetchJSON("/api/total-sales");
    document.getElementById("total-sales").innerText = formatCurrency(salesData.total_sales);

    // Total Volume
    const volumeData = await fetchJSON("/api/total-volume");
    document.getElementById("total-volume").innerText = volumeData.total_volume.toLocaleString() + " units";
}

async function loadProductlineChart() {
    const data = await fetchJSON("/api/sales-by-productline");

    const labels = Object.keys(data);
    const values = Object.values(data);

    if (productlineChart) productlineChart.destroy();

    const ctx = document.getElementById("productlineChart");
    productlineChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Sales ($)",
                data: values,
                backgroundColor: "#2563eb77",
                borderColor: "#2563eb",
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false }},
            scales: { y: { beginAtZero: true } }
        }
    });
}

async function loadCountryChart() {
    const data = await fetchJSON("/api/sales-by-country");

    const labels = Object.keys(data);
    const values = Object.values(data);

    if (countryChart) countryChart.destroy();

    const ctx = document.getElementById("countryChart");
    countryChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Sales ($)",
                data: values,
                backgroundColor: "#10b98177",
                borderColor: "#059669",
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false }},
            scales: { y: { beginAtZero: true } }
        }
    });
}

// Load everything when page loads
window.onload = async () => {
    await loadMetrics();
    await loadProductlineChart();
    await loadCountryChart();
};

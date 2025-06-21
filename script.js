document.addEventListener("DOMContentLoaded", () => {
    const odbInput = document.getElementById("odbInput");
    const searchButton = document.getElementById("searchButton");
    const loadingDiv = document.getElementById("loading");
    const errorDiv = document.getElementById("error");
    const resultsDiv = document.getElementById("results");
    const odbNameSpan = document.getElementById("odbName");
    const portsSpan = document.getElementById("ports");
    const regionSpan = document.getElementById("region");
    const vendorSpan = document.getElementById("vendor");
    const coordinatesSpan = document.getElementById("coordinates");
    const mapLink = document.getElementById("mapLink");

    const fetchData = async () => {
        const odbNumber = odbInput.value.trim();

        // Clear previous state
        errorDiv.style.display = "none";
        resultsDiv.style.display = "none";
        errorDiv.textContent = "";

        if (!odbNumber) {
            errorDiv.textContent = "يرجى إدخال رقم اللوحة (ODB)";
            errorDiv.style.display = "block";
            return;
        }

        loadingDiv.style.display = "block";

        try {
            const apiUrl = `https://location.sa.zain.com/lookup/odb?odbname=${encodeURIComponent(odbNumber)}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                // Handle non-JSON error responses or server errors
                throw new Error(`خطأ في الشبكة أو الخادم: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            if (data && data.length > 0) {
                const odbData = data[0];
                odbNameSpan.textContent = odbData.name || "غير متوفر";
                portsSpan.textContent = odbData.ports !== null ? odbData.ports : "غير متوفر";
                regionSpan.textContent = odbData.region || "غير متوفر";
                vendorSpan.textContent = odbData.vendor || "غير متوفر";

                if (odbData.latitude !== null && odbData.longitude !== null) {
                    const lat = parseFloat(odbData.latitude);
                    const lon = parseFloat(odbData.longitude);
                    coordinatesSpan.textContent = `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
                    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
                    mapLink.style.display = "inline-flex";
                } else {
                    coordinatesSpan.textContent = "غير متوفر";
                    mapLink.href = "#";
                    mapLink.style.display = "none";
                }

                resultsDiv.style.display = "block";
            } else {
                errorDiv.textContent = "لم يتم العثور على بيانات لرقم اللوحة المدخل.";
                errorDiv.style.display = "block";
            }
        } catch (error) {
            console.error("Fetch error:", error);
            errorDiv.textContent = `حدث خطأ أثناء جلب البيانات: ${error.message}. يرجى المحاولة مرة أخرى أو التأكد من صحة رقم اللوحة.`;
            errorDiv.style.display = "block";
        } finally {
            loadingDiv.style.display = "none";
        }
    };

    searchButton.addEventListener("click", fetchData);

    // Optional: Allow fetching data by pressing Enter in the input field
    odbInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            fetchData();
        }
    });
});


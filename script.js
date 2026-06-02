const STORAGE_KEY = "tripCollectionDashboardState";

function createId() {
    return `entry-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const defaultState = {
    estimate: {
        destination: "Ooty",
        people: 8,
        transport: 18000,
        stay: 24000,
        food: 12000,
        activities: 8000,
        buffer: 5000
    },
    collections: [
        {
            id: createId(),
            name: "Arjun",
            amount: 7000,
            mode: "UPI",
            date: "2026-06-01",
            status: "Paid",
            notes: "Full advance received"
        },
        {
            id: createId(),
            name: "Priya",
            amount: 5000,
            mode: "Cash",
            date: "2026-06-01",
            status: "Advance",
            notes: "Balance after hotel booking"
        },
        {
            id: createId(),
            name: "Kavin",
            amount: 6500,
            mode: "Bank Transfer",
            date: "2026-06-02",
            status: "Paid",
            notes: "Window seat requested"
        }
    ]
};

let state = loadState();
let searchTerm = "";
let statusFilter = "all";

const elements = {
    navToggle: document.getElementById("navToggle"),
    navLinks: document.getElementById("navLinks"),
    heroTotal: document.getElementById("heroTotal"),
    heroMeter: document.getElementById("heroMeter"),
    heroStatus: document.getElementById("heroStatus"),
    totalCollected: document.getElementById("totalCollected"),
    estimatedCost: document.getElementById("estimatedCost"),
    balanceNeeded: document.getElementById("balanceNeeded"),
    balanceHint: document.getElementById("balanceHint"),
    travelerCount: document.getElementById("travelerCount"),
    perHeadEstimate: document.getElementById("perHeadEstimate"),
    collectionForm: document.getElementById("collectionForm"),
    travelerName: document.getElementById("travelerName"),
    amountReceived: document.getElementById("amountReceived"),
    paymentMode: document.getElementById("paymentMode"),
    paymentDate: document.getElementById("paymentDate"),
    paymentStatus: document.getElementById("paymentStatus"),
    paymentNotes: document.getElementById("paymentNotes"),
    destination: document.getElementById("destination"),
    peopleCount: document.getElementById("peopleCount"),
    transportCost: document.getElementById("transportCost"),
    stayCost: document.getElementById("stayCost"),
    foodCost: document.getElementById("foodCost"),
    activityCost: document.getElementById("activityCost"),
    bufferCost: document.getElementById("bufferCost"),
    destinationView: document.getElementById("destinationView"),
    estimateTotalView: document.getElementById("estimateTotalView"),
    perHeadView: document.getElementById("perHeadView"),
    collectionTable: document.getElementById("collectionTable"),
    searchInput: document.getElementById("searchInput"),
    statusFilter: document.getElementById("statusFilter"),
    resetDemoBtn: document.getElementById("resetDemoBtn"),
    progressRing: document.getElementById("progressRing"),
    progressPercent: document.getElementById("progressPercent"),
    progressText: document.getElementById("progressText"),
    modeList: document.getElementById("modeList"),
    readinessList: document.getElementById("readinessList")
};

function loadState() {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return getFreshDefaultState();

    try {
        const parsedState = JSON.parse(savedState);
        return {
            estimate: { ...defaultState.estimate, ...parsedState.estimate },
            collections: Array.isArray(parsedState.collections) ? parsedState.collections : getFreshDefaultState().collections
        };
    } catch {
        return getFreshDefaultState();
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

function getEstimateTotal() {
    const { transport, stay, food, activities, buffer } = state.estimate;
    return [transport, stay, food, activities, buffer].reduce((total, amount) => total + Number(amount || 0), 0);
}

function getCollectedTotal() {
    return state.collections.reduce((total, entry) => total + Number(entry.amount || 0), 0);
}

function getProgressPercent() {
    const estimateTotal = getEstimateTotal();
    if (!estimateTotal) return 0;
    return Math.min(Math.round((getCollectedTotal() / estimateTotal) * 100), 100);
}

function getFilteredCollections() {
    return state.collections.filter(entry => {
        const searchable = `${entry.name} ${entry.mode} ${entry.status} ${entry.notes}`.toLowerCase();
        const matchesSearch = searchable.includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
}

function updateEstimateFromInputs() {
    state.estimate = {
        destination: elements.destination.value.trim() || "Trip",
        people: Math.max(Number(elements.peopleCount.value) || 1, 1),
        transport: Number(elements.transportCost.value) || 0,
        stay: Number(elements.stayCost.value) || 0,
        food: Number(elements.foodCost.value) || 0,
        activities: Number(elements.activityCost.value) || 0,
        buffer: Number(elements.bufferCost.value) || 0
    };
    saveState();
    render();
}

function renderEstimateInputs() {
    elements.destination.value = state.estimate.destination;
    elements.peopleCount.value = state.estimate.people;
    elements.transportCost.value = state.estimate.transport;
    elements.stayCost.value = state.estimate.stay;
    elements.foodCost.value = state.estimate.food;
    elements.activityCost.value = state.estimate.activities;
    elements.bufferCost.value = state.estimate.buffer;
}

function renderDashboard() {
    const totalCollected = getCollectedTotal();
    const estimateTotal = getEstimateTotal();
    const balance = estimateTotal - totalCollected;
    const perHead = estimateTotal / Math.max(Number(state.estimate.people) || 1, 1);
    const progress = getProgressPercent();

    elements.heroTotal.textContent = formatCurrency(totalCollected);
    elements.heroMeter.style.width = `${progress}%`;
    elements.heroStatus.textContent = progress >= 100
        ? "Great! Your collection has covered the estimated trip cost."
        : `${progress}% of the estimated trip cost is collected.`;

    elements.totalCollected.textContent = formatCurrency(totalCollected);
    elements.estimatedCost.textContent = formatCurrency(estimateTotal);
    elements.balanceNeeded.textContent = balance > 0 ? formatCurrency(balance) : formatCurrency(Math.abs(balance));
    elements.balanceHint.textContent = balance > 0 ? "Remaining amount to collect" : "Extra surplus available";
    elements.travelerCount.textContent = state.collections.length.toString();
    elements.perHeadEstimate.textContent = `${formatCurrency(perHead)} estimated per person`;

    elements.destinationView.textContent = state.estimate.destination;
    elements.estimateTotalView.textContent = formatCurrency(estimateTotal);
    elements.perHeadView.textContent = formatCurrency(perHead);
}

function renderCollections() {
    const filteredCollections = getFilteredCollections();

    if (!filteredCollections.length) {
        elements.collectionTable.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">No collection entries match this view.</td>
            </tr>
        `;
        return;
    }

    elements.collectionTable.innerHTML = filteredCollections.map(entry => `
        <tr>
            <td><strong>${escapeHtml(entry.name)}</strong></td>
            <td>${formatCurrency(entry.amount)}</td>
            <td>${escapeHtml(entry.mode)}</td>
            <td>${escapeHtml(entry.date)}</td>
            <td><span class="status ${escapeHtml(entry.status.toLowerCase())}">${escapeHtml(entry.status)}</span></td>
            <td>${escapeHtml(entry.notes || "-")}</td>
            <td><button class="delete-btn" type="button" data-id="${escapeHtml(entry.id)}">Remove</button></td>
        </tr>
    `).join("");
}

function renderReports() {
    const progress = getProgressPercent();
    const estimateTotal = getEstimateTotal();
    const collectedTotal = getCollectedTotal();
    const paymentModes = state.collections.reduce((totals, entry) => {
        totals[entry.mode] = (totals[entry.mode] || 0) + Number(entry.amount || 0);
        return totals;
    }, {});

    elements.progressRing.style.setProperty("--progress", `${progress}%`);
    elements.progressPercent.textContent = `${progress}%`;
    elements.progressText.textContent = estimateTotal
        ? `${formatCurrency(collectedTotal)} collected against ${formatCurrency(estimateTotal)} estimated.`
        : "Add an estimate to calculate trip progress.";

    elements.modeList.innerHTML = Object.entries(paymentModes).map(([mode, total]) => {
        const width = collectedTotal ? Math.round((total / collectedTotal) * 100) : 0;
        return `
            <div class="mode-item">
                <div><strong>${escapeHtml(mode)}</strong><span>${formatCurrency(total)}</span></div>
                <div class="bar"><span style="width: ${width}%"></span></div>
            </div>
        `;
    }).join("") || "<p class='muted'>No payment modes yet.</p>";

    const balance = estimateTotal - collectedTotal;
    const checklist = [
        { label: "Destination added", done: Boolean(state.estimate.destination) },
        { label: "At least one collection saved", done: state.collections.length > 0 },
        { label: "50% of estimate collected", done: progress >= 50 },
        { label: "Full estimate covered", done: balance <= 0 && estimateTotal > 0 }
    ];

    elements.readinessList.innerHTML = checklist.map(item => `
        <li class="${item.done ? "done" : "pending"}">
            <span>${item.done ? "✓" : "○"}</span>${escapeHtml(item.label)}
        </li>
    `).join("");
}

function render() {
    renderDashboard();
    renderCollections();
    renderReports();
}

function addCollection(event) {
    event.preventDefault();

    const entry = {
        id: createId(),
        name: elements.travelerName.value.trim(),
        amount: Number(elements.amountReceived.value) || 0,
        mode: elements.paymentMode.value,
        date: elements.paymentDate.value,
        status: elements.paymentStatus.value,
        notes: elements.paymentNotes.value.trim()
    };

    if (!entry.name || entry.amount < 0 || !entry.date) return;

    state.collections.unshift(entry);
    saveState();
    elements.collectionForm.reset();
    elements.paymentDate.valueAsDate = new Date();
    render();
}

function deleteCollection(id) {
    state.collections = state.collections.filter(entry => entry.id !== id);
    saveState();
    render();
}

function getFreshDefaultState() {
    return {
        estimate: { ...defaultState.estimate },
        collections: defaultState.collections.map(entry => ({ ...entry, id: createId() }))
    };
}

function resetDemo() {
    localStorage.removeItem(STORAGE_KEY);
    state = getFreshDefaultState();
    renderEstimateInputs();
    render();
}

elements.navToggle.addEventListener("click", () => {
    const isOpen = elements.navLinks.classList.toggle("open");
    elements.navToggle.setAttribute("aria-expanded", isOpen.toString());
});

elements.navLinks.addEventListener("click", event => {
    if (event.target.tagName === "A") {
        elements.navLinks.classList.remove("open");
        elements.navToggle.setAttribute("aria-expanded", "false");
    }
});

elements.collectionForm.addEventListener("submit", addCollection);
[elements.destination, elements.peopleCount, elements.transportCost, elements.stayCost, elements.foodCost, elements.activityCost, elements.bufferCost]
    .forEach(input => input.addEventListener("input", updateEstimateFromInputs));

elements.collectionTable.addEventListener("click", event => {
    const button = event.target.closest(".delete-btn");
    if (!button) return;
    deleteCollection(button.dataset.id);
});

elements.searchInput.addEventListener("input", event => {
    searchTerm = event.target.value;
    renderCollections();
});

elements.statusFilter.addEventListener("change", event => {
    statusFilter = event.target.value;
    renderCollections();
});

elements.resetDemoBtn.addEventListener("click", resetDemo);

renderEstimateInputs();
elements.paymentDate.valueAsDate = new Date();
render();

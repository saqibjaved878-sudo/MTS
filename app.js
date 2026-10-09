// State management and data keys
const STORAGE_KEYS = {
  CUSTOMERS: 'mts_customers',
  MAINTENANCE: 'mts_maintenance',
  BOSS_PAYMENTS: 'mts_boss_payments',
  HARDWARE: 'mts_hardware',
  EXPENSES: 'mts_expenses'
};

// Seed initial data if localStorage is empty
function seedDatabase() {
  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    const defaultCustomers = [
      { id: 'c1', name: 'Ali Khan', flatNo: 'Flat 101', monthlyFee: 2000, mobile: '03001234567' },
      { id: 'c2', name: 'Muhammad Bilal', flatNo: 'Flat 102', monthlyFee: 1500, mobile: '03217654321' },
      { id: 'c3', name: 'Usman Ghani', flatNo: 'Flat 201', monthlyFee: 2500, mobile: '03338765432' },
      { id: 'c4', name: 'Zainab Bibi', flatNo: 'Flat 202', monthlyFee: 2000, mobile: '03450987654' },
      { id: 'c5', name: 'Siddique Bakers', flatNo: 'Shop 1', monthlyFee: 3000, mobile: '03123456789' },
      { id: 'c6', name: 'Kashif Mobile', flatNo: 'Shop 2', monthlyFee: 3000, mobile: '03004567890' },
      { id: 'c7', name: 'Tariq Mahmood', flatNo: 'Flat 301', monthlyFee: 2200, mobile: '03229876543' },
      { id: 'c8', name: 'Sajid Jameel', flatNo: 'Flat 302', monthlyFee: 2200, mobile: '03008765432' }
    ];
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(defaultCustomers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.MAINTENANCE)) {
    // Generate payments for Jan - Oct 2026
    const maintenance = [];
    const collectors = ['SAQIB', 'AHMED'];
    const customers = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMERS));
    
    // Seed Jan to Oct
    for (let month = 0; month < 10; month++) {
      const year = 2026;
      const monthStr = String(month + 1).padStart(2, '0');
      
      customers.forEach((cust, index) => {
        // 90% chance customer paid
        if (Math.random() > 0.1) {
          const collector = collectors[(index + month) % 2];
          maintenance.push({
            id: `m_${year}_${monthStr}_${cust.id}`,
            customerId: cust.id,
            month: `${year}-${monthStr}`,
            amount: cust.monthlyFee,
            collectedBy: collector,
            date: `${year}-${monthStr}-${String(10 + (index % 10)).padStart(2, '0')}`,
            notes: 'Monthly Maintenance Paid'
          });
        }
      });
    }
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(maintenance));
  }

  if (!localStorage.getItem(STORAGE_KEYS.BOSS_PAYMENTS)) {
    const bossPayments = [
      { id: 'bp1', amount: 5000, paidBy: 'SAQIB', date: '2026-01-15', notes: 'Monthly Boss Share' },
      { id: 'bp2', amount: 6000, paidBy: 'AHMED', date: '2026-02-18', notes: 'Monthly Boss Share' },
      { id: 'bp3', amount: 5000, paidBy: 'SAQIB', date: '2026-03-15', notes: 'Monthly Boss Share' },
      { id: 'bp4', amount: 5500, paidBy: 'AHMED', date: '2026-04-12', notes: 'Boss Share' },
      { id: 'bp5', amount: 7000, paidBy: 'SAQIB', date: '2026-05-20', notes: 'Boss Share' },
      { id: 'bp6', amount: 5000, paidBy: 'AHMED', date: '2026-06-14', notes: 'Boss Share' },
      { id: 'bp7', amount: 6000, paidBy: 'SAQIB', date: '2026-07-16', notes: 'Boss Share' },
      { id: 'bp8', amount: 6500, paidBy: 'AHMED', date: '2026-08-11', notes: 'Boss Share' },
      { id: 'bp9', amount: 5500, paidBy: 'SAQIB', date: '2026-09-15', notes: 'Boss Share' },
      { id: 'bp10', amount: 4000, paidBy: 'SAQIB', date: '2026-10-10', notes: 'Partial Share' }
    ];
    localStorage.setItem(STORAGE_KEYS.BOSS_PAYMENTS, JSON.stringify(bossPayments));
  }

  if (!localStorage.getItem(STORAGE_KEYS.HARDWARE)) {
    const hardware = [
      { id: 'h1', itemName: 'Water Pipe 2"', vendor: 'Madina Hardware', amount: 1200, paidBy: 'SAQIB', date: '2026-02-05', notes: 'Roof plumbing repair' },
      { id: 'h2', itemName: 'Electrical Wire roll', vendor: 'Fine Electric', amount: 3500, paidBy: 'AHMED', date: '2026-04-10', notes: 'Staircase lighting' },
      { id: 'h3', itemName: 'Main Gate Lock', vendor: 'Madina Hardware', amount: 1500, paidBy: 'SAQIB', date: '2026-07-22', notes: 'New main door lock' },
      { id: 'h4', itemName: 'LED Bulbs 12W (6 Pcs)', vendor: 'Fine Electric', amount: 1800, paidBy: 'AHMED', date: '2026-09-05', notes: 'Replacement bulbs' }
    ];
    localStorage.setItem(STORAGE_KEYS.HARDWARE, JSON.stringify(hardware));
  }

  if (!localStorage.getItem(STORAGE_KEYS.EXPENSES)) {
    const expenses = [
      // Food
      { id: 'e1', category: 'Food', amount: 450, spentBy: 'SAQIB', date: '2026-01-12', notes: 'Lunch with plumber' },
      { id: 'e2', category: 'Food', amount: 600, spentBy: 'AHMED', date: '2026-02-14', notes: 'Samosa party' },
      { id: 'e3', category: 'Food', amount: 500, spentBy: 'AFTAB', date: '2026-03-10', notes: 'Dinner bill' },
      { id: 'e4', category: 'Food', amount: 800, spentBy: 'SAQIB', date: '2026-05-12', notes: 'Lunch' },
      { id: 'e5', category: 'Food', amount: 350, spentBy: 'AHMED', date: '2026-08-20', notes: 'Tea and biscuits' },
      { id: 'e6', category: 'Food', amount: 900, spentBy: 'AFTAB', date: '2026-10-05', notes: 'Staff Lunch' },
      
      // Baraf (Ice)
      { id: 'e7', category: 'Baraf', amount: 150, spentBy: 'SAQIB', date: '2026-05-15', notes: 'Daily Ice block' },
      { id: 'e8', category: 'Baraf', amount: 200, spentBy: 'AHMED', date: '2026-06-10', notes: 'Ice blocks for water cooler' },
      { id: 'e9', category: 'Baraf', amount: 250, spentBy: 'SAQIB', date: '2026-07-08', notes: 'Ice block' },
      { id: 'ea', category: 'Baraf', amount: 180, spentBy: 'AHMED', date: '2026-08-12', notes: 'Ice block' },
      { id: 'eb', category: 'Baraf', amount: 120, spentBy: 'SAQIB', date: '2026-09-02', notes: 'Ice block' },

      // Chay (Tea)
      { id: 'ec', category: 'Chay', amount: 1500, spentBy: 'AFTAB', date: '2026-01-28', notes: 'Chay weekly payment' },
      { id: 'ed', category: 'Chay', amount: 1600, spentBy: 'AFTAB', date: '2026-02-28', notes: 'Chay weekly payment' },
      { id: 'ee', category: 'Chay', amount: 1500, spentBy: 'AFTAB', date: '2026-03-28', notes: 'Chay weekly payment' },
      { id: 'ef', category: 'Chay', amount: 1750, spentBy: 'AFTAB', date: '2026-04-28', notes: 'Chay weekly payment' },
      { id: 'eg', category: 'Chay', amount: 1500, spentBy: 'AFTAB', date: '2026-05-28', notes: 'Chay weekly payment' },
      { id: 'eh', category: 'Chay', amount: 1800, spentBy: 'AFTAB', date: '2026-06-28', notes: 'Chay weekly payment' },
      { id: 'ei', category: 'Chay', amount: 1650, spentBy: 'AFTAB', date: '2026-07-28', notes: 'Chay weekly payment' },
      { id: 'ej', category: 'Chay', amount: 1500, spentBy: 'AFTAB', date: '2026-08-28', notes: 'Chay weekly payment' },
      { id: 'ek', category: 'Chay', amount: 1600, spentBy: 'AFTAB', date: '2026-09-28', notes: 'Chay weekly payment' },
      { id: 'el', category: 'Chay', amount: 1400, spentBy: 'AFTAB', date: '2026-10-28', notes: 'Chay weekly payment' }
    ];
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }
}

// Data Getters and Setters
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Date helpers
function getMonthLabel(yyyyMm) {
  const [year, month] = yyyyMm.split('-');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

// Global Chart Instances
let maintenanceChartInstance = null;
let expenseBreakdownChartInstance = null;

// Application Controller State
const appState = {
  currentView: 'dashboard',
  selectedMonth: '2026-10', // Default matches the selector in the screenshot
  selectedSummaryYear: '2026',
  editingCustomerId: null,
  editingMaintenanceId: null,
  editingBossPaymentId: null,
  editingHardwareId: null,
  editingExpenseId: null,
  maintenanceFilter: 'all',
  expensesFilter: 'all'
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  seedDatabase();
  initSidebar();
  initMonthSelector();
  switchView(appState.currentView);
  
  // Bind global cancel/close events for modal
  document.querySelectorAll('.modal-close, .btn-cancel').forEach(el => {
    el.addEventListener('click', closeModal);
  });
});

// Sidebar Navigation
function initSidebar() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');
      if (targetView) {
        menuItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        switchView(targetView);
      }
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }
}

// Initialize Year and Month Selectors
function initMonthSelector() {
  const monthSelector = document.getElementById('dashboardMonthSelector');
  if (monthSelector) {
    monthSelector.value = appState.selectedMonth;
    monthSelector.addEventListener('change', (e) => {
      appState.selectedMonth = e.target.value;
      renderDashboard();
    });
  }

  const yearSelector = document.getElementById('summaryYearSelector');
  if (yearSelector) {
    yearSelector.value = appState.selectedSummaryYear;
    yearSelector.addEventListener('change', (e) => {
      appState.selectedSummaryYear = e.target.value;
      renderAnnualSummary();
    });
  }
}

// View switcher controller
function switchView(viewId) {
  appState.currentView = viewId;
  
  // Hide all views, show selected
  document.querySelectorAll('.view-section').forEach(view => {
    view.classList.remove('active');
  });
  const activeView = document.getElementById(`${viewId}-view`);
  if (activeView) {
    activeView.classList.add('active');
  }

  // Close sidebar on mobile after selecting a view
  document.getElementById('sidebar').classList.remove('mobile-open');

  // Trigger specific view renders
  switch (viewId) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'customers':
      renderCustomersView();
      break;
    case 'boss-payments':
      renderBossPaymentsView();
      break;
    case 'hardware':
      renderHardwareLedgerView();
      break;
    case 'expenses':
      renderExpensesView();
      break;
    case 'annual-summary':
      renderAnnualSummary();
      break;
  }
}

/* ==========================================================================
   DASHBOARD VIEW
   ========================================================================== */
function renderDashboard() {
  const currentMonth = appState.selectedMonth; // format: "YYYY-MM"
  const currentYear = currentMonth.split('-')[0];
  
  // Fetch All Datasets
  const customers = getData(STORAGE_KEYS.CUSTOMERS);
  const maintenance = getData(STORAGE_KEYS.MAINTENANCE);
  const bossPayments = getData(STORAGE_KEYS.BOSS_PAYMENTS);
  const hardware = getData(STORAGE_KEYS.HARDWARE);
  const expenses = getData(STORAGE_KEYS.EXPENSES);

  // 1. FILTER DATA BY CURRENT MONTH
  const monthlyMaintenance = maintenance.filter(m => m.month === currentMonth);
  const monthlyBossPayments = bossPayments.filter(b => b.date.startsWith(currentMonth));
  const monthlyHardware = hardware.filter(h => h.date.startsWith(currentMonth));
  const monthlyExpenses = expenses.filter(e => e.date.startsWith(currentMonth));

  // 2. SUM CALCULATIONS FOR THIS MONTH
  const totalReceived = monthlyMaintenance.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalCustomersCount = customers.length;
  const totalBossPaid = monthlyBossPayments.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalHardwareSpent = monthlyHardware.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpensesSpent = monthlyExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
  
  // Net Balance calculation
  const totalOutflow = totalBossPaid + totalHardwareSpent + totalExpensesSpent;
  const netBalance = totalReceived - totalOutflow;

  // 3. SET METRIC CARD VALUE IN DOM
  document.getElementById('metric-received').innerText = `Rs ${totalReceived.toLocaleString()}`;
  document.getElementById('metric-customers').innerText = totalCustomersCount;
  document.getElementById('metric-boss').innerText = `Rs ${totalBossPaid.toLocaleString()}`;
  document.getElementById('metric-net').innerText = `Rs ${netBalance.toLocaleString()}`;

  // 4. PERSONS SUMMARY (فراد کا حساب)
  // Saqib Maintenance Collected in selected month
  const saqibCollected = monthlyMaintenance
    .filter(m => m.collectedBy === 'SAQIB')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  // Ahmed Maintenance Collected in selected month
  const ahmedCollected = monthlyMaintenance
    .filter(m => m.collectedBy === 'AHMED')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  // Aftab Chay Payment or Expenses in selected month
  const aftabChaySpent = monthlyExpenses
    .filter(e => e.category === 'Chay' && e.spentBy === 'AFTAB')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  // Render Persons Summary List
  const personsList = document.getElementById('persons-summary-list');
  personsList.innerHTML = `
    <div class="detail-item">
      <div class="detail-item-left">
        <div class="detail-avatar saqib">SJ</div>
        <div class="detail-info">
          <span class="detail-name">SAQIB JAVED</span>
          <span class="detail-subtext">Maintenance collected</span>
        </div>
      </div>
      <span class="detail-value received">Rs ${saqibCollected.toLocaleString()}</span>
    </div>
    <div class="detail-item">
      <div class="detail-item-left">
        <div class="detail-avatar ahmed">AH</div>
        <div class="detail-info">
          <span class="detail-name">AHMED HASSAN</span>
          <span class="detail-subtext">Maintenance collected</span>
        </div>
      </div>
      <span class="detail-value received">Rs ${ahmedCollected.toLocaleString()}</span>
    </div>
    <div class="detail-item">
      <div class="detail-item-left">
        <div class="detail-avatar aftab">AA</div>
        <div class="detail-info">
          <span class="detail-name">AFTAB AHMED</span>
          <span class="detail-subtext">Chay weekly payment</span>
        </div>
      </div>
      <div class="detail-info" style="align-items: flex-end;">
        <span class="detail-value">Rs ${aftabChaySpent.toLocaleString()}</span>
        <span class="badge warning">Weekly due</span>
      </div>
    </div>
  `;

  // 5. EXPENSES SUMMARY LIST (تمام خرچے)
  // Boss ko diya
  const expBoss = totalBossPaid;
  // Food totals
  const expFoodSaqib = monthlyExpenses.filter(e => e.category === 'Food' && e.spentBy === 'SAQIB').reduce((sum, i) => sum + Number(i.amount), 0);
  const expFoodAhmed = monthlyExpenses.filter(e => e.category === 'Food' && e.spentBy === 'AHMED').reduce((sum, i) => sum + Number(i.amount), 0);
  const expFoodAftab = monthlyExpenses.filter(e => e.category === 'Food' && e.spentBy === 'AFTAB').reduce((sum, i) => sum + Number(i.amount), 0);
  // Baraf totals
  const expBarafSaqib = monthlyExpenses.filter(e => e.category === 'Baraf' && e.spentBy === 'SAQIB').reduce((sum, i) => sum + Number(i.amount), 0);
  const expBarafAhmed = monthlyExpenses.filter(e => e.category === 'Baraf' && e.spentBy === 'AHMED').reduce((sum, i) => sum + Number(i.amount), 0);
  // Chay
  const expChayAftab = monthlyExpenses.filter(e => e.category === 'Chay' && e.spentBy === 'AFTAB').reduce((sum, i) => sum + Number(i.amount), 0);
  
  // Render Expenses summary list
  const expensesList = document.getElementById('expenses-summary-list');
  expensesList.innerHTML = `
    <div class="detail-item">
      <div class="detail-item-left"><span class="detail-name">Boss ko diya</span></div>
      <span class="detail-value expense">Rs ${expBoss.toLocaleString()}</span>
    </div>
    <div class="detail-item">
      <div class="detail-item-left"><span class="detail-name">Food — SAQIB</span></div>
      <span class="detail-value expense">Rs ${expFoodSaqib.toLocaleString()}</span>
    </div>
    <div class="detail-item">
      <div class="detail-item-left"><span class="detail-name">Food — AHMED</span></div>
      <span class="detail-value expense">Rs ${expFoodAhmed.toLocaleString()}</span>
    </div>
    <div class="detail-item">
      <div class="detail-item-left"><span class="detail-name">Food — AFTAB</span></div>
      <span class="detail-value expense">Rs ${expFoodAftab.toLocaleString()}</span>
    </div>
    <div class="detail-item">
      <div class="detail-item-left"><span class="detail-name">Baraf (SAQIB)</span></div>
      <span class="detail-value expense">Rs ${expBarafSaqib.toLocaleString()}</span>
    </div>
    <div class="detail-item">
      <div class="detail-item-left"><span class="detail-name">Baraf (AHMED)</span></div>
      <span class="detail-value expense">Rs ${expBarafAhmed.toLocaleString()}</span>
    </div>
    <div class="detail-item">
      <div class="detail-item-left"><span class="detail-name">Chay (AFTAB)</span></div>
      <span class="detail-value expense">Rs ${expChayAftab.toLocaleString()}</span>
    </div>
  `;

  // 6. NET DIFFERENCE CARD (فرق)
  // Calculate cash collection minus outbound payments for Saqib and Ahmed
  // Saqib Net = Saqib Collection - Saqib Boss payment - Saqib Food - Saqib Baraf - Saqib Hardware
  const saqibBossPaid = monthlyBossPayments.filter(b => b.paidBy === 'SAQIB').reduce((sum, i) => sum + Number(i.amount), 0);
  const saqibFoodSpent = monthlyExpenses.filter(e => e.category === 'Food' && e.spentBy === 'SAQIB').reduce((sum, i) => sum + Number(i.amount), 0);
  const saqibBarafSpent = monthlyExpenses.filter(e => e.category === 'Baraf' && e.spentBy === 'SAQIB').reduce((sum, i) => sum + Number(i.amount), 0);
  const saqibHardwareSpent = monthlyHardware.filter(h => h.paidBy === 'SAQIB').reduce((sum, i) => sum + Number(i.amount), 0);
  const saqibClosing = saqibCollected - saqibBossPaid - saqibFoodSpent - saqibBarafSpent - saqibHardwareSpent;

  // Ahmed Net = Ahmed Collection - Ahmed Boss payment - Ahmed Food - Ahmed Baraf - Ahmed Hardware
  const ahmedBossPaid = monthlyBossPayments.filter(b => b.paidBy === 'AHMED').reduce((sum, i) => sum + Number(i.amount), 0);
  const ahmedFoodSpent = monthlyExpenses.filter(e => e.category === 'Food' && e.spentBy === 'AHMED').reduce((sum, i) => sum + Number(i.amount), 0);
  const ahmedBarafSpent = monthlyExpenses.filter(e => e.category === 'Baraf' && e.spentBy === 'AHMED').reduce((sum, i) => sum + Number(i.amount), 0);
  const ahmedHardwareSpent = monthlyHardware.filter(h => h.paidBy === 'AHMED').reduce((sum, i) => sum + Number(i.amount), 0);
  const ahmedClosing = ahmedCollected - ahmedBossPaid - ahmedFoodSpent - ahmedBarafSpent - ahmedHardwareSpent;

  const combinedNetBalance = saqibClosing + ahmedClosing;

  const diffList = document.getElementById('net-diff-summary-list');
  diffList.innerHTML = `
    <div class="detail-item">
      <div class="detail-item-left">
        <div class="detail-avatar saqib">SJ</div>
        <span class="detail-name">SAQIB closing</span>
      </div>
      <span class="detail-value ${saqibClosing >= 0 ? 'received' : 'expense'}">Rs ${saqibClosing.toLocaleString()}</span>
    </div>
    <div class="detail-item">
      <div class="detail-item-left">
        <div class="detail-avatar ahmed">AH</div>
        <span class="detail-name">AHMED closing</span>
      </div>
      <span class="detail-value ${ahmedClosing >= 0 ? 'received' : 'expense'}">Rs ${ahmedClosing.toLocaleString()}</span>
    </div>
    <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 4px;">
      <span style="font-size: 0.75rem; color: var(--text-muted);">Combined net balance</span>
      <span style="font-size: 1.5rem; font-weight: 700; color: var(--color-received);">Rs ${combinedNetBalance.toLocaleString()}</span>
    </div>
  `;

  // 7. RENDER CHARTS
  renderDashboardCharts(currentYear, currentMonth);
}

// Chart.js rendering logic
function renderDashboardCharts(year, currentMonth) {
  // --- Maintenance Chart (Jan - Dec) ---
  const maintenance = getData(STORAGE_KEYS.MAINTENANCE);
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const saqibData = [];
  const ahmedData = [];

  months.forEach(m => {
    const monthKey = `${year}-${m}`;
    const monthlyRecords = maintenance.filter(rec => rec.month === monthKey);
    
    const saqibSum = monthlyRecords.filter(r => r.collectedBy === 'SAQIB').reduce((sum, r) => sum + Number(r.amount), 0);
    const ahmedSum = monthlyRecords.filter(r => r.collectedBy === 'AHMED').reduce((sum, r) => sum + Number(r.amount), 0);
    
    saqibData.push(saqibSum);
    ahmedData.push(ahmedSum);
  });

  const ctxMaintenance = document.getElementById('maintenanceChart').getContext('2d');
  if (maintenanceChartInstance) {
    maintenanceChartInstance.destroy();
  }
  
  maintenanceChartInstance = new Chart(ctxMaintenance, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'SAQIB',
          data: saqibData,
          backgroundColor: '#10b981', // green
          borderRadius: 4,
        },
        {
          label: 'AHMED',
          data: ahmedData,
          backgroundColor: '#3b82f6', // blue
          borderRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) { return 'Rs ' + (value >= 1000 ? (value / 1000) + 'k' : value); }
          },
          grid: {
            color: '#f1f5f9'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            boxWidth: 12,
            font: { family: 'Outfit' }
          }
        }
      }
    }
  });

  // --- Expense Breakdown Chart (Pie) ---
  const bossPayments = getData(STORAGE_KEYS.BOSS_PAYMENTS);
  const expenses = getData(STORAGE_KEYS.EXPENSES);
  const hardware = getData(STORAGE_KEYS.HARDWARE);

  const monthlyBoss = bossPayments.filter(b => b.date.startsWith(currentMonth)).reduce((sum, r) => sum + Number(r.amount), 0);
  const monthlyHardware = hardware.filter(h => h.date.startsWith(currentMonth)).reduce((sum, r) => sum + Number(r.amount), 0);
  
  const monthlyFood = expenses.filter(e => e.date.startsWith(currentMonth) && e.category === 'Food').reduce((sum, r) => sum + Number(r.amount), 0);
  const monthlyBaraf = expenses.filter(e => e.date.startsWith(currentMonth) && e.category === 'Baraf').reduce((sum, r) => sum + Number(r.amount), 0);
  const monthlyChay = expenses.filter(e => e.date.startsWith(currentMonth) && e.category === 'Chay').reduce((sum, r) => sum + Number(r.amount), 0);

  const ctxExpenses = document.getElementById('expenseBreakdownChart').getContext('2d');
  if (expenseBreakdownChartInstance) {
    expenseBreakdownChartInstance.destroy();
  }

  // Don't show chart if no data
  const hasData = (monthlyBoss + monthlyFood + monthlyBaraf + monthlyChay + monthlyHardware) > 0;

  expenseBreakdownChartInstance = new Chart(ctxExpenses, {
    type: 'doughnut',
    data: {
      labels: ['Boss', 'Food', 'Baraf', 'Chay', 'Hardware'],
      datasets: [{
        data: hasData ? [monthlyBoss, monthlyFood, monthlyBaraf, monthlyChay, monthlyHardware] : [0, 0, 0, 0, 1], // placeholder
        backgroundColor: hasData 
          ? ['#8b5cf6', '#f59e0b', '#3b82f6', '#ef4444', '#64748b']
          : ['#e2e8f0'], // Grey if empty
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 12,
            font: { family: 'Outfit' }
          }
        },
        tooltip: {
          enabled: hasData,
          callbacks: {
            label: function(context) {
              return ` ${context.label}: Rs ${context.raw.toLocaleString()}`;
            }
          }
        }
      }
    }
  });
}


/* ==========================================================================
   CUSTOMERS VIEW
   ========================================================================== */
function renderCustomersView() {
  const activeTab = document.querySelector('#customers-view .sub-tab-item.active');
  const tabType = activeTab ? activeTab.getAttribute('data-tab') : 'list';
  
  const customerListSec = document.getElementById('customer-list-section');
  const maintenanceLedgerSec = document.getElementById('maintenance-ledger-section');

  if (tabType === 'list') {
    customerListSec.style.display = 'block';
    maintenanceLedgerSec.style.display = 'none';
    renderCustomersTable();
  } else {
    customerListSec.style.display = 'none';
    maintenanceLedgerSec.style.display = 'block';
    renderMaintenanceTable();
  }
}

// Switch customer subtabs
document.querySelectorAll('#customers-view .sub-tab-item').forEach(tab => {
  tab.addEventListener('click', (e) => {
    document.querySelectorAll('#customers-view .sub-tab-item').forEach(el => el.classList.remove('active'));
    tab.classList.add('active');
    renderCustomersView();
  });
});

// Render Customers List
function renderCustomersTable() {
  const customers = getData(STORAGE_KEYS.CUSTOMERS);
  const searchVal = document.getElementById('customerSearchInput').value.toLowerCase();
  
  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(searchVal) || 
    c.flatNo.toLowerCase().includes(searchVal) ||
    c.mobile.includes(searchVal)
  );

  const tbody = document.getElementById('customers-table-body');
  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px;">No customers found.</td></tr>`;
    return;
  }

  filtered.forEach(cust => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${cust.flatNo}</strong></td>
        <td>${cust.name}</td>
        <td>Rs ${Number(cust.monthlyFee).toLocaleString()}</td>
        <td>${cust.mobile || '-'}</td>
        <td>
          <div class="table-actions">
            <button class="btn-icon edit" onclick="openCustomerModal('${cust.id}')" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
            </button>
            <button class="btn-icon delete" onclick="deleteCustomer('${cust.id}')" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  });
}

// Search box listener
document.getElementById('customerSearchInput').addEventListener('input', renderCustomersTable);

// Open Customer Modal (Add/Edit)
function openCustomerModal(id = null) {
  const modal = document.getElementById('customerModal');
  const title = document.getElementById('customerModalTitle');
  const form = document.getElementById('customerForm');
  
  form.reset();
  appState.editingCustomerId = id;

  if (id) {
    title.innerText = 'Edit Customer';
    const customers = getData(STORAGE_KEYS.CUSTOMERS);
    const cust = customers.find(c => c.id === id);
    if (cust) {
      document.getElementById('custFlatNo').value = cust.flatNo;
      document.getElementById('custName').value = cust.name;
      document.getElementById('custFee').value = cust.monthlyFee;
      document.getElementById('custMobile').value = cust.mobile;
    }
  } else {
    title.innerText = 'Add New Customer';
  }

  modal.classList.add('active');
}

// Submit Customer Form
document.getElementById('customerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const flatNo = document.getElementById('custFlatNo').value;
  const name = document.getElementById('custName').value;
  const monthlyFee = Number(document.getElementById('custFee').value);
  const mobile = document.getElementById('custMobile').value;

  let customers = getData(STORAGE_KEYS.CUSTOMERS);

  if (appState.editingCustomerId) {
    // Edit Mode
    customers = customers.map(c => c.id === appState.editingCustomerId ? { id: c.id, name, flatNo, monthlyFee, mobile } : c);
  } else {
    // Add Mode
    const newCust = {
      id: 'c_' + Date.now(),
      name,
      flatNo,
      monthlyFee,
      mobile
    };
    customers.push(newCust);
  }

  saveData(STORAGE_KEYS.CUSTOMERS, customers);
  closeModal();
  renderCustomersTable();
});

// Delete Customer
function deleteCustomer(id) {
  if (confirm('Are you sure you want to delete this customer? This will not delete past payment entries.')) {
    let customers = getData(STORAGE_KEYS.CUSTOMERS);
    customers = customers.filter(c => c.id !== id);
    saveData(STORAGE_KEYS.CUSTOMERS, customers);
    renderCustomersTable();
  }
}

// Render Maintenance Payments Ledger
function renderMaintenanceTable() {
  const maintenance = getData(STORAGE_KEYS.MAINTENANCE);
  const customers = getData(STORAGE_KEYS.CUSTOMERS);
  
  const collectorFilter = document.getElementById('maintenanceCollectorFilter').value;
  
  // Sort by date descending
  let filtered = [...maintenance].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (collectorFilter !== 'all') {
    filtered = filtered.filter(m => m.collectedBy === collectorFilter);
  }

  const tbody = document.getElementById('maintenance-table-body');
  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 32px;">No maintenance payments found.</td></tr>`;
    return;
  }

  filtered.forEach(m => {
    const cust = customers.find(c => c.id === m.customerId);
    const custInfo = cust ? `<strong>${cust.flatNo}</strong> - ${cust.name}` : '<span style="color: var(--danger);">Unknown Customer</span>';
    
    tbody.innerHTML += `
      <tr>
        <td>${custInfo}</td>
        <td>${getMonthLabel(m.month)}</td>
        <td><strong>Rs ${Number(m.amount).toLocaleString()}</strong></td>
        <td>
          <span class="badge ${m.collectedBy === 'SAQIB' ? 'success' : 'success'}" style="background-color: ${m.collectedBy === 'SAQIB' ? 'var(--color-received-light)' : 'var(--color-customers-light)'}; color: ${m.collectedBy === 'SAQIB' ? 'var(--color-received)' : 'var(--color-customers)'};">
            ${m.collectedBy}
          </span>
        </td>
        <td>${m.date}</td>
        <td>${m.notes || '-'}</td>
        <td>
          <div class="table-actions">
            <button class="btn-icon edit" onclick="openMaintenanceModal('${m.id}')" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
            </button>
            <button class="btn-icon delete" onclick="deleteMaintenance('${m.id}')" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  });
}

// Filter collector dropdown change
document.getElementById('maintenanceCollectorFilter').addEventListener('change', renderMaintenanceTable);

// Open Maintenance modal (Add/Edit)
function openMaintenanceModal(id = null) {
  const modal = document.getElementById('maintenanceModal');
  const title = document.getElementById('maintenanceModalTitle');
  const form = document.getElementById('maintenanceForm');
  
  form.reset();
  appState.editingMaintenanceId = id;

  // Populate Customer Dropdown
  const customers = getData(STORAGE_KEYS.CUSTOMERS);
  const selectCust = document.getElementById('maintCustomer');
  selectCust.innerHTML = '<option value="">Select Customer</option>';
  customers.forEach(c => {
    selectCust.innerHTML += `<option value="${c.id}">${c.flatNo} - ${c.name} (Rs ${c.monthlyFee})</option>`;
  });

  // Default date
  document.getElementById('maintDate').value = new Date().toISOString().substring(0, 10);

  // Bind dropdown change to auto-fill monthly fee
  selectCust.addEventListener('change', (e) => {
    const selectedId = e.target.value;
    const selectedCust = customers.find(c => c.id === selectedId);
    if (selectedCust) {
      document.getElementById('maintAmount').value = selectedCust.monthlyFee;
    }
  });

  if (id) {
    title.innerText = 'Edit Maintenance Payment';
    const maintenance = getData(STORAGE_KEYS.MAINTENANCE);
    const m = maintenance.find(item => item.id === id);
    if (m) {
      selectCust.value = m.customerId;
      document.getElementById('maintMonth').value = m.month;
      document.getElementById('maintAmount').value = m.amount;
      document.getElementById('maintCollector').value = m.collectedBy;
      document.getElementById('maintDate').value = m.date;
      document.getElementById('maintNotes').value = m.notes;
    }
  } else {
    title.innerText = 'Record Maintenance Payment';
    // set month to current month default
    document.getElementById('maintMonth').value = new Date().toISOString().substring(0, 7);
  }

  modal.classList.add('active');
}

// Submit Maintenance Form
document.getElementById('maintenanceForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const customerId = document.getElementById('maintCustomer').value;
  const month = document.getElementById('maintMonth').value; // format: "YYYY-MM"
  const amount = Number(document.getElementById('maintAmount').value);
  const collectedBy = document.getElementById('maintCollector').value;
  const date = document.getElementById('maintDate').value;
  const notes = document.getElementById('maintNotes').value;

  if (!customerId) {
    alert('Please select a customer.');
    return;
  }

  let maintenance = getData(STORAGE_KEYS.MAINTENANCE);

  if (appState.editingMaintenanceId) {
    maintenance = maintenance.map(m => m.id === appState.editingMaintenanceId 
      ? { id: m.id, customerId, month, amount, collectedBy, date, notes } 
      : m
    );
  } else {
    const newM = {
      id: 'm_' + Date.now(),
      customerId,
      month,
      amount,
      collectedBy,
      date,
      notes
    };
    maintenance.push(newM);
  }

  saveData(STORAGE_KEYS.MAINTENANCE, maintenance);
  closeModal();
  renderMaintenanceTable();
});

// Delete Maintenance Payment
function deleteMaintenance(id) {
  if (confirm('Are you sure you want to delete this maintenance entry?')) {
    let maintenance = getData(STORAGE_KEYS.MAINTENANCE);
    maintenance = maintenance.filter(m => m.id !== id);
    saveData(STORAGE_KEYS.MAINTENANCE, maintenance);
    renderMaintenanceTable();
  }
}


/* ==========================================================================
   BOSS PAYMENTS VIEW
   ========================================================================== */
function renderBossPaymentsView() {
  const bossPayments = getData(STORAGE_KEYS.BOSS_PAYMENTS);
  const tbody = document.getElementById('boss-payments-table-body');
  tbody.innerHTML = '';

  // Sort descending by date
  const sorted = [...bossPayments].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sorted.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px;">No payments recorded to Boss.</td></tr>`;
    return;
  }

  sorted.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td><strong>Rs ${Number(p.amount).toLocaleString()}</strong></td>
        <td>
          <span class="badge" style="background-color: ${p.paidBy === 'SAQIB' ? 'var(--color-received-light)' : 'var(--color-customers-light)'}; color: ${p.paidBy === 'SAQIB' ? 'var(--color-received)' : 'var(--color-customers)'};">
            ${p.paidBy}
          </span>
        </td>
        <td>${p.date}</td>
        <td>${p.notes || '-'}</td>
        <td>
          <div class="table-actions">
            <button class="btn-icon edit" onclick="openBossPaymentModal('${p.id}')" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
            </button>
            <button class="btn-icon delete" onclick="deleteBossPayment('${p.id}')" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  });
}

function openBossPaymentModal(id = null) {
  const modal = document.getElementById('bossPaymentModal');
  const title = document.getElementById('bossPaymentModalTitle');
  const form = document.getElementById('bossPaymentForm');

  form.reset();
  appState.editingBossPaymentId = id;
  document.getElementById('bossDate').value = new Date().toISOString().substring(0, 10);

  if (id) {
    title.innerText = 'Edit Boss Payment';
    const payments = getData(STORAGE_KEYS.BOSS_PAYMENTS);
    const p = payments.find(x => x.id === id);
    if (p) {
      document.getElementById('bossAmount').value = p.amount;
      document.getElementById('bossPaidBy').value = p.paidBy;
      document.getElementById('bossDate').value = p.date;
      document.getElementById('bossNotes').value = p.notes;
    }
  } else {
    title.innerText = 'Record Boss Payment';
  }

  modal.classList.add('active');
}

document.getElementById('bossPaymentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = Number(document.getElementById('bossAmount').value);
  const paidBy = document.getElementById('bossPaidBy').value;
  const date = document.getElementById('bossDate').value;
  const notes = document.getElementById('bossNotes').value;

  let payments = getData(STORAGE_KEYS.BOSS_PAYMENTS);

  if (appState.editingBossPaymentId) {
    payments = payments.map(p => p.id === appState.editingBossPaymentId 
      ? { id: p.id, amount, paidBy, date, notes } 
      : p
    );
  } else {
    payments.push({
      id: 'bp_' + Date.now(),
      amount,
      paidBy,
      date,
      notes
    });
  }

  saveData(STORAGE_KEYS.BOSS_PAYMENTS, payments);
  closeModal();
  renderBossPaymentsView();
});

function deleteBossPayment(id) {
  if (confirm('Are you sure you want to delete this boss payment entry?')) {
    let payments = getData(STORAGE_KEYS.BOSS_PAYMENTS);
    payments = payments.filter(p => p.id !== id);
    saveData(STORAGE_KEYS.BOSS_PAYMENTS, payments);
    renderBossPaymentsView();
  }
}


/* ==========================================================================
   HARDWARE LEDGER VIEW
   ========================================================================== */
function renderHardwareLedgerView() {
  const hardware = getData(STORAGE_KEYS.HARDWARE);
  const tbody = document.getElementById('hardware-table-body');
  tbody.innerHTML = '';

  const sorted = [...hardware].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sorted.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 32px;">No hardware purchases recorded.</td></tr>`;
    return;
  }

  sorted.forEach(h => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${h.itemName}</strong></td>
        <td>${h.vendor || '-'}</td>
        <td><strong>Rs ${Number(h.amount).toLocaleString()}</strong></td>
        <td>
          <span class="badge" style="background-color: ${h.paidBy === 'SAQIB' ? 'var(--color-received-light)' : 'var(--color-customers-light)'}; color: ${h.paidBy === 'SAQIB' ? 'var(--color-received)' : 'var(--color-customers)'};">
            ${h.paidBy}
          </span>
        </td>
        <td>${h.date}</td>
        <td>${h.notes || '-'}</td>
        <td>
          <div class="table-actions">
            <button class="btn-icon edit" onclick="openHardwareModal('${h.id}')" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
            </button>
            <button class="btn-icon delete" onclick="deleteHardware('${h.id}')" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  });
}

function openHardwareModal(id = null) {
  const modal = document.getElementById('hardwareModal');
  const title = document.getElementById('hardwareModalTitle');
  const form = document.getElementById('hardwareForm');

  form.reset();
  appState.editingHardwareId = id;
  document.getElementById('hardDate').value = new Date().toISOString().substring(0, 10);

  if (id) {
    title.innerText = 'Edit Hardware Ledger Entry';
    const hardware = getData(STORAGE_KEYS.HARDWARE);
    const h = hardware.find(x => x.id === id);
    if (h) {
      document.getElementById('hardItem').value = h.itemName;
      document.getElementById('hardVendor').value = h.vendor;
      document.getElementById('hardAmount').value = h.amount;
      document.getElementById('hardPaidBy').value = h.paidBy;
      document.getElementById('hardDate').value = h.date;
      document.getElementById('hardNotes').value = h.notes;
    }
  } else {
    title.innerText = 'Add Hardware Ledger Entry';
  }

  modal.classList.add('active');
}

document.getElementById('hardwareForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const itemName = document.getElementById('hardItem').value;
  const vendor = document.getElementById('hardVendor').value;
  const amount = Number(document.getElementById('hardAmount').value);
  const paidBy = document.getElementById('hardPaidBy').value;
  const date = document.getElementById('hardDate').value;
  const notes = document.getElementById('hardNotes').value;

  let hardware = getData(STORAGE_KEYS.HARDWARE);

  if (appState.editingHardwareId) {
    hardware = hardware.map(h => h.id === appState.editingHardwareId 
      ? { id: h.id, itemName, vendor, amount, paidBy, date, notes } 
      : h
    );
  } else {
    hardware.push({
      id: 'h_' + Date.now(),
      itemName,
      vendor,
      amount,
      paidBy,
      date,
      notes
    });
  }

  saveData(STORAGE_KEYS.HARDWARE, hardware);
  closeModal();
  renderHardwareLedgerView();
});

function deleteHardware(id) {
  if (confirm('Are you sure you want to delete this hardware ledger entry?')) {
    let hardware = getData(STORAGE_KEYS.HARDWARE);
    hardware = hardware.filter(h => h.id !== id);
    saveData(STORAGE_KEYS.HARDWARE, hardware);
    renderHardwareLedgerView();
  }
}


/* ==========================================================================
   EXPENSES VIEW (Food, Baraf, Chay)
   ========================================================================== */
function renderExpensesView() {
  const expenses = getData(STORAGE_KEYS.EXPENSES);
  const categoryFilter = document.getElementById('expenseCategoryFilter').value;
  const tbody = document.getElementById('expenses-table-body');
  tbody.innerHTML = '';

  let filtered = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (categoryFilter !== 'all') {
    filtered = filtered.filter(e => e.category === categoryFilter);
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 32px;">No expenses found.</td></tr>`;
    return;
  }

  filtered.forEach(e => {
    let catBadgeColor = 'var(--text-muted)';
    let catBgColor = '#f1f5f9';
    if (e.category === 'Food') { catBadgeColor = 'var(--color-boss)'; catBgColor = 'var(--color-boss-light)'; }
    else if (e.category === 'Baraf') { catBadgeColor = 'var(--color-customers)'; catBgColor = 'var(--color-customers-light)'; }
    else if (e.category === 'Chay') { catBadgeColor = 'var(--danger)'; catBgColor = 'var(--danger-light)'; }

    tbody.innerHTML += `
      <tr>
        <td>
          <span class="badge" style="background-color: ${catBgColor}; color: ${catBadgeColor};">
            ${e.category}
          </span>
        </td>
        <td><strong>Rs ${Number(e.amount).toLocaleString()}</strong></td>
        <td>
          <span class="badge" style="background-color: #f1f5f9; color: var(--text-main);">
            ${e.spentBy}
          </span>
        </td>
        <td>${e.date}</td>
        <td>${e.notes || '-'}</td>
        <td>
          <div class="table-actions">
            <button class="btn-icon edit" onclick="openExpenseModal('${e.id}')" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
            </button>
            <button class="btn-icon delete" onclick="deleteExpense('${e.id}')" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  });
}

document.getElementById('expenseCategoryFilter').addEventListener('change', renderExpensesView);

function openExpenseModal(id = null) {
  const modal = document.getElementById('expenseModal');
  const title = document.getElementById('expenseModalTitle');
  const form = document.getElementById('expenseForm');

  form.reset();
  appState.editingExpenseId = id;
  document.getElementById('expDate').value = new Date().toISOString().substring(0, 10);

  if (id) {
    title.innerText = 'Edit Expense Entry';
    const expenses = getData(STORAGE_KEYS.EXPENSES);
    const e = expenses.find(x => x.id === id);
    if (e) {
      document.getElementById('expCategory').value = e.category;
      document.getElementById('expAmount').value = e.amount;
      document.getElementById('expSpentBy').value = e.spentBy;
      document.getElementById('expDate').value = e.date;
      document.getElementById('expNotes').value = e.notes;
    }
  } else {
    title.innerText = 'Add Expense Entry';
  }

  modal.classList.add('active');
}

document.getElementById('expenseForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const category = document.getElementById('expCategory').value;
  const amount = Number(document.getElementById('expAmount').value);
  const spentBy = document.getElementById('expSpentBy').value;
  const date = document.getElementById('expDate').value;
  const notes = document.getElementById('expNotes').value;

  let expenses = getData(STORAGE_KEYS.EXPENSES);

  if (appState.editingExpenseId) {
    expenses = expenses.map(e => e.id === appState.editingExpenseId 
      ? { id: e.id, category, amount, spentBy, date, notes } 
      : e
    );
  } else {
    expenses.push({
      id: 'e_' + Date.now(),
      category,
      amount,
      spentBy,
      date,
      notes
    });
  }

  saveData(STORAGE_KEYS.EXPENSES, expenses);
  closeModal();
  renderExpensesView();
});

function deleteExpense(id) {
  if (confirm('Are you sure you want to delete this expense entry?')) {
    let expenses = getData(STORAGE_KEYS.EXPENSES);
    expenses = expenses.filter(e => e.id !== id);
    saveData(STORAGE_KEYS.EXPENSES, expenses);
    renderExpensesView();
  }
}


/* ==========================================================================
   ANNUAL SUMMARY VIEW
   ========================================================================== */
function renderAnnualSummary() {
  const selectedYear = appState.selectedSummaryYear;
  
  const maintenance = getData(STORAGE_KEYS.MAINTENANCE);
  const bossPayments = getData(STORAGE_KEYS.BOSS_PAYMENTS);
  const hardware = getData(STORAGE_KEYS.HARDWARE);
  const expenses = getData(STORAGE_KEYS.EXPENSES);

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const tbody = document.getElementById('annual-summary-table-body');
  tbody.innerHTML = '';

  // Initialize accumulators for year totals
  let yearSaqibRec = 0;
  let yearAhmedRec = 0;
  let yearTotalRec = 0;
  let yearBossPaid = 0;
  let yearFoodExp = 0;
  let yearBarafExp = 0;
  let yearChayExp = 0;
  let yearHardwareExp = 0;
  let yearTotalExp = 0;
  let yearNetBalance = 0;

  for (let i = 0; i < 12; i++) {
    const monthIndexStr = String(i + 1).padStart(2, '0');
    const monthKey = `${selectedYear}-${monthIndexStr}`;

    // Filter payments for this month
    const monthlyMaint = maintenance.filter(m => m.month === monthKey);
    const monthlyBoss = bossPayments.filter(b => b.date.startsWith(monthKey));
    const monthlyHard = hardware.filter(h => h.date.startsWith(monthKey));
    const monthlyExp = expenses.filter(e => e.date.startsWith(monthKey));

    // Calculate columns
    const saqibRec = monthlyMaint.filter(m => m.collectedBy === 'SAQIB').reduce((sum, r) => sum + Number(r.amount), 0);
    const ahmedRec = monthlyMaint.filter(m => m.collectedBy === 'AHMED').reduce((sum, r) => sum + Number(r.amount), 0);
    const totalRec = saqibRec + ahmedRec;

    const bossPaid = monthlyBoss.reduce((sum, r) => sum + Number(r.amount), 0);
    const foodExp = monthlyExp.filter(e => e.category === 'Food').reduce((sum, r) => sum + Number(r.amount), 0);
    const barafExp = monthlyExp.filter(e => e.category === 'Baraf').reduce((sum, r) => sum + Number(r.amount), 0);
    const chayExp = monthlyExp.filter(e => e.category === 'Chay').reduce((sum, r) => sum + Number(r.amount), 0);
    const hardwareExp = monthlyHard.reduce((sum, r) => sum + Number(r.amount), 0);

    const totalExp = bossPaid + foodExp + barafExp + chayExp + hardwareExp;
    const netBalance = totalRec - totalExp;

    // Add to year totals
    yearSaqibRec += saqibRec;
    yearAhmedRec += ahmedRec;
    yearTotalRec += totalRec;
    yearBossPaid += bossPaid;
    yearFoodExp += foodExp;
    yearBarafExp += barafExp;
    yearChayExp += chayExp;
    yearHardwareExp += hardwareExp;
    yearTotalExp += totalExp;
    yearNetBalance += netBalance;

    tbody.innerHTML += `
      <tr>
        <td><strong>${monthNames[i]}</strong></td>
        <td>Rs ${saqibRec.toLocaleString()}</td>
        <td>Rs ${ahmedRec.toLocaleString()}</td>
        <td style="color: var(--color-received); font-weight: 600;">Rs ${totalRec.toLocaleString()}</td>
        <td>Rs ${bossPaid.toLocaleString()}</td>
        <td>Rs ${foodExp.toLocaleString()}</td>
        <td>Rs ${barafExp.toLocaleString()}</td>
        <td>Rs ${chayExp.toLocaleString()}</td>
        <td>Rs ${hardwareExp.toLocaleString()}</td>
        <td style="color: var(--danger); font-weight: 600;">Rs ${totalExp.toLocaleString()}</td>
        <td style="font-weight: 700; color: ${netBalance >= 0 ? 'var(--color-received)' : 'var(--danger)'}">Rs ${netBalance.toLocaleString()}</td>
      </tr>
    `;
  }

  // Append Totals row
  tbody.innerHTML += `
    <tr class="total-row">
      <td><strong>TOTALS</strong></td>
      <td><strong>Rs ${yearSaqibRec.toLocaleString()}</strong></td>
      <td><strong>Rs ${yearAhmedRec.toLocaleString()}</strong></td>
      <td style="color: var(--color-received); font-weight: 700;"><strong>Rs ${yearTotalRec.toLocaleString()}</strong></td>
      <td><strong>Rs ${yearBossPaid.toLocaleString()}</strong></td>
      <td><strong>Rs ${yearFoodExp.toLocaleString()}</strong></td>
      <td><strong>Rs ${yearBarafExp.toLocaleString()}</strong></td>
      <td><strong>Rs ${yearChayExp.toLocaleString()}</strong></td>
      <td><strong>Rs ${yearHardwareExp.toLocaleString()}</strong></td>
      <td style="color: var(--danger); font-weight: 700;"><strong>Rs ${yearTotalExp.toLocaleString()}</strong></td>
      <td style="font-weight: 800; color: ${yearNetBalance >= 0 ? 'var(--color-received)' : 'var(--danger)'}"><strong>Rs ${yearNetBalance.toLocaleString()}</strong></td>
    </tr>
  `;
}


/* ==========================================================================
   GLOBAL UTILITIES
   ========================================================================== */
function closeModal() {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.classList.remove('active');
  });
  appState.editingCustomerId = null;
  appState.editingMaintenanceId = null;
  appState.editingBossPaymentId = null;
  appState.editingHardwareId = null;
  appState.editingExpenseId = null;
}

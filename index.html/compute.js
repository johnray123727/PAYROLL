// Enhanced Payroll Calculator with Realistic Deductions
document.addEventListener('DOMContentLoaded', function() {
    const data = JSON.parse(localStorage.getItem("payrollData"));

    if (data) {
        calculatePayroll(data);
    } else {
        document.getElementById("result").innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3>❌ No Payroll Data Found</h3>
                <p>Please go back and enter employee information first.</p>
            </div>
        `;
    }

    function calculatePayroll(data) {
        const grossPay = data.rate * data.days;
        
        // More realistic Philippine payroll deductions
        const deductions = calculateDeductions(grossPay);
        const totalDeduction = Object.values(deductions).reduce((a, b) => a + b, 0);
        const netPay = grossPay - totalDeduction;
        
        // Format date
        const payDate = new Date(data.timestamp || Date.now()).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        document.getElementById("result").innerHTML = `
            <div class="payroll-header">
                <h2>📋 Payroll Summary</h2>
                <p><strong>Pay Date:</strong> ${payDate}</p>
            </div>
            
            <div class="payroll-section">
                <h3>👤 Employee Information</h3>
                <div class="payroll-item">
                    <span><strong>Employee Name:</strong></span>
                    <span>${data.name}</span>
                </div>
                <div class="payroll-item">
                    <span><strong>Daily Rate:</strong></span>
                    <span>₱${data.rate.toFixed(2)}</span>
                </div>
                <div class="payroll-item">
                    <span><strong>Days Worked:</strong></span>
                    <span>${data.days} days</span>
                </div>
                <div class="payroll-item">
                    <span><strong>Gross Pay:</strong></span>
                    <span>₱${grossPay.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="payroll-section">
                <h3>💰 Deductions</h3>
                <div class="payroll-item">
                    <span><strong>SSS (${deductions.sssPercentage}%):</strong></span>
                    <span>₱${deductions.SSS.toFixed(2)}</span>
                </div>
                <div class="payroll-item">
                    <span><strong>Pag-IBIG (${deductions.pagibigPercentage}%):</strong></span>
                    <span>₱${deductions.Pagibig.toFixed(2)}</span>
                </div>
                <div class="payroll-item">
                    <span><strong>PhilHealth (${deductions.philhealthPercentage}%):</strong></span>
                    <span>₱${deductions.Philhealth.toFixed(2)}</span>
                </div>
                <div class="payroll-item">
                    <span><strong>Withholding Tax (${deductions.taxPercentage}%):</strong></span>
                    <span>₱${deductions.Tax.toFixed(2)}</span>
                </div>
                <div class="payroll-item">
                    <span><strong>Total Deductions:</strong></span>
                    <span>₱${totalDeduction.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="payroll-section">
                <div class="payroll-item">
                    <span><strong>💰 NET PAY:</strong></span>
                    <span>₱${netPay.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="payroll-actions">
                <a href="index.html" class="back-btn">← Back to Form</a>
                <button onclick="printPayroll()" class="print-btn">🖨️ Print</button>
            </div>
        `;
    }

    function calculateDeductions(grossPay) {
        // More realistic Philippine payroll deductions
        let sssPercentage, pagibigPercentage, philhealthPercentage, taxPercentage;
        
        // SSS calculation (based on salary brackets)
        if (grossPay <= 1000) {
            sssPercentage = 0;
        } else if (grossPay <= 3250) {
            sssPercentage = 3.5;
        } else if (grossPay <= 7500) {
            sssPercentage = 4.5;
        } else {
            sssPercentage = 5.0;
        }
        
        // Pag-IBIG (2% for employees earning above 1500)
        pagibigPercentage = grossPay > 1500 ? 2.0 : 1.0;
        
        // PhilHealth (2.75% of gross pay)
        philhealthPercentage = 2.75;
        
        // Withholding Tax (simplified progressive tax)
        if (grossPay <= 20833) {
            taxPercentage = 0;
        } else if (grossPay <= 33333) {
            taxPercentage = 15;
        } else if (grossPay <= 66667) {
            taxPercentage = 20;
        } else if (grossPay <= 166667) {
            taxPercentage = 25;
        } else if (grossPay <= 666667) {
            taxPercentage = 30;
        } else {
            taxPercentage = 35;
        }
        
        return {
            SSS: grossPay * (sssPercentage / 100),
            Pagibig: grossPay * (pagibigPercentage / 100),
            Philhealth: grossPay * (philhealthPercentage / 100),
            Tax: grossPay * (taxPercentage / 100),
            sssPercentage: sssPercentage,
            pagibigPercentage: pagibigPercentage,
            philhealthPercentage: philhealthPercentage,
            taxPercentage: taxPercentage
        };
    }
});

// Print functionality
function printPayroll() {
    window.print();
}
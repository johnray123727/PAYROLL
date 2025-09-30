// Enhanced Payroll Form with Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("payrollForm");
    const nameInput = document.getElementById("employeeName");
    const rateInput = document.getElementById("rate");
    const daysInput = document.getElementById("daysWorked");
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    rateInput.addEventListener('input', validateRate);
    daysInput.addEventListener('input', validateDays);
    
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        if (validateForm()) {
            const payrollData = {
                name: nameInput.value.trim(),
                rate: parseFloat(rateInput.value),
                days: parseFloat(daysInput.value),
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem("payrollData", JSON.stringify(payrollData));
            showSuccess("Payroll data saved successfully!");
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = "display.html";
            }, 1000);
        }
    });
    
    function validateName() {
        const name = nameInput.value.trim();
        const error = document.getElementById("nameError");
        
        if (name.length < 2) {
            showError(error, "Name must be at least 2 characters long");
            return false;
        } else if (name.length > 50) {
            showError(error, "Name must be less than 50 characters");
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError(error, "Name can only contain letters and spaces");
            return false;
        } else {
            hideError(error);
            return true;
        }
    }
    
    function validateRate() {
        const rate = parseFloat(rateInput.value);
        const error = document.getElementById("rateError");
        
        if (isNaN(rate) || rate <= 0) {
            showError(error, "Daily rate must be a positive number");
            return false;
        } else if (rate > 100000) {
            showError(error, "Daily rate seems too high. Please verify.");
            return false;
        } else {
            hideError(error);
            return true;
        }
    }
    
    function validateDays() {
        const days = parseFloat(daysInput.value);
        const error = document.getElementById("daysError");
        
        if (isNaN(days) || days <= 0) {
            showError(error, "Days worked must be a positive number");
            return false;
        } else if (days > 31) {
            showError(error, "Days worked cannot exceed 31 days");
            return false;
        } else {
            hideError(error);
            return true;
        }
    }
    
    function validateForm() {
        const isNameValid = validateName();
        const isRateValid = validateRate();
        const isDaysValid = validateDays();
        
        return isNameValid && isRateValid && isDaysValid;
    }
    
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function hideError(errorElement) {
        errorElement.style.display = 'none';
    }
    
    function showSuccess(message) {
        const successElement = document.getElementById("successMessage");
        successElement.textContent = message;
        successElement.style.display = 'block';
        setTimeout(() => {
            successElement.style.display = 'none';
        }, 3000);
    }
});
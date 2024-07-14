let packagePrice = 0;

const carpetPrices = {
    clean: [116, 185, 254, 323, 392],
    protect: [42, 42, 63, 63, 84],
    deodorize: [42, 84, 126, 168, 210]
};

const additionalServices = {
    "Tile & Grout Cleaning": [100, 200, 300, 400, 500],
    "Hardwood Floor Cleaning": [120, 240, 360, 480, 600],
    "Upholstery Cleaning": [80, 160, 240, 320, 400],
    // Add other services here as needed
};

function highlightField(fieldId, highlight) {
    const field = document.getElementById(fieldId);
    if (field) {
        if (highlight) {
            field.classList.add('highlight-error');
        } else {
            field.classList.remove('highlight-error');
        }
    }
}

function showStep(stepNumber) {
    // Hide all step contents
    document.querySelectorAll('.step-content').forEach(content => {
        content.style.display = 'none';
    });

    // Remove active class from all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });

    // Show the selected step content
    const stepContent = document.getElementById(`step-content-${stepNumber}`);
    if (stepContent) {
        stepContent.style.display = 'block';
    }

    // Add active class to the selected step
    const step = document.getElementById(`step${stepNumber}`);
    if (step) {
        step.classList.add('active');
    }

    // Update progress bar
    const progress = document.querySelector('.progress');
    if (progress) {
        progress.style.width = `${stepNumber * 20}%`; // Adjusted for 5 steps
    }
}

function toggleDetails(serviceId) {
    const details = document.getElementById(serviceId);
    if (details) {
        details.style.display = details.style.display === 'block' ? 'none' : 'block';
    }
}

function updateQuantity(service, change) {
    const quantityElement = document.getElementById(`${service}-quantity`);
    if (quantityElement) {
        let quantity = parseInt(quantityElement.textContent);
        quantity += change;
        if (quantity < 0) quantity = 0;
        if (quantity > 5) quantity = 5; // Limit the maximum to 5
        quantityElement.textContent = quantity;
        updateQuote();
    }
}

function updatePackage(packageType, price) {
    packagePrice = parseFloat(price);
    updateQuote();
}

function updateQuote() {
    const numRooms = document.getElementById('num-rooms') ? parseInt(document.getElementById('num-rooms').value) : 0;
    const sqFt = document.getElementById('sq-ft') ? parseInt(document.getElementById('sq-ft').value) : 0;

    const cleanQuantity = document.getElementById('clean-quantity') ? parseInt(document.getElementById('clean-quantity').textContent) : 0;
    const protectQuantity = document.getElementById('protect-quantity') ? parseInt(document.getElementById('protect-quantity').textContent) : 0;
    const deodorizeQuantity = document.getElementById('deodorize-quantity') ? parseInt(document.getElementById('deodorize-quantity').textContent) : 0;

    const cleanSubtotal = cleanQuantity > 0 ? carpetPrices.clean[cleanQuantity - 1] : 0;
    const protectSubtotal = protectQuantity > 0 ? carpetPrices.protect[protectQuantity - 1] : 0;
    const deodorizeSubtotal = deodorizeQuantity > 0 ? carpetPrices.deodorize[deodorizeQuantity - 1] : 0;

    let additionalSubtotal = 0;
    for (const service in additionalServices) {
        const quantityElement = document.getElementById(`${service}-quantity`);
        const quantity = quantityElement ? parseInt(quantityElement.textContent) : 0;
        additionalSubtotal += quantity > 0 ? additionalServices[service][quantity - 1] : 0;
    }

    const carpetSubtotal = cleanSubtotal + protectSubtotal + deodorizeSubtotal;
    const subtotal = carpetSubtotal + packagePrice + additionalSubtotal;
    const tax = subtotal * 0.06625;
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);

    // Update detailed breakdown
    let breakdown = `
        <h3>Cost Breakdown</h3>
        <p><strong>Carpet Cleaning:</strong> $${carpetSubtotal.toFixed(2)}</p>
        <p><strong>Additional Services:</strong> $${additionalSubtotal.toFixed(2)}</p>
        <p><strong>Package:</strong> $${packagePrice.toFixed(2)}</p>
        <p><strong>Tax:</strong> $${tax.toFixed(2)}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    `;
    document.querySelector('.quote-details').innerHTML = breakdown;
}

function validateStep1() {
    const numRooms = document.getElementById('num-rooms').value;
    const sqFt = document.getElementById('sq-ft').value;

    let valid = true;

    if (!numRooms) {
        document.getElementById('step1-error').textContent = 'Please fill in all required fields.';
        highlightField('num-rooms', true);
        valid = false;
    } else {
        highlightField('num-rooms', false);
    }

    if (!sqFt) {
        document.getElementById('step1-error').textContent = 'Please fill in all required fields.';
        highlightField('sq-ft', true);
        valid = false;
    } else {
        highlightField('sq-ft', false);
    }

    if (valid) {
        document.getElementById('step1-error').textContent = '';
        showStep(2);
    }
}

function validateStep2() {
    const date = document.getElementById('cleaning-date').value;
    const time = document.getElementById('cleaning-time').value;

    let valid = true;

    if (!date) {
        document.getElementById('step2-error').textContent = 'Please select a date.';
        highlightField('cleaning-date', true);
        valid = false;
    } else {
        highlightField('cleaning-date', false);
    }

    if (!time) {
        document.getElementById('step2-error').textContent = 'Please select a time.';
        highlightField('cleaning-time', true);
        valid = false;
    } else {
        highlightField('cleaning-time', false);
    }

    if (valid) {
        document.getElementById('step2-error').textContent = '';
        showStep(3);
    }
}

function validateStep3() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    let valid = true;

    if (!name) {
        document.getElementById('step3-error').textContent = 'Please enter your name.';
        highlightField('name', true);
        valid = false;
    } else {
        highlightField('name', false);
    }

    if (!address) {
        document.getElementById('step3-error').textContent = 'Please enter your address.';
        highlightField('address', true);
        valid = false;
    } else {
        highlightField('address', false);
    }

    if (!phone) {
        document.getElementById('step3-error').textContent = 'Please enter your phone number.';
        highlightField('phone', true);
        valid = false;
    } else {
        highlightField('phone', false);
    }

    if (!email) {
        document.getElementById('step3-error').textContent = 'Please enter your email.';
        highlightField('email', true);
        valid = false;
    } else {
        highlightField('email', false);
    }

    if (valid) {
        document.getElementById('step3-error').textContent = '';
        showStep(4);
    }
}

function submitOrder() {
    // Collect data from the form
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('cleaning-date').value;
    const time = document.getElementById('cleaning-time').value;

    console.log('Form Data:', { name, address, phone, email, date, time }); // Debugging statement

    // Display the collected data in the review order section
    const orderSummary = `
        <h3>Order Summary</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
    `;
    console.log('Order Summary HTML:', orderSummary); // Debugging statement
    document.querySelector('.order-summary').innerHTML = orderSummary;

    // Show the review step
    showStep(4);
}

// Initial setup
document.addEventListener('DOMContentLoaded', function () {
    showStep(1);
    document.querySelectorAll('input, .quantity button').forEach(item => {
        item.addEventListener('change', updateQuote);
        item.addEventListener('click', updateQuote);
    });
});

// Test Sequence
function runTests() {
    console.log("Running tests...");

    // Test Case 1: Ideal Intention
    console.log("Test Case 1: Ideal Intention");

    // Set Step 1 values
    document.getElementById('num-rooms').value = 2;
    document.getElementById('sq-ft').value = 500;
    console.log('Step 1 values set.');

    // Proceed to Step 2
    validateStep1();
    if (document.getElementById('step-content-2').style.display !== 'block') {
        console.error("Failed to proceed to Step 2.");
        return;
    }
    console.log('Proceeded to Step 2.');

    // Set Step 2 values
    document.getElementById('cleaning-date').value = '2023-07-15';
    document.getElementById('cleaning-time').value = '14:00';
    console.log('Step 2 values set.');

    // Proceed to Step 3
    validateStep2();
    if (document.getElementById('step-content-3').style.display !== 'block') {
        console.error("Failed to proceed to Step 3.");
        return;
    }
    console.log('Proceeded to Step 3.');

    // Set Step 3 values
    document.getElementById('name').value = 'John Doe';
    document.getElementById('address').value = '123 Main St';
    document.getElementById('phone').value = '123-456-7890';
    document.getElementById('email').value = 'john.doe@example.com';
    console.log('Step 3 values set.');

    // Proceed to Step 4
    validateStep3();
    if (document.getElementById('step-content-4').style.display !== 'block') {
        console.error("Failed to proceed to Step 4.");
        return;
    }
    console.log('Proceeded to Step 4.');

    // Manually call submitOrder to populate the order summary
    submitOrder();

    // Check the Order Summary
    const orderSummary = document.querySelector('.order-summary').innerHTML;
    console.log('Order Summary in Test:', orderSummary); // Debugging statement
    if (!orderSummary.includes('John Doe') || !orderSummary.includes('123 Main St') || !orderSummary.includes('123-456-7890') || !orderSummary.includes('john.doe@example.com')) {
        console.error("Order summary is incorrect.");
        return;
    }

    console.log("Test Case 1 passed.");

    // Test Case 2: Failed Intention
    console.log("Test Case 2: Failed Intention");

    // Reset to Step 1
    showStep(1);
    document.getElementById('num-rooms').value = '';
    document.getElementById('sq-ft').value = '';
    console.log('Step 1 values reset.');

    // Attempt to proceed to Step 2 without filling required fields
    validateStep1();
    if (document.getElementById('step-content-2').style.display === 'block') {
        console.error("Failed to detect missing required fields in Step 1.");
        return;
    }

    const step1Error = document.getElementById('step1-error').textContent;
    if (step1Error !== 'Please fill in all required fields.') {
        console.error("Failed to show correct error message for Step 1.");
        return;
    }

    console.log("Test Case 2 passed.");

    console.log("All tests passed.");
}

// Run tests after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    runTests();
});

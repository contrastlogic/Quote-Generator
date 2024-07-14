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
    const progress = document.getElementById('progress');
    if (progress) {
        progress.style.width = `${(stepNumber - 1) * 25}%`;
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
}

function validateStep1() {
    const numRooms = document.getElementById('num-rooms').value;
    const sqFt = document.getElementById('sq-ft').value;

    if (!numRooms || !sqFt) {
        document.getElementById('step1-error').textContent = 'Please fill in all required fields.';
    } else {
        document.getElementById('step1-error').textContent = '';
        showStep(2);
    }
}

function validateStep2() {
    const date = document.getElementById('cleaning-date').value;
    const time = document.getElementById('cleaning-time').value;

    if (!date || !time) {
        document.getElementById('step2-error').textContent = 'Please select a date and time.';
    } else {
        document.getElementById('step2-error').textContent = '';
        showStep(3);
    }
}

function validateStep3() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (!name || !address || !phone || !email) {
        document.getElementById('step3-error').textContent = 'Please fill in all required fields.';
    } else {
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

    // Display the collected data in the review order section
    const orderSummary = `
        <h3>Order Summary</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
    `;
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


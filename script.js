/**
 * ============================================
 * JavaScript for Pizza Maker
 * Student: [Your Name] | ID: [Your ID]
 * ============================================
 */

// --- Display student info ---
document.addEventListener('DOMContentLoaded', function() {
    const studentInfo = document.getElementById('studentInfo');
    // CHANGE THESE to your actual name and ID
    studentInfo.textContent = 'Student: John Doe | ID: 2026001';
});

// --- Pizza Class ---
class Pizza {
    constructor(name, size, crust, sauce, cheese, toppings, service, instructions) {
        this.name = name;
        this.size = size;
        this.crust = crust;
        this.sauce = sauce;
        this.cheese = cheese;
        this.toppings = toppings;
        this.service = service;
        this.instructions = instructions;
    }

    // Method that builds description string
    getDescription() {
        let toppingList = this.toppings.length > 0 ? this.toppings.join(', ') : 'No toppings';
        let instructionsText = this.instructions ? `Special: ${this.instructions}` : 'No special instructions';
        
        return `Pizza for ${this.name}: ${this.size} with ${this.crust} crust, ${this.sauce} sauce, ${this.cheese} cheese. Toppings: ${toppingList}. Service: ${this.service}. ${instructionsText}`;
    }
}

// --- Form handling ---
const form = document.getElementById('pizzaForm');
const orderSummary = document.getElementById('orderSummary');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Get values
    const name = document.getElementById('customerName').value.trim();
    const size = document.getElementById('pizzaSize').value;
    const crust = document.getElementById('crust').value;
    const sauce = document.getElementById('sauce').value;
    const cheese = document.getElementById('cheese').value;
    const instructions = document.getElementById('instructions').value.trim();

    // Get selected toppings
    const toppingCheckboxes = document.querySelectorAll('input[name="topping"]:checked');
    const toppings = Array.from(toppingCheckboxes).map(cb => cb.value);

    // Get selected service (radio)
    const serviceRadio = document.querySelector('input[name="service"]:checked');
    const service = serviceRadio ? serviceRadio.value : '';

    // --- VALIDATION ---
    let isValid = true;

    if (name.length < 2) {
        document.getElementById('nameError').textContent = 'Please enter your name';
        isValid = false;
    }

    if (!size) {
        document.getElementById('sizeError').textContent = 'Please select a size';
        isValid = false;
    }

    if (!service) {
        document.getElementById('serviceError').textContent = 'Please select a service type';
        isValid = false;
    }

    // If validation fails, stop here
    if (!isValid) {
        return;
    }

    // --- Create Pizza object ---
    const pizza = new Pizza(name, size, crust, sauce, cheese, toppings, service, instructions);

    // --- Display description using the class method ---
    orderSummary.textContent = pizza.getDescription();
});

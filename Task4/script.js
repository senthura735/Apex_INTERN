// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Todo App Functionality
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const totalTodos = document.getElementById('total-todos');
const clearCompletedBtn = document.getElementById('clear-completed');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    let completedCount = 0;
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
            completedCount++;
        }
        
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
            <button class="delete-todo"><i class="fas fa-trash"></i></button>
        `;
        
        // Toggle completed status
        const checkbox = li.querySelector('input');
        checkbox.addEventListener('change', () => {
            todos[index].completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });
        
        // Delete todo
        const deleteBtn = li.querySelector('.delete-todo');
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });
        
        todoList.appendChild(li);
    });
    
    totalTodos.textContent = todos.length;
    clearCompletedBtn.style.display = todos.some(todo => todo.completed) ? 'block' : 'none';
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add new todo
addTodoBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
});

// Add todo on Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodoBtn.click();
    }
});

// Clear completed todos
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
});

// Initialize todo app
renderTodos();

// Product Listing Functionality
const productsGrid = document.getElementById('products-grid');
const categoryFilter = document.getElementById('category-filter');
const priceSort = document.getElementById('price-sort');

// Sample product data
const products = [
    { id: 1, name: 'Wireless Headphones', category: 'electronics', price: 99.99, rating: 4.5 },
    { id: 2, name: 'Smart Watch', category: 'electronics', price: 199.99, rating: 4.2 },
    { id: 3, name: 'Cotton T-Shirt', category: 'clothing', price: 19.99, rating: 4.0 },
    { id: 4, name: 'Denim Jeans', category: 'clothing', price: 49.99, rating: 4.3 },
    { id: 5, name: 'Coffee Maker', category: 'home', price: 79.99, rating: 4.7 },
    { id: 6, name: 'Blender', category: 'home', price: 59.99, rating: 4.1 },
    { id: 7, name: 'Running Shoes', category: 'clothing', price: 89.99, rating: 4.4 },
    { id: 8, name: 'Smartphone', category: 'electronics', price: 699.99, rating: 4.8 }
];

// Render products
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-img">
                <img src="https://via.placeholder.com/300" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-rating">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Filter and sort products
function filterAndSortProducts() {
    let filteredProducts = [...products];
    
    // Filter by category
    if (categoryFilter.value !== 'all') {
        filteredProducts = filteredProducts.filter(
            product => product.category === categoryFilter.value
        );
    }
    
    // Sort by price
    if (priceSort.value === 'low-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceSort.value === 'high-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    renderProducts(filteredProducts);
}

// Event listeners for filters
categoryFilter.addEventListener('change', filterAndSortProducts);
priceSort.addEventListener('change', filterAndSortProducts);

// Initialize product listing
renderProducts(products);

// Contact Form Functionality
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Animation on scroll
function animateOnScroll() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
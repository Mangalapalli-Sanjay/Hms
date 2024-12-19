const departments = [
    { id: 1, name: 'Cardiology', icon: '❤️', description: 'Heart and cardiovascular care' },
    { id: 2, name: 'Neurology', icon: '🧠', description: 'Brain and nervous system' },
    { id: 3, name: 'Dentistry', icon: '🦷', description: 'Dental care and oral health' },
    { id: 4, name: 'Pediatrics', icon: '👶', description: 'Children\'s healthcare' },
    { id: 5, name: 'Orthopedics', icon: '🦴', description: 'Bone and joint care' },
    { id: 6, name: 'Ophthalmology', icon: '👁️', description: 'Eye care services' }
];

const doctors = {
    1: [ // Cardiology
        { id: 1, name: 'Dr. John Smith', specialization: 'Cardiologist', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&q=80', availability: 'Mon-Fri' },
        { id: 2, name: 'Dr. Sarah Johnson', specialization: 'Heart Surgeon', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80', availability: 'Tue-Sat' }
    ],
    2: [ // Neurology
        { id: 3, name: 'Dr. Michael Brown', specialization: 'Neurologist', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&q=80', availability: 'Mon-Thu' }
    ]
    // Add more doctors for other departments as needed
};

// Authentication functions
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Mock authentication - In real app, this would validate against a backend
    if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', email.split('@')[0]);
        window.location.href = 'dashboard.html';
    }
    return false;
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Mock signup - In real app, this would send data to a backend
    if (name && email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        window.location.href = 'dashboard.html';
    }
    return false;
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}

// Page initialization functions
function initializeDashboard() {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        window.location.href = 'index.html';
        return;
    }
    document.getElementById('userName').textContent = `Welcome, ${userName}`;
}

function initializeDepartments() {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        window.location.href = 'index.html';
        return;
    }
    document.getElementById('userName').textContent = `Welcome, ${userName}`;
    
    const departmentsGrid = document.getElementById('departmentsGrid');
    if (departmentsGrid) {
        departmentsGrid.innerHTML = departments.map(dept => `
            <div class="department-card" onclick="window.location.href='doctors.html?dept=${dept.id}'">
                <h3>${dept.icon} ${dept.name}</h3>
                <p>${dept.description}</p>
            </div>
        `).join('');
    }
}

function initializeDoctors() {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        window.location.href = 'index.html';
        return;
    }
    document.getElementById('userName').textContent = `Welcome, ${userName}`;
    
    const urlParams = new URLSearchParams(window.location.search);
    const departmentId = parseInt(urlParams.get('dept'));
    const department = departments.find(d => d.id === departmentId);
    
    if (department) {
        document.getElementById('selectedDepartment').textContent = department.name;
        document.getElementById('departmentTitle').textContent = `${department.name} Department Doctors`;
        
        const doctorsGrid = document.getElementById('doctorsGrid');
        const departmentDoctors = doctors[departmentId] || [];
        
        doctorsGrid.innerHTML = departmentDoctors.map(doctor => `
            <div class="doctor-card">
                <img src="${doctor.image}" alt="${doctor.name}">
                <div>
                    <h3>${doctor.name}</h3>
                    <p>${doctor.specialization}</p>
                    <p>Available: ${doctor.availability}</p>
                    <button onclick="startChat(${doctor.id}, '${doctor.name}')" class="btn btn-primary">Chat with Doctor</button>
                </div>
            </div>
        `).join('');
    }
}

// Chat functions
function startChat(doctorId, doctorName) {
    document.getElementById('chatSection').classList.remove('hidden');
    document.getElementById('chatDoctorName').textContent = `Chat with ${doctorName}`;
    document.getElementById('chatMessages').innerHTML = ''; // Clear previous messages
}

function closeChat() {
    document.getElementById('chatSection').classList.add('hidden');
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML += `
            <div class="message sent">
                ${message}
            </div>
        `;
        messageInput.value = '';
        
        // Mock response from doctor
        setTimeout(() => {
            chatMessages.innerHTML += `
                <div class="message received">
                    Thank you for your message. A doctor will respond shortly.
                </div>
            `;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// Initialize pages based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'dashboard.html':
            initializeDashboard();
            break;
        case 'departments.html':
            initializeDepartments();
            break;
        case 'doctors.html':
            initializeDoctors();
            break;
        default:
            // Check if user is logged in on protected pages
            if (currentPage !== 'index.html' && currentPage !== 'signup.html') {
                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                if (!isLoggedIn) {
                    window.location.href = 'index.html';
                }
            }
    }
});
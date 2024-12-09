let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Hide current slide
    slides[currentSlide].classList.remove('active');

    // Update current slide index
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    // Show new slide
    slides[currentSlide].classList.add('active');

    // Update slides position
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Optional: Automatically change slides every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 5000);


function navigateToLogin() {
    // Redirect to the login page
    window.location.href = 'frontend/login.html';
}




function navigateToSignup() {
    // Redirect to the sign-up page
    window.location.href = 'signup.html';
}



function navigateTobookings(){
    window.location.href='bookings.html';
}


async function navigateToHome() {
    // Retrieve email and password from input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Send login request to the server
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Login successful, navigate to home.html
            window.location.href = 'home.html';
        } else {
            // Show error message (e.g., "Invalid credentials")
            alert(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred while logging in. Please try again.');
    }
}





//some shit

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Sign up successful! Please log in.');
            window.location.href = 'login.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});


if (response.ok) {
    // Redirect to home.html upon successful login
    alert('Login successful!');
    sessionStorage.setItem('isLoggedIn', 'true'); // Set flag
    window.location.href = 'home.html';
}

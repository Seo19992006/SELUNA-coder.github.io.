// Dữ liệu phòng mẫu
const rooms = [
    {
        id: 1,
        name: "Villa Sân Vườn",
        category: "garden",
        price: "1,800,000 VND",
        image: "images/room1.jpg",
        features: ["Phường 11", "3 phòng ngủ", "Sân vườn BBQ", "6 người"]
    },
    {
        id: 2,
        name: "Nhà Vườn Thoáng Mát",
        category: "garden",
        price: "1,500,000 VND",
        image: "images/room2.jpg",
        features: ["Phường 10", "3 phòng ngủ", "Vườn cây", "6 người"]
    },
    {
        id: 3,
        name: "Villa Sân Vườn Lớn",
        category: "garden",
        price: "2,200,000 VND",
        image: "images/room3.jpg",
        features: ["Phường 4", "4 phòng ngủ", "Sân vườn rộng", "8 người"]
    },
    {
        id: 4,
        name: "Villa Gần Chợ Đêm",
        category: "center",
        price: "1,200,000 VND",
        image: "images/room4.jpg",
        features: ["Phường 3", "2 phòng ngủ", "Gần trung tâm", "4 người"]
    },
    {
        id: 5,
        name: "Homestay Trung Tâm",
        category: "center",
        price: "900,000 VND",
        image: "images/room5.jpg",
        features: ["Phường 9", "1 phòng ngủ", "Gần quảng trường", "2 người"]
    }
];

// Sample news data
const news = [
    {
        id: 1,
        title: "Ngắm đồi hoa Đà Lạt, hòa mình vào không gian văn hóa cồng chiêng",
        image: "images/news1.jpg",
        link: "#"
    },
    {
        id: 2,
        title: "Phát triển xanh, không thể tổn hại những yếu tố làm nên Đà Lạt",
        image: "images/news2.jpg",
        link: "#"
    },
    {
        id: 3,
        title: "Đà Lạt phát triển du lịch xanh: Bền vững bắt đầu từ cộng đồng",
        image: "images/news3.jpg",
        link: "#"
    }
];

// Hàm tạo thẻ phòng
function createRoomCard(room) {
    const featuresWithIcons = room.features.map(feature => {
        let icon = '';
        if (feature.includes('Phường')) {
            icon = '<i class="fas fa-map-marker-alt"></i>';
        } else if (feature.includes('phòng ngủ')) {
            icon = '<i class="fas fa-bed"></i>';
        } else if (feature.includes('Sân vườn') || feature.includes('Vườn cây')) {
            icon = '<i class="fas fa-tree"></i>';
        } else if (feature.includes('BBQ')) {
            icon = '<i class="fas fa-grill"></i>';
        } else if (feature.includes('người')) {
            icon = '<i class="fas fa-users"></i>';
        } else if (feature.includes('View')) {
            icon = '<i class="fas fa-eye"></i>';
        } else if (feature.includes('trung tâm') || feature.includes('quảng trường')) {
            icon = '<i class="fas fa-city"></i>';
        }
        return icon + ' ' + feature;
    });

    return `
        <div class="room-card">
            <img src="${room.image}" alt="${room.name}">
            <div class="room-card-content">
                <h4>${room.name}</h4>
                <p>${featuresWithIcons.join(' • ')}</p>
                <p class="price">${room.price}/đêm</p>
                <a href="#" class="room-details-link" onclick="viewRoomDetails(${room.id}); return false;">Xem chi tiết &rarr;</a>
            </div>
        </div>
    `;
}

// Function to create news article cards
function createNewsCard(article) {
    return `
        <div class="article-card">
            <img src="${article.image}" alt="${article.title}">
            <div class="article-content">
                <h4>${article.title}</h4>
                <a href="${article.link}" class="read-more-link">Xem thêm</a>
            </div>
        </div>
    `;
}

// Hàm hiển thị phòng trong các phần
function populateSections() {
    const featuredRooms = document.querySelector('.featured-rooms .room-grid');
    const gardenRooms = document.querySelector('.category.garden .room-grid');
    const centerRooms = document.querySelector('.category.center .room-grid');
    const newsGrid = document.querySelector('.news-section .article-grid');

    // Hiển thị phòng nổi bật
    rooms.slice(0, 4).forEach(room => {
        featuredRooms.innerHTML += createRoomCard(room);
    });

    // Hiển thị phòng sân vườn
    rooms.filter(room => room.category === 'garden').forEach(room => {
        gardenRooms.innerHTML += createRoomCard(room);
    });

    // Hiển thị phòng gần trung tâm
    rooms.filter(room => room.category === 'center').forEach(room => {
        centerRooms.innerHTML += createRoomCard(room);
    });

    // Populate news articles
    news.forEach(article => {
        newsGrid.innerHTML += createNewsCard(article);
    });
}

// Hàm xem chi tiết phòng
function viewRoomDetails(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
        // Hiển thị thông tin chi tiết phòng
        alert(`Xem chi tiết phòng: ${room.name}\nGiá: ${room.price}/đêm\nTiện nghi: ${room.features.join(', ')}`);
    }
}

// Chức năng tìm kiếm
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRooms = rooms.filter(room => 
        room.name.toLowerCase().includes(searchTerm) ||
        room.features.some(feature => feature.toLowerCase().includes(searchTerm))
    );

    // Cập nhật hiển thị với phòng đã lọc
    const featuredRooms = document.querySelector('.featured-rooms .room-grid');
    featuredRooms.innerHTML = '';
    if (filteredRooms.length === 0) {
        featuredRooms.innerHTML = '<p class="no-results">Không tìm thấy phòng phù hợp</p>';
    } else {
        filteredRooms.forEach(room => {
            featuredRooms.innerHTML += createRoomCard(room);
        });
    }
}

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Cuộn mượt cho các liên kết
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    // Check the current page URL and run populateSections only on index.html
    if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html')) {
        populateSections();
    }

    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Image Slider functionality for villa cards
    // const sliders = document.querySelectorAll('.villa-images');

    // sliders.forEach(sliderContainer => {
    //     const slider = sliderContainer.querySelector('.slider-container');
    //     const images = slider.querySelectorAll('img');
    //     const prevBtn = sliderContainer.querySelector('.prev-btn');
    //     const nextBtn = sliderContainer.querySelector('.next-btn');
    //     const dotsContainer = sliderContainer.querySelector('.slider-dots'); // Get the dots container
    //     let currentIndex = 0;
    //     let autoSlideInterval;

    //     // Function to update slider position and active dot
    //     function updateSlider() {
    //         const imageWidth = images[0].clientWidth;
    //         slider.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
    //         updateDots();
    //     }

    //     // Function to create dots
    //     function createDots() {
    //         dotsContainer.innerHTML = ''; // Clear existing dots
    //         images.forEach((_, index) => {
    //             const dot = document.createElement('span');
    //             dot.classList.add('dot');
    //             dot.addEventListener('click', () => {
    //                 currentIndex = index;
    //                 updateSlider();
    //                 resetAutoSlide(); // Reset auto slide on manual navigation
    //             });
    //             dotsContainer.appendChild(dot);
    //         });
    //         updateDots(); // Set initial active dot
    //     }

    //     // Function to update active dot class
    //     function updateDots() {
    //         const dots = dotsContainer.querySelectorAll('.dot');
    //         dots.forEach((dot, index) => {
    //             dot.classList.toggle('active', index === currentIndex);
    //         });
    //     }

    //     // Function for auto slide
    //     function startAutoSlide() {
    //         autoSlideInterval = setInterval(() => {
    //             currentIndex = (currentIndex + 1) % images.length;
    //             updateSlider();
    //         }, 5000); // Change image every 5 seconds (adjust as needed)
    //     }

    //     // Function to reset auto slide timer
    //     function resetAutoSlide() {
    //         clearInterval(autoSlideInterval);
    //         startAutoSlide();
    //     }

    //     // Event listener for Next button
    //     nextBtn.addEventListener('click', () => {
    //         currentIndex = (currentIndex + 1) % images.length;
    //         updateSlider();
    //         resetAutoSlide(); // Reset auto slide on manual navigation
    //     });

    //     // Event listener for Previous button
    //     prevBtn.addEventListener('click', () => {
    //         currentIndex = (currentIndex - 1 + images.length) % images.length;
    //         updateSlider();
    //         resetAutoSlide(); // Reset auto slide on manual navigation
    //     });

    //     // Initial setup
    //     if (images.length > 0) {
    //         createDots(); // Create dots based on number of images
    //         updateSlider(); // Set initial slider position
    //         startAutoSlide(); // Start auto slide

    //         // Pause auto slide on hover
    //         sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    //         sliderContainer.addEventListener('mouseleave', () => startAutoSlide());
    //     }
    // });

    function initializeAllImageSliders() {
        const sliders = document.querySelectorAll('.villa-images');

        sliders.forEach(sliderContainer => {
            const slider = sliderContainer.querySelector('.slider-container');
            const images = slider.querySelectorAll('img');
            const prevBtn = sliderContainer.querySelector('.prev-btn');
            const nextBtn = sliderContainer.querySelector('.next-btn');
            const dotsContainer = sliderContainer.querySelector('.slider-dots');
            let currentIndex = 0;
            let autoSlideInterval;

            function updateSlider() {
                // Use offsetWidth as a fallback if clientWidth is 0
                let imageWidth = images[0].clientWidth || images[0].offsetWidth;

                // If width is still 0, try again after a small delay
                if (imageWidth === 0 && images.length > 0) {
                    setTimeout(updateSlider, 50); // Retry after 50ms
                    return; // Exit the current function call
                }

                if (imageWidth > 0) {
                    slider.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
                    updateDots();
                } else {
                    console.warn('Could not determine image width for slider.');
                }
            }

            function createDots() {
                if (!dotsContainer) return; // Check if dotsContainer exists
                dotsContainer.innerHTML = '';
                images.forEach((_, index) => {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        updateSlider();
                        resetAutoSlide();
                    });
                    dotsContainer.appendChild(dot);
                });
                updateDots();
            }

            function updateDots() {
                if (!dotsContainer) return; // Check if dotsContainer exists
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }

            function startAutoSlide() {
                autoSlideInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateSlider();
                }, 5000);
            }

            function resetAutoSlide() {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }

            // Add optional chaining (?) for safety if buttons might not exist
            nextBtn?.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateSlider();
                resetAutoSlide();
            });

            prevBtn?.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateSlider();
                resetAutoSlide();
            });

            if (images.length > 0) {
                // Use a flag to ensure initialization runs only once per slider
                let initialized = false;

                const initSlider = () => {
                    if (initialized) return;
                    // Wait for the first image to have a valid width
                    // Check for both clientWidth and offsetWidth
                    if (images[0].clientWidth > 0 || images[0].offsetWidth > 0) {
                         createDots();
                         updateSlider();
                         startAutoSlide();
                         initialized = true; // Mark as initialized
                         console.log('Slider initialized successfully with image width:', images[0].clientWidth || images[0].offsetWidth); // Log success
                    } else {
                        // If width is still 0, try again after a small delay
                         console.log('Image width still 0, retrying initialization...'); // Log retry
                         setTimeout(initSlider, 50); // Retry after 50ms
                    }
                };

                // Try initializing after the first image loads
                images[0].addEventListener('load', initSlider);

                // If the image is already loaded (e.g., cached) or loads quickly, initialize immediately
                if (images[0].complete) {
                    initSlider();
                } else {
                    // Fallback to initialize after a short delay if load event doesn't fire or is insufficient
                     setTimeout(initSlider, 200); // Initialize even if load didn't fully work after 200ms
                }


                sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
                sliderContainer.addEventListener('mouseleave', () => startAutoSlide());
            }
        });
    }

    // Call the function to initialize the sliders
    initializeAllImageSliders();

    // Xử lý cuộn trang cho header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Here you would typically send the data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
            this.reset();
        });
    }

    // Room card hover effect
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Mobile menu toggle
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Add button to navbar
        navbar.insertBefore(mobileMenuBtn, navLinks);
        
        // Toggle menu on click
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    };

    // Initialize mobile menu
    createMobileMenu();

    // Add loading animation for images
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        });
    });

    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.room-card, .feature, .about-content, .contact-container');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
}); 
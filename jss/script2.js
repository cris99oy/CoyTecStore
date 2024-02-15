document.addEventListener('DOMContentLoaded', function () {
    var darkModeToggle = document.getElementById('darkModeToggle');
    var body = document.body;

    // Función para activar/desactivar el modo oscuro
    function toggleDarkMode(enable) {
        if (enable) {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.checked = false;
            localStorage.setItem('darkMode', null);
        }
    }

    // Verificar la hora del día para activar automáticamente el modo oscuro por la noche
    var horaActual = new Date().getHours();
    var modoOscuroAutomatico = horaActual >= 20 || horaActual < 6; // Activar entre las 8 PM y las 6 AM

    // Verificar si el modo oscuro está activado en la configuración del sistema del usuario (media query)
    var mediaQueryDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Activar el modo oscuro si es automático o si está configurado en el sistema
    toggleDarkMode(modoOscuroAutomatico || mediaQueryDarkMode);

    darkModeToggle.addEventListener('change', function () {
        toggleDarkMode(darkModeToggle.checked);
    });

    var links = document.querySelectorAll('nav ul li a');

    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var currentSlide = 0;
    var carouselItems = document.querySelectorAll('.carousel-item');
    var totalSlides = carouselItems.length;

    function showSlide(index) {
        carouselItems.forEach(function (item, i) {
            item.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    document.getElementById('myCarousel').addEventListener('click', function (e) {
        var target = e.target;
        if (target.classList.contains('prev')) {
            prevSlide();
        } else if (target.classList.contains('next')) {
            nextSlide();
        } else if (target.parentElement.classList.contains('carousel-item')) {
            var url = target.parentElement.getAttribute('data-href');
            window.location.href = url;
        }
    });

    showSlide(currentSlide);
});

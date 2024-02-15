document.addEventListener('DOMContentLoaded', function () {
    var darkModeToggle = document.getElementById('switch-round');
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



/*carrucel 2*/
document.addEventListener('DOMContentLoaded', function () {
    $('.slick-carousel').slick({
        autoplay: true,     // Activar el modo de reproducción automática
        autoplaySpeed: 3000, // Establecer la velocidad de reproducción automática en milisegundos
        dots: true,         // Mostrar indicadores de puntos
        arrows: true        // Mostrar flechas de navegación
        // Puedes ajustar otras opciones según tus preferencias
    });
});

/* slider*/ 
document.addEventListener('DOMContentLoaded', function () {
    var currentProduct = 0;
    var products = document.querySelectorAll('.product');
    var totalProducts = products.length;
    var intervalId;

    function showProduct(index) {
        products.forEach(function (product, i) {
            product.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextProduct() {
        currentProduct = (currentProduct + 1) % totalProducts;
        showProduct(currentProduct);
    }

    function prevProduct() {
        currentProduct = (currentProduct - 1 + totalProducts) % totalProducts;
        showProduct(currentProduct);
    }

    function startAutoPlay() {
        intervalId = setInterval(nextProduct, 3000); // Cambia el producto cada 3 segundos (ajusta según tus preferencias)
    }

    function stopAutoPlay() {
        clearInterval(intervalId);
    }

    document.getElementById('productSlider').addEventListener('click', function (e) {
        var target = e.target;
        if (target.classList.contains('prev')) {
            prevProduct();
        } else if (target.classList.contains('next')) {
            nextProduct();
        } else if (target.parentElement.classList.contains('product')) {
            var url = target.parentElement.getAttribute('data-href');
            window.location.href = url;
        }

        // Reinicia el temporizador después de cada clic
        stopAutoPlay();
        startAutoPlay();
    });

    // Inicia la reproducción automática al cargar la página
    startAutoPlay();
});

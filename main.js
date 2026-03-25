console.log("Sitio cargado - Menú con carrusel y cierre de subcategorías");

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENÚ HAMBURGUESA =====
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Crear overlay
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
    // Crear botón cerrar dentro del menú
    let menuClose = document.querySelector('.menu-close');
    if (!menuClose && navMenu) {
        menuClose = document.createElement('div');
        menuClose.className = 'menu-close';
        menuClose.innerHTML = '✕';
        navMenu.appendChild(menuClose);
    }
    
    // Asignar índices para animación escalonada
    const menuItems = document.querySelectorAll('.nav-links > li');
    menuItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    // Abrir menú
    if (menuIcon && navMenu) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.add('active');
            overlay.classList.add('active');
            body.classList.add('menu-open');
        });
        
        // Cerrar con botón close
        if (menuClose) {
            menuClose.addEventListener('click', () => {
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                // Cerrar también subcategoría si está abierta
                if (subcategoriaActiva) {
                    cerrarSubcategoria(subcategoriaActiva);
                }
            });
        }
        
        // Cerrar al hacer click en overlay
        overlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            if (subcategoriaActiva) {
                cerrarSubcategoria(subcategoriaActiva);
            }
        });
    }
    
    // ===== CARRUSEL INTERACTIVO CON HOVER =====
    const carruselItems = document.querySelectorAll('.carrusel-item');
    
    // Click en item del carrusel - navega a la categoría
    carruselItems.forEach(item => {
        item.addEventListener('click', () => {
            const categoria = item.dataset.categoria;
            if (categoria) {
                // Cerrar subcategoría si está abierta
                if (subcategoriaActiva) {
                    cerrarSubcategoria(subcategoriaActiva);
                }
                // Cerrar menú
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
                // Scroll a la sección
                const targetSection = document.getElementById(categoria);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            }
        });
    });
    
    // Cerrar menú al hacer click en enlaces
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
            }
            // Cerrar subcategoría si está abierta
            if (subcategoriaActiva) {
                cerrarSubcategoria(subcategoriaActiva);
            }
        });
    });
    
    // Marcar enlace activo
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        } else if (currentPage === 'index.html' && href === 'index.html') {
            item.classList.add('active');
        }
    });
    
    // ===== DESPLIEGUE DE SUBCATEGORÍAS CON BOTÓN CERRAR =====
    const wrappers = document.querySelectorAll('.categoria-wrapper');
    
    // Crear botón de cerrar para subcategorías si no existe
    let cerrarSubBtn = document.querySelector('.subcategoria-cerrar');
    if (!cerrarSubBtn) {
        cerrarSubBtn = document.createElement('div');
        cerrarSubBtn.className = 'subcategoria-cerrar';
        cerrarSubBtn.innerHTML = '✕';
        document.body.appendChild(cerrarSubBtn);
    }
    
    let subcategoriaActiva = null;
    
    function cerrarSubcategoria(subcategoria) {
        if (subcategoria) {
            subcategoria.classList.remove('abierta');
            if (subcategoriaActiva === subcategoria) {
                subcategoriaActiva = null;
            }
        }
        cerrarSubBtn.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }
    
    function abrirSubcategoria(subcategoria) {
        // Cerrar cualquier subcategoría abierta
        if (subcategoriaActiva && subcategoriaActiva !== subcategoria) {
            subcategoriaActiva.classList.remove('abierta');
        }
        
        subcategoria.classList.add('abierta');
        subcategoriaActiva = subcategoria;
        cerrarSubBtn.classList.add('visible');
        
        // Scroll suave hasta la subcategoría
        setTimeout(() => {
            subcategoria.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    // Evento click en el botón de cerrar
    cerrarSubBtn.addEventListener('click', () => {
        if (subcategoriaActiva) {
            cerrarSubcategoria(subcategoriaActiva);
        }
    });
    
    // Configurar cada categoría
    wrappers.forEach(wrapper => {
        const categoria = wrapper.querySelector('.categoria, .categoria-mascotas, .categoria-espacios, .categoria-retratos, .categoria-natural');
        const subcategoria = wrapper.querySelector('.subcategoria, .subcategoria-mascotas, .subcategoria-espacios, .subcategoria-retratos, .subcategoria-natural');
        
        if (categoria && subcategoria) {
            categoria.addEventListener('click', () => {
                if (subcategoria.classList.contains('abierta')) {
                    cerrarSubcategoria(subcategoria);
                } else {
                    abrirSubcategoria(subcategoria);
                }
            });
        }
    });
    
    // ===== CURSOR PREVIEW (solo para index.html) =====
    if (document.querySelector('.categoria')) {
        
        const previewImages = {
            deportes: ['Img/F1.jpg', 'Img/F2.jpg', 'Img/F3.jpg', 'Img/F4.jpg', 'Img/F5.jpg', 'Img/F6.jpg', 'Img/F7.jpg', 'Img/F8.jpg', 'Img/F9.jpg', 'Img/F10.jpg', 'Img/F11.jpg', 'Img/F12.jpg', 'Img/F13.jpg', 'Img/F14.jpg', 'Img/F15.jpg', 'Img/F16.jpg'],
            mascotas: ['img/C1.jpg', 'img/C2.jpg', 'img/C3.jpg', 'img/C4.jpg', 'img/C5.jpg', 'img/C6.jpg', 'img/C7.JPEG', 'img/C8.jpg'],
            espacios: ['img/E1.jpg', 'img/E2.jpg', 'img/E3.jpg', 'img/E4.jpg', 'img/E5.jpg', 'img/E6.jpg', 'img/E7.jpg', 'img/E8.jpg'],
            retratos: ['img/R1.jpg', 'img/R2.jpg', 'img/R3.jpg', 'img/R4.jpg', 'img/R5.jpg', 'img/R6.jpg', 'img/R7.jpg', 'img/R8.jpg'],
            natural: ['img/N1.jpg', 'img/N2.jpg', 'img/N3.jpg', 'img/N4.jpg', 'img/N5.jpg', 'img/N6.jpg', 'img/N7.jpg', 'img/N8.jpg', 'img/N9.jpg', 'img/N10.jpg', 'img/N11.jpg', 'img/N12.jpg']
        };
        
        const previewElement = document.createElement('div');
        previewElement.className = 'cursor-preview';
        const previewImg = document.createElement('img');
        previewElement.appendChild(previewImg);
        document.body.appendChild(previewElement);
        
        let imageIndex = 0;
        let intervalId = null;
        
        function cambiarImagenPreview(categoria) {
            const imagenes = previewImages[categoria];
            if (!imagenes) return;
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(() => {
                imageIndex = (imageIndex + 1) % imagenes.length;
                previewImg.src = imagenes[imageIndex];
            }, 1500);
        }
        
        const categoriasPreview = document.querySelectorAll('.categoria, .categoria-mascotas, .categoria-espacios, .categoria-retratos, .categoria-natural');
        
        categoriasPreview.forEach(categoria => {
            let categoriaTipo = '';
            if (categoria.classList.contains('categoria')) categoriaTipo = 'deportes';
            else if (categoria.classList.contains('categoria-mascotas')) categoriaTipo = 'mascotas';
            else if (categoria.classList.contains('categoria-espacios')) categoriaTipo = 'espacios';
            else if (categoria.classList.contains('categoria-retratos')) categoriaTipo = 'retratos';
            else if (categoria.classList.contains('categoria-natural')) categoriaTipo = 'natural';
            
            categoria.addEventListener('mouseenter', () => {
                const imagenes = previewImages[categoriaTipo];
                if (imagenes && imagenes.length) {
                    previewImg.src = imagenes[0];
                    imageIndex = 0;
                    cambiarImagenPreview(categoriaTipo);
                }
                previewElement.classList.add('visible');
            });
            
            categoria.addEventListener('mousemove', (e) => {
                previewElement.style.left = e.clientX + 'px';
                previewElement.style.top = e.clientY + 'px';
            });
            
            categoria.addEventListener('mouseleave', () => {
                if (intervalId) clearInterval(intervalId);
                previewElement.classList.remove('visible');
            });
        });
        
        // ===== SCROLL HORIZONTAL =====
        const galeria = document.querySelector(".galeria-horizontal");
        const prev = document.querySelector(".prev");
        const next = document.querySelector(".next");

        if (prev && next && galeria) {
            prev.addEventListener("click", () => {
                galeria.scrollBy({ left: -400, behavior: "smooth" });
            });
            next.addEventListener("click", () => {
                galeria.scrollBy({ left: 400, behavior: "smooth" });
            });
        }
        
        // ===== FILTROS =====
        function setupFiltros(filtrosSelector, itemsSelector) {
            const filtros = document.querySelectorAll(filtrosSelector);
            const items = document.querySelectorAll(itemsSelector);
            if (filtros.length === 0 || items.length === 0) return;
            filtros.forEach(filtro => {
                filtro.addEventListener('click', function() {
                    filtros.forEach(f => f.classList.remove('activo'));
                    this.classList.add('activo');
                    items.forEach(item => {
                        item.style.display = 'block';
                    });
                });
            });
        }
        
        setupFiltros('.filtros button', '.galeria-horizontal .img-wrapper');
        setupFiltros('.filtros-mascotas span', '.grid-mascotas .img-wrapper-grid');
        setupFiltros('.filtros-espacios span', '.grid-espacios .img-wrapper-grid');
        setupFiltros('.filtros-retratos span', '.grid-retratos .img-wrapper-grid');
        setupFiltros('.filtros-natural span', '.grid-natural .img-wrapper-grid');
    }
    
    // ===== LIGHTBOX =====
    const images = document.querySelectorAll(".galeria-horizontal .img-wrapper img, .grid-mascotas .img-wrapper-grid img, .grid-espacios .img-wrapper-grid img, .grid-retratos .img-wrapper-grid img, .grid-natural .img-wrapper-grid img");
    
    if (!document.querySelector('.lightbox') && images.length > 0) {
        const lightboxHTML = `<div class="lightbox"><span class="cerrar">&times;</span><img class="lightbox-img" src="" alt="Imagen ampliada"></div>`;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }
    
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const cerrarLightbox = document.querySelector(".cerrar");

    if (lightbox && lightboxImg && cerrarLightbox && images.length > 0) {
        images.forEach(img => {
            img.addEventListener("click", (e) => {
                e.stopPropagation();
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
                document.body.style.overflow = "hidden";
            });
        });
        cerrarLightbox.addEventListener("click", () => {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        });
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }
    
    // ===== ANIMACIÓN INICIAL =====
    if (typeof gsap !== 'undefined' && document.querySelector('.hero')) {
        gsap.from('.hero', { opacity: 0, duration: 1.5, ease: "power2.out" });
        if (document.querySelector('.palabras span')) {
            gsap.from('.palabras span', {
                y: 50, opacity: 0, duration: 1, stagger: 0.3, delay: 0.5, ease: "back.out(1.2)"
            });
        }
    }
    
    // ===== CERRAR CON ESC (cierra subcategoría y menú) =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Cerrar subcategoría si está abierta
            if (subcategoriaActiva) {
                cerrarSubcategoria(subcategoriaActiva);
            }
            // Cerrar menú principal si está abierto
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
            }
            // Cerrar lightbox si está abierto
            const lightbox = document.querySelector('.lightbox');
            if (lightbox && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});
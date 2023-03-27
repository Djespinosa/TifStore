const addToCartButtons = document.querySelectorAll('.button-add');

      addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          
          // Obtener la información del producto del botón que se presionó
          const product = {
            id: parseInt(event.target.getAttribute('data-id')),
            name: event.target.getAttribute('data-name'),
            price: parseFloat(event.target.getAttribute('data-price')),
            quantity: 1
          };
          
          // Agregar el producto al carrito
          addToCart(product);
        });
      });

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      function addToCart(product) {
        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart.findIndex(p => p.id === product.id);
        if (existingProductIndex !== -1) {
          // Si el producto ya está en el carrito, aumentar la cantidad
          cart[existingProductIndex].quantity++;
        } else {
          // Si el producto no está en el carrito, agregarlo
          cart.push(product);
        }
        
        // Guardar el carrito en LocalStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
      }
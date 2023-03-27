const cartTableBody = document.getElementById('cart-table-body');

        // Recuperar el carrito guardado en LocalStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        let total = 0;

        // Agregar una fila para cada producto en el carrito
        cart.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td style="visibility:collapse; display:none;"><input type="hidden" name="product_id" value = "${product.id}" class="form-control" readonly /></td> 
        <td><input type="text" name="name" value = "${product.name}" class="form-control" readonly /></td>
        <td><input type="number" name="quantity" value = ${product.quantity} class="form-control" /></td>
        <td><input type="number" name="price" value = ${product.price.toFixed(2)} class="form-control" readonly /></td>
        <td><input type="number" name="total" value = ${(product.price * product.quantity).toFixed(2)} class="form-control" readonly /></td>
        <td><a class="btn-delete" data-name="${product.name}"><i class="fa-solid fa-trash-can"></i></a></td>
        `;
        cartTableBody.appendChild(row);

        total += product.price * product.quantity;
    });

    // Agregar una fila al final de la tabla con el total general
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3" class="text-end"><strong>Total</strong></td>
        <td><strong>$${total.toFixed(2)}</strong></td>
        <td></td>
    `;
    cartTableBody.appendChild(totalRow);

    // Agregar evento para botones de eliminar
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', event => {
        const productName = event.target.dataset.name;
        const productIndex = cart.findIndex(product => product.name === productName);
        cart.splice(productIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
        });
    });

    // Agregar evento para botón de pagar
    const btnPay = document.getElementById('btn-pay');
    btnPay.addEventListener('click', event => {
        alert('Gracias por tu compra!');
        localStorage.removeItem('cart');
        location.reload();
    });

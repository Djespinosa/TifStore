function updatePrice(select) {
    const productsJSON = JSON.parse(document.body.dataset.products);
    const productId = select.value;
    const product = productsJSON.find(p => p.product_id == productId);
    const priceInput = select.parentElement.parentElement.querySelector("input[name='price']");
    priceInput.value = product.price;
}

// Obtener elementos del DOM
var addRowButton = document.getElementById("add_row");
var deleteRowButton = document.getElementById("delete_row");
var submitButton = document.getElementById("submit");
var tableBody = document.querySelector("#tab_logic tbody");

    // Manejadores de eventos para botones
addRowButton.addEventListener("click", function() {
var rowCount = tableBody.rows.length;
var row = tableBody.insertRow(rowCount);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);


cell1.innerHTML = rowCount + 1;
cell2.innerHTML = '<select type="number" name="product_id"  id="product_id" placeholder="Producto" class="form-control"><option value="" disabled selected>- Selecciona el Producto -</option><% products.forEach(product=> { %><option value="<%= product.product_id %>"><%= product.name %></option><% }); %></select>';
cell3.innerHTML = '<input type="number" name="price" class="form-control" readonly />';
cell4.innerHTML = '<input type="number" name="quantity" placeholder="Cantidad" class="form-control" />';

var selectEl = cell2.querySelector("select");
selectEl.addEventListener("change", function() {
    updatePrice(this);
});

});

deleteRowButton.addEventListener("click", function() {
var rowCount = tableBody.rows.length;
if (rowCount > 1) {
    tableBody.deleteRow(rowCount - 1);
}
});
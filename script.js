// Elementos del DOM
const quantityInput = document.getElementById('quantity');
const totalPriceEl = document.getElementById('totalPrice');
const promoAppliedEl = document.getElementById('promoApplied');
const orderForm = document.getElementById('orderForm');

// Función para calcular la promoción automáticamente
function calculatePrice() {
    const quantity = parseInt(quantityInput.value) || 0;
    let total = 0;
    let promoText = "";

    if (quantity > 0) {
        const pairsOfDocens = Math.floor(quantity / 2); // Grupos de 2 docenas
        const singleDocens = quantity % 2;             // Docenas sueltas

        total = (pairsOfDocens * 25) + (singleDocens * 14);

        if (pairsOfDocens > 0) {
            promoText = `¡Aplicado: Promoción de 2 docenas x S/25 (${pairsOfDocens}x)!`;
        }
    }

    // Actualizar precios en pantalla
    totalPriceEl.textContent = `S/ ${total.toFixed(2)}`;
    promoAppliedEl.textContent = promoText;
}

// Escuchar cambios en la cantidad de docenas
quantityInput.addEventListener('input', calculatePrice);

// Manejar el envío del formulario
orderForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const quantity = quantityInput.value;
    const total = totalPriceEl.textContent;

    // =========================================================================
    // ⚠️ PON AQUÍ TU NÚMERO TELEFÓNICO REAL (Con el 51 de Perú adelante)
    // =========================================================================
    const myWhatsAppNumber = "51987654321"; 

    // Construir el mensaje de texto limpio para WhatsApp
    const message = "*NUEVO PEDIDO DE TEQUEÑOS* 🥟\n\n" +
                    "*Nombre:* " + name + "\n" +
                    "*Teléfono:* " + phone + "\n" +
                    "*Dirección:* " + address + "\n" +
                    "*Pedido:* " + quantity + " docena(s)\n" +
                    "*Total a pagar:* " + total;

    // Enlace universal y seguro de WhatsApp (API oficial)
    const whatsappUrl = "https://wa.me/" + myWhatsAppNumber + "?text=" + encodeURIComponent(message);

    // Redirección en la misma pestaña para máxima compatibilidad móvil
    window.location.href = whatsappUrl;
});
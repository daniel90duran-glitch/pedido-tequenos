const quantityInput = document.getElementById('quantity');
const totalPriceEl = document.getElementById('totalPrice');
const promoAppliedEl = document.getElementById('promoApplied');
const orderForm = document.getElementById('orderForm');

// Función matemática para calcular la promoción automáticamente
function calculatePrice() {
    const quantity = parseInt(quantityInput.value) || 0;
    let total = 0;
    let promoText = "";

    // Lógica: Cada par (2 docenas) cuesta 25 soles. Las docenas sueltas cuestan 14 soles.
    if (quantity > 0) {
        const pairsOfDocens = Math.floor(quantity / 2); // Cuántos grupos de 2 hay
        const singleDocens = quantity % 2;             // Si sobra una docena suelta

        total = (pairsOfDocens * 25) + (singleDocens * 14);

        if (pairsOfDocens > 0) {
            promoText = `¡Aplicado: Promoción de 2 docenas x S/25 (${pairsOfDocens}x)!`;
        }
    }

    // Actualizar los textos en la pantalla
    totalPriceEl.textContent = `S/ ${total.toFixed(2)}`;
    promoAppliedEl.textContent = promoText;
}

// Escuchar cuando el usuario cambia la cantidad de docenas
quantityInput.addEventListener('input', calculatePrice);

// Manejar el envío del formulario para que mande los datos a tu WhatsApp
orderForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const quantity = quantityInput.value;
    const total = totalPriceEl.textContent;

    // Tu número de teléfono a donde llegará el pedido (agrega el código de país, ej: 51 para Perú)
    const myWhatsAppNumber = "51910381084"; // <-- CAMBIA ESTO POR TU NÚMERO REAL

    // Construir el mensaje de texto limpio
    const message = `*NUEVO PEDIDO DE TEQUEÑOS* 🥟\n\n` +
                    `*Nombre:* ${name}\n` +
                    `*Teléfono:* ${phone}\n` +
                    `*Dirección:* ${address}\n` +
                    `*Pedido:* ${quantity} docena(s)\n` +
                    `*Total a pagar:* ${total}`;

    // Codificar el texto para que sea válido en un enlace web
    const whatsappUrl = `https://api.whatsapp.com/whatsapp://send?phone=${myWhatsAppNumber}&text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp con el pedido listo
    window.open(whatsappUrl, '_blank');
});
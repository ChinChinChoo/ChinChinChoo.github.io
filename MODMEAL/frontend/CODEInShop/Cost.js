let cart = []; // เก็บรายการในตะกร้า

function openOrderModal(menuName, basePrice, options) {
  const modal = document.getElementById('orderModal');
  document.getElementById('menuName').innerText = menuName;
  document.getElementById('basePrice').innerText = `เริ่มต้น: ${basePrice} บาท`;
  document.getElementById('priceTotal').innerText = `รวมทั้งหมด: ${basePrice} บาท`;
  modal.dataset.basePrice = basePrice;
  modal.dataset.menuName = menuName;

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = ''; // ล้างตัวเลือกเก่า

  options.forEach(option => {
    const optionElement = document.createElement('label');
    optionElement.innerHTML = `
      <input type="checkbox" class="extra-option" value="${option.price}" data-name="${option.name}" onclick="updatePrice()">
      ${option.name} ${option.price > 0 ? `(+${option.price} บาท)` : ''}
    `;
    optionsContainer.appendChild(optionElement);
    optionsContainer.appendChild(document.createElement('br'));
  });

  modal.style.display = 'flex';
}

function closeOrderModal() {
  document.getElementById('orderModal').style.display = 'none';
}

function updatePrice() {
  const modal = document.getElementById('orderModal');
  const basePrice = parseInt(modal.dataset.basePrice);
  const extraOptions = document.querySelectorAll('.extra-option:checked');
  let extraCost = 0;

  extraOptions.forEach(option => {
    extraCost += parseInt(option.value);
  });

  const totalPrice = basePrice + extraCost;
  document.getElementById('priceTotal').innerText = `รวมทั้งหมด: ${totalPrice} บาท`;
}

function addToCart() {
  const modal = document.getElementById('orderModal');
  const menuName = modal.dataset.menuName;
  const basePrice = parseInt(modal.dataset.basePrice);
  const extraOptions = document.querySelectorAll('.extra-option:checked');

  let extraCost = 0;
  let selectedOptions = [];

  extraOptions.forEach(option => {
    extraCost += parseInt(option.value);
    selectedOptions.push(option.dataset.name);
  });

  const totalPrice = basePrice + extraCost;

  // เพิ่มรายการในตะกร้า
  cart.push({
    name: menuName,
    basePrice: basePrice,
    options: selectedOptions,
    totalPrice: totalPrice
  });

  updateCart();
  closeOrderModal();
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  cartItems.innerHTML = '';

  let totalCost = 0;
  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${item.name} (${item.options.join(', ')}): ${item.totalPrice} บาท
    `;
    cartItems.appendChild(listItem);
    totalCost += item.totalPrice;
  });

  cartTotal.innerText = `รวมทั้งหมด: ${totalCost} บาท`;
}

function confirmOrder() {
  if (cart.length === 0) {
    alert('ตะกร้าว่างเปล่า! โปรดเลือกอาหารก่อน.');
    return;
  }

  // ส่งคำสั่งซื้อไปยังร้านค้า
  console.log('คำสั่งซื้อ:', cart);

  alert('คำสั่งซื้อของคุณถูกส่งแล้ว!');
  cart = []; // ล้างตะกร้าหลังยืนยัน
  updateCart();
}

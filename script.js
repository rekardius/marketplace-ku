// Load produk dari produk.json dan simpan ke localStorage
fetch("produk.json")
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("produk_list", JSON.stringify(data));
    tampilkanProduk(data);
  })
  .catch((error) => {
    console.error("Gagal load produk.json:", error);
  });

function tampilkanProduk(produkList) {
  const container = document.getElementById("produk-container");
  container.innerHTML = "";

  produkList.forEach((produk, index) => {
    const div = document.createElement("div");
    div.classList.add("produk");

    div.innerHTML = `
      <img src="${produk.gambar}" alt="${produk.nama}">
      <h3>${produk.nama}</h3>
      <p>Rp ${produk.harga.toLocaleString()}</p>
      <div class="btn-container">
        <button class="btn-troli" onclick="tambahKeTroli(${index})">+ Troli</button>
        <button class="btn-beli" onclick="beliLangsung(${index})">Beli</button>
        <button class="btn-wishlist" onclick="tambahWishlist(${index})">❤️</button>
      </div>
    `;

    container.appendChild(div);
  });
}

// Tambah produk ke keranjang/troli
function tambahKeTroli(index) {
  const produkList = JSON.parse(localStorage.getItem("produk_list")) || [];
  const troli = JSON.parse(localStorage.getItem("troli")) || [];

  const produk = produkList[index];

  // Cek produk sudah ada di troli atau belum
  const item = troli.find((item) => item.nama === produk.nama);
  if (item) {
    item.qty += 1;
  } else {
    produk.qty = 1;
    troli.push(produk);
  }

  localStorage.setItem("troli", JSON.stringify(troli));
  alert(`"${produk.nama}" berhasil ditambahkan ke troli!`);
}

// Beli langsung: simpan produk yang dibeli dan buka halaman pembayaran
function beliLangsung(index) {
  const produkList = JSON.parse(localStorage.getItem("produk_list")) || [];
  const produk = produkList[index];
  localStorage.setItem("produk_dibeli", JSON.stringify(produk));
  window.location.href = "pembayaran.html";
}

// Tambah produk ke wishlist
function tambahWishlist(index) {
  const produkList = JSON.parse(localStorage.getItem("produk_list")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const produk = produkList[index];

  // Cek apakah produk sudah ada di wishlist
  const sudahAda = wishlist.some((item) => item.nama === produk.nama);
  if (!sudahAda) {
    wishlist.push(produk);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`"${produk.nama}" berhasil ditambahkan ke Wishlist!`);
  } else {
    alert("Produk sudah ada di Wishlist!");
  }
}

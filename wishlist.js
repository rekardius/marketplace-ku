document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("wishlist-container");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    container.innerHTML =
      "<p style='text-align:center;'>Wishlist kosong 😢</p>";
    return;
  }

  wishlist.forEach((produk, index) => {
    const div = document.createElement("div");
    div.classList.add("produk");
    div.innerHTML = `
      <img src="${produk.gambar}" alt="${produk.nama}">
      <h3>${produk.nama}</h3>
      <p>Rp ${produk.harga.toLocaleString()}</p>
      <div class="btn-group">
        <button class="btn-beli" onclick="beliLangsungWishlist(${index})">Beli</button>
        <button class="btn-hapus" onclick="hapusWishlist(${index})">Hapus</button>
      </div>
    `;
    container.appendChild(div);
  });
});

function beliLangsungWishlist(index) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const produk = wishlist[index];
  localStorage.setItem("produk_dibeli", JSON.stringify(produk));
  window.location.href = "pembayaran.html";
}

function hapusWishlist(index) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload();
}

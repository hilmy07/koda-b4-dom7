const gelas = [
  { kapasitas: 310, isi: 200 },
  { kapasitas: 210, isi: 50 },
  { kapasitas: 160, isi: 0 },
];

let sumberIndex = null;

function render() {
  const elems = document.querySelectorAll(".gelas");
  elems.forEach((el) => {
    const idx = parseInt(el.dataset.index);
    const g = gelas[idx];
    const isiDiv = el.querySelector(".isi-air");

    const prop = g.isi / g.kapasitas;
    isiDiv.style.height = prop * 100 + "%";
    el.classList.remove("selected");
    el.onclick = () => handleClick(idx);
  });
}

function handleClick(idx) {
  if (sumberIndex === null) {
    // Pilih sumber
    sumberIndex = idx;
  } else if (sumberIndex === idx) {
    // Klik ulang -> batal pilih
    sumberIndex = null;
  } else {
    // Pindahkan air dari sumber ke tujuan
    const sumber = gelas[sumberIndex];
    const tujuan = gelas[idx];

    const ruangKosong = tujuan.kapasitas - tujuan.isi;
    const jumlahTransfer = Math.min(sumber.isi, ruangKosong);

    sumber.isi -= jumlahTransfer;
    tujuan.isi += jumlahTransfer;

    // Reset pilihan
    sumberIndex = null;
  }

  render();
}

render();

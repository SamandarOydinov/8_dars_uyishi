const ayirish = document.querySelector('.ayirish');
const reset = document.querySelector('.reset');
const qushish = document.querySelector('.qushish');
const natija = document.querySelector('.natija');

let qiymat = Number(localStorage.getItem('qiymat')) || 0;
natija.innerHTML = `${qiymat}`;

ayirish.addEventListener('click', () => {
  if (qiymat > 0) {
    qiymat = qiymat - 1;
    localStorage.setItem('qiymat', qiymat);
    natija.innerHTML = `${qiymat}`;
  }
});

qushish.addEventListener('click', () => {
  qiymat = qiymat + 1;
  localStorage.setItem('qiymat', qiymat);
  natija.innerHTML = `${qiymat}`;
});

reset.addEventListener('click', () => {
  qiymat = 0;
  localStorage.setItem('qiymat', qiymat);
  natija.innerHTML = `${qiymat}`;
});

const cart=[];
const cartEl=document.getElementById('cart');
const cartItems=document.getElementById('cart-items');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));

document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

document.querySelectorAll('.add-cart').forEach(btn=>btn.addEventListener('click',()=>{
  const card=btn.closest('.product');
  const item={name:card.dataset.name,price:Number(card.dataset.price)};
  if(!cart.some(x=>x.name===item.name)) cart.push(item);
  updateCart();
  btn.textContent='Added ✓';
  setTimeout(()=>btn.textContent='Add to enquiry',1400);
}));
function updateCart(){
  cartEl.hidden=cart.length===0;
  cartItems.textContent=cart.length?cart.map(x=>`${x.name} — KSh ${x.price.toLocaleString()}`).join(' · '):'No frames selected';
}
document.getElementById('checkout-btn')?.addEventListener('click',()=>{
  const names=cart.map(x=>x.name).join(', ');
  document.querySelector('#booking textarea').value=`I am interested in: ${names}. Please confirm availability, prescription requirements and final pricing.`;
  document.querySelector('#booking').scrollIntoView({behavior:'smooth'});
});
const date=document.querySelector('input[type="date"]');
if(date){date.min=new Date().toISOString().split('T')[0];}
document.getElementById('booking-form')?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(e.target);
  const status=document.getElementById('form-status');
  status.textContent=`Thank you, ${data.get('name')}. Your appointment request has been received. Our team will contact you to confirm the time.`;
  e.target.reset();
});

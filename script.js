const properties = {
  1:{title:"Willow Creek Residence",address:"Lakeside, Austin, TX",price:"$485,000",image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",specs:["4 Bedrooms","3 Bathrooms","2,450 sqft"],description:"A welcoming contemporary home with generous living spaces, a calm natural palette and room to grow. A portfolio concept listing; details are illustrative."},
  2:{title:"The Meridian Penthouse",address:"Downtown, Miami, FL",price:"$329,000",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",specs:["2 Bedrooms","2 Bathrooms","1,380 sqft"],description:"An elegant apartment concept with a light-filled open plan, refined finishes and a comfortable city lifestyle. Listing details are illustrative."},
  3:{title:"Solstice Palm Villa",address:"Palm Hills, Scottsdale, AZ",price:"$895,000",image:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85",specs:["5 Bedrooms","4 Bathrooms","3,720 sqft"],description:"A modern villa concept designed around indoor-outdoor living, generous entertaining areas and a private poolside setting. Listing details are illustrative."},
  4:{title:"Brookside Garden Townhome",address:"Brookside, Denver, CO",price:"$415,000",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",specs:["3 Bedrooms","2 Bathrooms","1,960 sqft"],description:"A warm and practical townhome concept with a welcoming interior, thoughtful layout and easy everyday comfort. Listing details are illustrative."},
  5:{title:"Maple Lane Family Home",address:"Maple District, Portland, OR",price:"$265,000",image:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",specs:["3 Bedrooms","2 Bathrooms","1,780 sqft"],description:"A charming family home concept with a relaxed atmosphere, balanced proportions and room for everyday moments. Listing details are illustrative."},
  6:{title:"Harbour Point Residence",address:"Harbour Point, San Diego, CA",price:"$610,000",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",specs:["3 Bedrooms","2 Bathrooms","1,890 sqft"],description:"A polished apartment concept with an airy open-plan interior and a contemporary feel. Listing details are illustrative."}
};
const cards=[...document.querySelectorAll(".property-card")];
const grid=document.getElementById("propertyGrid"), empty=document.getElementById("emptyState"), count=document.getElementById("resultCount");
let activeType="all";
function toast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2600)}
function applyFilters(){
 const location=document.getElementById("locationInput").value.trim().toLowerCase();
 const max=document.getElementById("priceFilter").value;
 const type=document.getElementById("typeFilter").value;
 let visible=cards.filter(card=>{
  const matchesType=(activeType==="all"||card.dataset.type===activeType)&&(type==="all"||card.dataset.type===type);
  const matchesLocation=!location||card.dataset.location.toLowerCase().includes(location);
  const matchesPrice=max==="any"||Number(card.dataset.price)<=Number(max);
  return matchesType&&matchesLocation&&matchesPrice;
 });
 const sort=document.getElementById("sortSelect").value;
 if(sort==="low")visible.sort((a,b)=>Number(a.dataset.price)-Number(b.dataset.price));
 if(sort==="high")visible.sort((a,b)=>Number(b.dataset.price)-Number(a.dataset.price));
 cards.forEach(card=>card.hidden=!visible.includes(card));
 visible.forEach(card=>grid.appendChild(card));
 count.textContent=`${visible.length} ${visible.length===1?"property":"exceptional properties"}`;
 empty.hidden=visible.length!==0;
}
document.getElementById("searchForm").addEventListener("submit",e=>{e.preventDefault();applyFilters();document.getElementById("properties").scrollIntoView({behavior:"smooth"})});
document.getElementById("quickFilters").addEventListener("click",e=>{
 const button=e.target.closest("[data-filter]");if(!button)return;
 activeType=button.dataset.filter;
 document.querySelectorAll(".pill").forEach(p=>p.classList.toggle("active",p===button));
 document.getElementById("typeFilter").value="all";applyFilters();
});
document.getElementById("typeFilter").addEventListener("change",applyFilters);
document.getElementById("priceFilter").addEventListener("change",applyFilters);
document.getElementById("sortSelect").addEventListener("change",applyFilters);
document.getElementById("resetFilters").addEventListener("click",()=>{
 document.getElementById("locationInput").value="";document.getElementById("typeFilter").value="all";document.getElementById("priceFilter").value="any";document.getElementById("sortSelect").value="featured";activeType="all";
 document.querySelectorAll(".pill").forEach(p=>p.classList.toggle("active",p.dataset.filter==="all"));applyFilters();
});
document.addEventListener("click",e=>{
 const fav=e.target.closest(".favorite");
 if(fav){const saved=fav.classList.toggle("saved");fav.textContent=saved?"♥":"♡";fav.setAttribute("aria-pressed",String(saved));toast(saved?"Property saved to your favourites":"Removed from favourites");}
 const open=e.target.closest("[data-open]");
 if(open){const p=properties[open.dataset.open];document.getElementById("modalImage").src=p.image;document.getElementById("modalTitle").textContent=p.title;document.getElementById("modalAddress").textContent="⌖ "+p.address;document.getElementById("modalSpecs").innerHTML=p.specs.map(s=>`<span>${s}</span>`).join("");document.getElementById("modalDescription").textContent=p.description;document.getElementById("modalPrice").textContent=p.price;const modal=document.getElementById("propertyModal");modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
 if(e.target.matches("[data-close]"))closeModal();
});
function closeModal(){const modal=document.getElementById("propertyModal");modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
document.getElementById("modalEnquire").addEventListener("click",closeModal);
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();toast("Thanks! This is a demo form — no enquiry was sent.");e.target.reset()});
document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("mainNav"),open=nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>{document.getElementById("mainNav").classList.remove("open");document.getElementById("menuToggle").setAttribute("aria-expanded","false")}));
applyFilters();
// -------------------- VARIABLES --------------------
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const counter = document.getElementById("counter");
const titleEl = document.getElementById("title");
const descEl = document.getElementById("desc");
const dateEl = document.getElementById("date");
const resEl = document.getElementById("res");

let current = 0;
let filteredImages = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let recycleBin = JSON.parse(localStorage.getItem("recycleBin")) || [];
let zoomLevel = 1;
let slideshowInterval = null;

/* ALL IMAGES (5 CATEGORIES) */
const images = [
  // 🌿 Nature
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ_2oII-AssPFNOvcLQ6ecJ6ZWQlUbKU3j8w&s", cat: "nature" },
  { src: "https://i.pinimg.com/736x/d9/de/11/d9de112b2c4aedef6df31d05194adf21.jpg", cat: "nature" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkxM7bqUhVW4EaLOR21oEaV0sj7bb05kCNDg&s", cat: "nature" },
  { src: "https://i.pinimg.com/474x/79/fd/4a/79fd4acf9376131cd21dae524104406d.jpg", cat: "nature" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMSm_tgXeVL4bhugCEnHUFkFgr348maiXwQ&s", cat: "nature" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_e8UJ3uNlJmSrlMRsFGa3P33ixcdxbBECA&s", cat: "nature" },
  { src: "https://profiledp.in/wp-content/uploads/natural-attractive-whatsapp-dp-1.webp", cat: "nature" },
  { src: "https://i.pinimg.com/474x/79/fd/4a/79fd4acf9376131cd21dae524104406d.jpg", cat: "nature" },
{ src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMdSX-Ga81JqGUseFfQyVxvyjJCXuAKOw4LA&s", cat: "nature" },
{ src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVfx5P_wicY-rNgyEn2SdYzACRKOuUrHRQ-A&s", cat: "nature" },
{ src: "https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg?cs=srgb&dl=pexels-pixabay-414102.jpg&fm=jpg", cat: "nature" },
{ src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgMSm_tgXeVL4bhugCEnHUFkFgr348maiXwQ&s", cat: "nature" },
 // 🐦 Birds
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DJ63jS8JCupOsYrgwLdHLohRDv5LUm2C8A&s", cat: "birds" },
  { src: "https://www.shutterstock.com/image-photo/most-beautiful-bird-world-birds-600nw-2383303619.jpg", cat: "birds" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjdr3agxuZY1smNbx6p9T_lpVMNHmTbeQgwQ&s", cat: "birds" },
{ src: "https://cdn.shopify.com/s/files/1/0782/9346/7416/files/European_roller_480x480.png?v=1702633105", cat: "birds" },
{ src: "https://a-z-animals.com/media/2021/10/mute-swan-1024x535.jpg", cat: "birds" },
{ src: "https://i.pinimg.com/236x/72/a2/8d/72a28dad15ce74ff691914cc3ecaad7e.jpg", cat: "birds" },
{ src: "https://www.birdsandblooms.com/wp-content/uploads/2021/02/BNBugc_mike-timmons.jpg?fit=680%2C454", cat: "birds" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZDi7mxKk3XVvhZjb-CvtxSVGLrC5QYaCehg&s", cat: "birds" },
{ src: "https://www.shutterstock.com/image-photo/cute-birds-tree-spring-flowers-600nw-2385892581.jpg", cat: "birds" },
{ src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS8YJVrbxZqaOCccb2nq4PHYY29o8RYOuKDA&s", cat: "birds" },
{ src: "https://images.squarespace-cdn.com/content/v1/556323dee4b006bb6875f975/1601223244851-85RONKQ77FTOFCX3LYOC/tanenger.golden+hooded+PUCCI+Boca+tapada+.jpg", cat: "birds" },
{ src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTij8cbTtKh-VGp9YFEg5jOxyS5MezoS5niUg&s", cat: "birds" },
  // 🐾 Animals
  { src: "https://images.saymedia-content.com/.image/t_share/MTc2MTA3NDM4NzMzMjcyOTY3/top-10-most-beautiful-animals-in-the-world.jpg", cat: "animals" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpDcwsz9OC92--J65XMhb7ytMR5qeUFZM81Q&s", cat: "animals" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIDgaYDt2rOpkuHWwFDHMmU1L93AnfNtSpAA&s", cat: "animals" },
{ src: "https://wallpapers.com/images/hd/most-beautiful-animals-2xgl0eafbjxqtof5.jpg", cat: "animals" },
{ src: "https://mf.b37mrtl.ru/rbthmedia/images/2018.12/original/5c233e7515e9f946f65be43f.jpg", cat: "animals" },
{ src: "https://i0.wp.com/www.discoveringbeautyeverywhere.com/wp-content/uploads/2021/09/deer-1367217_1920-1.jpg?resize=1024%2C683&ssl=1", cat: "animals" },
{ src: "https://www.animalfunfacts.net/images/stories/photos/mammals/carnivores/lion/lion_mane_l.jpg", cat: "animals" },
{ src: "https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500", cat: "animals" },
{ src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZCD-14N-1WIrDI09IjeRZkZePIA7E5HmQCA&s", cat: "animals" },
{ src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYQwbHbE-PZDeu1aV2P3cPh6YHeiCD4dBQyw&s", cat: "animals" },
{ src: "https://miro.medium.com/v2/resize:fit:1400/1*wpoCHS8lx59tmjrLqNwMfg.jpeg", cat: "animals" },
{ src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_oIqkTXbxvzeV8QNcXBD39ob0_fSBfBilg&s", cat: "animals" },
  // 🌸 Flowers
  { src: "https://d3cif2hu95s88v.cloudfront.net/blog/wp-content/uploads/2022/01/03053528/Sunflower.jpg", cat: "flowers" },
  { src: "https://images.unsplash.com/photo-1529874777414-9ee215a115dd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8", cat: "flowers" },
  { src: "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt134818d279038650/6668df6434f6fb5cd48aac34/beautiful-flowers-rose.jpeg?q=70&width=3840&auto=webp", cat: "flowers" },
  { src: "https://hips.hearstapps.com/hmg-prod/images/sacred-lotus-gettyimages-1143403162-646fa5a441f5d.jpg?crop=1xw:0.84375xh;0,0.231xh", cat: "flowers" },
  { src: "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/bltb0fc8c3edd349106/6668df63a62e8d63e6e051b2/beautiful-flowers-dahlia.jpg?q=70&width=3840&auto=webp", cat: "flowers" },
  { src: "https://d3cif2hu95s88v.cloudfront.net/blog/wp-content/uploads/2022/01/03053528/Sunflower.jpg", cat: "flowers" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROcBL263bASsLf2puAuKH9V_HQb94sYM3GSQ&s", cat: "flowers" },
  { src: "https://www.wishbygift.com/wp-content/uploads/2025/06/Peony-683x1024.webp", cat: "flowers" },
{ src: "https://hips.hearstapps.com/hmg-prod/images/dahlia-1508785047.jpg?crop=1.00xw:0.669xh;0,0.0136xh", cat: "flowers" },
{ src: "https://hips.hearstapps.com/hmg-prod/images/close-up-of-tulips-blooming-in-field-royalty-free-image-1584131603.jpg?crop=0.83653xw:1xh;center,top&resize=1200:*", cat: "flowers" },
{ src: "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt5f18c2119ce26485/6668df65db90945e0caf9be6/beautiful-flowers-lotus.jpg?q=70&width=3840&auto=webp", cat: "flowers" },
{ src: "https://www.thespruce.com/thmb/0H60G9gipmeXfXlqijtr8k7Y958=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/thespruce-prettiestflowers-plumeria-57dc49b8d9ab4f8a9fbc1e517e7401ae.jpg", cat: "flowers" },
  // 🚗 Vehicles
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhkwq8v5dOT9WZvk95npCcFMZwFnwc904q_g&s", cat: "vehicles" },
  { src: "https://img.etimg.com/thumb/msid-103326996,width-480,height-360,imgsize-103540,resizemode-75/bullet-350-launched.jpg", cat: "vehicles" },
  { src: "https://i.insider.com/592f4169b74af41b008b5977?width=700", cat: "vehicles" },
{ src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Mahindra_Thar_Photoshoot_At_Perupalem_Beach_%28West_Godavari_District%2CAP%2CIndia_%29_Djdavid.jpg/1200px-Mahindra_Thar_Photoshoot_At_Perupalem_Beach_%28West_Godavari_District%2CAP%2CIndia_%29_Djdavid.jpg", cat: "vehicles" },
{ src: "https://i0.wp.com/www.asphaltandrubber.com/wp-content/uploads/2016/08/2017-Yamaha-FZ-10-static-02.jpg", cat: "vehicles" },
{ src: "https://i.cdn.newsbytesapp.com/hn/images/l149_14111610103833.jpg", cat: "vehicles" },
{ src: "https://png.pngtree.com/thumb_back/fh260/background/20240513/pngtree-moden-black-sports-car-with-blue-smoke-background-image_15729163.jpg", cat: "vehicles" },
{ src: "https://hips.hearstapps.com/hmg-prod/images/lotus-evija-2020-1600-08-1574802427.jpg?crop=1.00xw:0.669xh;0,0.177xh", cat: "vehicles" },
{ src: "https://www.topgear.com/sites/default/files/2021/12/18.%20Koenigsegg%20Jesko.jpeg", cat: "vehicles" },
{ src: "https://static.toiimg.com/photo/80452572.cms", cat: "vehicles" },
{ src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYsSWZGYMyvr2hphYfLuEb_-59ABQH8d0ZbQ&s", cat: "vehicles" },
{ src: "https://c.ndtvimg.com/2022-01/ee9m2m2g_car_625x300_11_January_22.jpg", cat: "vehicles" },
];
// -------------------- RENDER GALLERY --------------------
function render(filter="all") {
  gallery.innerHTML = "";
  if(filter==="favorites") filteredImages = favorites.map(src=>images.find(img=>img.src===src)).filter(Boolean);
  else if(filter==="recycle") filteredImages = recycleBin.map(src=>images.find(img=>img.src===src)).filter(Boolean);
  else filteredImages = filter==="all"? [...images]: images.filter(img=>img.cat===filter);

  filteredImages.forEach((img,index)=>{
    const image = document.createElement("img");
    image.src = img.src;
    image.loading = "lazy";
    image.draggable = true;
    image.onclick = ()=>openLightbox(index);

    // Drag & Drop
    image.addEventListener("dragstart", e=>e.dataTransfer.setData("text/plain", index));
    image.addEventListener("dragover", e=>e.preventDefault());
    image.addEventListener("drop", e=>{
      e.preventDefault();
      const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
      const toIndex = index;
      [filteredImages[fromIndex], filteredImages[toIndex]] = [filteredImages[toIndex], filteredImages[fromIndex]];
      render(filter);
    });

    gallery.appendChild(image);
  });
}

// -------------------- LIGHTBOX --------------------
function openLightbox(index) {
  current=index; zoomLevel=1;
  lightbox.style.display="flex";
  updateLightbox();
}

function updateLightbox() {
  const img = filteredImages[current];
  lightboxImg.src = img.src;
  lightboxImg.style.transform = `scale(${zoomLevel})`;
  counter.textContent = `${current + 1} / ${filteredImages.length}`;

  // Only show metadata if exists
  titleEl.textContent = img.title ? "Title: " + img.title : "";
  descEl.textContent = img.desc ? "Description: " + img.desc : "";
  dateEl.textContent = img.date ? "Date: " + img.date : "";
  resEl.textContent = img.res ? "Resolution: " + img.res : "";
}

// -------------------- LIGHTBOX CONTROLS --------------------
document.querySelector(".close").onclick = ()=>lightbox.style.display="none";
document.querySelector(".next").onclick = ()=>{ current=(current+1)%filteredImages.length; zoomLevel=1; updateLightbox();}
document.querySelector(".prev").onclick = ()=>{ current=(current-1+filteredImages.length)%filteredImages.length; zoomLevel=1; updateLightbox();}
document.getElementById("zoomIn").onclick = ()=>{ zoomLevel+=0.2; updateLightbox();}
document.getElementById("zoomOut").onclick = ()=>{ zoomLevel=Math.max(0.2, zoomLevel-0.2); updateLightbox();}
document.getElementById("addFav").onclick = ()=>{
  const src=filteredImages[current].src;
  if(!favorites.includes(src)) favorites.push(src);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("Added to favorites!");
}
document.getElementById("downloadImg").onclick = ()=>{
  const a=document.createElement("a"); a.href=filteredImages[current].src; a.download="image.jpg"; a.click();
}
document.getElementById("deleteImg").onclick = ()=>{
  if(confirm("Delete this image?")) {
    const src=filteredImages[current].src;
    recycleBin.push(src);
    localStorage.setItem("recycleBin", JSON.stringify(recycleBin));
    favorites=favorites.filter(f=>f!==src); localStorage.setItem("favorites", JSON.stringify(favorites));
    render(document.querySelector(".filters .active").dataset.filter);
    lightbox.style.display="none";
  }
}
document.getElementById("fullscreenBtn").onclick = ()=>{
  if(!document.fullscreenElement) lightbox.requestFullscreen();
  else document.exitFullscreen();
}

// -------------------- SLIDESHOW --------------------
document.getElementById("slideshowBtn").onclick = ()=>{
  if(slideshowInterval) { clearInterval(slideshowInterval); slideshowInterval=null; }
  else slideshowInterval=setInterval(()=>{ document.querySelector(".next").click(); },2000);
}

// -------------------- FILTERS --------------------
document.querySelectorAll(".filters button").forEach(btn=>{
  btn.onclick = ()=>{
    document.querySelector(".filters .active").classList.remove("active");
    btn.classList.add("active");
    render(btn.dataset.filter);
  }
});

// -------------------- THEME & DARK MODE --------------------
document.getElementById("darkToggle").onclick = ()=>document.body.classList.toggle("dark");
document.getElementById("themeSelect").onchange = e=>{
  document.body.classList.remove("theme-blue","theme-green"); 
  if(e.target.value!=="default") document.body.classList.add("theme-"+e.target.value);
}

// -------------------- KEYBOARD NAVIGATION --------------------
document.addEventListener("keydown", e=>{
  if(lightbox.style.display==="flex"){
    if(e.key==="ArrowRight") document.querySelector(".next").click();
    if(e.key==="ArrowLeft") document.querySelector(".prev").click();
    if(e.key==="+") document.getElementById("zoomIn").click();
    if(e.key==="-") document.getElementById("zoomOut").click();
    if(e.key==="f"||e.key==="F") document.getElementById("addFav").click();
    if(e.key==="Delete") document.getElementById("deleteImg").click();
  }
});

// -------------------- DOUBLE CLICK ZOOM --------------------
lightboxImg.ondblclick = ()=>{ zoomLevel=zoomLevel===1?2:1; updateLightbox(); }

// -------------------- INITIAL RENDER --------------------
render();
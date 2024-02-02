function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
window.sr = ScrollReveal({ reset: true});
sr.reveal('.logo', {duration: 1000});
sr.reveal('.hdr', {duration: 1000});
sr.reveal('.hamburger-menu', {duration: 1000});
sr.reveal('.section__pic-container', {duration: 1000});
sr.reveal('.section__text', {duration: 1000});
sr.reveal('.section__text__p1', {duration: 1000});
sr.reveal('.title', {duration: 1000});
sr.reveal('.section-container', {duration: 1000});
sr.reveal('.experience-details-container', {duration: 1000});
sr.reveal('.contact-info-upper-container', {duration: 1000});
sr.reveal('.nav-links-container', {duration: 1000});
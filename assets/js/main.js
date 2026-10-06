/* Shared helpers used across every public page. */

function showToast(msg){
  let el = document.getElementById("shared-toast");
  if(!el){
    el = document.createElement("div");
    el.id = "shared-toast";
    el.className = "toast-plate";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  requestAnimationFrame(()=> el.classList.add("show"));
  clearTimeout(el._t);
  el._t = setTimeout(()=> el.classList.remove("show"), 2800);
}

const SOCIAL_ICONS = {
  linkedin: "fa-brands fa-linkedin",
  instagram: "fa-brands fa-instagram",
  facebook: "fa-brands fa-facebook",
  whatsapp: "fa-brands fa-whatsapp"
};

/* A link added in the admin panel can carry its own glyph; fall back to the
   built-in map, then to a generic link icon for anything unrecognised. */
function socialIconFor(data, key){
  return (data.profile.socialIcons && data.profile.socialIcons[key])
    || SOCIAL_ICONS[key]
    || "fa-solid fa-link";
}

/* Fills the header + footer (present on every public page) with live
   profile, location and site-text data so the whole site updates the
   moment the admin saves. */
function applyFooter(data){
  const nameEl = document.getElementById("footer-practice-name");
  if(nameEl) nameEl.textContent = data.profile.name;

  const emailEl = document.getElementById("footer-email");
  if(emailEl){ emailEl.textContent = data.location.email; emailEl.href = "mailto:" + data.location.email; }

  const phoneEl = document.getElementById("footer-phone");
  if(phoneEl){ phoneEl.textContent = data.location.phone; }

  const socialsWrap = document.getElementById("footer-socials");
  if(socialsWrap){
    socialsWrap.innerHTML = Object.entries(data.profile.socials).map(([key,url])=>{
      const icon = socialIconFor(data, key);
      return `<a href="${escapeAttr(url)}" target="_blank" rel="noopener" aria-label="${key}"><i class="${icon}"></i></a>`;
    }).join("");
  }

  const brandTaglineEl = document.getElementById("brand-tagline");
  if(brandTaglineEl) brandTaglineEl.textContent = data.siteText.brandTagline;

  const footerTaglineEl = document.getElementById("footer-tagline");
  if(footerTaglineEl) footerTaglineEl.textContent = data.siteText.footerTagline;

  const copyrightEl = document.getElementById("footer-copyright-line");
  if(copyrightEl){
    const year = new Date().getFullYear();
    copyrightEl.textContent = `© ${year} ${data.profile.name}. ${data.siteText.copyrightNote}`;
  }
}

/* Sets the browser tab title from the editable siteText.pageTitles map.
   pageKey matches body[data-page], e.g. "home", "portfolio", etc. */
function applyPageTitle(data, pageKey){
  const title = data.siteText?.pageTitles?.[pageKey];
  if(title) document.title = title;
}

/* Fills the intro block (eyebrow / heading / subtext) that the inner pages
   share, from the editable siteText.pageIntros map. Only fields the page
   actually offers in the admin panel are touched — the rest keep the markup
   they ship with — and anything saved empty is hidden rather than left as a
   blank gap. */
function applyPageIntro(data, pageKey){
  const intro = data.siteText?.pageIntros?.[pageKey] || {};
  [["intro-eyebrow","eyebrow"], ["intro-heading","heading"], ["intro-subtext","subtext"]].forEach(([id, field]) => {
    const el = document.getElementById(id);
    if(!el || !(field in intro)) return;
    const value = intro[field] || "";
    el.textContent = value;
    el.style.display = value ? "" : "none";
  });
}

/* Live link from the admin panel to the public site: the moment content is
   saved — in this tab or another one — reload so the nav, body and footer all
   come back in step. The admin page is excluded; it re-renders in place. */
document.addEventListener("DOMContentLoaded", () => {
  if(document.body.dataset.page === "admin") return;
  let reloading = false;
  Store.onChange(() => {
    if(reloading) return;
    reloading = true;
    location.reload();
  });
});

/* Pages restored from the back/forward cache keep the content they were
   rendered with — re-read the store so edits made in between show up. */
window.addEventListener("pageshow", e => {
  if(e.persisted && document.body.dataset.page !== "admin") location.reload();
});

/* Fills the profile chip + hero slider shown on the Home page hero, and the
   compact profile mention used in the header brand line on inner pages. */
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[s]));
}
function escapeAttr(str){ return escapeHtml(str); }

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("footer-year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();
});

/* Renders a crossfading background slideshow into the element with id
   elId (see .page-bg-slider in style.css). Re-callable — clears any
   previous timer on the element before rebuilding. */
function renderPageBgSlider(elId, images){
  const el = document.getElementById(elId);
  if(!el) return;
  clearInterval(el._bgTimer);
  const list = (images || []).filter(Boolean);
  if(!list.length){ el.innerHTML = ""; return; }
  el.innerHTML = list.map((img, i) =>
    `<div class="page-bg-slide" style="opacity:${i===0?1:0};background-image:url('${img}')" data-i="${i}"></div>`
  ).join("");
  if(list.length > 1){
    let idx = 0;
    el._bgTimer = setInterval(() => {
      idx = (idx+1) % list.length;
      el.querySelectorAll(".page-bg-slide").forEach(s => s.style.opacity = (+s.dataset.i === idx) ? 1 : 0);
    }, 5000);
  }
}

/* Background images for a category: admin-uploaded categoryBackgrounds
   take priority, falling back to that category's project photos. With no
   `cat`, returns one representative image per category (overview state). */
function flattenCategoryBackgrounds(data, cat){
  if(cat){
    const custom = data.categoryBackgrounds && data.categoryBackgrounds[cat];
    if(custom && custom.length) return custom;
    return data.projects.filter(p => p.category === cat).flatMap(p => p.images);
  }
  return (data.categories || []).map(c => {
    const custom = data.categoryBackgrounds && data.categoryBackgrounds[c];
    if(custom && custom.length) return custom[0];
    const proj = data.projects.find(p => p.category === c);
    return proj ? proj.images[0] : null;
  }).filter(Boolean);
}

const CATEGORY_PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80";

/* Cover photo for a typology card on Home and Portfolio. Uses the same
   priority as the page backgrounds — admin-uploaded category image first,
   then that category's first project photo — so a background uploaded in the
   admin panel shows up on both pages instead of only behind the hero. */
function categoryCoverImage(data, cat){
  return flattenCategoryBackgrounds(data, cat)[0] || CATEGORY_PLACEHOLDER_IMAGE;
}

// ========== PANIER ==========
let panier = JSON.parse(localStorage.getItem('frostwave-panier')) || [];

function majCompteurPanier() {
  const compteur = document.getElementById('cart-count');
  if (compteur) {
    compteur.textContent = panier.length;
  }
}

function ajouterAuPanier(nom, prix, type) {
  panier.push({ nom, prix, type });
  localStorage.setItem('frostwave-panier', JSON.stringify(panier));
  majCompteurPanier();
  alert(`✅ "${nom}" ajouté au panier !`);
}

function supprimerDuPanier(index) {
  panier.splice(index, 1);
  localStorage.setItem('frostwave-panier', JSON.stringify(panier));
  afficherPanier();
  majCompteurPanier();
}

function viderPanier() {
  panier = [];
  localStorage.setItem('frostwave-panier', JSON.stringify(panier));
  afficherPanier();
  majCompteurPanier();
}

function contacterPourAcheter() {
  if (panier.length === 0) return;

  let resume = panier.map(item => `- ${item.nom} : ${item.prix} €`).join('\n');
  let total = panier.reduce((sum, item) => sum + item.prix, 0);
  resume += `\n\nTotal : ${total} €`;

  const sujet = encodeURIComponent('Commande FrostWave');
  const corps = encodeURIComponent(
    `Bonjour FrostWave,\n\nJe souhaite acheter :\n\n${resume}\n\nMerci de me confirmer les modalités de paiement.\n\nCordialement`
  );

  window.location.href = `mailto:frostwave.wav@gmail.com?subject=${sujet}&body=${corps}`;
}

function afficherPanier() {
  const container = document.getElementById('panier-container');
  if (!container) return;

  if (panier.length === 0) {
    container.innerHTML = '<p class="panier-vide">Ton panier est vide 🛒</p>';
    return;
  }

  let total = 0;
  let html = '';

  panier.forEach((item, index) => {
    total += item.prix;
    html += `
      <div class="panier-item">
        <span class="panier-nom">${item.nom}</span>
        <span class="panier-type">${item.type}</span>
        <span class="panier-prix">${item.prix} €</span>
        <button onclick="supprimerDuPanier(${index})" class="btn-suppr">✕</button>
      </div>
    `;
  });

  html += `
    <div class="panier-total">
      <strong>Total : ${total} €</strong>
    </div>
    <button onclick="viderPanier()" class="btn-secondaire" style="margin-top:15px">🗑️ Vider le panier</button>
    <div style="margin-top:30px; text-align:center;">
      <p style="opacity:0.7; margin-bottom:20px;">
        Clique ci-dessous pour m'envoyer ta commande par mail.<br/>
        Je te réponds avec les instructions de paiement.
      </p>
      <button onclick="contacterPourAcheter()" class="btn-principal">📩 Envoyer ma commande</button>
    </div>
  `;

  container.innerHTML = html;
}

majCompteurPanier();
afficherPanier();


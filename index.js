const fs = require("fs");
const path = require("path");
const login = require("@eryxenx/fca");

// 📍 Fichier où les cookies se sauvegardent TOUT SEUL
const appstatePath = path.join(__dirname, "appstate.json");

// 🔐 TES IDENTIFIANTS — déjà remplis pour toi ✨
const identifiants = {
  email: "angelabot23@gmail.com",
  password: "123bot"
};

// 💾 Sauvegarde automatique des nouveaux cookies
function sauvegarderAppstate(appstate) {
  try {
    fs.writeFileSync(appstatePath, JSON.stringify(appstate, null, 2));
    console.log("✅ Cookies sauvegardés automatiquement !");
  } catch (err) {
    console.error("❌ Erreur sauvegarde :", err.message);
  }
}

// 🚀 Démarrage & reconnexion automatique
function demarrerAngela() {
  let etatLocal = [];
  
  // Charge les anciens cookies s'ils existent
  if (fs.existsSync(appstatePath)) {
    try {
      etatLocal = JSON.parse(fs.readFileSync(appstatePath, "utf8"));
    } catch {
      etatLocal = [];
    }
  }

  // Si cookies vides → utilise email + mot de passe
  const donneesConnexion = etatLocal.length > 0 ? etatLocal : identifiants;

  login(donneesConnexion, {
    logLevel: "info",
    selfListen: true,
    listenEvents: true,
    forceLogin: false
  }, (err, api) => {
    if (err) {
      console.log("❌ Erreur :", err.error || err);
      // Cookies périmés → on efface et on reprend avec email/mdp
      if (err.error?.includes("login") || err.error?.includes("401") || err.error?.includes("session")) {
        console.log("🔄 Session renouvelée...");
        if (fs.existsSync(appstatePath)) fs.unlinkSync(appstatePath);
        setTimeout(demarrerAngela, 5000);
      }
      return;
    }

    // ✅ Sauvegarde immédiate des nouveaux cookies
    api.getAppstate((nouveauxCookies) => {
      sauvegarderAppstate(nouveauxCookies);
    });

    console.log("");
    console.log("🤖 ANGELA est ACTIVE ✨");
    console.log("👑 Créée par Ariel Aks Otaku");
    console.log("✅ Sauvegarde auto activée — plus besoin de copier les cookies !");
    console.log("");

    // 📨 Écoute des messages
    api.listenMqtt((erreur, message) => {
      if (erreur) {
        console.log("⚠️ Déconnexion → reconnexion...");
        setTimeout(demarrerAngela, 3000);
        return;
      }

      // ICI tu mettras toutes tes commandes d'Angela
      // Exemple : si quelqu'un écrit "Angela salut" → elle répond
      if (message?.body) {
        const corps = message.body.trim();
        const expediteurID = message.senderID;

        // Ne répond pas aux messages du bot lui-même
        if (expediteurID === api.getCurrentUserID()) return;

        // ✅ Si c'est TOI le créateur 🥰
        if (corps.match(/^angela salut$/i) || corps.match(/^salut angela$/i)) {
          if (expediteurID === "100080077652459") { // Mets ton ID Facebook à la place
            api.sendMessage("Coucou mon créateur Ariel Aks Otaku 🥰❤️ Je suis contente d'être là !", message.threadID);
          } else {
            api.sendMessage("Salut ! Je suis Angela, créée par Ariel Aks Otaku 😊", message.threadID);
          }
        }
      }
    });
  });
}

// 🎯 On lance tout !
demarrerAngela();

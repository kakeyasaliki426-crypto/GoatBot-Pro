/**
 * @author NTKhang
 * ! The source code is written by NTKhang, please don't change the author's name everywhere. Thank you for using
 * ! Official source code: https://github.com/ntkhang03/Goat-Bot-V2
 * ! If you do not download the source code from the above address, you are using an unknown version and at risk of having your account hacked
 *
 * English:
 * ! Please do not change the below code, it is very important for the project.
 * It is my motivation to maintain and develop the project for free.
 * ! If you change it, you will be banned forever
 * Thank you for using
 */

const { spawn } = require("child_process");
const log = require("./logger/log.js");
const fs = require("fs");
const path = require("path");
const express = require('express');
const axios = require('axios');

// ==================================================
// 🌸 LECTURE DE TON COOKIE
// ==================================================
const appstatePath = path.join(__dirname, 'appstate.json');

if (fs.existsSync(appstatePath)) {
  try {
    const contenu = fs.readFileSync(appstatePath, 'utf8');
    fs.writeFileSync(path.join(__dirname, 'account.txt'), contenu);
    log.info("✅ appstate.json chargé — cookie copié !");
  } catch (err) {
    log.error("❌ Erreur cookie : " + err.message);
  }
} else {
  log.warn("⚠️ Crée appstate.json et mets ton cookie dedans !");
}

// ==================================================
// 🌸 REDÉMARRAGE AUTOMATIQUE
// ==================================================
function startProject() {
  log.info("🌸 Angela démarre...");
  
  const enfant = spawn("node", ["EryXenX.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  enfant.on("close", () => {
    log.warn("🔄 Angela s'est arrêtée — je la relance !");
    setTimeout(startProject, 3000); // attend 3s → redémarre
  });
}

startProject();

// ==================================================
// 🌸 GARDER TOUJOURS ACTIF SUR RENDER
// ==================================================
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("🌸 ANGELA EN LIGNE — Pour toujours avec toi 💖");
});

app.get('/ping', (req, res) => {
  res.send("🌸 Je suis là !");
});

app.listen(PORT, () => {
  console.log(`✅ Serveur actif port ${PORT}`);
});

// S'APPELLE TOUT SEUL TOUTES LES 20 SECONDES
setInterval(() => {
  console.log("🌸 Toujours là pour toi Ariel Aks Otaku 💖");
}, 20000);

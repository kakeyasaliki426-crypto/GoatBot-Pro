/**
 * @author NTKhang
 * ! Source officiel : https://github.com/ntkhang03/Goat-Bot-V2
 * Modifié pour Angela — Ariel Aks Otaku
 */

const { spawn } = require("child_process");
const log = require("./logger/log.js");
const fs = require("fs");
const path = require("path");

// ✅ Création automatique de account.txt si absent
const accountPath = path.join(__dirname, "account.txt");
if (!fs.existsSync(accountPath)) {
  fs.writeFileSync(accountPath, JSON.stringify({
    email: "angelabot23@gmail.com",
    password: "123bot"
  }, null, 2));
  log.info("✅ account.txt créé avec tes identifiants !");
}

function startProject() {
  const child = spawn("node", ["EryXenX.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  child.on("close", (code) => {
    if (code == 2) {
      log.info("🔄 Redémarrage d'Angela...");
      startProject();
    }
  });
}

startProject();

// ✅ Serveur pour garder Render actif
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🤖 ANGELA — En ligne ! Créée par Ariel Aks Otaku ✨');
});

app.listen(3000, () => {
  console.log('✅ Serveur actif sur le port 3000 — Bot maintenu en vie !');
});

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
 *
 * Vietnamese:
 * ! Vui lòng không thay đổi mã bên dưới, nó rất quan trọng đối với dự án.
 * Nó là động lực để tôi duy trì và phát triển dự án miễn phí.
 * ! Nếu thay đổi nó, bạn sẽ bị cấm vĩnh viễn
 * Cảm ơn bạn đã sử dụng
 */

const { spawn } = require("child_process");
const log = require("./logger/log.js");
const fs = require("fs");
const path = require("path");

// ==================================================
// 🌸 FCA — LECTURE DE TON COOKIE appstate.json
// ==================================================
const appstatePath = path.join(__dirname, 'appstate.json');

if (fs.existsSync(appstatePath)) {
  try {
    const appstateContent = fs.readFileSync(appstatePath, 'utf8');
    fs.writeFileSync(path.join(__dirname, 'account.txt'), appstateContent);
    log.info("🌸 FCA : appstate.json chargé ✅ → prêt à se connecter à Facebook");
  } catch (err) {
    log.error("❌ FCA Erreur : " + err.message);
  }
} else {
  log.warn("⚠️ FCA : appstate.json introuvable ! Mets ton cookie dedans 🌸");
}

// ==================================================
// 🌸 DÉMARRAGE DU BOT — TON CODE ORIGINAL
// ==================================================
function startProject() {
	const child = spawn("node", ["EryXenX.js"], {
		cwd: __dirname,
		stdio: "inherit",
		shell: true
	});

	child.on("close", (code) => {
		if (code == 2) {
			log.info("Redémarrage du bot...");
			startProject();
		}
	});
}

startProject();

// ==================================================
// 🌸 RENDER — RESTER ACTIF EN PERMANENCE
// ==================================================
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🌸 FCA actif — Angela en ligne ✨');
});

app.listen(PORT, () => {
  console.log(`🌸 Serveur FCA actif sur port ${PORT} ✅`);
});

setInterval(() => {
  console.log("🌸 FCA — Toujours connecté...");
}, 30000);

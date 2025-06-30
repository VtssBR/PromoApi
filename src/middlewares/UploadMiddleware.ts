import multer from "multer";
import path from "path";
import fs from "fs";

// Caminho absoluto para a pasta 'uploads'
const uploadDir = path.join(__dirname, "../uploads");

// Garante que a pasta exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Apenas arquivos JPEG, PNG e WEBP são permitidos!"));
    }
    cb(null, true);
  }
});

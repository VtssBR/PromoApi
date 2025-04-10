import fs from 'fs';
import { promisify } from 'util';
import { cloudinary } from '../utils/cloudinary';
import { moderateImage } from '../utils/imageModeration';

const unlinkAsync = promisify(fs.unlink);

export class ImageUploadService {
  static async processImage(filePath: string): Promise<{ imageUrl: string; publicId: string }> {
    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      throw new Error('Arquivo não encontrado.');
    }

    // Moderação de conteúdo
    const isSafe = await moderateImage(filePath);
    if (!isSafe) {
      await unlinkAsync(filePath); // Remove o arquivo local
      throw new Error('Conteúdo impróprio detectado na imagem.');
    }

    // Upload para o Cloudinary
    const result = await cloudinary.uploader.upload(filePath);
    await unlinkAsync(filePath); // Remove o arquivo local após o upload

    return { imageUrl: result.secure_url, publicId: result.public_id };
  }
}

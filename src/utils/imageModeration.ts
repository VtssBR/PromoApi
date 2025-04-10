import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { config } from 'dotenv';
config();

const SIGHTENGINE_API_USER = process.env.SIGHTENGINE_API_USER;
const SIGHTENGINE_API_SECRET = process.env.SIGHTENGINE_API_SECRET;

export async function moderateImage(filePath: string): Promise<boolean> {
  const form = new FormData();
  form.append('media', fs.createReadStream(filePath));
  form.append(
    'models',
    'nudity-2.1,weapon,recreational_drug,medical,offensive-2.0,scam,text-content,gore-2.0,text,qr-content,violence,self-harm'
  );
  form.append('api_user', SIGHTENGINE_API_USER);
  form.append('api_secret', SIGHTENGINE_API_SECRET);

  try {
    const response = await axios.post('https://api.sightengine.com/1.0/check.json', form, {
      headers: form.getHeaders(),
    });

    const { nudity, weapon, recreational_drug: drugs, medical, offensive, scam, gore, violence, self_harm } = response.data;

    const nudityScore = 1 - nudity.none;
    const weaponProb = weapon?.classes?.firearm ?? 0;
    const drugsProb = drugs?.prob ?? 0;
    const medicalProb = medical?.prob ?? 0;
    const scamProb = response.data.scam?.prob ?? 0;
    const goreProb = gore?.prob ?? 0;
    const violenceProb = violence?.prob ?? 0;
    const selfHarmProb = self_harm?.prob ?? 0;

    const isSafe =
      nudityScore <= 0.15 &&
      weaponProb <= 0.2 &&
      drugsProb <= 0.2 &&
      medicalProb <= 0.2 &&
      scamProb <= 0.2 &&
      goreProb <= 0.2 &&
      violenceProb <= 0.2 &&
      selfHarmProb <= 0.2;


    return isSafe;
  } catch (error) {
    console.error('Erro na moderação de imagem:', error);
    return false;
  }
}

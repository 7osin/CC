import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'الطريقة غير مسموحة' });
  }

  const { blog, video } = req.body;
  const filePath = path.join(process.cwd(), 'api', 'db.json');

  const newData = JSON.stringify({ blog, video }, null, 2);
  await fs.writeFile(filePath, newData);

  res.status(200).json({ message: 'تم التحديث بنجاح' });
}

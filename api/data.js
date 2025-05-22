import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'api', 'db.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  res.status(200).json(data);
}

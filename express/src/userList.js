import fs from 'fs';
export const dataPath = './data/data.json'
export function getUserList() {
  return JSON.parse(fs.readFileSync(dataPath, { encoding: 'utf-8' }))
}


import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function saveSpec(content: string): Promise<string> {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const id = crypto.randomBytes(4).toString('hex');
    const filePath = path.join(DATA_DIR, `${id}.yaml`);
    await fs.writeFile(filePath, content, 'utf-8');
    return id;
}

export async function getSpec(id: string): Promise<string | null> {
    const filePath = path.join(DATA_DIR, `${id}.yaml`);
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        return null;
    }
}

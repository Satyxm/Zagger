import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { kv } from '@vercel/kv';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function saveSpec(content: string): Promise<string> {
    const id = crypto.randomBytes(4).toString('hex');

    // Check if we are in production
    const isProduction = process.env.NODE_ENV === 'production';

    // Use Vercel KV if configured
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        await kv.set(`spec:${id}`, content);
        // Set expiration to 30 days
        await kv.expire(`spec:${id}`, 60 * 60 * 24 * 30);
    } else {
        // If in production but KV is not configured, throw an error
        if (isProduction) {
            throw new Error('Vercel KV is not configured. Please link a KV database in your Vercel project settings.');
        }

        // Fallback to filesystem (Local Development only)
        await fs.mkdir(DATA_DIR, { recursive: true });
        const filePath = path.join(DATA_DIR, `${id}.yaml`);
        await fs.writeFile(filePath, content, 'utf-8');
    }

    return id;
}

export async function getSpec(id: string): Promise<string | null> {
    // Try Vercel KV first if configured
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        const content = await kv.get<string>(`spec:${id}`);
        return content;
    }

    // Fallback to filesystem
    const filePath = path.join(DATA_DIR, `${id}.yaml`);
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        return null;
    }
}

// vite-plugin-log-start.js

import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';

export default function vitePluginLogStart(options = {}) {
    const {
        filePath = path.resolve(process.cwd(), './dev-start-log.json'),
        includeUser = false,
    } = options;

    const getUserName = () => {
        return includeUser ? process.env.USER || process.env.USERNAME || 'Unknown User' : null;
    };

    // Log yozish funksiyasi
    const writeLog = () => {
        const logEntry = {
            timestamp: dayjs().format(),
        };

        if (includeUser) {
            logEntry.user = getUserName();
        }

        let logs = [];

        if (fs.existsSync(filePath)) {
            try {
                const data = fs.readFileSync(filePath, 'utf-8');
                logs = JSON.parse(data);
                if (!Array.isArray(logs)) {
                    logs = [];
                }
            } catch (error) {
                console.error('Log faylini o\'qishda xato:', error);
                logs = [];
            }
        }

        // Yangi yozuvni qo'shish
        logs.push(logEntry);

        // Faylga yozish
        try {
            fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), 'utf-8');
            console.log(`\n✅ Dev server is running and log write file: ${filePath}`);
        } catch (error) {
            console.error('Error for your data write:', error);
        }
    };

    return {
        name: 'vite-plugin-log-start',

        configureServer(server) {
            server.httpServer?.once('listening', () => {
                writeLog();
            });
        },
    };
}

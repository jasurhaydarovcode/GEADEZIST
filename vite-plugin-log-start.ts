import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import { ViteDevServer } from 'vite';

interface PluginOptions {
    filePath?: string;
    includeUser?: boolean;
}

interface LogEntry {
    timestamp: string;
    user?: string | null;
}

export default function vitePluginLogStart(options: PluginOptions = {}) {
    const {
        filePath = path.resolve(process.cwd(), './dev-start-log.json'),
        includeUser = false,
    } = options;

    const getUserName = (): string | null => {
        return includeUser ? process.env.USER || process.env.USERNAME || 'Unknown User' : null;
    };

    const writeLog = (): void => {
        const logEntry: LogEntry = {
            timestamp: dayjs().format(),
        };

        if (includeUser) {
            logEntry.user = getUserName();
        }

        let logs: LogEntry[] = [];

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

        logs.push(logEntry);

        try {
            fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), 'utf-8');
            console.log(`\n✅ Dev server is running and log write file: ${filePath}`);
        } catch (error) {
            console.error('Error for your data write:', error);
        }
    };

    return {
        name: 'vite-plugin-log-start',

        configureServer(server: ViteDevServer) {
            server.httpServer?.once('listening', () => {
                writeLog();
            });
        },
    };
}

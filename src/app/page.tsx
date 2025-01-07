'use client';

import {
    AiChat,
    useAiChatApi,
    useAsStreamAdapter,
    StreamingAdapterObserver,
} from '@nlux/react';
import '@nlux/themes/nova.css';
import { useCallback, useState } from 'react';



export default function Chat() {
    const [ threadId, setThreadId ] = useState<string | null>(null);

    const streamText = useCallback(async (prompt: string, observer: StreamingAdapterObserver) => {
        try {
            const response = await fetch('/api/assistant', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream',
                },
                body: JSON.stringify({ 
                    message: prompt,
                    threadId: threadId
                }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            if (!response.body) throw new Error('Response body is null');

            // Only set threadId if it hasn't been set yet
            if (!threadId) {
                const responseThreadId = response.headers.get('X-Thread-ID');
                if (responseThreadId) {
                    setThreadId(responseThreadId);
                }
            }

            const reader = response.body.getReader();
            const textDecoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const content = textDecoder.decode(value, { stream: true });
                if (content) observer.next(content);
            }

            observer.complete();
        } catch (error) {
            observer.error(error instanceof Error ? error : new Error('Unknown error occurred'));
        }
    }, [ threadId ]);

    const api = useAiChatApi();
    const adapter = useAsStreamAdapter(streamText, [ threadId ]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm lg:flex">
                <AiChat api={api} adapter={adapter} />
            </div>
        </main>
    );
}
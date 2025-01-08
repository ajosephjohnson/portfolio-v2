'use client';

import { useCallback, useState } from 'react';
import {
    AiChat,
    useAiChatApi,
    useAsStreamAdapter,
    StreamingAdapterObserver,
} from '@nlux/react';
import '@nlux/themes/nova.css';



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
                if (done) {
                    const lastChunk = textDecoder.decode();
                    if (lastChunk) {
                        observer.next(lastChunk);
                    }
                    break;
                }
                const content = textDecoder.decode(value, { stream: true });
                if (content) {
                    observer.next(content);
                }
            }

            observer.complete();
        } catch (error) {
            observer.error(error instanceof Error ? error : new Error('Unknown error occurred'));
        }
    }, [ threadId ]);

    const api = useAiChatApi();
    const adapter = useAsStreamAdapter(streamText, [ threadId ]);

    return (
        <main className="md:min-h-screen max-w-screen-lg m-auto flex flex-col items-center px-5 py-6 sm:px-10 md:pl-30 md:px-20 md:py-10 xl:pl-20">
            <div className="text-center mb-6 md:mb-10">
                <h1 className="text-3xl font-bold">Alan Johnson</h1>
                <h2 className="text-2xl">AMA (Ask Me Anything)</h2>
            </div>
            <p className="text-center mb-6 md:mb-10 max-w-2xl">{`
                Hi! 👋 I'm a full-stack software developer and technical strategist with expertise in building scalable web applications,
                automating workflows, and optimizing performance, accessibility, and SEO to deliver data-driven business results.
            `}</p>
            <div className="w-full text-center">
                <AiChat
                    api={api}
                    adapter={adapter}
                    personaOptions={{
                        assistant: {
                            name: '',
                            avatar: '/images/alan_botson.jpeg',
                            tagline: 'This assistant knows a lot about me. Ask me anything about my software development career below!',
                        },
                    }}
                    composerOptions={{
                        autoFocus: true,
                    }}
                    conversationOptions={{
                        conversationStarters: [
                            {
                                prompt: 'What kinds of teams have you worked with?'
                            },
                            {
                                prompt: 'Where can I see your work?'
                            },
                            {
                                prompt: 'How many years of experience do you have?'
                            }
                        ]
                    }}
                    displayOptions={{
                        colorScheme: 'auto'
                    }}
                />
            </div>
        </main>
    );
}
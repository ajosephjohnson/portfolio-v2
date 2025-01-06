import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? (() => {
        throw new Error('OPENAI_API_KEY is not set')
    })()
});

export async function POST(req: Request) {
    // Parse the request body
    const input: {
        threadId: string | null;
        message: string;
    } = await req.json();

    try {
        // Create a thread if needed
        const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

        // Add a message to the thread
        await openai.beta.threads.messages.create(threadId, {
            role: 'user',
            content: input.message,
        });

        // Create and stream the run
        const stream = openai.beta.threads.runs.stream(threadId, {
            assistant_id: process.env.ASSISTANT_ID ?? (() => {
                throw new Error('ASSISTANT_ID is not set');
            })(),
        });

        // Transform the stream into a ReadableStream
        const textStream = new ReadableStream({
            async start(controller) {
                stream.on('textDelta', (delta) => {
                    // Send each text chunk to the client
                    if (delta.value) {
                        controller.enqueue(new TextEncoder().encode(delta.value));
                    }
                });
                stream.on('end', () => controller.close());
                stream.on('error', (error) => controller.error(error));
            },
        });

        // Add headers to include threadId in response
        const headers = {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-Thread-ID': threadId
        };

        // Return the streaming response with proper headers
        return new Response(textStream, { headers });

    } catch (error) {
        console.error('Error:', error);
        return new Response('Error processing request', { status: 500 });
    }
}
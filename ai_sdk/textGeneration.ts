

/* generateText()

    generateText() is a server-side function from the AI SDK 
    that generate a complete text response from an LLM in a single request.

*/


import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  try {

    const { prompt } = await req.json();

    const result = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: prompt,
    });

    return Response.json({ text: result?.text });

  } catch (error) {
    return Response.json({ error: "failed to generate text" }, { status: 500 });
  }
};

/* 
    We usually consume it using standard React state management with fetch, useState, in Next.js.
    There is no dedicated hook on client side to consume response from generateText()

*/

// ------------------------------------------------------------------------------------

/* streamText()

    streamText() is a server-side function from the AI SDK 
    that streams the model's response token by token instead of waiting for the entire response.

    on client side we have different hook to consume response.
*/

import { streamText } from "ai";
import {google} from "@ai-sdk/google"
// import { groq } from "@ai-sdk/groq";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      // model: groq("llama-3.3-70b-versatile"),
      model: google("gemini-2.5-flash-lite"),
      prompt: prompt,
    });
    // return result.toTextStreamResponse();
    return result?.toUIMessageStreamResponse();
  } catch (error) {
    console.log("error while generating text", error);
    return Response.json({ error: "failed to generate text" }, { status: 500 });
  }
}


/* 
    toUIMessageStreamResponse() is a method on the object returned by streamText().
    It is typically returned from a Route Handler 
    and enables the client to receive tokens, tool calls, and other message updates in real time.

    It converts the AI stream into a UI Message Stream Response, 
    which is a special HTTP streaming format understood by useChat() or useCompletion()

| `toTextStreamResponse()`                          | `toUIMessageStreamResponse()`                                          |
| ------------------------------------------------- | ---------------------------------------------------------------------- |
| Streams **plain text**                            | Streams **structured UI messages**                                     |
| Returns an HTTP `Response` containing text chunks | Returns an HTTP `Response` containing UI message events                |
| Best for simple text generation                   | Best for chat applications                                             |
| Client receives only generated text               | Client receives messages, tool calls, metadata, reasoning events, etc. |
| Doesn't preserve chat message structure           | Preserves the conversation/message structure                           |


*/
    "use client";

import { useCompletion } from "@ai-sdk/react";

export default function Page() {
  const {
    isLoading,
    error,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    stop,
  } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          setInput("");
        }}
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="How can I help?"
        />
        {isLoading ? (
          <button type="button" onClick={stop}>
            Stop
          </button>
        ) : (
          <button type="submit">Send</button>
        )}
      </form>

      <div>
        {error && <div>{error.message}</div>}
        {isLoading && !completion && <div>Thinking...</div>}
        {completion && <div>{completion}</div>}
      </div>
    </div>
  );
}

/*  under the hood handleSubmit(e) does

    1. e.preventDefault()        // stops page from refreshing
    2. reads current input value  // grabs whatever is in the input field
    3. sends POST request         // to your api endpoint
    4. starts streaming 

  async function handleSubmit(e) {
    e.preventDefault();

    const currentInput = input; // reads it synchronously

    await fetch("/api/completion", {
      method: "POST",
      body: JSON.stringify({ prompt: currentInput }),
      headers: { "Content-Type": "application/json" },
    });
    // then pipes the stream into completion state
}

*/

/* 
    completion =>   is the generated text returned by the AI model.
    
    stop()     =>   cancels the ongoing streaming request.
*/

// ---------------------------------------------------


/* Conversation memory or chat history management.

    Most AI APIs are stateless and do not remember previous conversations automatically.
    
    // Request 1
    "Hi, my name is Sandesh"

    // Request 2
    "What's my name?"

    The model will likely answer:
    "I don't know your name."

    To provide memory, developers store chat history or user preferences in a database 
    and send the relevant context along with each request. 
    This approach is called conversation memory or retrieval-augmented memory.

    ***
      useChat() stores conversation history only in the browser state while the page is open.

      useChat() is for conversations with message history, whereas
      useCompletion() is for single text completions without chat history.

      **
      streamText runs on the server, useChat consumes it on the client. 
      They're designed as a pair.
      
*/

import { convertToModelMessages, streamText, UIMessage } from "ai";
// import { groq } from "@ai-sdk/groq";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {

    const { messages }: { messages: UIMessage[] } = await req.json();
    
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      // model: groq("llama-3.3-70b-versatile"),
      model: google("gemini-2.5-flash-lite"),
      messages: modelMessages,
    });
    // console.log("result", result);
    return result?.toUIMessageStreamResponse();
  } catch (error) {
    console.log("error while generating text", error);
    return Response.json({ error: "failed to generate text" }, { status: 500 });
  }
}

/*  internal structure of UIMessage coming from client;

    type UIMessage = {
      id: string;
      role: "system" | "user" | "assistant";
      parts: UIMessagePart[];
    };

    type UIMessagePart = {
      type: text;
      text: string;
    };

eg.
    [
        {
          id: "1",
          role: "user",
          parts: [
            {
              type: "text",
              text: "What is Next.js?"
            }
          ]
        }
    ]


    ** streamText() expects.....

    type ModelMessage = {
      role: "system" | "user" | "assistant";
      content: string;
    };

eg.
    [
      {
        role: "user",
        content: "What is Next.js?"
      }
    ]

    ** convertToModelMessages() does essentially transforms:

    It converts:

    {
      id: "1",
      role: "user",
      parts: [
        {
          type: "text",
          text: "What is Next.js?"
        }
      ]
    }
    
    into 

    {
      role: "user",
      content: "What is Next.js?"
    }

    the LLM doesn't care about id or UI-specific parts; 
    it ultimately wants messages in a role and content format (or the provider's equivalent structured message schema).


    Why not send UIMessage directly?
    Because AI SDK supports many message parts:

    parts: [
      { type: "text", text: "Weather?" },
      { type: "file", ... },
      { type: "tool-call", ... },
      { type: "tool-result", ... }
    ]

    The UI format is optimized for rendering and interaction.

    The model format is optimized for LLM providers like OpenAI, Anthropic, and Google.


*/
     

"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function Page() {

  const [input, setInput] = useState('');
 
  const {  messages, sendMessage, status, stop, error, regenerate} = useChat({
    transport: new DefaultChatTransport({
      api: "/api/stream-text",    // our app api end point
    }),
  });

  // console.log({messages});

  // status replaces isLoading
  const isLoading = status === 'submitted' || status === 'streaming';


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input }); // 
    setInput('');
  };


  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="How can i help ?" className="border"
          disabled={status !== 'ready'}
        />
        {
          isLoading ? (
            <button type="submit" onClick={stop}>Stop</button>
          ) : (
            <button type="submit" disabled={!input.trim()}>Send</button>
          )
        }
      </form>

      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <b>{message.role === "user" ? "You" : "AI"}: </b>

            {/* each message */}
            {message.parts.map((part) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message?.id}`}>{part?.text}</div>;
                default:
                  return null;
              }
            })}
          </div>
        ))}
      </div>

      {
          isLoading && <p className="text-gray-400 animate-pulse">Thinking…</p>
      }

      {
        error && (<div>
          <span>something went wrong.</span>
          <button onClick={()=>regenerate()}>Retry</button>
        </div>)
      }

    </div>
  );
}


/* 
    streamText() = AI runs on the server.

    useChat() = UI consumes and displays the streamed result.

*/

// ----------------------------------------------------------------

/*  Prompt Engineering...

    Prompt Engineering is the process of designing and optimizing prompts 
    to guide an LLM toward desired outputs.

    Good Prompt Engineering...

      1.  Ensure responses match your users needs and knowledge level.
      2.  Create consistency, so simillar questions get simillar types of response.
      3.  Encourage more conscise response that use fewer tokens. It reduces cost

    Prompt Engineering Techniques:

      1.  System Prompts:
            Special instructions that shape how AI behaves throughout an entire conversation.     

*/

import { convertToModelMessages, streamText, UIMessage } from "ai";

import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {

    const { messages }: { messages: UIMessage[] } = await req.json();
    
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      // model: groq("llama-3.3-70b-versatile"),
      model: google("gemini-2.5-flash-lite"),
      messages: [
        {
          role: "system",
          content: "You are helpful coding assistant. keep response in four sentences and focus on interview ready answers" 
        },
        ...modelMessages
      ]

    });
    // console.log("result", result);
    return result?.toUIMessageStreamResponse();
  } catch (error) {
    console.log("error while generating text", error);
    return Response.json({ error: "failed to generate text" }, { status: 500 });
  }
}


    /* 
        system prompt will be added to every single request 
        which increase your token count which ultimetely leads to increase cost.
    
    */

// -------------------------------------------------------------


/*  Streaming Structured Data.

    streaming structured data means returning AI-generated responses 
    that follow a predefined schema while streaming partial results to the client. 
    AI SDK v6 achieves this using streamText() with Output.object() or Output.array(), 
    and the Route Handler returns the stream using toUIMessageStreamResponse() or toTextStreamResponse(). 
    and consumed on the client using useObject(),
    
    This provides type safety, schema validation, and real-time UI updates.
    
*/


import { streamText, Output } from "ai";
import { google } from "@ai-sdk/google";

import { z } from "zod";

export const recipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      }),
    ),
    steps: z.array(z.string()),
  }),
});

export async function POST(req: Request) {
  try {
    const { dish } = await req.json();

    const result = streamText({
      model: google("gemini-2.5-flash-lite"),
      prompt: `generate recipe for ${dish}`,
      output: Output.object({
        schema: recipeSchema
      })
    });
      return result?.toTextStreamResponse();
  } catch (error) {
    console.log(error)
    return new Response("Failed to generate recipe", { status: 500 })
  }
}

/*  To generate:

      object  =>    output: Output.object()

      array   =>    output: Output.array()

      enum    =>    output: Output.choice({
                      options: [ 'a', 'b', 'c' ]
                    })

*/



// ---------

"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "../api/structured-data/route";

export default function StreamText() {

  const [dish, setDish] = useState("");

  const { submit, object, isLoading, error } = useObject({
    api: "/api/structured-data",
    schema: recipeSchema,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dish.trim()) return;
    submit({ dish: dish });
    setDish("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          placeholder="enter name of recipe ?"
          className="border"
        />
        <button disabled={isLoading}>Generate</button>
      </form>
    {
        error && (<div>{error?.message}</div>)
    }
    {
        isLoading && (<div>Thinking...</div>)
    }
      <div>
        {object?.recipe && (
          <div className="border p-4">
            <h2>{object.recipe.name}</h2>
            {object?.recipe?.ingredients && (
              <div>
                <h4>Ingredients</h4>
                <div>
                  {object.recipe.ingredients.map((ingredient, i) => (
                    <div key={i}>
                      {ingredient?.name} - {ingredient?.amount}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {
                object?.recipe?.steps && (
                    <div className="border p-4">
                        <p>Steps...</p>
                        <ol>
                            {
                                object?.recipe.steps.map((step, i)=>(
                                    <li key={i}>
                                        <p>
                                            <span>{i + 1}.</span>
                                            <span>{step}</span>
                                        </p>
                                    </li>
                                ))
                            }
                        </ol>
                    </div>
                    
                )
            }
          </div>
        )}
      </div>

    </div>
  );
}


/* 
    useObject does not keep conversation history. 
    It's intentionally designed as a single-shot hook.

    You'd use useChat with tool calling instead. 
    The model streams text but also returns structured data via tools, 
    and useChat maintains the full history.

    Output API     →  single object out  →  useObject  →  ❌ no history
    Tool calling   →  text + structured data  →  useChat  →  ✅ has history


    return result.toDataStreamResponse(); 

*/

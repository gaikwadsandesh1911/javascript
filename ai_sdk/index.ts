/*  AI SDK

      AI SDK provides a standard way to integrate AI models into applications. 
      Without an AI SDK, developers have to manually configure ai model provider-specific format code, handle API calls, streaming responses, and UI state management. 
      AI SDK abstracts these complexities and gives a unified interface to work with different AI providers like 
      OpenAI, Anthropic, or Google, making it easier to build chat, 
      text generation, and AI-powered features.

      npm i ai                    =>      provides the SDK( software development kit ) functionality,

      npm i @ai-sdk/groq  or 
      npm i @ai-sdk/openai        =>      connect to specific ai model
      
      npm i @ai-sdk/react         =>      React hooks and UI utilities
    
*/

// ------------------------------------------------------

/*  Different types of AI Models.

      1.  Text generation models.
            Generate text

      2.  Embedding models.
            Instead of generating text, they convert text into numbers
            specifically vectors that captures meaning of text.

      3.  Image / video / audio models.

      4.  Multi-modal models
            Can handle multiple types of input and output


    Characteristics of model:

      1.  context window
            How much information model can process in single conversation.

      2.  intelligence

      3.  speed

      4.  cost

    
    What are tokens?
      Token is basic unit of text that model processes.

      input token
        what you send to model.

      output token
        what model generate in response.

      Different models have different input/output token limit
      also have different pricing for input/output tokens.


*/

// ------------------------------------------------------

/*  What problem does @ai-sdk/react solve?

      Without it, you'd need to manually: 

      Store messages in state
      Handle user input
      Send requests to your API
      Read streaming responses
      Update the UI token by token

      It provides React hooks like useCompletion(), useChat() and useObject() that manage messages state, input state, and streaming responses, etc.
      making it easier to build AI-powered interfaces.  

*/

// ------------------------------------------------------

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

    // console.log("result", result);

    return Response.json({ text: result?.text });

  } catch (error) {

    console.log("error while generating text", error);

    return Response.json({ error: "failed to generate text" }, { status: 500 });

  }
};

/* 
    We usually consume it using standard React state management with fetch, useState, or useActionState in Next.js.
    
    There is no dedicated hook on client side to consume response from generateText()

*/

// --------------------------------------------

/* streamText()

    streamText() is a server-side function from the AI SDK 
    that streams the model's response token by token instead of waiting for the entire response.

    on client side we have useChat() and useCompletion() hook to consume response.
*/

import { streamText } from "ai";
// import { groq } from "@ai-sdk/groq";
import {google} from "@ai-sdk/google"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      // model: groq("llama-3.3-70b-versatile"),
      model: google("gemini-2.5-flash-lite"),
      prompt: prompt,
    });
    // console.log("result", result);
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

*/
"use client";

import { useCompletion } from "@ai-sdk/react";

export default function StreamText() {

  const { isLoading, error, input, setInput, handleInputChange, handleSubmit, completion, stop } = useCompletion({
    api: '/api/stream-text'
  });

  return (
    <div>

      <form onSubmit={(e)=>{
        e.preventDefault();
        setInput("");
        handleSubmit(e);
      }}>
        <input type="text" value={input} onChange={handleInputChange} placeholder="How can i help ?" className="border"/>
        {isLoading ? (<button onClick={stop}>Stop</button>) : (<button disabled={isLoading}>Send</button>)}
      </form>

      <div>
        {error && (<div>{error?.message}</div>)}
        {isLoading && !completion && <div>Thinking...</div>}
        {completion && <div>{completion}</div>}
      </div>

    </div>
  );
}


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
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function StreamText() {

  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/stream-text",
    }),
  });

  console.log({messages});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="How can i help ?" className="border"
        />
        <button type="submit" disabled={status != 'ready'}>
          {status === "streaming" ? "Streaming..." : "Send"}
        </button>
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
          (status === "submitted" || status === "streaming") && (
            <p>Thinking...</p>
          )
      }

      {
        error && (<p>{error?.message}</p>)
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
        />
        <button disabled={isLoading}>Generate</button>
      </form>
    
      <div>
        {object?.recipe && (
          
        )}
      </div>
    </div>
  );
}







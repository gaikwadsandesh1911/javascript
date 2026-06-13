/*  AI SDK

      AI SDK provides a standard way to integrate AI models into applications. 
      Without an AI SDK, developers have to manually configure ai model provider-specific format code, handle API calls, streaming responses, and UI state management. 
      AI SDK abstracts these complexities and gives a unified interface to work with different AI providers like 
      OpenAI, Anthropic, or Google, making it easier to build chat, 
      text generation, and AI-powered features.

      npm i ai                    =>      provides the SDK( software development kit ) functionality,

      npm i @ai-sdk/groq  / 
      npm i @ai-sdk/openai        =>      connect to specific ai model
      
      npm i @ai-sdk/react         =>      React hooks and UI utilities
    
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

    console.log("result", result);

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


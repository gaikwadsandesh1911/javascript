/* 
    Large Language Models (LLMs) are trained on a fixed dataset.
    so they don't have real-time knowledge or direct access to external systems. 
    
    To solve this limitation tools come into play.

    Tools are external functions or APIs that an LLM can request to use 
    when it needs information or capabilities beyond its training. 
    
    Examples include:

        Searching the web
        Querying a database
        Calling a external API
        Reading files
        Sending emails

    
    LLM does not execute the tool itself. Instead, it decides:

        - Which tool to invoke
        - What arguments to pass

    And then, application hosting the LLM:

        - Executes the actual function or API call.
        
        - Retrieves the result.
        
        - Sends that result back to the LLM as additional context.
        
        - The LLM uses this new information to generate the final response.

    This process is known as the tool-calling loop or function-calling workflow.

    The beauty is that user can interact with complex system using natural language
    while AI handles all orchestrations.

*/


// ------------------------------------------------------------------


import { convertToModelMessages, streamText, UIMessage, tool, stepCountIs,  UIDataTypes, InferUITools } from "ai";
// import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";

const tools = {
  getWeather: tool({
    description: "Get the weather in a location",
    inputSchema: z.object({
      location: z.string().describe("The location to get the weather for"),
    }),
    execute: async ({ location }) => {
      console.log("verify if tool is executed..");
      if (location.trim().toLowerCase() === "mumbai") return `Cloudy.`;
      return `Rainy.`;
    },
    
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>

export async function POST(req: Request) {
  try {
    
    const { messages }: { messages: ChatMessage[] } = await req.json();
    
    const modelMessages = await convertToModelMessages(messages);
    
    const result = streamText({
        // model: google("gemini-2.5-flash-lite"),
      model: groq("llama-3.3-70b-versatile"),
      messages: modelMessages,
      tools: tools,
      stopWhen: stepCountIs(2)
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log("error while generating text", error);
    return Response.json({ error: "failed to generate text" }, { status: 500 });
  }
};



// ----------------------------------------


"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function Tools() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, stop, error, regenerate } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/tools",
    }),
  });

  console.log({ messages });

  // status replaces isLoading
  const isLoading = status === "submitted" || status === "streaming";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input }); //
    setInput("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How can i help ?"
          className="border"
          disabled={status !== "ready"}
        />
        {isLoading ? (
          <button type="button" onClick={stop}>
            Stop
          </button>
        ) : (
          <button type="submit" disabled={!input.trim()}>
            Send
          </button>
        )}
      </form>

      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <b>{message.role === "user" ? "You" : "AI"}: </b>

            {/* each message */}
            {message?.parts?.map((part, i) => {

              switch (part.type) {

                case "text":
                  return <div key={`${message.id}-${i}`}>{part?.text}</div>;
                
                case "tool-getWeather":
                  if (part.state === "input-available") {
                    return (
                      <p key={`${message.id}-${i}`} className="text-gray-400">
                        Fetching weather...
                      </p>
                    );
                  }
                  if (part.state === "output-available") {
                    return (
                      <div key={`${message.id}-${i}`} className="border p-2">
                        <p>Weather: {part.output as string}</p>
                      </div>
                    );
                  }

                  return null;

                default:
                  return null;
              }
            })}
          </div>
        ))}
      </div>

      {isLoading && <p className="text-gray-400 animate-pulse">Thinking…</p>}

      {error && (
        <div>
          <span>something wen wrong.</span>
          <button type="button" className="border" onClick={() => regenerate()}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
}


// ---------------------------------------

/*  
  So basically model decides automatically 
  if it has to esponse from its trained data or call a tool

  if model decides to call a tool our app executes the execute function and 
  return result;

  that result is recieved by llm and generate final response.

*/

execute: async ({ city }) => {
  const data = await fetch(`https://api.weather.com/${city}`);
  return data.json(); // ← this result goes back to the model

};

        //       Model generates final text response
        //          ↓
        //      User sees answer


// -------------------------------------

// stop after 5 steps
stopWhen: stepCountIs(5)

// stop when a specific tool has been called
stopWhen: ({ steps }) => 
  steps.some(step => step.toolName === "submitOrder")

// stop when confidence is high enough
stopWhen: ({ steps }) => steps.length >= 2


/* 
    Use case                            Recommended 

    Single tool call                    stepCountIs(2)
    
    Multi-step agent                    stepCountIs(5)
    
    Complex research agent              stepCountIs(10)


    Always set a stopWhen — without it you risk infinite loops if the model keeps deciding it needs more tool calls.

*/


// ------------------------------------------------


/* Multi-stpe tool call.
  
  where result of one tool will be input to next tool

  AI chains tools together to solve complex problem.

*/


/*  Human-in-the-loop

    Instead of the model executing tools automatically, 
    you pause the chain and ask the user:

    You simply omit the [ execute function from the tool definition. ]
    When a tool has no execute, the model generates the call but your app decides what to do with it.


    Rule of thumb:
        - read operations can be automatic, 
        - write or destructive operations should be human-in-the-loop
*/

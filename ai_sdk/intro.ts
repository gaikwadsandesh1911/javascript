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
      2.  intelligence
      3.  speed
      4.  cost

  // ------------------------------------------------------

    What are tokens?

      Token is basic unit of text that model processes.
      It is not the same as a word.

        eg.   hello               -     1 token
              chatGPT is amazing  -     3-4 token

        The model never sees character. It sees token

      Input token
        what you send to model.

      Output token
        what model generate in response.

      Different models have different input/output token limit
      also have different pricing for input/output tokens.



    Context:

        The context is everything the model currently knows during one request.
        Think of it as the model's temporary memory.

        Every LLM API request is fundamentally stateless.
        The model does not remember previous requests unless you send the previous conversation history again.

        Suppose:

            Request 1:
            
              User: My name is Sandesh.
              Assistant: Nice to meet you, Sandesh! 
              
            **  The request finishes, and the model "forgets" everything.

            Request 2:

              User: What is my name?

            **  The model has no idea who you are.

          To make model remember we send previous chat history with every request.
          
          so instead of sending:

              What is my name?

          we send:

              User: My name is Sandesh.

              Assistant: Nice to meet you.

              User: What is my name?

          Now the model can answer:

              "Your name is Sandesh."

          **  The "memory" comes from your application resending the conversation, 
              not from the model remembering previous API calls.


     Context Window

        The maximum number of tokens the model can "see" in one request.

      Why context windows matter
        Since every request includes the conversation history, the prompt grows over time, 
        hence token grows over the time.

      When the conversation becomes too large, you must:
        Remove older messages
        Summarize earlier parts of the conversation
        Retrieve only relevant history (RAG)
        Start a new conversation
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
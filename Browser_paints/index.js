/* 🧠   How Browser Paints Everything...

    🔹When you open a website, Browser follows pipeline...

        1. Read HTML → Converts it into a DOM tree (Document Object Model)
                        (Tree structure in memory )

        2. Read CSS → Build CSSOM

        3. Combine → DOM + CSSOM = Render Tree.
                Only visible elements included (e.g. display: none excluded)

        4. Layout (Reflow)
                Browser calculates:
                    position
                    size of elements,
                    spacing

                👉 "Where should this element appear?"
            
        5. Paint
            Browser draws pixels on screen ( colors, borders, text, shadows etc. )

*/

// --------------------------------------------------------------

/* 🧠 What Happens When You Open a React App First Time?

        1.  When you open a React app, browser first gets:
        
                🔹index.html

                <div id="root"></div>
                <script src="main.js"></script>


        👉Browser 
                Parses HTML → create DOM ( Real Dom )
                parse css - create CSSOM
                Combine → DOM + CSSOM = Render Tree
                Layout calculate
                Paints

            👉 But screen is basically blank
                    because we have empty div 
                    <div id="root"></div>

        
        2.  Now browser loads: main.jsx

                ReactDOM.createRoot(document.getElementById("root")).render(<App />);

               👉 This file contains:

                        React
                        ReactDOM
                        Your components (App, and all childs.)             

                 React takes control and start execution...


                🔹  React calls your components (App, children)
                    👉Builds Virtual DOM (JS object)

        3.  ReactDOM Updates Real DOM
        
                ReactDOM creates corresponding real DOM nodes using browser api
                and mounts them into the root element. <idv id='root'>

        4.  Now, Browser sees DOM changes
                👉 It runs again:
                        Layout (Reflow)
                        Paint
                    ✅ Now UI becomes visible



        🎯 Important Insight

        👉 First paint in React happens in 2 phases:
            Thats Why React Feels Slightly Slower Initially?

                1. Initial because of Empty div

                2.  After JS executes, React injects DOM → repaint 

        
        🎯  This is called:
                👉 CSR (Client Side Rendering)

*/

// ------------------------------------------------------

/* 🧠 How Browser Paints in SSR (e.g. Next.js)

        1.  when open next.js app
                Browser sends request to server
                Server runs react code on server(node / edge server).
                🚨And Generate HTML and sent it to the Browser( without js ).

                Next.js doesn’t use an index.html; 
                instead, it generates HTML dynamically using layout and page components.
                
                Next.js server:

                    Combines layout.js + page.js
                    Generates HTML


        2.  Browser parse this HTML and then ( normal browser pipeline )
                ✅ UI is visible immediately
                👉 No blank screen like CSR on first paint...

            👉 This is called:

                First Contentful Paint (FCP) — very fast in SSR
                
                Browser already showed UI, 
                But UI is not interactive ( eg button shows but not clickable ).
                

        3.  React bundle(js) Loads in Background. and starts Hydration:   
            👉 Hydration process:
            
                    React Creates Virtual DOM
                    Matches it with existing DOM
                    Attaches event listeners

                now 
                    Buttons clickable ✅
                    State works ✅
                    Navigation works ✅


        🔹 6. After Hydration → Normal React Behavior

                Client-side React app
                State updates
                Re-renders


*/
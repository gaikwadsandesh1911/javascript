/* 🔹 What is Git?

    Git is a distributed version control system used to track changes in code 
    and collaborate with multiple developers.


    Think of Git like a time machine for your code:

        You write code → save versions
        You make mistakes → go back to previous version
        You try new features → without breaking main code
        Multiple people work → without overwriting each other
*/

/*  install git

    open gitbash terminal in vscode

    git --version


    🔹  set config

            git config --global user.name "sandesh"
            git config --global user.email "gaikwad.sandesh1911@gmail.com"

    🔹  change config

            git config --global --edit 


    🔹  initialize git inside working directory ( a project folder )

            git init        [ creates .git hidden folder ]

             👍now working directory becomes git repository, and git can track changes.

    
    🔹  check the current state of the working directory( project folder ) and staging area.

            git status

    
    🔹  let git track our files and folder ( staging area )

            git add .              // all files
            git add <filename>    // specified file


    🔹  commit changes

            git commit -m "any message"

    
    🔹  to check all commits. [ when you commit hash code is generated per commit. ]
     
            git log

    
    🔹  to go to previous commit ( temporarily inspect old code → use checkout )

            git checkout < hashcode / branch >


    🔹    go back permanently

            git reset --hard <commit-hash>


    🔹  return to latest commit

            git  checkout main



    🔥  git branch: 

            👉 A branch is a separate line of development
                which  allow parallel development without affecting main codebase.

            main → stable code
            feature/auth → working on login
            Merge later after testing


        🔹 List all branches

                git branch


        🔹  create new branch

                git branch feature/login

        
        🔹  switch to branch

                git switch feature/login


        🔹  delete branch

                git branch -d feature/login

        
        🔹  now after successful compeltation of feature merge it into main brach

                git switch main
                git merge feature/login


        

        🔥  .gitignore

                this file is used to tell git that included file should not be tracked.


        
        🔥  GitHub

                GitHub is a cloud-based platform that hosts Git repositories 
                and helps developers collaborate on code.
        
                open github account follow instruction and push code on github


            
        🔥  Copy Someone Else’s Code from GitHub?

                🔹 1. Clone (Best Way ✅)
                        Creates a full copy of the repository on your local machine

                        git clone <repo-url>

                🔹 2. Download ZIP

                        👉 On GitHub:

                        Click Code button
                        Click Download ZIP


        🔥  fork  ( direct copy in your github )

                open someone's github repo  ->    Click Fork
                it creates copy on your GitHub
                Then clone on your local maching
                update or add code
                

                🔹 Real-Life Scenario

                👉 You want to contribute to open source:

                    Fork repo
                    Clone it
                    Make changes
                    Push
                    Create Pull Request

                        👉 From your GitHub fork → click “Compare & Pull Request”

                        👉 This sends request to Original repository owner

                        👉 Pull Request is used to request merging into the original repo
*/
const ResetPasswordTemplate = (verificationCode) => {
    
    return `<html>
        <head>
            <!-- Font Awesome -->
            <script src="https://kit.fontawesome.com/d49fca0d9e.js" crossorigin="anonymous"></script>
            <style>
                :root {
                    --primary-color: 31, 201, 130;
                    --text-dark: 0,0,0;
                }
    
                [data-theme='dark'] {
                    --primary-color: 85,110,83;
                    --text-dark: 209, 212, 201;
                }
    
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
    
                a {
                    text-decoration: none;
                    color: rgb(var(--primary-color));
                }
    
                .nav--logo {
                    font-weight: bold;
                    font-size: 3rem;
                    font-family: 'Yanone Kaffeesatz', sans-serif;
                }
    
                .message--container {
                    text-align: center;
                    color: rgb(var(--text-dark));
                }

                .message--text {
                    font-size: 1.5rem;
                }
    
                .message--header {
                    padding-top: 3rem;
                    padding-bottom: 1rem;
                    font-size: 2rem;
                }
            </style>
        </head>
        <body data-theme="">
            <div class="message--container">
                <a class="nav--logo" href="http://localhost:3000/">
                    QuizMe
                </a>
                <h1 class="message--header">Please verify your account email</h1>
                <p class="message--text">After correct verification, you will be able to set a new password.</p>
                <p class="message--text">Your verification code: </p>
                <p class="message--header">${verificationCode}</p>
            </div>
        </body>
    </html>`
    }
    
    
    export {ResetPasswordTemplate}
    
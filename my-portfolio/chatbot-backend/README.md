# Chatbot Integration Setup Instructions

A secure, custom ChatGPT-powered chatbot has been added to the project. It uses a separate Node.js backend to secure your API key and a vanilla JS widget for the frontend.

## 1. Backend Setup (Server)

1.  Navigate to the backend directory:
    ```bash
    cd chatbot-backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    - Rename `.env.example` to `.env`.
    - Add your **OpenAI API Key**:
      ```env
      OPENAI_API_KEY=sk-your-actual-api-key-here
      PORT=3000
      ```
4.  Start the Server:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:3000`.

## 2. Frontend Setup (Client)

The widget files are located in `chatbot-widget/`. To enable the chatbot on your site, you need to import the script in your `index.html`.

1.  Open `index.html` in the root `my-portfolio` directory.
2.  Add the script tag just before the closing `</body>` tag:
    ```html
    <script src="/chatbot-widget/chat-widget.js"></script>
    ```
    *Note: Ensure the path matches where you serve the file. If using Vite, it should act as a static asset if placed in `public` or imported correctly. For simplicity in this vanilla setup, moving `chatbot-widget` folder to `public/` might be easier if using Vite, OR just referencing it correctly.*

    **Recommended for Vite:**
    Move the `chatbot-widget` folder into the `public/` directory so it's served as a static asset.
    - Move `chatbot-widget/` -> `public/chatbot-widget/`
    - Update `index.html`: `<script src="/chatbot-widget/chat-widget.js"></script>`
    - Update `chat-widget.js` line 7 to point to css: `link.href = '/chatbot-widget/chat-widget.css';`

## 3. Running the Project

1.  **Terminal 1**: Run the Backend
    ```bash
    cd chatbot-backend
    npm start
    ```
2.  **Terminal 2**: Run the Frontend
    ```bash
    npm run dev
    ```

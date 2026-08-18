# AI Reviewer

AI Reviewer is a Google Chrome extension designed for the automatic analysis of product reviews in online stores. The tool processes reviews available on the page and generates a coherent summary using a language model.

* API: Groq Cloud API
* Model: openai/gpt-oss-120b

---

## API Configuration

An API key is required for the extension to function properly. It must be configured before installing the plugin:

1. Create an account on the Groq Cloud platform (console.groq.com).
2. Navigate to the API Keys tab and generate a new key.
3. Open the `popup.js` file in your code editor.
4. Replace the variable value in the first line with your key:

    ```javascript
    const GROQ_API_KEY = "YOUR_API_KEY";
    ```
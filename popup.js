const GROQ_API_KEY = "TWÓJ_KLUCZ_API"

let btn = document.getElementById("analyze-btn");
let result = document.getElementById("result");

btn.addEventListener("click", async function() {
    try {
        result.innerText = "Pobieranie danych...";

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        let injectionResults = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: scrapeData,
        });

        if (!injectionResults || !injectionResults[0]) {
            throw new Error("Nie udało się pobrać opinii z tej karty.");
        }

        let pobranyTekst = injectionResults[0].result;
        result.innerText = "Sprawdzanie opinii. To potrwa kilka sekund...";

        let AIresult = await analyzeWithAI(pobranyTekst);

        result.innerText = AIresult;

    } catch (error) {
        result.innerText = "BŁĄD: " + error.message;
    }
});

function scrapeData() {
    let bodyClone = document.body.cloneNode(true);
    let selectorsToRemove = 'nav, header, footer, aside, script, style, noscript, svg, iframe, form';
    let trashElements = bodyClone.querySelectorAll(selectorsToRemove);
    trashElements.forEach(el => el.remove());
    return bodyClone.innerText;
}

async function analyzeWithAI(text) {
    let shortText = text.substring(0, 25000);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${GROQ_API_KEY}`, 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b", 
            messages: [
                {
                    role: "system",
                    content: "Jesteś ekspertem od analizy opinii. Zignoruj śmieci na stronie. Wygeneruj jedno spójne podsumowanie w postaci 3-4 krótkich punktów (każdy max 15 słów). NIE UŻYWAJ nagłówków 'Zalety' i 'Wady'. ZASADY: 1. Werdykt: Jeśli opinie są ZNACZĄCO w jedną stronę (np. druzgocąca przewaga wad lub zalet), zacznij pierwszy punkt od mocnego podsumowania (np. 'Zdecydowana większość klientów gorąco poleca/odradza ten sklep z powodu...'). 2. Łącz sprzeczności: Jeśli oceny jakiejś cechy są skrajne, zrób z tego jeden obiektywny punkt (np. 'Choć dostawa jest błyskawiczna, proces zwrotów to dla większości koszmar'). 3. Używaj proporcji (większość, część, nieliczni). ZERO lania wody. BRAK OPINII: 'Brak opinii do analizy. Przewiń w dół i kliknij Analizuj ponownie.'"
                },
                {
                    role: "user",
                    content: shortText
                }
            ]
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || "Błąd serwera Groq");
    }

    return data.choices[0].message.content;
}
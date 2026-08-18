
# AI Reviewer

AI Reviewer to rozszerzenie dla przeglądarki Google Chrome służące do automatycznej analizy opinii o produktach w sklepach internetowych. Narzędzie przetwarza dostępne na stronie recenzje i generuje ich spójne podsumowanie z wykorzystaniem modelu językowego.

* API: Groq Cloud API
* Model: openai/gpt-oss-120b

########################################################################################################################

## Konfiguracja API

Do prawidłowego działania rozszerzenia wymagany jest klucz API. Należy go skonfigurować przed instalacją wtyczki:

1. Utwórz konto na platformie Groq Cloud (console.groq.com).
2. Przejdź do zakładki API Keys i wygeneruj nowy klucz.
3. Otwórz plik `popup.js` w edytorze kodu.
4. Zastąp wartość zmiennej w pierwszej linii swoim kluczem:
        
        const GROQ_API_KEY = "TWÓJ_KLUCZ_API";
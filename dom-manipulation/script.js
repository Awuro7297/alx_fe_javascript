document.addEventListener('DOMContentLoaded', () => {
    // Array to store quotes
    let quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        { text: "The best way to predict the future is to invent it.", category: "Innovation" }
    ];

    // Select DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuoteBtn');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');

    // Function to display a random quote
    function showRandomQuote() {
        if (quotes.length === 0) {
            quoteDisplay.innerHTML = "No quotes available.";
            return;
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><strong>- ${randomQuote.category}</strong></p>`;
    }

    // Function to add a new quote
    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        // Add the new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });

        // Clear the input fields
        newQuoteText.value = '';
        newQuoteCategory.value = '';

        // Optionally, show the new quote immediately
        showRandomQuote();
    }

    // Event listeners
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
});

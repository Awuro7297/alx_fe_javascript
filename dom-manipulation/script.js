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

    // Function to create and append the add quote form
    function createAddQuoteForm() {
        // Check if the form already exists to avoid duplicates
        if (document.getElementById('addQuoteForm')) {
            return;
        }

        // Create form elements
        const formContainer = document.createElement('div');
        formContainer.id = 'addQuoteForm';

        const inputText = document.createElement('input');
        inputText.id = 'newQuoteText';
        inputText.type = 'text';
        inputText.placeholder = 'Enter a new quote';
        
        const inputCategory = document.createElement('input');
        inputCategory.id = 'newQuoteCategory';
        inputCategory.type = 'text';
        inputCategory.placeholder = 'Enter quote category';
        
        const addButton = document.createElement('button');
        addButton.id = 'addQuoteBtn';
        addButton.textContent = 'Add Quote';

        // Append elements to the form container
        formContainer.appendChild(inputText);
        formContainer.appendChild(inputCategory);
        formContainer.appendChild(addButton);

        // Append the form container to the body or any other desired parent element
        document.body.appendChild(formContainer);

        // Add event listener for the Add Quote button
        addButton.addEventListener('click', addQuote);
    }

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
        const quoteText = document.getElementById('newQuoteText').value.trim();
        const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        // Add the new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });

        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Optionally, show the new quote immediately
        showRandomQuote();
    }

    // Initialize the form creation
    createAddQuoteForm();

    // Event listener for the "Show New Quote" button
    newQuoteButton.addEventListener('click', showRandomQuote);
});

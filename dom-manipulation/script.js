// document.addEventListener('DOMContentLoaded', () => {
//     // Array to store quotes
//     let quotes = [
//         { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
//         { text: "Life is what happens when you're busy making other plans.", category: "Life" },
//         { text: "The best way to predict the future is to invent it.", category: "Innovation" }
//     ];

//     // Select DOM elements
//     const quoteDisplay = document.getElementById('quoteDisplay');
//     const newQuoteButton = document.getElementById('newQuote');

//     // Function to create and append the add quote form
//     function createAddQuoteForm() {
//         // Check if the form already exists to avoid duplicates
//         if (document.getElementById('addQuoteForm')) {
//             return;
//         }

//         // Create form elements
//         const formContainer = document.createElement('div');
//         formContainer.id = 'addQuoteForm';

//         const inputText = document.createElement('input');
//         inputText.id = 'newQuoteText';
//         inputText.type = 'text';
//         inputText.placeholder = 'Enter a new quote';
        
//         const inputCategory = document.createElement('input');
//         inputCategory.id = 'newQuoteCategory';
//         inputCategory.type = 'text';
//         inputCategory.placeholder = 'Enter quote category';
        
//         const addButton = document.createElement('button');
//         addButton.id = 'addQuoteBtn';
//         addButton.textContent = 'Add Quote';

//         // Append elements to the form container
//         formContainer.appendChild(inputText);
//         formContainer.appendChild(inputCategory);
//         formContainer.appendChild(addButton);

//         // Append the form container to the body or any other desired parent element
//         document.body.appendChild(formContainer);

//         // Add event listener for the Add Quote button
//         addButton.addEventListener('click', addQuote);
//     }

//     // Function to display a random quote
//     function showRandomQuote() {
//         if (quotes.length === 0) {
//             quoteDisplay.innerHTML = "No quotes available.";
//             return;
//         }
//         const randomIndex = Math.floor(Math.random() * quotes.length);
//         const randomQuote = quotes[randomIndex];
//         quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><strong>- ${randomQuote.category}</strong></p>`;
//     }

//     // Function to add a new quote
//     function addQuote() {
//         const quoteText = document.getElementById('newQuoteText').value.trim();
//         const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

//         if (quoteText === "" || quoteCategory === "") {
//             alert("Please enter both a quote and a category.");
//             return;
//         }

//         // Add the new quote to the array
//         quotes.push({ text: quoteText, category: quoteCategory });

//         // Clear the input fields
//         document.getElementById('newQuoteText').value = '';
//         document.getElementById('newQuoteCategory').value = '';

//         // Optionally, show the new quote immediately
//         showRandomQuote();
//     }

//     // Initialize the form creation
//     createAddQuoteForm();

//     // Event listener for the "Show New Quote" button
//     newQuoteButton.addEventListener('click', showRandomQuote);
// });
document.addEventListener('DOMContentLoaded', () => {
    // Array to store quotes
    let quotes = [];

    // Select DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuoteBtn');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const exportButton = document.getElementById('exportQuotesBtn');
    const importFileInput = document.getElementById('importFile');

    // Load quotes from local storage
    function loadQuotes() {
        const storedQuotes = localStorage.getItem('quotes');
        if (storedQuotes) {
            quotes = JSON.parse(storedQuotes);
            quotes.forEach(quote => createQuoteElement(quote));
        }
    }

    // Save quotes to local storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Create and append quote elements
    function createQuoteElement(quote) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<p>"${quote.text}"</p><p><strong>- ${quote.category}</strong></p>`;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => {
            removeQuote(quote, listItem);
        });

        listItem.appendChild(removeButton);
        quoteDisplay.appendChild(listItem);
    }

    // Display a random quote
    function showRandomQuote() {
        if (quotes.length === 0) {
            quoteDisplay.innerHTML = "No quotes available.";
            return;
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><strong>- ${randomQuote.category}</strong></p>`;
    }

    // Add a new quote
    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        createQuoteElement(newQuote);
        saveQuotes();
        newQuoteText.value = '';
        newQuoteCategory.value = '';
    }

    // Remove a quote
    function removeQuote(quote, listItem) {
        quoteDisplay.removeChild(listItem);
        quotes = quotes.filter(q => q !== quote);
        saveQuotes();
    }

    // Export quotes to a JSON file
    function exportQuotes() {
        const json = JSON.stringify(quotes, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Import quotes from a JSON file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            try {
                const importedQuotes = JSON.parse(event.target.result);
                if (Array.isArray(importedQuotes)) {
                    quotes = importedQuotes;
                    saveQuotes();
                    quoteDisplay.innerHTML = '';
                    quotes.forEach(createQuoteElement);
                    alert('Quotes imported successfully!');
                } else {
                    alert('Invalid JSON format. Please provide a valid JSON file.');
                }
            } catch (e) {
                alert('Error importing quotes. Please check the JSON file.');
            }
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Initialize everything
    createAddQuoteForm();
    loadQuotes();

    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
    exportButton.addEventListener('click', exportQuotes);
    importFileInput.addEventListener('change', importFromJsonFile);
});

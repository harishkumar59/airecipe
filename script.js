const API_KEY = "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"; // Remember to keep this private in production!

async function generateRecipe(prompt) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation",
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_length: 512,
                    temperature: 0.7,
                }
            }),
        }
    );
    const result = await response.json();
    return result[0].generated_text;
}

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const ingredientInput = document.getElementById('ingredientInput');
    const recipeResult = document.getElementById('recipeResult');
    const loadingSpinner = document.getElementById('loadingSpinner');

    generateBtn.addEventListener('click', async () => {
        const prompt = ingredientInput.value.trim();
        
        if (!prompt) {
            alert('Please enter ingredients or recipe type!');
            return;
        }

        // Show loading spinner
        loadingSpinner.classList.remove('hidden');
        recipeResult.textContent = '';
        generateBtn.disabled = true;

        try {
            const recipe = await generateRecipe(prompt);
            recipeResult.textContent = recipe;
        } catch (error) {
            recipeResult.textContent = 'Error generating recipe. Please try again.';
            console.error('Error:', error);
        } finally {
            // Hide loading spinner and re-enable button
            loadingSpinner.classList.add('hidden');
            generateBtn.disabled = false;
        }
    });
});

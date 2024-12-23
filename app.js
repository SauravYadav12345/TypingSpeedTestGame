let timer;
let timeLeft = 60; // Change from 30 to 60 for 1 minute
let wordsTyped = 0;
let correctWords = 0;
let currentQuote = "";
let wpm = 0;
let accuracy = 100;

const startBtn = document.getElementById("start-btn");
const testArea = document.getElementById("test-area");
const quoteText = document.getElementById("quote-text");
const inputField = document.getElementById("input-field");
const timeLeftDisplay = document.getElementById("time-left");
const wordsTypedDisplay = document.getElementById("words-typed");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart-btn");

// Random quotes for the typing test
const quotes = [
  "The only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle. As with all matters of the heart, you’ll know when you find it. And, like any great relationship, it just gets better and better as the years roll on. So keep looking, don’t settle.",
  "In the end, it's not the years in your life that count, it's the life in your years. You have within you right now, everything you need to deal with whatever the world can throw at you. Your time is limited, so don’t waste it living someone else’s life. Don't let the noise of others' opinions drown out your own inner voice.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. It does not matter how slowly you go as long as you do not stop. The only impossible journey is the one you never begin. Life is really simple, but we insist on making it complicated. Do not go where the path may lead, go instead where there is no path and leave a trail.",
  "It is not our abilities that show what we truly are… it is our choices. The way to get started is to quit talking and begin doing. The secret of getting ahead is getting started. The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty. Don't watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams. Life is what happens when you’re busy making other plans. To succeed in life, you need two things: ignorance and confidence. Keep your face always toward the sunshine—and shadows will fall behind you. The best way to predict the future is to create it.",
  "The best time to plant a tree was 20 years ago. The second best time is now. The only limit to our realization of tomorrow is our doubts of today. You can never plan the future by the past. It is never too late to be what you might have been. Time waits for no one, so you must seize the day and make the most of every moment.",
  "Don’t cry because it’s over, smile because it happened. Life is 10% what happens to us and 90% how we react to it. What lies behind us and what lies before us are tiny matters compared to what lies within us. You are never too old to set another goal or to dream a new dream. In the middle of every difficulty lies opportunity.",
  "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. You’ve got to do your own growing no matter how tall your grandfather was. It always seems impossible until it’s done. Life isn’t about waiting for the storm to pass, it’s about learning to dance in the rain.",
  "If you want to live a happy life, tie it to a goal, not to people or things. Life isn’t about finding yourself. Life is about creating yourself. Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.",
  "The only person you are destined to become is the person you decide to be. The difference between who you are and who you want to be is what you do. What you get by achieving your goals is not as important as what you become by achieving your goals. Happiness depends upon ourselves. What you do today can improve all your tomorrows.",
];

// Get a random quote from the list
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Start the typing test
function startTest() {
  currentQuote = getRandomQuote();
  quoteText.textContent = currentQuote;
  inputField.value = "";
  wordsTyped = 0;
  correctWords = 0;
  wpm = 0;
  accuracy = 100;

  // Reset score display
  updateScore();

  // Reset timer to 60 seconds
  timeLeft = 60; // 1 minute
  timeLeftDisplay.textContent = timeLeft;

  // Enable input field and hide the restart button
  inputField.disabled = false;
  inputField.focus();
  restartBtn.style.display = "none";

  // Start the timer
  clearInterval(timer); // Ensure no previous timer runs
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeLeftDisplay.textContent = timeLeft;
    } else {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

// End the test and display results
function endTest() {
  inputField.disabled = true;

  // Calculate Words Per Minute (WPM)
  const minutesElapsed = (60 - timeLeft) / 60;
  wpm = minutesElapsed > 0 ? Math.floor(wordsTyped / 5 / minutesElapsed) : 0;

  // Show results
  updateScore();

  // Show the restart button
  restartBtn.style.display = "block";
}

// Update score display
function updateScore() {
  wordsTypedDisplay.textContent = wordsTyped;
  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent =
    wordsTyped > 0
      ? Math.floor((correctWords / wordsTyped) * 100) + "%"
      : "100%";
}

// Handle user input
inputField.addEventListener("input", () => {
  let inputText = inputField.value;

  // Calculate words typed
  wordsTyped = inputText.split(/\s+/).filter(Boolean).length;
  wordsTypedDisplay.textContent = wordsTyped;

  // Calculate correct words
  const inputWords = inputText.split(" ");
  const quoteWords = currentQuote.split(" ");
  correctWords = inputWords.filter(
    (word, index) => word === quoteWords[index]
  ).length;

  // Update accuracy
  accuracy = Math.floor((correctWords / wordsTyped) * 100) || 0;
  accuracyDisplay.textContent = accuracy + "%";

  // Check if the user finished the quote
  if (inputText.trim() === currentQuote.trim()) {
    inputField.disabled = true; // Disable typing
    clearInterval(timer); // Stop the timer
    document.getElementById("submit-btn").style.display = "block"; // Show submit button
  }
});

// Restart the test
restartBtn.addEventListener("click", startTest);

document.getElementById("submit-btn").addEventListener("click", () => {
  endTest(); // Call the existing endTest function to show results
  document.getElementById("submit-btn").style.display = "none"; // Hide submit button after submitting
});

// Show the typing test area when "Start Game" is clicked
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none"; // Hide the start button
  testArea.style.display = "block"; // Show the test area
  startTest(); // Start the test
});

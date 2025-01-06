document.addEventListener("DOMContentLoaded", () => {
    const motivationalParagraphs = [
      "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. Each day brings new opportunities to grow, learn, and achieve your dreams.",
      "The journey of a thousand miles begins with a single step. Take that step today, and you’ll be one step closer to your goals. Remember, persistence and determination are the keys to success.",
      "You are capable of achieving greatness. Don’t let fear or doubt hold you back. Embrace challenges as opportunities to grow, and let every setback be a setup for a comeback.",
      "Success isn’t just about reaching your destination; it’s about the lessons you learn along the way. Keep moving forward, stay positive, and trust that your hard work will pay off.",
      "Dream big and work hard. Your potential is limitless, and every effort you make brings you closer to your aspirations. Stay focused, stay determined, and never give up.",
      "Every small effort counts towards building a better tomorrow. Stay consistent, keep your vision clear, and let your passion drive you towards extraordinary achievements.",
      "Life is full of challenges, but within every challenge lies an opportunity for growth. Keep pushing forward, and don’t forget to celebrate your victories, no matter how small.",
      "You have the power to create the life you want. Stay optimistic, work diligently, and surround yourself with positivity. Great things are just around the corner."
    ];
  
    const paragraphElement = document.getElementById("motivational-paragraph");
    const generateButton = document.getElementById("generate-button");
  
    generateButton.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * motivationalParagraphs.length);
      paragraphElement.textContent = motivationalParagraphs[randomIndex];
    });
  });
  
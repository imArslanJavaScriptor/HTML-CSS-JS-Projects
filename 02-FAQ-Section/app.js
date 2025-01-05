// // Select all FAQ questions
// const faqItems = document.querySelectorAll(".faq-item");

// faqItems.forEach((item) => {
//   const question = item.querySelector(".faq-question");
//   const answer = item.querySelector(".faq-answer");
//   const toggle = item.querySelector(".faq-toggle");

//   // Add click event listener
//   question.addEventListener("click", () => {
//     // Toggle the active class
//     answer.classList.toggle("active");

//     // Change the toggle sign
//     toggle.textContent = answer.classList.contains("active") ? "-" : "+";
//   });
// });


const faqItems = document.querySelectorAll(".faq-item")
faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const toggle = item.querySelector(".faq-toggle");

    question.addEventListener("click", () => {
        answer.classList.toggle("active")
        toggle.textContent = answer.classList.contains("active") ? "-" : "+"
    })
});
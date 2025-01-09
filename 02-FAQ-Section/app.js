document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item")
  faqItems.forEach((item) => {
    const questionEl = item.querySelector(".faq-question")
    const ansEl = item.querySelector(".faq-answer")
    const tolggleEl = item.querySelector(".faq-toggle")

    questionEl.addEventListener("click", () => {
      ansEl.classList.toggle("active")
      tolggleEl.textContent  = ansEl.classList.contains("active") ? "-" : "+"  
    })
  })
})
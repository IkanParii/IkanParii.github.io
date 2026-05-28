export function setupProjectFilters({ buttons = [], cards = [] } = {}) {
  const buttonList =
    typeof buttons === "string" ? document.querySelectorAll(buttons) : buttons;
  const cardList =
    typeof cards === "string" ? document.querySelectorAll(cards) : cards;

  if (!buttonList.length || !cardList.length) return;

  const setVisible = (filter) => {
    cardList.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
    });
  };

  buttonList.forEach((button) => {
    button.addEventListener("click", () => {
      buttonList.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      setVisible(button.dataset.filter || "all");
    });
  });

  setVisible("all");
}

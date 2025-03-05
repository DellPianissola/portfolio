document.addEventListener("DOMContentLoaded", function() {
    const projetos = document.querySelectorAll(".projeto");

    projetos.forEach(projeto => {
        projeto.addEventListener("mouseenter", () => {
            projeto.style.transform = "scale(1.05)";
            projeto.style.transition = "0.3s";
        });

        projeto.addEventListener("mouseleave", () => {
            projeto.style.transform = "scale(1)";
        });
    });
});

const gradientes = [
  'linear-gradient(135deg, #1b4332 0%, #2e1c47 50%, #4a154b 100%)',
  'linear-gradient(135deg, #7209b7 0%, #f72585 50%, #4cc9f0 100%)',
  'linear-gradient(135deg, #d90429 0%, #6a040f 50%, #0077b6 100%)',
  'linear-gradient(135deg, #2b9348 0%, #007f5f 50%, #55a630 100%)',
  'linear-gradient(135deg, #3a0ca3 0%, #4361ee 50%, #4cc9f0 100%)'
];

let indiceCor = 0;

const btnCor = document.getElementById('btnCor');

if (btnCor) {
  btnCor.addEventListener('click', () => {
    indiceCor = (indiceCor + 1) % gradientes.length;
    document.body.style.background = gradientes[indiceCor];
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const containerProjetos = document.getElementById("github-projects");

  if (containerProjetos) {
    const githubUser = "mmhjoi24";

    fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated`)
      .then((response) => response.json())
      .then((repos) => {
        containerProjetos.innerHTML = "";

        if (!Array.isArray(repos) || repos.length === 0) {
          containerProjetos.innerHTML =
            '<p class="text-muted">Nenhum repositório público encontrado.</p>';
          return;
        }

        repos.slice(0, 6).forEach((repo) => {
          const col = document.createElement("div");
          col.className = "col-md-6";

          col.innerHTML = `
            <div class="card h-100 p-3 border shadow-sm">
              <h5 class="fw-bold text-success">${repo.name}</h5>
              <p class="text-muted small mb-2">${repo.description || "Sem descrição disponível."}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="badge bg-secondary">${repo.language || "Código"}</span>
                <a href="${repo.html_url}" target="_blank" rel="noopener" class="btn btn-sm btn-outline-success">
                  Ver no GitHub 🔗
                </a>
              </div>
            </div>
          `;
          containerProjetos.appendChild(col);
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar do GitHub:", error);
        containerProjetos.innerHTML =
          '<p class="text-danger">Não foi possível carregar os projetos do GitHub de momento.</p>';
      });
  }
});

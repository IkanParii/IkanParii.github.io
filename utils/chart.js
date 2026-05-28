const RADAR_LABELS = {
  "Digital Forensics & DFIR": "DFIR",
  "SIEM & Log Analysis": "SIEM",
  "CTF & Challenge Solving": "CTF",
  "OSINT & Reconnaissance": "OSINT",
  "Tool Development": "Tool Dev",
  "Web Security Analysis": "Web Sec",
};

function getRadarLabel(name) {
  if (RADAR_LABELS[name]) return RADAR_LABELS[name];
  const parts = String(name).split(" ");
  return parts.length > 2 ? parts.slice(0, 2).join(" ") : String(name);
}

export function initSkillsChart(canvas, skills = []) {
  if (!canvas || !window.Chart) return null;

  const labels = skills.map((skill) => getRadarLabel(skill.name));
  const values = skills.map((skill) => Number(skill.level) || 0);

  return new Chart(canvas.getContext("2d"), {
    type: "radar",
    data: {
      labels,
      datasets: [
        {
          label: "Skill Level",
          data: values,
          backgroundColor: "rgba(0, 212, 255, 0.07)",
          borderColor: "rgba(0, 212, 255, 0.72)",
          pointBackgroundColor: "#14b8a6",
          pointBorderColor: "rgba(0, 255, 200, 0.3)",
          pointHoverBackgroundColor: "#fff",
          borderWidth: 2.5,
          pointRadius: 4.75,
          pointHoverRadius: 6.5,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          angleLines: { color: "rgba(255,255,255,0.05)" },
          grid: { color: "rgba(255,255,255,0.05)" },
          pointLabels: {
            color: "#7a9aaa",
            font: { size: 11, family: "JetBrains Mono" },
          },
          ticks: { display: false },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(8, 13, 26, 0.95)",
          titleColor: "#e8f4f8",
          bodyColor: "#7a9aaa",
          borderColor: "rgba(0, 212, 255, 0.2)",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: (ctx) => `Proficiency: ${ctx.parsed.r}%`,
          },
        },
      },
    },
  });
}

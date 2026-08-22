const menuButton = document.querySelector("[data-menu-button]");
const siteNav = document.querySelector("[data-site-nav]");
const copyStatus = document.querySelector("[data-copy-status]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, persist = false) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle?.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeColor?.setAttribute("content", isDark ? "#111214" : "#ffffff");

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☀" : "☾";
  }

  if (persist) {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // The selected theme still applies for the current page if storage is unavailable.
    }
  }
}

applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme, true);
});

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

const citations = {
  tzpy: `@article{song2026tzpy,
  title   = {TzPy: Python Runtime for Edge Code Deployment on TrustZone},
  author  = {Song, Suhyeon and Park, Jaeyeol and Shin, Chaewon and Kwon, Donghyun},
  journal = {ACM Transactions on Embedded Computing Systems},
  volume  = {25},
  number  = {4},
  pages   = {1--25},
  year    = {2026},
  doi     = {10.1145/3817117}
}`,
  ward: `@article{shin2026ward,
  title   = {WARD: Efficient Memory Protection for WebAssembly on Tiny Embedded Systems},
  author  = {Shin, Chaewon and Han, Gowon and Song, Suhyeon and Park, Jinsun and Choi, Yoon-Ho and Kwon, Donghyun},
  journal = {IEEE Access},
  volume  = {14},
  pages   = {5925--5939},
  year    = {2026},
  doi     = {10.1109/ACCESS.2025.3650447}
}`,
  wasdom: `@article{song2025wasdom,
  title   = {WasDom: An Efficient Write Protection for Wasm JITed Code With ARM Domain},
  author  = {Song, Suhyeon and Shin, Chaewon and Kwon, Donghyun},
  journal = {IEEE Access},
  volume  = {13},
  pages   = {26260--26272},
  year    = {2025},
  doi     = {10.1109/ACCESS.2025.3537756}
}`,
  metasafer: `@article{song2023metasafer,
  title   = {metaSafer: A Technique to Detect Heap Metadata Corruption in WebAssembly},
  author  = {Song, Suhyeon and Park, Seonghwan and Kwon, Donghyun},
  journal = {IEEE Access},
  volume  = {11},
  pages   = {124887--124898},
  year    = {2023},
  doi     = {10.1109/ACCESS.2023.3327817}
}`,
  cfi: `@article{yeo2022efficient,
  title   = {Efficient CFI Enforcement for Embedded Systems Using ARM TrustZone-M},
  author  = {Yeo, Gisu and Kim, Yeryeong and Song, Suhyeon and Kwon, Donghyun},
  journal = {IEEE Access},
  volume  = {10},
  pages   = {132675--132684},
  year    = {2022},
  doi     = {10.1109/ACCESS.2022.3230791}
}`,
  "kernel-survey": `@inproceedings{shin2025intrakernel,
  title     = {A Survey of Research Trends on Intra-Kernel Privilege Separation Techniques},
  author    = {Shin, Chaewon and Kang, Hayoung and Song, Suhyeon and Kwon, Donghyun},
  booktitle = {Annual Conference of KIPS},
  volume    = {32},
  number    = {2},
  pages     = {288--291},
  year      = {2025}
}`,
  thesis: `@mastersthesis{song2024metadata,
  title  = {A Technique for Metadata Corruption Detection of WebAssembly Linear Memory},
  author = {Song, Suhyeon},
  school = {Pusan National University},
  year   = {2024}
}`,
  compiler: `@inproceedings{shin2024wasmcompiler,
  title     = {A Study on Optimization Performance of WebAssembly Compilers},
  author    = {Shin, Chaewon and Song, Suhyeon and Kwon, Donghyun},
  booktitle = {Annual Conference of KIPS},
  volume    = {31},
  number    = {1},
  pages     = {35--36},
  year      = {2024}
}`,
  fuzzer: `@inproceedings{kang2023wasmfuzzer,
  title     = {The Classification and Limitation of Coverage-based WebAssembly Fuzzer},
  author    = {Kang, Hayoung and Song, Suhyeon and Kwon, Donghyun},
  booktitle = {Annual Conference of KIPS},
  volume    = {30},
  number    = {1},
  pages     = {154--155},
  year      = {2023}
}`,
  tpmp: `@article{song2022tpmp,
  title   = {TPMP: A Privacy-Preserving Technique for DNN Prediction Using ARM TrustZone},
  author  = {Song, Suhyeon and Park, Seonghwan and Kwon, Donghyun},
  journal = {Journal of the Korea Institute of Information Security \& Cryptology},
  volume  = {32},
  number  = {3},
  pages   = {487--499},
  year    = {2022},
  doi     = {10.13089/JKIISC.2022.32.3.487}
}`,
};

function showCopyStatus(message) {
  if (!copyStatus) return;
  copyStatus.textContent = message;
  window.clearTimeout(showCopyStatus.timer);
  showCopyStatus.timer = window.setTimeout(() => {
    copyStatus.textContent = "";
  }, 1800);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

document.querySelectorAll("[data-cite]").forEach((button) => {
  button.addEventListener("click", async () => {
    const citation = citations[button.dataset.cite];
    if (!citation) return;

    try {
      await copyText(citation);
      showCopyStatus("BibTeX copied");
    } catch {
      showCopyStatus("Could not copy BibTeX");
    }
  });
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

// Простроим состояние приложения
const state = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(), // 0-11
  titleMain: "Запись на декабрь открыта",
  titleMonth: "",
  footerText: "Ближайшие свободные окна:",
  format: "story",
  background: "bg-beige",
  accentColor: "#e53935",
  availableDays: new Set(), // числа дней (1..31)
};

// DOM-элементы
let monthSelect,
  yearInput,
  titleMainInput,
  titleMonthInput,
  footerTextInput,
  backgroundSelect,
  accentColorInput,
  formatSelect,
  calendarDaysContainer,
  previewTitleMain,
  previewTitleMonth,
  previewFooterText,
  previewArtboard,
  previewWrapper,
  clearDaysBtn,
  downloadBtn;

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheDom();
  initDefaults();
  buildCalendar();
  bindEvents();
  updatePreviewTexts();
  updateBackground();
  updateFormat();
  updateAccentColor();
}

/* ====== DOM helpers ====== */

function cacheDom() {
  monthSelect = document.getElementById("monthSelect");
  yearInput = document.getElementById("yearInput");
  titleMainInput = document.getElementById("titleMainInput");
  titleMonthInput = document.getElementById("titleMonthInput");
  footerTextInput = document.getElementById("footerTextInput");
  backgroundSelect = document.getElementById("backgroundSelect");
  accentColorInput = document.getElementById("accentColorInput");
  formatSelect = document.getElementById("formatSelect");
  calendarDaysContainer = document.getElementById("calendarDays");
  previewTitleMain = document.getElementById("previewTitleMain");
  previewTitleMonth = document.getElementById("previewTitleMonth");
  previewFooterText = document.getElementById("previewFooterText");
  previewArtboard = document.getElementById("previewArtboard");
  previewWrapper = document.getElementById("previewWrapper");
  clearDaysBtn = document.getElementById("clearDaysBtn");
  downloadBtn = document.getElementById("downloadBtn");
}

function initDefaults() {
  // по умолчанию ставим следующий месяц, чтобы было похоже на "запись открыта"
  const now = new Date();
  const nextMonth = (now.getMonth() + 1) % 12;
  const yearForNextMonth =
    nextMonth === 0 ? now.getFullYear() + 1 : now.getFullYear();

  state.month = nextMonth;
  state.year = yearForNextMonth;

  monthSelect.value = String(state.month);
  yearInput.value = state.year;

  const monthName = getMonthName(state.month, "ru-gen"); // "декабря"
  const monthNameCapital = getMonthName(state.month, "ru-nom"); // "Декабрь"

  state.titleMain = `Запись на ${monthName} открыта`;
  state.titleMonth = `${monthNameCapital} ${state.year}`;

  titleMainInput.value = state.titleMain;
  titleMonthInput.value = state.titleMonth;
  footerTextInput.value = state.footerText;

  backgroundSelect.value = state.background;
  accentColorInput.value = state.accentColor;
  formatSelect.value = state.format;
}

/* ====== События ====== */

function bindEvents() {
  monthSelect.addEventListener("change", () => {
    state.month = Number(monthSelect.value);
    autoUpdateTextsForMonth();
    buildCalendar();
    updatePreviewTexts();
  });

  yearInput.addEventListener("change", () => {
    const val = Number(yearInput.value) || state.year;
    state.year = val;
    autoUpdateTextsForMonth();
    buildCalendar();
    updatePreviewTexts();
  });

  titleMainInput.addEventListener("input", () => {
    state.titleMain = titleMainInput.value;
    updatePreviewTexts();
  });

  titleMonthInput.addEventListener("input", () => {
    state.titleMonth = titleMonthInput.value;
    updatePreviewTexts();
  });

  footerTextInput.addEventListener("input", () => {
    state.footerText = footerTextInput.value;
    updatePreviewTexts();
  });

  backgroundSelect.addEventListener("change", () => {
    state.background = backgroundSelect.value;
    updateBackground();
  });

  accentColorInput.addEventListener("input", () => {
    state.accentColor = accentColorInput.value;
    updateAccentColor();
  });

  formatSelect.addEventListener("change", () => {
    state.format = formatSelect.value;
    updateFormat();
  });

  clearDaysBtn.addEventListener("click", () => {
    state.availableDays.clear();
    buildCalendar();
  });

  downloadBtn.addEventListener("click", () => {
    exportPreviewAsPng();
  });
}

/* ====== Календарь ====== */

function buildCalendar() {
  calendarDaysContainer.innerHTML = "";
  const firstDay = new Date(state.year, state.month, 1);
  const daysInMonth = new Date(state.year, state.month + 1, 0).getDate();

  // 0 = вс, 1 = пн... нам надо с понедельника
  let startWeekDay = firstDay.getDay(); // 0-6
  if (startWeekDay === 0) startWeekDay = 7;

  const totalCells = Math.ceil((startWeekDay - 1 + daysInMonth) / 7) * 7;

  let currentDay = 1;

  for (let cellIndex = 0; cellIndex < totalCells; cellIndex++) {
    const cell = document.createElement("button");
    cell.className = "calendar-day";
    cell.type = "button";

    const inner = document.createElement("div");
    inner.className = "calendar-day-inner";
    cell.appendChild(inner);

    const isBeforeFirst = cellIndex < startWeekDay - 1;
    const isAfterLast = currentDay > daysInMonth;

    if (isBeforeFirst || isAfterLast) {
      cell.classList.add("empty");
      inner.textContent = "";
    } else {
      const dayNumber = currentDay;
      inner.textContent = String(dayNumber);
      cell.dataset.day = String(dayNumber);

      // выходные
      const weekDayIndex = cellIndex % 7; // 0..6; 5,6 = сб, вс
      if (weekDayIndex === 5 || weekDayIndex === 6) {
        cell.classList.add("weekend");
      }

      if (state.availableDays.has(dayNumber)) {
        cell.classList.add("available");
      }

      cell.addEventListener("click", () => {
        toggleDay(dayNumber);
      });

      currentDay++;
    }

    calendarDaysContainer.appendChild(cell);
  }
}

function toggleDay(dayNumber) {
  if (state.availableDays.has(dayNumber)) {
    state.availableDays.delete(dayNumber);
  } else {
    state.availableDays.add(dayNumber);
  }
  buildCalendar();
}

/* ====== Тексты/вид ====== */

function updatePreviewTexts() {
  previewTitleMain.textContent =
    state.titleMain && state.titleMain.trim().length
      ? state.titleMain
      : "\u00A0"; // неразрывный пробел, чтобы блок не схлопывался

  previewTitleMonth.textContent =
    state.titleMonth && state.titleMonth.trim().length
      ? state.titleMonth
      : "\u00A0";

  previewFooterText.textContent =
    state.footerText && state.footerText.trim().length
      ? state.footerText
      : "";
}

function updateBackground() {
  previewArtboard.classList.remove("bg-beige", "bg-red", "bg-green", "bg-solid");
  previewArtboard.classList.add(state.background);
}

function updateAccentColor() {
  previewArtboard.style.setProperty("--accent-color", state.accentColor);
}

function updateFormat() {
  previewWrapper.classList.remove("format-story", "format-square", "format-post");
  if (state.format === "story") {
    previewWrapper.classList.add("format-story");
  } else if (state.format === "square") {
    previewWrapper.classList.add("format-square");
  } else if (state.format === "post") {
    previewWrapper.classList.add("format-post");
  }
}

/* ====== Авто-обновление текстов при смене месяца/года ====== */

function autoUpdateTextsForMonth() {
  const monthNameGen = getMonthName(state.month, "ru-gen"); // декабря
  const monthNameNom = getMonthName(state.month, "ru-nom"); // Декабрь

  if (!titleMainInput.value || titleMainInput.value === state.titleMain) {
    state.titleMain = `Запись на ${monthNameGen} открыта`;
    titleMainInput.value = state.titleMain;
  }

  if (!titleMonthInput.value || titleMonthInput.value === state.titleMonth) {
    state.titleMonth = `${monthNameNom} ${state.year}`;
    titleMonthInput.value = state.titleMonth;
  }
}

/* ====== Экспорт PNG ====== */

function exportPreviewAsPng() {
  const target = document.getElementById("previewArtboard");

  // чуть увеличиваем масштаб для более чёткого PNG
  const scale = 3;

  html2canvas(target, {
    backgroundColor: null,
    scale,
  }).then((canvas) => {
    const link = document.createElement("a");
    const monthNumber = String(state.month + 1).padStart(2, "0");
    link.download = `calendar-${state.year}-${monthNumber}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

/* ====== Утилита: русские месяцы ====== */
/**
 * @param {number} monthIndex 0-11
 * @param {'ru-nom'|'ru-gen'} form
 */
function getMonthName(monthIndex, form) {
  const monthsNom = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const monthsGen = [
    "январь", // в январь -> но нам лучше "январь"->"январь"? упрощаем, нужнее нижний регистр
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  // чуть красивее родительный: "января", "февраля"...
  const monthsGenNice = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  if (form === "ru-nom") {
    return monthsNom[monthIndex] || "";
  }

  return monthsGenNice[monthIndex] || monthsGen[monthIndex] || "";
}

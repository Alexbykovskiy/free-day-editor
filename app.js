// Простроим состояние приложения
const state = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(), // 0-11
  titleMain: "Запись на декабрь открыта",
  titleMonth: "",
  footerText: "Ближайшие свободные окна:",
  format: "story",
  background: "bg-beige",
  accentColor: "#22c55e", // зелёный по умолчанию

  // параметры календаря
  calendarOpacity: 0.96,
  calendarScale: 1,
  calendarOffsetX: 0,   // смещение по горизонтали
  calendarOffsetY: 0,   // смещение по вертикали
  calendarBgColor: "#f9fafb", // цвет карточки календаря

  // эффекты календаря
  calendarEffectsEnabled: true,
  calendarShadowSize: 35,      // "размер" (blur) тени
  calendarShadowOpacity: 0.45, // прозрачность тени
  calendarGlowSize: 0,         // размер свечения

  availableDays: new Set(), // свободные дни
  customBackground: null,   // dataURL пользовательского фона
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
  downloadBtn,
  uploadBgBtn,
  bgUploadInput,
  calendarOpacityInput,
  calendarScaleInput,
  calendarOffsetXInput,
  calendarOffsetYInput,
  calendarBgColorInput,
  calendarEffectsEnableInput,
  calendarShadowSizeInput,
  calendarShadowOpacityInput,
  calendarGlowSizeInput;

function init() {
  cacheDom();
  initDefaults();
  buildCalendar();
  bindEvents();
  updatePreviewTexts();
   updateBackground();
  updateFormat();
  updateAccentColor();
  updateCalendarOpacity();
  updateCalendarAppearance();

  // инициализация ползунков и чекбоксов
  if (calendarOpacityInput) {
    calendarOpacityInput.value = state.calendarOpacity;
  }
  if (calendarScaleInput) {
    calendarScaleInput.value = state.calendarScale;
  }
  if (calendarOffsetXInput) {
    calendarOffsetXInput.value = state.calendarOffsetX;
  }
  if (calendarOffsetYInput) {
    calendarOffsetYInput.value = state.calendarOffsetY;
  }
  if (calendarBgColorInput) {
    calendarBgColorInput.value = state.calendarBgColor;
  }
  if (calendarEffectsEnableInput) {
    calendarEffectsEnableInput.checked = state.calendarEffectsEnabled;
  }
  if (calendarShadowSizeInput) {
    calendarShadowSizeInput.value = state.calendarShadowSize;
  }
  if (calendarShadowOpacityInput) {
    calendarShadowOpacityInput.value = state.calendarShadowOpacity;
  }
  if (calendarGlowSizeInput) {
    calendarGlowSizeInput.value = state.calendarGlowSize;
  }
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

  // новые элементы
  uploadBgBtn = document.getElementById("uploadBgBtn");
  bgUploadInput = document.getElementById("bgUploadInput");
  calendarOpacityInput = document.getElementById("calendarOpacityInput");
// календарь — размер / положение / цвет / эффекты
  calendarScaleInput = document.getElementById("calendarScaleInput");
  calendarOffsetXInput = document.getElementById("calendarOffsetXInput");
  calendarOffsetYInput = document.getElementById("calendarOffsetYInput");
  calendarBgColorInput = document.getElementById("calendarBgColorInput");
  calendarEffectsEnableInput = document.getElementById("calendarEffectsEnableInput");
  calendarShadowSizeInput = document.getElementById("calendarShadowSizeInput");
  calendarShadowOpacityInput = document.getElementById("calendarShadowOpacityInput");
  calendarGlowSizeInput = document.getElementById("calendarGlowSizeInput");
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


// Кнопка "Добавить свой фон"
  uploadBgBtn.addEventListener("click", () => {
    bgUploadInput.click();
  });

  bgUploadInput.addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      state.customBackground = event.target.result;
      state.background = "bg-custom";
      backgroundSelect.value = "bg-solid"; // визуально что-то выбрано, но фон кастомный
      updateBackground();
    };
    reader.readAsDataURL(file);
  });

  // Прозрачность календаря
  calendarOpacityInput.addEventListener("input", () => {
    state.calendarOpacity = Number(calendarOpacityInput.value);
    updateCalendarOpacity();
  });

// Календарь — размер / положение / цвет
  calendarScaleInput.addEventListener("input", () => {
    state.calendarScale = Number(calendarScaleInput.value);
    updateCalendarAppearance();
  });

  calendarOffsetXInput.addEventListener("input", () => {
    state.calendarOffsetX = Number(calendarOffsetXInput.value);
    updateCalendarAppearance();
  });

  calendarOffsetYInput.addEventListener("input", () => {
    state.calendarOffsetY = Number(calendarOffsetYInput.value);
    updateCalendarAppearance();
  });

  calendarBgColorInput.addEventListener("input", () => {
    state.calendarBgColor = calendarBgColorInput.value;
    updateCalendarAppearance();
  });

  // Эффекты календаря
  calendarEffectsEnableInput.addEventListener("change", () => {
    state.calendarEffectsEnabled = calendarEffectsEnableInput.checked;
    updateCalendarAppearance();
  });

  calendarShadowSizeInput.addEventListener("input", () => {
    state.calendarShadowSize = Number(calendarShadowSizeInput.value);
    updateCalendarAppearance();
  });

  calendarShadowOpacityInput.addEventListener("input", () => {
    state.calendarShadowOpacity = Number(calendarShadowOpacityInput.value);
    updateCalendarAppearance();
  });

  calendarGlowSizeInput.addEventListener("input", () => {
    state.calendarGlowSize = Number(calendarGlowSizeInput.value);
    updateCalendarAppearance();
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

      // если день есть в availableDays — это свободный (зелёный кружок),
      // иначе — день занятый с красным крестиком
      if (state.availableDays.has(dayNumber)) {
        cell.classList.add("available");
      } else {
        cell.classList.add("unavailable");
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
  previewArtboard.classList.remove(
    "bg-beige",
    "bg-red",
    "bg-green",
    "bg-solid",
    "bg-custom"
  );

  if (state.customBackground && state.background === "bg-custom") {
    previewArtboard.classList.add("bg-custom");
    previewArtboard.style.backgroundImage = `url(${state.customBackground})`;
  } else {
    previewArtboard.style.backgroundImage = "";
    previewArtboard.classList.add(state.background);
  }
}
function updateAccentColor() {
  previewArtboard.style.setProperty("--accent-color", state.accentColor);
}

function updateCalendarOpacity() {
  previewArtboard.style.setProperty(
    "--calendar-opacity",
    state.calendarOpacity
  );
}

// размер / положение / эффекты календаря
function updateCalendarAppearance() {
  if (!previewArtboard) return;

  // размер и положение
  previewArtboard.style.setProperty(
    "--calendar-scale",
    state.calendarScale
  );
  previewArtboard.style.setProperty(
    "--calendar-offset-x",
    state.calendarOffsetX + "px"
  );
  previewArtboard.style.setProperty(
    "--calendar-offset-y",
    state.calendarOffsetY + "px"
  );
  previewArtboard.style.setProperty(
    "--calendar-bg-color",
    state.calendarBgColor
  );

  // эффекты
  if (!state.calendarEffectsEnabled) {
    previewArtboard.style.setProperty("--calendar-shadow", "none");
    return;
  }

  const blur = state.calendarShadowSize;
  const opacity = state.calendarShadowOpacity;
  const glow = state.calendarGlowSize;

  const baseShadow = `0 18px ${blur}px rgba(15, 23, 42, ${opacity})`;
  const glowShadow =
    glow > 0 ? `, 0 0 ${glow}px rgba(255, 255, 255, 0.7)` : "";

  previewArtboard.style.setProperty(
    "--calendar-shadow",
    baseShadow + glowShadow
  );
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

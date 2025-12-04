// Простроим состояние приложения
const state = {
calendarFontSize: 18,
calendarCardBgColor: "#ffffff",
calendarTextColor: "#111827",
  year: new Date().getFullYear(),
  month: new Date().getMonth(), // 0-11
  titleMain: "Запись на декабрь открыта",
  titleMonth: "",
  footerText: "Ближайшие свободные окна:",
titleMonthFont: "Inter",
titleMonthColor: "#1f2937",

titleMonthFontSize: 20,
titleMonthFontWeight: "400",
titleMonthFontStyle: "normal",

footerFont: "Inter",
footerColor: "#374151",
footerFontSize: 16,
footerFontWeight: "400",
footerFontStyle: "normal",
  format: "story",
  background: "bg-beige",
  accentColor: "#22c55e", // зелёный по умолчанию

 // параметры календаря
  calendarOpacity: 0.96,

  calendarScale: 1,
  calendarOffsetX: 0,
  calendarOffsetY: 0,
  calendarBgColor: "#f9fafb",

  // эффекты календаря
  calendarEffectsEnabled: true,
  calendarShadowSize: 35,      // "размер" (blur) тени
  calendarShadowOpacity: 0.45, // прозрачность тени
  calendarGlowSize: 0,         // размер свечения

  // вкл/выкл блока настроек календаря
  calendarSettingsEnabled: true,

  availableDays: new Set(), // свободные дни
  customBackground: null,   // dataURL пользовательского фона
};


// DOM-элементы
let monthSelect,
calendarFontSizeInput,
calendarCardBgColorInput,
calendarTextColorInput,
titleMonthFontSelect,
titleMonthColorInput,
footerFontSelect,
footerColorInput,
titleMonthFontSizeInput,
    titleMonthFontWeightSelect,
    titleMonthFontStyleSelect,

    footerFontSizeInput,
    footerFontWeightSelect,
    footerFontStyleSelect,
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
  calendarSettingsToggle,
  calendarSettingsGroup,
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

if (calendarCardBgColorInput) calendarCardBgColorInput.value = state.calendarCardBgColor;
if (calendarTextColorInput) calendarTextColorInput.value = state.calendarTextColor;
if (calendarFontSizeInput) calendarFontSizeInput.value = state.calendarFontSize;

if (titleMonthFontSelect) titleMonthFontSelect.value = state.titleMonthFont;
if (titleMonthColorInput) titleMonthColorInput.value = state.titleMonthColor;

if (footerFontSelect) footerFontSelect.value = state.footerFont;
if (footerColorInput) footerColorInput.value = state.footerColor;

if (titleMonthFontSizeInput) titleMonthFontSizeInput.value = state.titleMonthFontSize;
if (titleMonthFontWeightSelect) titleMonthFontWeightSelect.value = state.titleMonthFontWeight;
if (titleMonthFontStyleSelect) titleMonthFontStyleSelect.value = state.titleMonthFontStyle;

if (footerFontSizeInput) footerFontSizeInput.value = state.footerFontSize;
if (footerFontWeightSelect) footerFontWeightSelect.value = state.footerFontWeight;
if (footerFontStyleSelect) footerFontStyleSelect.value = state.footerFontStyle;


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

  if (calendarSettingsToggle) {
    calendarSettingsToggle.checked = state.calendarSettingsEnabled;
  }
  updateCalendarSettingsVisibility();

}

/* ====== DOM helpers ====== */

function cacheDom() {
calendarCardBgColorInput = document.getElementById("calendarCardBgColorInput");
calendarTextColorInput = document.getElementById("calendarTextColorInput");
titleMonthFontSelect = document.getElementById("titleMonthFontSelect");
titleMonthColorInput = document.getElementById("titleMonthColorInput");

footerFontSelect = document.getElementById("footerFontSelect");
  footerColorInput = document.getElementById("footerColorInput");

footerFontSelect = document.getElementById("footerFontSelect");
footerColorInput = document.getElementById("footerColorInput");
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
calendarFontSizeInput = document.getElementById("calendarFontSizeInput");
  // новые элементы
   // новые элементы
  uploadBgBtn = document.getElementById("uploadBgBtn");
  bgUploadInput = document.getElementById("bgUploadInput");

  calendarSettingsToggle = document.getElementById("calendarSettingsToggle");
  calendarSettingsGroup = document.getElementById("calendarSettingsGroup");

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

titleMonthFontSizeInput = document.getElementById("titleMonthFontSizeInput");
  titleMonthFontWeightSelect = document.getElementById("titleMonthFontWeightSelect");
  titleMonthFontStyleSelect = document.getElementById("titleMonthFontStyleSelect");

  footerFontSizeInput = document.getElementById("footerFontSizeInput");
  footerFontWeightSelect = document.getElementById("footerFontWeightSelect");
  footerFontStyleSelect = document.getElementById("footerFontStyleSelect");

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

if (calendarFontSizeInput) {
  calendarFontSizeInput.addEventListener("input", () => {
    state.calendarFontSize = calendarFontSizeInput.value;
    updateCalendarAppearance();
buildCalendar();
  });
}

if (calendarCardBgColorInput) {
  calendarCardBgColorInput.addEventListener("input", () => {
    state.calendarCardBgColor = calendarCardBgColorInput.value;
    updateCalendarAppearance();
  });
}

if (calendarTextColorInput) {
  calendarTextColorInput.addEventListener("input", () => {
    state.calendarTextColor = calendarTextColorInput.value;
    updateCalendarAppearance();
  });
}

  // Вкл/выкл группы настроек календаря
  if (calendarSettingsToggle) {
    calendarSettingsToggle.addEventListener("change", () => {
      state.calendarSettingsEnabled = calendarSettingsToggle.checked;
      updateCalendarSettingsVisibility();
    });
  }

if (titleMonthFontSelect) {
  titleMonthFontSelect.addEventListener("change", () => {
    state.titleMonthFont = titleMonthFontSelect.value;
    updatePreviewTexts();
  });
}

if (titleMonthFontSelect) {
  Array.from(titleMonthFontSelect.options).forEach(opt => {
    opt.style.fontFamily = opt.value;
  });
}

if (footerFontSelect) {
  Array.from(footerFontSelect.options).forEach(opt => {
    opt.style.fontFamily = opt.value;
  });
}

if (titleMonthColorInput) {
  titleMonthColorInput.addEventListener("input", () => {
    state.titleMonthColor = titleMonthColorInput.value;
    updatePreviewTexts();
  });
}

if (titleMonthFontSizeInput) {
  titleMonthFontSizeInput.addEventListener("input", () => {
    state.titleMonthFontSize = titleMonthFontSizeInput.value;
    updatePreviewTexts();
  });
}

if (titleMonthFontWeightSelect) {
  titleMonthFontWeightSelect.addEventListener("change", () => {
    state.titleMonthFontWeight = titleMonthFontWeightSelect.value;
    updatePreviewTexts();
  });
}

if (titleMonthFontStyleSelect) {
  titleMonthFontStyleSelect.addEventListener("change", () => {
    state.titleMonthFontStyle = titleMonthFontStyleSelect.value;
    updatePreviewTexts();
  });
}

if (footerFontSelect) {
  footerFontSelect.addEventListener("change", () => {
    state.footerFont = footerFontSelect.value;
    updatePreviewTexts();
  });
}

if (footerColorInput) {
  footerColorInput.addEventListener("input", () => {
    state.footerColor = footerColorInput.value;
    updatePreviewTexts();
  });
}

if (footerFontSizeInput) {
  footerFontSizeInput.addEventListener("input", () => {
    state.footerFontSize = footerFontSizeInput.value;
    updatePreviewTexts();
  });
}

if (footerFontWeightSelect) {
  footerFontWeightSelect.addEventListener("change", () => {
    state.footerFontWeight = footerFontWeightSelect.value;
    updatePreviewTexts();
  });
}

if (footerFontStyleSelect) {
  footerFontStyleSelect.addEventListener("change", () => {
    state.footerFontStyle = footerFontStyleSelect.value;
    updatePreviewTexts();
  });
}

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
  if (calendarOpacityInput) {
    calendarOpacityInput.addEventListener("input", () => {
      state.calendarOpacity = Number(calendarOpacityInput.value);
      updateCalendarOpacity();
    });
  }

 
  // Календарь — размер / положение / цвет
  if (calendarScaleInput) {
    calendarScaleInput.addEventListener("input", () => {
      state.calendarScale = Number(calendarScaleInput.value);
      updateCalendarAppearance();
    });
  }

  if (calendarOffsetXInput) {
    calendarOffsetXInput.addEventListener("input", () => {
      state.calendarOffsetX = Number(calendarOffsetXInput.value);
      updateCalendarAppearance();
    });
  }

  if (calendarOffsetYInput) {
    calendarOffsetYInput.addEventListener("input", () => {
      state.calendarOffsetY = Number(calendarOffsetYInput.value);
      updateCalendarAppearance();
    });
  }

  if (calendarBgColorInput) {
    calendarBgColorInput.addEventListener("input", () => {
      state.calendarBgColor = calendarBgColorInput.value;
      updateCalendarAppearance();
    });
  }

  // Эффекты календаря
  if (calendarEffectsEnableInput) {
    calendarEffectsEnableInput.addEventListener("change", () => {
      state.calendarEffectsEnabled = calendarEffectsEnableInput.checked;
      updateCalendarAppearance();
    });
  }

  if (calendarShadowSizeInput) {
    calendarShadowSizeInput.addEventListener("input", () => {
      state.calendarShadowSize = Number(calendarShadowSizeInput.value);
      updateCalendarAppearance();
    });
  }

  if (calendarShadowOpacityInput) {
    calendarShadowOpacityInput.addEventListener("input", () => {
      state.calendarShadowOpacity = Number(calendarShadowOpacityInput.value);
      updateCalendarAppearance();
    });
  }

  if (calendarGlowSizeInput) {
    calendarGlowSizeInput.addEventListener("input", () => {
      state.calendarGlowSize = Number(calendarGlowSizeInput.value);
      updateCalendarAppearance();
    });
  }


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

previewTitleMonth.style.setProperty("--title-month-font", state.titleMonthFont);
previewTitleMonth.style.setProperty("--title-month-font-size", state.titleMonthFontSize + "px");
previewTitleMonth.style.setProperty("--title-month-font-weight", state.titleMonthFontWeight);
previewTitleMonth.style.setProperty("--title-month-font-style", state.titleMonthFontStyle);

previewTitleMonth.style.setProperty("--title-month-color", state.titleMonthColor);

previewFooterText.style.setProperty("--footer-font", state.footerFont);

previewFooterText.style.setProperty("--footer-font-size", state.footerFontSize + "px");
previewFooterText.style.setProperty("--footer-font-weight", state.footerFontWeight);
previewFooterText.style.setProperty("--footer-font-style", state.footerFontStyle);

previewFooterText.style.setProperty("--footer-color", state.footerColor);

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
// размер / положение / эффекты календаря
function updateCalendarAppearance() {

previewArtboard.style.setProperty("--calendar-font-size", state.calendarFontSize + "px");
  if (!previewArtboard) return;

  // размер и положение
previewArtboard.style.setProperty("--calendar-card-bg-color", state.calendarCardBgColor);
previewArtboard.style.setProperty("--calendar-text-color", state.calendarTextColor);
  previewArtboard.style.setProperty("--calendar-scale", state.calendarScale);
  previewArtboard.style.setProperty("--calendar-offset-x", state.calendarOffsetX + "px");
  previewArtboard.style.setProperty("--calendar-offset-y", state.calendarOffsetY + "px");
  previewArtboard.style.setProperty("--calendar-bg-color", state.calendarBgColor);

  // если эффекты выключены – тени нет
  if (!state.calendarEffectsEnabled) {
    previewArtboard.style.setProperty("--calendar-shadow", "none");
    return;
  }

  // эффекты календаря
  const blur = state.calendarShadowSize;
  const opacity = state.calendarShadowOpacity;
  const glow = state.calendarGlowSize;

  const baseShadow = `0 18px ${blur}px rgba(15, 23, 42, ${opacity})`;
  const glowShadow = glow > 0 ? `, 0 0 ${glow}px rgba(255, 255, 255, 0.7)` : "";

// Размер ячейки привязываем к размеру шрифта
const cellSize = Math.round(state.calendarFontSize * 1.7);
previewArtboard.style.setProperty("--calendar-cell-size", cellSize + "px");

  previewArtboard.style.setProperty(
    "--calendar-shadow",
    baseShadow + glowShadow
  );
}
function updateCalendarSettingsVisibility() {
  if (!calendarSettingsGroup) return;
  calendarSettingsGroup.style.display = state.calendarSettingsEnabled ? "" : "none";
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

document.addEventListener("DOMContentLoaded", init);

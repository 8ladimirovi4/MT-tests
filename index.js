function lightenColor(hex, percent) {
  // Преобразуем HEX в RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Увеличиваем яркость
  r = Math.min(255, Math.floor(r + (255 - r) * percent));
  g = Math.min(255, Math.floor(g + (255 - g) * percent));
  b = Math.min(255, Math.floor(b + (255 - b) * percent));

  // Преобразуем RGB обратно в HEX
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}


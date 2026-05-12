import type { StorableCard } from './savedCardsStorage'

/** Пять карточек каталога; id совпадают с пунктами сайдбара. */
export const CARD_CATALOG: StorableCard[] = [
  {
    id: 'cat-7k2m',
    title: 'Рассвет',
    description: 'Короткая заметка про утренний свет и тёплый кофе перед созвоном.',
  },
  {
    id: 'cat-9p1q',
    title: 'Спринт',
    description: 'План на два часа: разобрать очередь ревью и зафиксировать решения в тикетах.',
  },
  {
    id: 'cat-3n8r',
    title: 'Архив',
    description: 'Перенести старые PDF в общую папку и проставить теги по кварталам.',
  },
  {
    id: 'cat-5w4x',
    title: 'Инструменты',
    description: 'Проверить версии CLI и обновить lockfile только после зелёного CI.',
  },
  {
    id: 'cat-2h6y',
    title: 'Выходной',
    description: 'Прогулка без экрана, напоминание выключить уведомления на вечер.',
  },
]

export function getCatalogCardById(id: string): StorableCard | undefined {
  return CARD_CATALOG.find((c) => c.id === id)
}

## Storybook

В проекте для каждого компонента описываются `story-кейсы`

Файлы со `story-кейсами` создаем рядом с компонентом с расширением `.stories.tsx`

### Запросы на сервер

Запросы на сервер мокаются с помощью функции `queryFn` из `RTK Query` и возвращаются захардкоженные данные

### Запуск

Флаг `--no-open` отключает автоматическое открытие **storybook** в новой вкладке при старте

### Скрипты

Запуск **storybook** в `development` режиме:

    npm run storybook

Сделать билд **storybook-а**:

    npm run storybook:build

### Конфигурация

[Файлы конфигурации Storybook](../config/storybook)

### Дополнительные библиотеки

`@storybook/blocks` используется для написания документации, добавления мета-информации, заголовков,
названий на отдельные страницы `story`

### Пример story

```typescript jsx
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Theme } from '@/shared/const/theme';

import { Card } from '../src/shared/ui/deprecated/Card/Card';

const meta = {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as Meta<typeof Card>;

type Story = StoryObj<typeof meta>;

// Primary card

export const Primary: Story = {
  args: {
    children: <p>Adgium Sunt accolaes imperium superbus, fortis calceuses.</p>,
  },
};

// Dark card

export const Dark: Story = {
  args: {
    children: <p>Adgium Sunt accolaes imperium superbus, fortis calceuses.</p>,
  },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

// Orange card

export const Orange: Story = {
  args: {
    children: <p>Adgium Sunt accolaes imperium superbus, fortis calceuses.</p>,
  },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

export default meta;

```

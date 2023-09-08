## Storybook

В проекте для каждого компонента описываются story-кейсы.
Запросы на сервер мокаются с помощью функции 'queryFn' из 'RTK Query' и возвращаются захардкоженные данные.

Файлы со story-кейсами создаем рядом с компонентом с расширением '.stories.tsx'

Запустить storybook можно командой:
- `npm run storybook`

Пример:

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

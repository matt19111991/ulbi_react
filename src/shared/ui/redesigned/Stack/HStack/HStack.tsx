import { forwardRef } from 'react';

import { Flex } from '../Flex/Flex';
import type { FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction' | 'ref'>;

// 'forwardRef()' устарел, здесь для примера, в 'React v.19' 'ref' можно доставать из 'props'

// от 'React.memo' нет смысла, т.к. 'forwardRef()' на каждый ререндер возвращает новую ссылку
export const HStack = forwardRef(({ children, ...rest }: HStackProps, ref: FlexProps['ref']) => (
  <Flex direction='row' ref={ref} {...rest}>
    {children}
  </Flex>
));

HStack.displayName = 'HStack';

import { forwardRef } from 'react';

import { Flex } from '../Flex/Flex';
import type { FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction' | 'ref'>;

// от 'React.memo' нет смысла, т.к. 'forwardRef()' на каждый ререндер возвращает новую ссылку
export const VStack = forwardRef(({ children, ...rest }: VStackProps, ref: FlexProps['ref']) => (
  <Flex direction='column' ref={ref} {...rest}>
    {children}
  </Flex>
));

VStack.displayName = 'VStack';

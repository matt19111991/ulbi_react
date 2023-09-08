import { forwardRef } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const HStack = forwardRef(({ children, ...rest }: HStackProps, ref: any) => (
  <Flex direction='row' ref={ref} {...rest}>
    {children}
  </Flex>
));

HStack.displayName = 'HStack';

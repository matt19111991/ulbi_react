import { forwardRef } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const VStack = forwardRef(({ align, children, ...rest }: VStackProps, ref: any) => (
  <Flex align={align} direction='column' ref={ref} {...rest}>
    {children}
  </Flex>
));

VStack.displayName = 'VStack';

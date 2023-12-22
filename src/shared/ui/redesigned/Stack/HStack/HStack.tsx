import { forwardRef } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction' | 'ref'>;

export const HStack = forwardRef(({ children, ...rest }: HStackProps, ref: FlexProps['ref']) => (
  <Flex direction='row' ref={ref} {...rest}>
    {children}
  </Flex>
));

HStack.displayName = 'HStack';

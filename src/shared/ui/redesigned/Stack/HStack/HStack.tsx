import { forwardRef } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = forwardRef(({ children, ...rest }: HStackProps, ref: any) => (
  <Flex direction='row' ref={ref} {...rest}>
    {children}
  </Flex>
));

HStack.displayName = 'HStack';

import { forwardRef } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack = forwardRef(({ align, children, ...rest }: VStackProps, ref: any) => (
  <Flex align={align} direction='column' ref={ref} {...rest}>
    {children}
  </Flex>
));

VStack.displayName = 'VStack';

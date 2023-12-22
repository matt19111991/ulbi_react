import { forwardRef } from 'react';

import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction' | 'ref'>;

export const VStack = forwardRef(
  ({ align, children, ...rest }: VStackProps, ref: FlexProps['ref']) => (
    <Flex align={align} direction='column' ref={ref} {...rest}>
      {children}
    </Flex>
  ),
);

VStack.displayName = 'VStack';

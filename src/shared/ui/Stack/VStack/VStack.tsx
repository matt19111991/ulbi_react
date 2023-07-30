import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const VStack = ({ align, children, ...rest }: VStackProps) => (
  <Flex align='start' direction='column' {...rest}>
    {children}
  </Flex>
);

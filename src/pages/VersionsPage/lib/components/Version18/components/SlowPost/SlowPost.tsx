interface SlowPostProps {
  /**
   * Текст сообщения
   */
  text: string;
}

export const SlowPost = ({ text }: SlowPostProps) => {
  const startTime = performance.now();

  while (performance.now() - startTime < 2) {
    // ничего не делать 2 мс
  }

  return <li>{text}</li>;
};

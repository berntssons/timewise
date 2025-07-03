import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { PressableProps } from 'react-native';

import { colors } from '@/utils/globalStyles';

import Button from '@/components/Button';

const ConfirmButton = (props: PropsWithChildren & PressableProps) => {
  const [isRed, setIsRed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRed && !timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setIsRed(false);
        timeoutRef.current = null;
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, [isRed]);

  return (
    <Button
      {...props}
      onPress={isRed ? props.onPress : () => setIsRed(true)}
      style={{
        borderColor: isRed ? colors.critical : colors.accent,
        position: 'relative',
      }}
    >
      {isRed ? 'Confirm' : props.children}
    </Button>
  );
};

export default ConfirmButton;

import React, { useMemo } from 'react';

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
type Justify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';

interface GetClassNameProps {
  direction?: Direction;
  gap?: string;
  justify?: Justify;
  alignItems?: AlignItems;
  wrap?: Wrap;
  overflow?: Overflow;
}

interface Props extends GetClassNameProps {
  children?: React.ReactNode;
  className?: string | string[];
  style?: React.CSSProperties;
}

export default function Flexbox({
  children,
  ...props
}: Props): React.ReactNode {
  const classProps = useMemo(() => {
    if (props.className != null) {
      return typeof props.className === 'string'
        ? props.className
        : props.className.join(' ');
    }
    return props.className;
  }, [props.className]);

  const className = getClassName(
    {
      ...props,
    },
    classProps
  );
  return <div className={className}>{children}</div>;
}

function getDirection(direction: Direction): string {
  switch (direction) {
    case 'row':
      return 'flex-row';
    case 'column':
      return 'flex-col';
    case 'row-reverse':
      return 'flex-row-reverse';
    case 'column-reverse':
      return 'flex-col-reverse';
  }
}

function getClassName(
  props: GetClassNameProps,
  extraClassName?: string
): string {
  const { direction, gap, justify, alignItems, wrap, overflow } = props;
  const styles = ['flex'];
  if (direction != null) {
    styles.push(getDirection(direction));
  }
  if (gap != null) {
    styles.push(`gap-${gap}`);
  }
  if (justify != null) {
    styles.push(`justify-${justify}`);
  }
  if (alignItems != null) {
    styles.push(`items-${alignItems}`);
  }
  if (wrap != null) {
    styles.push(`flex-${wrap}`);
  }
  if (overflow != null) {
    styles.push(`overflow-${overflow}`);
  }
  const baseClassName = styles.join(' ');
  return [baseClassName, extraClassName].filter(val => val != null).join(' ');
}

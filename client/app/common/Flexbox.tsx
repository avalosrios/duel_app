import React, { useMemo } from 'react';

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
type Justify = 'start' | 'end' | 'center' | 'between' | 'around';
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';

interface GetClassNameProps {
  direction?: Direction;
  gap?: string;
  justify?: Justify;
  alignItems?: AlignItems;
  wrap?: Wrap;
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
  const { direction, gap, justify, alignItems, wrap } = props;
  const styles = ['flex'];
  if (direction) {
    styles.push(getDirection(direction));
  }
  if (gap) {
    styles.push(`gap-${gap}`);
  }
  if (justify) {
    styles.push(`justify-${justify}`);
  }
  if (alignItems) {
    styles.push(`items-${alignItems}`);
  }
  if (wrap) {
    styles.push(`flex-${wrap}`);
  }
  const baseClassName = styles.join(' ');
  return [baseClassName, extraClassName].filter(val => val != null).join(' ');
}

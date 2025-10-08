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

const directionMap: Record<Direction, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
} as const;

const justifyMap: Record<Justify, string> = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

const alignMap: Record<AlignItems, string> = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
} as const;

const overflowMap: Record<Overflow, string> = {
  visible: 'overflow-visible',
  hidden: 'overflow-hidden',
  scroll: 'overflow-scroll',
  auto: 'overflow-auto',
  clip: 'overflow-clip',
} as const;

const wrapMap: Record<Wrap, string> = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

function getClassName(
  props: GetClassNameProps,
  extraClassName?: string
): string {
  const {
    direction: directionProp,
    gap,
    justify,
    alignItems,
    wrap,
    overflow,
  } = props;
  const styles = ['flex'];
  const direction = directionProp ?? 'row';
  if (direction != null) {
    styles.push(directionMap[direction]);
  }
  if (gap != null) {
    styles.push(`gap-${gap}`);
  }
  if (justify != null) {
    styles.push(justifyMap[justify]);
  }
  if (alignItems != null) {
    styles.push(alignMap[alignItems]);
  }
  if (wrap != null) {
    styles.push(wrapMap[wrap]);
  }
  if (overflow != null) {
    styles.push(overflowMap[overflow]);
  }
  const baseClassName = styles.join(' ');
  return [baseClassName, extraClassName].filter(val => val != null).join(' ');
}

function horiz(value: number): string {
  return `px-${value}`;
}

function ver(value: number): string {
  return `py-${value}`;
}

function all(value: number): string {
  return `p-${value}`;
}

function top(value: number): string {
  return `pt-${value}`;
}

function bottom(value: number): string {
  return `pb-${value}`;
}

function end(value: number): string {
  return `pr-${value}`;
}

function start(value: number): string {
  return `pl-${value}`;
}

const stylePadding = {
  horiz,
  ver,
  top,
  bottom,
  end,
  start,
  all,
};

export default stylePadding;

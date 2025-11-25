export const filterProps = <
  T extends object,
  K extends keyof T,
  PickIt extends boolean = false
>(
  props: T,
  keys: K[],
  pick?: PickIt
) => {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) =>
      pick ? keys.includes(key as K) : !keys.includes(key as K)
    )
  ) as PickIt extends true ? Pick<T, K> : Omit<T, K>;
};

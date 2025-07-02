export interface UseCase<TArgs, TResult> {
  execute(...args: TArgs[]): TResult | Promise<TResult>;
}

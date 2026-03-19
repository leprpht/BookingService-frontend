import { WritableSignal } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, tap } from 'rxjs';
import { finalize } from 'rxjs/operators';

export interface LoadingStateOptions<T> {
  loading: WritableSignal<boolean>;
  error?: WritableSignal<string | null>;
  errorMessage?: string | ((err: unknown) => string);
  onNext?: (value: T) => void;
}

export function withLoadingState<T>(options: LoadingStateOptions<T>): MonoTypeOperatorFunction<T> {
  const { loading, error, errorMessage, onNext } = options;

  return (source: Observable<T>): Observable<T> =>
    new Observable((subscriber) => {
      loading.set(true);
      error?.set(null);

      const subscription = source
        .pipe(
          tap({
            next: (value) => onNext?.(value),
            error: (err: unknown) => {
              if (error) {
                const msg =
                  typeof errorMessage === 'function'
                    ? errorMessage(err)
                    : (errorMessage ?? 'An unexpected error occurred. Please try again.');
                error.set(msg);
              }
            },
          }),
          finalize(() => loading.set(false)),
        )
        .subscribe(subscriber);

      return () => subscription.unsubscribe();
    });
}

export interface AppendLoadingStateOptions<T> extends Omit<LoadingStateOptions<T>, 'loading'> {
  loadingMore: WritableSignal<boolean>;
}

export function withAppendLoadingState<T>(
  options: AppendLoadingStateOptions<T>,
): MonoTypeOperatorFunction<T> {
  return withLoadingState({ ...options, loading: options.loadingMore });
}

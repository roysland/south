/**
 * Thin wrapper around local storage which simplifies (de)serialization and default values.
 * By default, (de)serializes as JSON.
 */
export function storage<T>(
    key: string,
    defaultValue: T,
    serialize: (value: T) => string = JSON.stringify,
    deserialize: (value: string) => T = JSON.parse
  ) {
    return {
      get value(): T {
        try {
          const value = localStorage.getItem(key)
          return value ? deserialize(value) : defaultValue
        } catch {
          return defaultValue
        }
      },
  
      set value(value: T) {
        try {
          localStorage.setItem(key, serialize(value))
        } catch {
          //  nothing we can do here
        }
      },
    }
  }
  
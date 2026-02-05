import type { defaultTheme } from "./default";

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends Array<infer U>
        ? Array<Widen<U>>
        : T extends object
          ? { -readonly [K in keyof T]: Widen<T[K]> }
          : T;

export type ThemeConfig = Widen<typeof defaultTheme>;

export type ThemeTokens = Pick<ThemeConfig, "lightTheme" | "darkTheme" | "shadows">;

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer _U>
    ? T[K]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

export type ThemeOverrides = DeepPartial<ThemeConfig>;

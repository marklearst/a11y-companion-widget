/**
 * Type definitions for design system primitives
 *
 * These types provide strict typing for all primitive values in the design system,
 * ensuring consistency and catching errors at compile time.
 */

// ============================================
// Color Types
// ============================================

export interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
  };
  surface: {
    default: string;
    hover: string;
    active: string;
    disabled: string;
  };
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

// ============================================
// Typography Types
// ============================================

export interface FontSize {
  xs: number; // 11px
  sm: number; // 12px
  base: number; // 14px
  md: number; // 16px
  lg: number; // 18px
  xl: number; // 20px
  "2xl": number; // 24px
  "3xl": number; // 28px
  "4xl": number; // 32px
  "5xl": number; // 40px
  "6xl": number; // 48px
}

export interface FontWeight {
  thin: WidgetJSX.FontWeight; // 100
  extralight: WidgetJSX.FontWeight; // 200
  light: WidgetJSX.FontWeight; // 300
  normal: WidgetJSX.FontWeight; // 400
  medium: WidgetJSX.FontWeight; // 500
  semibold: WidgetJSX.FontWeight; // 600
  bold: WidgetJSX.FontWeight; // 700
  extrabold: WidgetJSX.FontWeight; // 800
  black: WidgetJSX.FontWeight; // 900
}

export interface LineHeight {
  none: number; // 1.0
  tight: number; // 1.25
  snug: number; // 1.375
  normal: number; // 1.5
  relaxed: number; // 1.625
  loose: number; // 2.0
}

export interface LetterSpacing {
  tighter: string; // -0.05em
  tight: string; // -0.025em
  normal: string; // 0
  wide: string; // 0.025em
  wider: string; // 0.05em
  widest: string; // 0.1em
}

// ============================================
// Spacing Types
// ============================================

export interface SpacingScale {
  0: number; // 0px
  px: number; // 1px
  0.5: number; // 2px
  1: number; // 4px
  1.5: number; // 6px (removed - not in mathematical scale)
  2: number; // 8px
  2.5: number; // 10px (removed - not in mathematical scale)
  3: number; // 12px
  3.5: number; // 14px (removed - not in mathematical scale)
  4: number; // 16px
  5: number; // 20px
  6: number; // 24px
  7: number; // 28px (removed - not in mathematical scale)
  8: number; // 32px
  9: number; // 36px (removed - not in mathematical scale)
  10: number; // 40px
  11: number; // 44px (removed - not in mathematical scale)
  12: number; // 48px
  14: number; // 56px
  16: number; // 64px
  20: number; // 80px
  24: number; // 96px
  28: number; // 112px (removed - not in mathematical scale)
  32: number; // 128px
}

// Simplified spacing scale following mathematical progression
export type Spacing =
  | 0
  | 1
  | 2
  | 4
  | 8
  | 12
  | 16
  | 20
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64
  | 80
  | 96
  | 128;

// ============================================
// Sizing Types
// ============================================

export interface IconSizes {
  xs: number; // 12px
  sm: number; // 16px
  base: number; // 20px
  md: number; // 24px
  lg: number; // 32px
  xl: number; // 40px
}

export interface ComponentSizes {
  button: {
    height: {
      sm: number;
      md: number;
      lg: number;
    };
    minWidth: number;
  };
  input: {
    height: {
      sm: number;
      md: number;
      lg: number;
    };
  };
  checkbox: {
    size: number;
  };
  badge: {
    height: number;
    minWidth: number;
  };
}

// ============================================
// Border Types
// ============================================

export interface BorderWidth {
  none: number; // 0
  thin: number; // 1px
  base: number; // 2px
  thick: number; // 4px
}

export interface BorderRadius {
  none: number; // 0
  sm: number; // 4px
  base: number; // 8px
  md: number; // 12px
  lg: number; // 16px
  xl: number; // 20px
  "2xl": number; // 24px
  full: number; // 9999px
}

// ============================================
// Shadow Types
// ============================================

export interface Shadow {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread?: number;
  color: string;
}

export interface ShadowScale {
  none: Shadow[];
  sm: Shadow[];
  base: Shadow[];
  md: Shadow[];
  lg: Shadow[];
  xl: Shadow[];
  "2xl": Shadow[];
  inner: Shadow[];
}

// ============================================
// Opacity Types
// ============================================

export interface OpacityScale {
  0: number; // 0
  10: number; // 0.1
  25: number; // 0.25
  50: number; // 0.5
  75: number; // 0.75
  90: number; // 0.9
  100: number; // 1.0
}

// ============================================
// Gradient Types
// ============================================

export interface GradientStop {
  color: string;
  position: number; // 0-1
}

export interface LinearGradient {
  type: "linear";
  angle: number; // 0-360
  stops: GradientStop[];
}

export interface RadialGradient {
  type: "radial";
  stops: GradientStop[];
}

export interface AngularGradient {
  type: "angular";
  angle: number;
  stops: GradientStop[];
}

export interface DiamondGradient {
  type: "diamond";
  stops: GradientStop[];
}

export type Gradient =
  | LinearGradient
  | RadialGradient
  | AngularGradient
  | DiamondGradient;

// ============================================
// Blend Mode Types
// ============================================

export type BlendMode =
  | "pass-through"
  | "normal"
  | "darken"
  | "multiply"
  | "color-burn"
  | "lighten"
  | "screen"
  | "color-dodge"
  | "overlay"
  | "soft-light"
  | "hard-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

// ============================================
// Layout Types
// ============================================

export interface ZIndex {
  base: number;
  dropdown: number;
  sticky: number;
  modal: number;
  popover: number;
  tooltip: number;
}

export type Overflow = "visible" | "hidden" | "scroll";

export type Alignment = "min" | "center" | "max";

export interface LayoutConstants {
  zIndex: ZIndex;
  overflow: {
    visible: Overflow;
    hidden: Overflow;
    scroll: Overflow;
  };
  alignment: {
    start: Alignment;
    center: Alignment;
    end: Alignment;
  };
}

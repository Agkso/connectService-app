/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#FFB800';
const tintColorDark = '#FFB800';

  export const Colors = {
  light: {
    text: '#F5F5F5',
    background: '#111111',
    tint: '#FFB800',

    icon: '#A0A0A0',

    tabIconDefault: '#A0A0A0',
    tabIconSelected: '#FFB800',

    card: '#1A1A1A',

    secondary: '#2ED3FF',

    textSecondary: '#A0A0A0',
  },

  dark: {
    text: '#F5F5F5',
    background: '#111111',
    tint: '#FFB800',

    icon: '#A0A0A0',

    tabIconDefault: '#A0A0A0',
    tabIconSelected: '#FFB800',

    card: '#1A1A1A',

    secondary: '#2ED3FF',

    textSecondary: '#A0A0A0',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

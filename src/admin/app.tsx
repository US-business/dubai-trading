import type { StrapiApp } from '@strapi/strapi/admin';

// Use custom favicon with a unique name to avoid caching issues
import faviconPng from './extensions/favicon.png';

// Add a timestamp to prevent caching


export default {
  config: {
    locales: ['ar', 'en'],  // Add Arabic support
    // تخصيص النصوص (بما في ذلك رسالة الترحيب)
    translations: {
      en: {
        'Auth.form.welcome.title': 'مرحبًا بك في لوحة التحكم!',
        'Auth.form.welcome.subtitle': 'الرجاء تسجيل الدخول لإدارة المحتوى',

        "app.components.HomePage.welcome": "لوحة التحكم",
        "app.components.HomePage.welcome.again": "إظهار أكثر",
      }, 
    },

    // replace favicon with a custom icon
    head: {
      favicon: faviconPng,
      // Add additional favicon links to ensure browser picks up the changes

    },

    theme: {
      dark: {
        colors: {
          primary100: 'hsl(149, 12.10%, 53.10%)', // selected
          primary200: 'hsl(196, 100%, 29.40%)', // border 3
          primary500: 'hsl(150, 100.00%, 82.90%)', // text hover 2
          primary600: 'hsl(150, 33.30%, 98.80%)',  // icon active
          primary700: 'hsl(0, 0%, 100%)', // text active

          buttonPrimary500: 'hsl(36, 68.10%, 72.90%)', // button hover
          buttonPrimary600: 'hsl(41, 55.20%, 45.50%)', // button

          neutral0: 'hsl(180, 14.50%, 21.60%)', // aside menu
          neutral100: 'hsl(180, 5.10%, 11.60%)', // background
          neutral200: 'hsl(196, 87%, 57%)', // border 1
          neutral500: 'hsl(150, 20.00%, 98.00%)', // icon
          neutral600: 'hsl(320, 14.30%, 95.90%)',
          neutral700: 'hsl(330, 13%, 91.00%)',

          secondary100: 'hsl(46, 97%, 65%)',
          secondary200: 'hsl(43, 96%, 56%)',
          secondary500: 'hsl(38, 92%, 50%)',
          secondary600: 'hsl(32, 95%, 44%)',
          secondary700: 'hsl(26, 90%, 37%)',

          success100: 'hsl(40, 62.30%, 79.20%)', // background published
          success200: 'hsl(26, 90%, 37%)', // border published
          success500: 'hsl(0, 0%, 100%)',
          success600: 'hsl(0, 0.00%, 10.60%)', // text published
          success700: 'hsl(0, 0.00%, 0.00%)',

          warning100: 'hsl(15, 94.10%, 78.00%)',
          warning200: 'hsl(15, 20.00%, 50.00%)',
          warning500: 'hsl(15, 15%, 70%)',
          warning600: 'hsl(15, 15%, 70%)',
          warning700: 'hsl(15, 15%, 70%)',

          danger100: 'hsl(309, 31.80%, 25.90%)', // background hover
          danger200: 'hsl(0, 100%, 91.00%)',
          danger500: 'hsl(360, 90%, 55%)',
          danger600: 'hsl(0, 100%, 84.90%)', // text undo
          danger700: 'hsl(0, 0.00%, 0.00%)',

          // Extra - Electric Blue
          info100: 'hsl(188, 90%, 50%)',
          info500: 'hsl(108, 89.80%, 50.00%)',

          // Loading Spinner Colors
          alternative100: 'hsl(41, 55.2%, 45.5%)',
          alternative200: 'hsl(36, 68.1%, 72.9%)',
          alternative500: 'hsl(41, 55.2%, 45.5%)',
          alternative600: 'hsl(36, 68.1%, 72.9%)',
          alternative700: 'hsl(41, 55.2%, 45.5%)',

        },
      }
    },
  },
  bootstrap(app: StrapiApp) {
    // Bootstrap function
  },
};

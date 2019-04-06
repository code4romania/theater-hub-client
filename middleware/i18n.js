export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale;
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;

  // Get locale from params
  const locale = route.query.lang || store.getters.locale || defaultLocale;

  if (!locale) {
    return error({ statusCode: 404 });
  }

  if (locale !== app.i18n.locale) {
    store.dispatch('setLocaleWithoutRedirect', locale);
  }

  app.i18n.locale = locale;
}

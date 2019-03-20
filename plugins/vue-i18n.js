import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.getters.locale,
    fallbackLocale: 'ro',
    messages: {
        'ro': require('~/locales/ro.json'),
        'en': require('~/locales/en.json')
    }
  });
}

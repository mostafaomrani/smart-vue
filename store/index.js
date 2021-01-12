import directory from "@/api/directory";

export const state = () => ({
  drawer: true,
  locales: ['en', 'fr','fa'],
  locale: 'fa'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  }
}


export const lang = directory.fa;
export const baseUrl = "http://192.168.0.8:8080";



export function incCounter() {
    counter++;
}



// import { vuexOidcCreateStoreModule } from 'vuex-oidc'
// import { oidcSettings } from '../config/oidc'
// // NOTE: If you want to customize how tokens are stored you can use WebStorageStateStore from oidc-client (see bellow)
// // Default storage is window.localStorage
// // import { WebStorageStateStore } from 'oidc-client'

// const storeModule = vuexOidcCreateStoreModule(
//   oidcSettings,

//   {
//     namespaced: true,
//     dispatchEventsOnWindow: true,
//     publicRoutePaths: ['/', 'oidc-callback-error']
//   },
//   // Optional OIDC event listeners
//   {
//     userLoaded: (user) => {
//       localStorage.token = user.access_token
//       // console.log('OIDC user is loaded:', user)
//     },
//     userUnloaded: () => console.log('OIDC user is unloaded'),
//     accessTokenExpiring: () => console.log('Access token will expire'),
//     accessTokenExpired: () => console.log('Access token did expire'),
//     silentRenewError: () => console.log('OIDC user is unloaded'),
//     userSignedOut: () => console.log('OIDC user is signed out')
//   }
// )

// export const state = () => (storeModule.state)

// export const getters = storeModule.getters

// export const actions = storeModule.actions

// export const mutations = storeModule.mutations

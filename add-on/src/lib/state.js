'use strict'
/* eslint-env browser, webextensions */

// The State
// ===================================================================
const offlinePeerCount = -1

function initState (options) {
  const state = {}
  // we store the most used values in optimized form
  // to minimize performance impact on overall browsing experience
  state.peerCount = offlinePeerCount
  state.ipfsNodeType = options.ipfsNodeType
  state.pubGwURL = new URL(options.publicGatewayUrl)
  state.pubGwURLString = state.pubGwURL.toString()
  state.redirect = options.useCustomGateway
  state.apiURL = new URL(options.ipfsApiUrl)
  state.apiURLString = state.apiURL.toString()
  state.gwURL = new URL(options.customGatewayUrl)
  state.gwURLString = state.gwURL.toString()
  state.automaticMode = options.automaticMode
  state.linkify = options.linkify
  state.dnslink = options.dnslink
  state.preloadAtPublicGateway = options.preloadAtPublicGateway
  state.catchUnhandledProtocols = options.catchUnhandledProtocols
  state.displayNotifications = options.displayNotifications
  return state
}

// Browser Feature Detection
// ===================================================================

exports.inFirefox = function () {
  // TODO: switch to (await browser.runtime.getBrowserInfo()).name
  return !!navigator.userAgent.match('Firefox')
}

exports.browserWithNativeProtocol = function () {
  return browser && browser.protocol && browser.protocol.registerStringProtocol
}

exports.embeddedNodeIsActive = function (state) {
  return state.ipfsNodeType === 'embedded'
}

exports.initState = initState
exports.offlinePeerCount = offlinePeerCount

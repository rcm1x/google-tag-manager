const makeInteger = require('makeInteger');
const injectScript = require('injectScript');
const copyFromWindow = require('copyFromWindow');
const setInWindow = require('setInWindow');
const callInWindow = require('callInWindow');

const RCMX_TAG_URL = 'https://getrcmx.com/i/tag.js';
const RCMX_KEY = 'rcm1x';
const RCMX_STAGE_ID = makeInteger(data.stage_id);

const rcmx = {
  config: { lang: data.lang, size: data.size },
  init: () => {
    rcmx.loadDataLayer();
    rcmx.sendEventInit();
    rcmx.loadScript(() => rcmx.done());
  },
  loadDataLayer: () => {
    setInWindow(RCMX_KEY, copyFromWindow(RCMX_KEY) || rcmxPush, false);

    function rcmxPush() {
      const eventsArray = copyFromWindow(RCMX_KEY + '.i') || [];
      setInWindow(RCMX_KEY + '.i', eventsArray, false);
      callInWindow(RCMX_KEY + '.i.push', arguments);
    }
  },
  loadScript: (onLoad) => {
    injectScript(RCMX_TAG_URL, onLoad, data.gtmOnFailure, RCMX_KEY);
  },
  sendEventInit: () => {
    callInWindow(RCMX_KEY, RCMX_STAGE_ID, 'init', rcmx.config);
  },
  done: () => {
    data.gtmOnSuccess();
  },
};

rcmx.init();

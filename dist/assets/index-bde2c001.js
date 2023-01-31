import { f as forEach } from "./vendor-83735399.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const getURLParameters = (url) => (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
  (a, v) => (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1), a),
  {}
);
const footerContainer = "_footer-container_1voly_1";
const footerCs = "_Footer_Cs_1voly_7";
const styleObj = {
  footerContainer,
  footerCs
};
const variable = "";
const ele = document.createElement("div");
ele.classList.add(styleObj.footerContainer);
document.body.appendChild(ele);
getURLParameters(window.location.href);
let p1 = {
  name: "张三",
  age: 18
};
console.log(p1);
console.log("1");
let arr = [1, 2, 3];
forEach(arr, (item) => {
  console.log("------ttt--------", item);
});

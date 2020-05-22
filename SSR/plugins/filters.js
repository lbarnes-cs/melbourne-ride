import Vue from "vue";

Vue.filter("capitalize", (val) => val.toUpperCase());

Vue.filter("striphtml", (val) => val.replace(/(<([^>]+)>)/gi, ""));

Vue.filter("apostrophe", (val) => val.replace("&#8217;", "'"));

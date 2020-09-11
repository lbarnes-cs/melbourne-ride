import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
};

export const state = () => ({
    previousRides: [],
    aims: [],
    faqs: [],
    supporters: [],
    aboutPage: {},
    event: {},
    mediaPage: {},
    themeSettings: {},
    socialMedia: {},
});

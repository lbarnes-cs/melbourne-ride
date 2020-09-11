import { API_ENDPOINTS } from "@/data/api-config";

export default {
    async nuxtServerInit({ commit }, { $http }) {
        const [themeSettings] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.themeSettings,
        );

        commit("ThemeSettings", themeSettings.acf);
    },
};

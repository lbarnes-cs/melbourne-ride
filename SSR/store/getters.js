export default {
    getRideDetails: (state) => state.event,
    upcomingRideDate: (state) => state.event.acf.date_and_time,
    socialMedia: (state) => state.socialMedia,
    themeSettings: (state) => state.themeSettings,
};

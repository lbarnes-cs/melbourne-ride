export default {
    PreviousRidesPosts(state, posts) {
        posts = posts.map((ride) => ({
            id: ride.id,
            slug: ride.slug,
            title: ride.title.rendered,
            content: ride.content.rendered,
            featureImage: ride.fimg_url,
            attachment_count: ride.attachment_count,
            acf: ride.acf,
        }));

        state.previousRides = posts;
    },

    AimsPosts(state, posts) {
        state.aims = posts;
    },

    AboutPage(state, post) {
        post = {
            id: post.id,
            slug: post.slug,
            title: post.title.rendered,
            content: post.content.rendered,
            acf: post.acf,
        };
        state.aboutPage = post;
    },

    FaqsPosts(state, posts) {
        const faqs = posts.map((faq) => ({
            id: faq.id,
            slug: faq.slug,
            title: faq.title.rendered,
            content: faq.content.rendered,
            acf: faq.acf,
        }));

        state.faqs = faqs;
    },

    SupportersPosts(state, posts) {
        const supporters = posts.map((supporter) => ({
            id: supporter.id,
            slug: supporter.slug,
            featureImage: supporter.fimg_url,
            title: supporter.title.rendered,
            content: supporter.content.rendered,
            acf: supporter.acf,
        }));

        state.supporters = supporters;
    },

    EventPage(state, post) {
        post = {
            title: post.title.rendered,
            content: post.content.rendered,
            contentBuilder: post.acf.content_builder,
            callToAction: post.acf.call_to_action,
            acf: post.acf,
            hideButtonCta: post.acf.hideButtonCTA,
        };

        state.event = post;
    },

    MediaPage(state, post) {
        state.mediaPage = post;
    },

    SocialMedia(state, links) {
        state.socialMedia = links;
    },

    ThemeSettings(state, settings) {
        state.themeSettings = {
            hero_banner: settings.hero_banner,
            subscription: settings.subscription,
        };

        state.socialMedia = settings.socialMedia;
    },
};

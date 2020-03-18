<template lang="html">
    <div id="about" class="section about">
        <v-container>
            <h2 class="display-2 text-center">About Us</h2>
            <p>
                In 2020, the Melbourne's ride returns, bringing more awareness
                to the streets of this wonderful city!!!
            </p>

            <p>
                Cycling is a healthy, low-impact exercise that can be enjoyed by
                people of all ages, from young children to older adults. It is
                also fun, cheap and good for the environment
            </p>

            <p>
                Our riders are as vulnerable as the planet that we live on due
                to the over reliance on non sustainable sources of energy. We
                set an example by choosing an environmentally friendly transport
                choice. Ditch your car, grab a bike, and do your health and the
                earth a big favour.
            </p>

            <p>
                And why is it that cyclists continue to be killed and injured on
                our roads, by car drivers who claim not to be able to see
                bicycles. The excuses by some motorists that they fail to see
                cyclists are totally unacceptable.
            </p>

            <blockquote class="blockquote">
                <v-icon x-large class="blockquote__icon yellow--text lighten-5">
                    mdi-help-circle-outline
                </v-icon>
                Can you see me now?
            </blockquote>

            <p>
                The ride encourages drivers to take notice of cyclists, and
                promotes cyclist safety
            </p>

            <p>
                In the ten years to 2012, there were an average of eight bike
                rider fatalities and 413 serious injuries per year.
            </p>

            <p>
                A total of 22 per cent of all on-road crashes also occurred
                while cyclists were riding in a marked bicycle lane,
                demonstrating they are not sufficient to completely protect
                cyclists
            </p>

            <blockquote class="blockquote">
                <v-icon x-large class="blockquote__icon red--text lighten-5">
                    mdi-information-outline
                </v-icon>
                Healthy mind, healthy body
            </blockquote>

            <p>
                Active transportation improves our health and the health of our
                communities. It also lowers our healthcare costs. The more
                people walk and bike the more we lower those costs as we reduce
                the levels of obesity, heart disease, and Type 2 diabetes.
            </p>

            <p>
                To be fit and healthy you need to be physically active. Regular
                physical activity can help protect you from serious diseases
                such as obesity, heart disease, cancer, mental illness, diabetes
                and arthritis. Riding your bicycle regularly is one of the best
                ways to reduce your risk of health problems associated with a
                sedentary lifestyle.
            </p>

            <p>
                It’s also a fun and free event!
            </p>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "About",
};
</script>

<style lang="scss" scoped>
.about {
    background: map-get($indigo, "darken-1");

    .blockquote {
        margin: (map-get($spaces, "onehalf")) auto;
        padding: (map-get($spaces, "one"));
        border: solid (map-get($grey, "lighten-2"));
        border-width: 1px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 500px;
        font-size: 24px;
        font-weight: 500;
        text-align: center;

        &__icon {
            margin: 0 0 (map-get($spaces, "half"));
        }
    }
}
</style>

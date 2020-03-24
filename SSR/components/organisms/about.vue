<template lang="html">
    <div id="about" class="about">
        <h2 class="display-2 text-center">About Us</h2>
        <p>
            In 2020, the Melbourne's ride returns, bringing more awareness to
            the streets of this wonderful city!!!
        </p>

        <p>
            Cycling is a healthy, low-impact exercise that can be enjoyed by
            people of all ages, from young children to older adults. It is also
            fun, cheap and good for the environment
        </p>

        <p>
            Our riders are as vulnerable as the planet that we live on due to
            the over reliance on non sustainable sources of energy. We set an
            example by choosing an environmentally friendly transport choice.
            Ditch your car, grab a bike, and do your health and the earth a big
            favour.
        </p>

        <p>
            And why is it that cyclists continue to be killed and injured on our
            roads, by car drivers who claim not to be able to see bicycles. The
            excuses by some motorists that they fail to see cyclists are totally
            unacceptable.
        </p>

        <h3 class="headline about__headline">Can you see me now?</h3>

        <p>
            The ride encourages drivers to take notice of cyclists, and promotes
            cyclist safety
        </p>

        <p>
            In the ten years to 2012, there were an average of eight bike rider
            fatalities and 413 serious injuries per year.
        </p>

        <p>
            A total of 22 per cent of all on-road crashes also occurred while
            cyclists were riding in a marked bicycle lane, demonstrating they
            are not sufficient to completely protect cyclists
        </p>

        <h3 class="headline about__headline">Healthy mind, healthy body</h3>

        <p>
            Active transportation improves our health and the health of our
            communities. It also lowers our healthcare costs. The more people
            walk and bike the more we lower those costs as we reduce the levels
            of obesity, heart disease, and Type 2 diabetes.
        </p>

        <p>
            To be fit and healthy you need to be physically active. Regular
            physical activity can help protect you from serious diseases such as
            obesity, heart disease, cancer, mental illness, diabetes and
            arthritis. Riding your bicycle regularly is one of the best ways to
            reduce your risk of health problems associated with a sedentary
            lifestyle.
        </p>

        <p>
            It’s also a fun and free event!
        </p>
    </div>
</template>

<script>
export default {
    name: "About",
};
</script>

<style lang="scss" scoped>
.about {
    &__headline {
        margin: map-get($spaces, "double") 0 map-get($spaces, "one");
    }
}
</style>

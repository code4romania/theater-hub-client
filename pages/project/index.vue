<template>
  <div class="nuxt-wrapper">
    <Hero/>
    <v-container>
      <v-layout row wrap justify-space-between mt-5>
        <v-flex md8>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
          <p>
            <a href="#">Share</a>
          </p>
          <h2>Help Needed</h2>
          <v-timeline dense clipped>
            <v-timeline-item class="mb-3" large fill-dot>
              <template v-slot:icon>
                <span>JL</span>
              </template>
              <v-layout justify-space-between>
                <v-flex
                  xs9
                >We are in search of a Sound Designer that can help us with all he setup necessary for our play between march and april 2019. We need a person who can use his own equipment .</v-flex>
              </v-layout>
            </v-timeline-item>
            <v-timeline-item class="mb-3" large fill-dot>
              <v-layout justify-space-between>
                <v-flex xs9>
                  <v-chip class="white--text ml-0" color="purple" label small>IMPORTANT</v-chip>We are in search of three camera operators that can help us with all he setup necessary for our play between march and april 2019. We need a person who can use his own equipment This is a paid position.
                </v-flex>
              </v-layout>
            </v-timeline-item>
            <v-timeline-item class="mb-3" large fill-dot>
              <v-layout justify-space-between>
                <v-flex
                  xs9
                >We are in search of a Sound Designer that can help us with all he setup necessary for our play between march and april 2019. We need a person who can use his own equipment .</v-flex>
              </v-layout>
            </v-timeline-item>
            <v-timeline-item class="mb-3" large fill-dot>
              <v-layout justify-space-between>
                <v-flex
                  xs9
                >We are in search of three camera operators that can help us with all he setup necessary for our play between march and april 2019. We need a person who can use his own equipment This is a paid position.</v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
          <h2 class="mt-5">Project updates</h2>
          <v-timeline dense clipped>
            <v-timeline-item class="mb-3" large fill-dot>
              <v-layout justify-space-between>
                <v-flex
                  xs9
                >We had our first show! It was great and there was a full house. Please see pictures of what it looked like on our website here: www.mywebsite.com</v-flex>
                <v-flex xs3 text-xs-right timeline__date>May 12</v-flex>
              </v-layout>
            </v-timeline-item>
            <v-timeline-item class="mb-3" large fill-dot>
              <v-layout justify-space-between>
                <v-flex
                  xs9
                >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into</v-flex>
                <v-flex xs3 text-xs-right timeline__date>May 11</v-flex>
              </v-layout>
            </v-timeline-item>
            <v-timeline-item class="mb-3" large fill-dot>
              <v-layout justify-space-between>
                <v-flex
                  xs9
                >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into</v-flex>
                <v-flex xs3 text-xs-right timeline__date>May 10</v-flex>
              </v-layout>
            </v-timeline-item>
            <v-timeline-item class="mb-3" large fill-dot>
              <v-layout justify-space-between>
                <v-flex
                  xs9
                >We are in search of three camera operators that can help us with all he setup necessary for our play between march and april 2019. We need a person who can use his own equipment This is a paid position.</v-flex>
                <v-flex xs3 text-xs-right timeline__date>May 09</v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
        <v-flex md3>
          <div class="project__info"><span>Project initiator:</span> John Smith
            <br><span>Start date:</span> May 19
            <br><span>City:</span> Bucuresti
            <br><span>Budget:</span> 12,000RON
          </div>
          <h4 class="mb-3">Other Projects by John Smith</h4>
          <v-card class="mb-4 other-project">
            <nuxt-link to="/#"><v-img :src="require('~/assets/images/default-project-hero.jpg')" aspect-ratio="1.7"></v-img></nuxt-link>
            <v-card-title primary-title>
              <div>
                <h4>
                  <nuxt-link to="/#">{{ card_title }}</nuxt-link>
                </h4>
              </div>
            </v-card-title>
          </v-card>
          <v-card class="mb-4 other-project">
            <nuxt-link to="/#"><v-img :src="require('~/assets/images/default-project-hero.jpg')" aspect-ratio="1.7"></v-img></nuxt-link>
            <v-card-title primary-title>
              <div>
                <h4>
                  <nuxt-link to="/#">{{ card_title }}</nuxt-link>
                </h4>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Hero from '~/components/project/hero.vue';

export default {
  data () {
    return {
      card_title: 'Back to the basics - contemporary dance show'
    };
  },
  components: {
    Hero
  },

  layout: 'default'
};
</script>

<style lang="scss" scoped>
.theme--light.v-timeline:before {
  background: #ae2760;
}

.project__info {
  margin-bottom: 128px;

  span {
    font-weight: 700;
  }
}

.other-project a{
  color: #000
}

.timeline__date {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
  color: #888;
}
</style>

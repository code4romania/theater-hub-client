<template>
  <div class="nuxt-wrapper">
    <header>
      <v-layout row wrap justify-space-between text-xs-center align-center pl-5 pr-5>
        <v-flex md3 lg3>
          <v-layout align-center>
            <v-flex md6 lg6>
              <a class="logo-wrapper" href="/">
                <img :src="require('~/assets/images/LOGO-RGB-01.png')" />
              </a>
            </v-flex>

            <v-flex md6 lg6 class="donate-button">
              <v-btn flat small>
                <span class="text-capitalize"><u>DONATE</u></span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex md2 offset-md2 lg2 offset-lg2 mt-1>
            <a class="logo-wrapper" href="/">
              <img :src="require('~/assets/images/theater_hub_logo-11.png')" />
            </a>
        </v-flex>
        
        <!-- <v-layout justify-end align-center pr-5>
          <v-flex xs1 mr-5 class="action-button">
            <nuxt-link to="/login" id="login-btn" class="menu-link">
              {{ $t('shared.header.login-link') }}
            </nuxt-link>
          </v-flex>
          <v-flex xs1 class="action-button">
            <nuxt-link to="/signup" id="sign-up-btn" class="menu-link">
              {{ $t('shared.header.sign-up-link') }}
            </nuxt-link>
          </v-flex>
          <v-flex xs2 class="action-button" ml-5>
            <v-menu offset-y>
              <v-flex xs12 slot="activator">
                <div class="header-language-container">
                  <span>{{ currentLocale }}</span>
                </div>
              </v-flex>
              <v-list>
                <v-list-tile :key="i" v-for="(l, i) in locales"
                                      v-on:click="onLanguageClick(l)" v-bind:class="{'selected-language': locale === l.ID}">
                  <v-list-tile-title>
                    <span>{{ $t(`application-data.${l.Name.toLowerCase()}`) }}</span>
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
        </v-layout> -->

        <v-flex md5 lg5>
          <v-layout row wrap justify-space-between>
            <v-flex md3 lg3 class="action-button">
              <nuxt-link to="/about" id="about-btn" class="menu-link"><u>About</u></nuxt-link>
            </v-flex>
            <v-flex md3 lg3 class="action-button">
              <nuxt-link to="/projects" id="projects-btn" class="menu-link"><u>All projects</u></nuxt-link>
            </v-flex>
            <v-flex md4 lg4 class="action-button">
              <nuxt-link to="/login" id="login-btn" class="menu-link">Join the Community</nuxt-link>
            </v-flex>
            <v-flex md1 lg1 class="action-button">
              <nuxt-link to="/signup" id="sign-up-btn" class="menu-link"><u>Login</u></nuxt-link>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex md1 lg1 class="action-button">
              <nuxt-link to="/signup" id="sign-up-btn" class="menu-link"><u>EN</u></nuxt-link>
            </v-flex>
          </v-layout>
        </v-flex>
        
      </v-layout>

    </header>
    <main>
      <v-content>
        <!-- <nuxt /> -->
        <section id="card_presentation">
          <v-layout>
            <v-flex xs12 md12>
              <v-card dark color="black">
                <v-layout row wrap align-center>
                  <v-flex xs12 md6 px-5>
                    <h1>Join the community.</h1>
                    <h1>Start your project today</h1>
                    <v-layout mt-3>
                      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                    </v-layout>

                    <v-layout row>
                      <v-btn flat color="black" class="yellow--text">
                        <span class="text-capitalize"><u>Find out more</u></span>
                      </v-btn>

                      <v-btn depressed color="white" class="blue--text">
                        <span class="text-capitalize"><u>Register now</u></span>
                      </v-btn>
                    </v-layout>
                  </v-flex>

                  <v-flex xs12 md6 pr-2>   
                      <v-img :src="require('~/assets/images/main_image.png')"></v-img>   
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </section>

        <section id="how_it_works">
          <v-layout>
            <v-flex xs12 my-5>
              <h1 class="text-xs-center menu-link">How it works</h1>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-space-around>
            <v-flex xs10 md2 lg2 ma-3>
              <v-layout column >
                <v-icon color="grey">check_box</v-icon>
                <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
              </v-layout>
            </v-flex>

            <v-flex xs10 md2 lg2 ma-3>
              <v-layout column >
                <v-icon color="grey">check_box</v-icon>
                
                <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
              </v-layout>
            </v-flex>

            <v-flex xs10 md2 lg2 ma-3>
              <v-layout column>
                <v-icon color="grey">check_box</v-icon>
                <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
              </v-layout>
            </v-flex>
          </v-layout>
        </section>

        <section id="latest_projects">
          <v-layout>
            <v-flex xs12 my-5>
              <h1 class="text-xs-center menu-link">Latest projects added</h1>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-space-around fill-height>
            <v-flex d-flex xs10 lg5 ma-3 >
              <v-card>
                <v-img :src="require('~/assets/images/main_image.png')"></v-img>

                <v-card-title primary-title>
                  <h2><u>Back to the basics - contemporary dance show</u></h2>
                </v-card-title>


                <v-card-text>
                  <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                  <div class="font-weight-bold">Project initiator: John Smith</div>
                  <br/>
                  <div class="font-weight-bold">Number of requested roles: 7</div>
                </v-card-text>

                <div class="text-xs-center">
                  <v-btn color="primary">
                    <span class="text-capitalize">View project</span>
                  </v-btn>
                </div>
              </v-card>
            </v-flex>

            <v-flex d-flex xs10 lg5 ma-3 >
              <v-card>
                <v-img :src="require('~/assets/images/main_image.png')"></v-img>

                <v-card-title primary-title>
                  <h2><u>Waiting for Godot - short film</u></h2>
                </v-card-title>

                <v-card-text>
                  <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
                  <div class="font-weight-bold">Project initiator: Mary Poppins</div>
                  <br/>
                  <div class="font-weight-bold">Number of requested roles: 7</div>
                </v-card-text>

                <div class="text-xs-center">
                  <v-btn color="primary">
                    <span class="text-capitalize">View project</span>
                  </v-btn>
                </div>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 mt-3 mb-3 mr-5><!-- extra margin to the right which should be removed for smaller screens--> 
              <h2 class="text-xs-center text-lg-right font-weight-thin add-link">View all projects</h2>
            </v-flex>
          </v-layout>
        </section>

        <section id="meet_the_community">
          <v-layout>
            <v-flex xs12 my-5>
              <h1 class="text-xs-center menu-link">Meet the community</h1>
            </v-flex>
          </v-layout>

          <v-layout row wrap justify-center>
            <v-flex xs6 sm4 md4 lg2>
              <v-card flat class="text-xs-center">
                <v-responsive class="pt-4">
                    <v-avatar size="200" class="grey lighten-2">
                        <img :src="require('~/assets/images/Layer 1.png')" style="border: 8px solid #979797;">
                    </v-avatar>
                </v-responsive>
                <v-card-text>
                    <div class="subheading menu-link font-weight-bold">John Smith</div>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs6 sm4 md4 lg2>
              <v-card flat class="text-xs-center">
                <v-responsive class="pt-4">
                    <v-avatar size="200" class="grey lighten-2">
                        <img :src="require('~/assets/images/Layer 1.png')" style="border: 8px solid #979797;">
                    </v-avatar>
                </v-responsive>
                <v-card-text>
                    <div class="subheading menu-link font-weight-bold">John Smith</div>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs6 sm4 md4 lg2>
              <v-card flat class="text-xs-center">
                <v-responsive class="pt-4">
                    <v-avatar size="200" class="grey lighten-2">
                        <img :src="require('~/assets/images/Layer 1.png')" style="border: 8px solid #979797;">
                    </v-avatar>
                </v-responsive>
                <v-card-text>
                    <div class="subheading menu-link font-weight-bold">John Smith</div>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs6 sm4 md4 lg2>
              <v-card flat class="text-xs-center">
                <v-responsive class="pt-4">
                    <v-avatar size="200" class="grey lighten-2">
                        <img :src="require('~/assets/images/Layer 1.png')" style="border: 8px solid #979797;">
                    </v-avatar>
                </v-responsive>
                <v-card-text>
                    <div class="subheading menu-link font-weight-bold">John Smith</div>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs6 sm4 md4 lg2>
              <v-card flat class="text-xs-center">
                <v-responsive class="pt-4">
                    <v-avatar size="200" class="grey lighten-2">
                        <img :src="require('~/assets/images/Layer 1.png')" style="border: 8px solid #979797;">
                    </v-avatar>
                </v-responsive>
                <v-card-text>
                    <div class="subheading menu-link font-weight-bold">John Smith</div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs12 mt-3 mb-3 mr-5><!-- extra margin to the right which should be removed for smaller screens--> 
              <h2 class="text-xs-center text-lg-right font-weight-thin add-link">View all public profiles</h2>
            </v-flex>
          </v-layout>
        </section>

        <section id="social_networks">
          <v-layout row wrap justify-end align-center fill-height>
            <v-spacer></v-spacer>
            <v-flex d-flex xs12 sm6 md4>
              <v-layout>
                <v-flex xs12>
                  <v-text-field label="Search" append-icon="search" class="white" solo-inverted hide-details></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex d-flex sm6 md4 fill-height>
              <v-layout text-xs-center align-center row wrap justify-center>
                <v-flex d-flex xs2 sm1 md1 class="text-xs-center" pt-2>
                    <a class="logo-wrapper" href="/">
                      <!-- <img :src="require('~/assets/images/facebook_grey.png')" /> -->
                      <v-img :src="require('~/assets/images/facebook_grey.png')"></v-img>   
                    </a>
                </v-flex>

                <v-flex d-flex xs2 sm1 md1 class="text-xs-center" pt-2>
                    <a class="logo-wrapper" href="/">
                      <!-- <img :src="require('~/assets/images/youtube_grey.png')" /> -->
                      <v-img :src="require('~/assets/images/youtube_grey.png')"></v-img>
                    </a>
                </v-flex>

                <v-flex d-flex xs2 sm1 md1 class="text-xs-center" pt-2>
                    <a class="logo-wrapper" href="/">
                      <!-- <img :src="require('~/assets/images/instagram_grey.png')" /> -->
                      <v-img :src="require('~/assets/images/instagram_grey.png')"></v-img>
                    </a>
                </v-flex>

                <v-flex d-flex xs2 sm1 md1 class="text-xs-center" pt-2>
                    <a class="logo-wrapper" href="/">
                      <!-- <img :src="require('~/assets/images/linkedin_grey.png')" /> -->
                      <v-img :src="require('~/assets/images/linkedin_grey.png')"></v-img>
                    </a>
                </v-flex>

                <v-flex d-flex xs2 sm1 md1 class="text-xs-center" pt-2>
                    <a class="logo-wrapper" href="/">
                      <!-- <img :src="require('~/assets/images/twitter_grey.png')" /> -->
                      <v-img :src="require('~/assets/images/twitter_grey.png')"></v-img>
                    </a>
                </v-flex>
                
                <v-flex d-flex xs12 sm7 md7 class="text-xs-center donate-button">
                  <v-btn flat small>
                    <span class="text-capitalize"><u>DONATE</u></span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>        
          </v-layout>
        </section>
      </v-content>
    </main>

    <footer class="black white--text">
      <v-content>
        <v-layout row wrap justify-space-around pt-3 pb-2>

          <v-flex xs12 md2 lg2 class="text-xs-center">
              <h3>Useful links</h3>
              <br/>
              <ul>
                <li><a href="#">About Code for Romania</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Sponsors</a></li>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
          </v-flex>

          <v-flex xs12 md2 lg2 offset-lg2 class="text-xs-center" mt-2>
            <a class="logo-wrapper" href="/">
              <img :src="require('~/assets/images/theater_hub_logo-2.png')" />
            </a>
          </v-flex>

          <v-flex xs12 md4 lg4>
            <h3 class="text-xs-center text-md-right text-lg-right">Subscribe to our newsletter</h3>

            <v-layout>
              <v-spacer></v-spacer>
              <v-flex xs8> 
                <v-text-field label="Email" class="white" solo-inverted hide-details></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout>
              <v-spacer></v-spacer>
              <v-flex xs4>
                <a class="logo-wrapper" href="/">
                  <img :src="require('~/assets/images/LOGO-WHITE2.png')" />
                </a>
              </v-flex>
            </v-layout>

            <p class="text-xs-center text-lg-right">/* @ 2019 Code for Romania.</p>
            <p class="text-xs-center text-lg-right">An independent, non-partisan, non-political, non-governmental organization.</p>
          </v-flex>
        </v-layout>
      </v-content>
    </footer>
    <div id="main-overlay" class="overlay" v-if="displayMainOverlay"></div>
  </div>
</template>


<script>
  import { mapGetters, mapState } from 'vuex';

  export default {
    middleware: 'get-locales',
    data: () => ({
    }),
    computed: {
      ...mapState({
        displayMainOverlay: 'displayMainOverlay'
      }),
      ...mapGetters({
        locale: 'locale',
        locales: 'applicationData/locales'
      }),
      currentLocale: function () {
          return this.locale ? this.locale.toUpperCase() : '';
      }
    },
    methods: {
      onLanguageClick: function (selectedLocale) {
        if (selectedLocale.ID === this.locale) {
          return;
        }

        this.$store.dispatch('setLocale', selectedLocale.ID);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-language-container {
    display: flex;
  }

  .language-link {
    text-decoration: underline;
    cursor: pointer;
  }

  .selected-language {
    color: #7E57C2;
  }


  .donate-button {
    background-color: #27AE60; 
  }

	.menu-link {
		text-decoration: underline;
    color: #AE2760;
    &.nuxt-link-active {
			color: black;
		}
	}

  .add-link {
    text-decoration: underline;
    color: #0000FF;
    &.nuxt-link-active {
			color: black;
		}
  }
  footer ul li a:link, footer a:visited {
    text-decoration: none;
    color: white;
  }

  ul {
    list-style-position: inside; 
    padding-left: 0;
  }
  
  ul li {
    list-style: none;
  }


</style>

<template>
  <section class="privacy-policy">
    <v-container fluid privacy-policy-container class="mt-5 pa-5">
        <v-layout row wrap>
            <v-flex>
                <h1 class="mb-3">{{ $t('pages.administration.projects.title') }}</h1>
            </v-flex>
            <v-flex xs12>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, dui et viverra luctus, urna massa lobortis dui, vel lacinia metus ipsum egestas mauris. Aliquam imperdiet quam eget posuere vulputate. Nunc molestie dignissim dapibus. Aenean laoreet condimentum justo, id finibus nunc luctus ut. Fusce diam ipsum, convallis ac tincidunt eget, finibus vitae ipsum. Vestibulum accumsan nulla eget mi tempor, eget pulvinar elit tincidunt. Ut a euismod nunc. Vivamus non posuere risus. Suspendisse eget nunc imperdiet arcu tincidunt hendrerit blandit quis sem. Quisque eget tellus ut quam dapibus pellentesque non a neque. Duis placerat, enim ut bibendum maximus, nunc lectus sodales mi, sit amet volutpat neque ante viverra dui. 
                </p> 
            </v-flex>
            <v-flex xs12>
                <p>
                    In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce tristique diam vel hendrerit mattis. Quisque molestie diam quis feugiat efficitur. Curabitur volutpat, quam sit amet consectetur sagittis, odio nisl tempus mi, id fringilla metus nunc vel quam. Praesent scelerisque, tellus a viverra accumsan, elit ligula faucibus nisi, vel varius justo risus eget massa. Duis semper iaculis leo, malesuada aliquet est euismod vitae. Mauris volutpat mi dolor, eu luctus ligula eleifend id.
                </p>
            </v-flex>
            <v-flex xs12>
                <p>
                    Duis in tincidunt lorem, sit amet porttitor lorem. Vestibulum id sodales dolor, ac luctus orci. Vestibulum quis mi est. Nulla a urna ligula. Nullam eu enim dictum, iaculis lectus id, aliquam nulla. Praesent eu ipsum at dui placerat facilisis quis in urna. In hac habitasse platea dictumst. Pellentesque in consequat nisl, sit amet lobortis ipsum.
                </p>
            </v-flex>
            <v-flex xs12>
                <p>
                    Cras tempor, quam ut cursus pharetra, leo mauris ullamcorper libero, non tristique leo erat nec eros. Pellentesque ut dui at nunc sodales varius ut vel nisl. Duis magna elit, viverra sit amet vulputate nec, molestie in tortor. Curabitur rhoncus enim tortor, venenatis gravida nisl pulvinar nec. Sed eu nulla diam. Phasellus at lorem interdum, tristique erat vel, pellentesque massa. Cras a molestie nibh. Quisque sit amet consectetur quam.
                </p>
            </v-flex>
            <v-flex xs12>
                <p>
                    In id dapibus mauris, eget mollis enim. Sed non sem ut mi convallis tempus. Nulla in felis nec metus condimentum dapibus. Maecenas nec odio justo. Curabitur sit amet justo ut ante sagittis venenatis at a leo. Ut aliquam ligula consequat tortor rutrum, a ultricies ante bibendum. Suspendisse tempus elit id porttitor cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum eget dui augue. Pellentesque gravida dolor orci, ut euismod justo porttitor sit amet. Sed dapibus, mi in pretium porttitor, tellus sem pharetra diam, sit amet molestie ex metus sit amet sem. Maecenas laoreet tortor ac volutpat accumsan. Integer lacus risus, gravida nec aliquam at, facilisis sit amet lectus.
                </p>
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>

<script>

    export default {
        layout: 'administration',
        middleware: ['authenticated', 'admin']
    }

</script>

<style lang="scss" scoped>

</style>

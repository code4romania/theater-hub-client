<template>
  <v-card>
    <v-card-media
      class="white--text"
      height="200px"
      src="http://lorempixel.com/600/337/city/"
    >
      <v-container fluid wish-card-title-container>
        <v-layout>
          <v-flex xs12 align-end flexbox>
            <span class="headline">{{wish.title}}</span>
            <div class="headline-background"></div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-card-title>
      <div>
      	{{wish.description}}
      </div>
    </v-card-title>
    <v-card-actions class="card-actions">
      <v-btn absolute right raised class="read-more-btn">Read more</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ['wish']
  }
</script>


<style lang="scss" scoped>

	.wish-card-title-container {
	    margin: initial;

	    .headline {
	    	position: absolute;
    		bottom: 10px;
    		z-index: 1;
	    }

	    .headline-background {
	    	height: 70px;
    		width: 100%;
	    	position: absolute;
		    bottom: 0px;
		    left: 0px;
		    opacity: 0.4;
		    background-color: #000;
	    }
	}

	.card-actions {
		height: 60px;

	}

</style>
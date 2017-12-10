<template>
    <v-layout row wrap>
	    <v-flex xs4 wish-card-col :key="i" v-for="(wish, i) in displayedWishes">
	        <WishCard :wish="wish" />
	    </v-flex>
	    <v-flex xs12 v-if="!hasLoadedAll()">
	    	<v-btn v-on:click="onShowMoreClick" color="primary" id = "show-more-whishes-btn">Show More</v-btn>
	    </v-flex>
    </v-layout>
</template>


<script>
	import WishCard from './wish-card.vue'
	import {wishes} from '~/store/constants/mockdata'

	export default {
	  components: {
	    WishCard
	  },
	  data () {
	    return {
	        wishes,
	        displayedWishes: wishes.slice(0, 9),
	        page: 1,
	        isLoading: false
	    }
	  },
	  methods:{
	  	onShowMoreClick: function() {
	  		this.loadMore();
	  	},
		loadMore: function() {
	      this.isLoading = true;
	      let pageSize = 9;
	      if (pageSize > this.wishes.length - this.displayedWishes.length) {
	      	pageSize = this.wishes.length - this.displayedWishes.length;
	      } else {
	      	this.page++;
	      }
	      
	      if(pageSize !== 0) {
	      	this.displayedWishes = this.displayedWishes.concat(this.wishes.slice(this.displayedWishes.length, this.displayedWishes.length + pageSize));
	      }
	      this.isLoading = false;
	    },
	    hasLoadedAll: function() {
	    	return this.displayedWishes.length === this.wishes.length;
	    }
	   }
	}
</script>

<style scoped>

  .wish-card-col {
    padding: 20px;
  }

  #show-more-whishes-btn {
  	margin: auto;
  	display: block;
  }

</style>
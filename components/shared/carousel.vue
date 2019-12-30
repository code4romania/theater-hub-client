<template>
    <v-layout row wrap>
        <v-flex xs12>
            <div class="carousel-items-wrapper">
			    <img class="carousel-arrow left-arrow"
                    :src="require('~/assets/images/left-arrow.png')"
                    v-bind:class="{'hidden': !displayCarouselLeftArrow}"
                    v-on:click="onCarouselLeftArrowClick" />
                <ul id="carousel-items">
                    <li class="carousel-item" v-for="(item, itemIndex) in items" :key="`item-${itemIndex}`" @click="handleCarouselItemClick(itemIndex)">
                        <img :src="item">
                    </li>
                </ul>
                <img class="carousel-arrow right-arrow"
                    :src="require('~/assets/images/right-arrow.png')"
                    v-bind:class="{'hidden': !displayCarouselRightArrow}"
                    v-on:click="onCarouselRightArrowClick" />
            </div>
        </v-flex>
    </v-layout>
</template>

<script>

    export default {
            props: ['items', 'selectedIndex'],
            data: () => ({
                displayCarouselLeftArrow: true,
                displayCarouselRightArrow: true,
                carouselLeftItemIndex: 0,
                carouselRightItemIndex: 0,
                disableNavigation: false
            }),
            methods: {
                setupCarousel: function () {
                    var carousel = document.getElementById('carousel-items');
                    var carouselItems = document.getElementsByClassName('carousel-item');

                    if (!carouselItems || carouselItems.length === 0) {
                        return;
                    }

                    var carouselLeft = carousel.getBoundingClientRect().left;
                    var carouselRight = carousel.getBoundingClientRect().left + carousel.offsetWidth;

                    this.carouselLeftItemIndex = 0;

                    this.carouselRightItemIndex = 0;

                    var firstItemLeft = carouselItems[this.carouselLeftItemIndex].getBoundingClientRect().left;
                    while (firstItemLeft < carouselLeft && this.carouselLeftItemIndex < carouselItems.length - 1) {
                        this.carouselLeftItemIndex++
                        firstItemLeft = carouselItems[this.carouselLeftItemIndex].getBoundingClientRect().left;
                    }

                    var lastItemRight = carouselItems[this.carouselRightItemIndex].getBoundingClientRect().left + carouselItems[this.carouselRightItemIndex].offsetWidth;

                    while (lastItemRight < carouselRight && this.carouselRightItemIndex < carouselItems.length - 1) {
                        this.carouselRightItemIndex++
                        lastItemRight = carouselItems[this.carouselRightItemIndex].getBoundingClientRect().left + carouselItems[this.carouselRightItemIndex].offsetWidth;
                    }

                    this.carouselRightItemIndex--;
                },
                onCarouselLeftArrowClick: function () {
                    if (this.disableNavigation) {
                        return;
                    }

                    if (this.carouselLeftItemIndex !== 0) {
                        this.carouselLeftItemIndex--;
                    }

                    this.disableNavigation = true;

                    var carousel = document.getElementById('carousel-items');
                    var carouselItems = document.getElementsByClassName('carousel-item');
                    var carouselLeft = carousel.getBoundingClientRect().left;
                    var carouselRight = carousel.getBoundingClientRect().left + carousel.offsetWidth;
                    var carouselItemLeft = carouselItems[this.carouselLeftItemIndex].getBoundingClientRect().left;
                    var carouselItemRight = carouselItems[this.carouselLeftItemIndex].getBoundingClientRect().left + carouselItems[this.carouselLeftItemIndex].offsetWidth;
                    var distance = carouselItemRight < carouselLeft ? carouselItems[this.carouselLeftItemIndex].offsetWidth
                                                                                                    : carouselLeft - carouselItemLeft;

                    if (carouselItemRight > carouselLeft) {
                        distance = carouselLeft - carouselItemLeft;

                        if (distance < carouselItems[this.carouselLeftItemIndex].offsetWidth / 2 && this.carouselLeftItemIndex > 0) {
                            distance += carouselItems[this.carouselLeftItemIndex - 1].offsetWidth;
                        }
                    }

                    carousel.scrollLeft -= distance;

                    this.calculateCarouselArrowsVisibility();

                    var lastItemRight = carouselItems[this.carouselRightItemIndex].getBoundingClientRect().left + carouselItems[this.carouselRightItemIndex].offsetWidth;

                    while (lastItemRight > carouselRight && this.carouselRightItemIndex > 0) {
                        this.carouselRightItemIndex--;
                        lastItemRight = carouselItems[this.carouselRightItemIndex].getBoundingClientRect().left + carouselItems[this.carouselRightItemIndex].offsetWidth;
                    }

                    this.disableNavigation = false;
                },
                onCarouselRightArrowClick: function () {
                    var carouselItems = document.getElementsByClassName('carousel-item');

                    if (this.disableNavigation) {
                        return;
                    }

                    if (this.carouselRightItemIndex < carouselItems.length - 1) {
                        this.carouselRightItemIndex++;
                    }

                    this.disableNavigation = true;

                    var carousel = document.getElementById('carousel-items');
                    var carouselLeft = carousel.getBoundingClientRect().left;
                    var carouselRight = carouselLeft + carousel.offsetWidth;
                    var carouselItemLeft = carouselItems[this.carouselRightItemIndex].getBoundingClientRect().left;
                    var carouselItemRight = carouselItemLeft + carouselItems[this.carouselRightItemIndex].offsetWidth;
                    var distance = carouselItems[this.carouselRightItemIndex].offsetWidth;

                    if (carouselItemLeft < carouselRight) {
                        distance = carouselItemRight - carouselRight;

                        if (distance < carouselItems[this.carouselRightItemIndex].offsetWidth / 2 &&
                                                                        this.carouselRightItemIndex < carouselItems.length - 1) {
                            distance += carouselItems[this.carouselRightItemIndex + 1].offsetWidth;
                        }
                    }

                    carousel.scrollLeft += distance;

                    this.calculateCarouselArrowsVisibility();

                    var firstItemLeft = carouselItems[this.carouselLeftItemIndex].getBoundingClientRect().left;
                    while (firstItemLeft < carouselLeft && this.carouselLeftItemIndex < carouselItems.length - 1) {
                        this.carouselLeftItemIndex++
                        firstItemLeft = carouselItems[this.carouselLeftItemIndex].getBoundingClientRect().left;
                    }

                    this.disableNavigation = false;
                },
                calculateCarouselArrowsVisibility: function () {
                    var carousel = document.getElementById('carousel-items');
                    var carouselItems = document.getElementsByClassName('carousel-item');

                    if (!carouselItems || carouselItems.length === 0) {
                        return;
                    }

                    var firstItem = carouselItems[0];
                    var lastItem = carouselItems[carouselItems.length - 1];

                    this.displayCarouselLeftArrow = firstItem.getBoundingClientRect().left < 0;
                    this.displayCarouselRightArrow = lastItem.getBoundingClientRect().left + lastItem.offsetWidth >
                                                                carousel.getBoundingClientRect().left + carousel.offsetWidth;
                },
                handleCarouselItemClick: function (itemIndex) {
                    this.$emit('handleCarouselItemClick', itemIndex);
                }
            },
            mounted () {
                setTimeout(() => {
                    this.setupCarousel();
                    this.calculateCarouselArrowsVisibility();
                }, 500);

                window.onresize = (event) => {
                    this.setupCarousel();
                    this.calculateCarouselArrowsVisibility();
                };
            }
    }
</script>

<style lang="scss">



</style>

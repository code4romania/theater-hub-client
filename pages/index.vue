<template>
  <section class="homepage-section">
    <v-container fluid homepage-container>
        <v-layout row wrap>
            <v-flex>
                <h1>Theater Hub</h1>
            </v-flex>
            <v-flex xs12 mt-5>
                <p>
                    Theater Hub este o platformă online pentru scena de teatru din România. Acest spațiu virtual îi susţine pe actori să îşi creeze o prezență online şi să își promoveze spectacolele, încurajând şi alți tineri să își urmeze pasiunea pentru arta teatrală. Mai mult, platforma își propune să reducă distanța dintre public și actori și să îi ajute să colaboreze. Actorii și trupele de teatru independent pot cere ajutor dacă au nevoie de specialiști în promovare, de resurse, decoruri etc., pentru a încuraja oamenii de business și freelancerii să contribuie activ la susținerea inițiativelor culturale.
                </p> 
            </v-flex>
            <v-flex xs12>
                <p>
                    Prin integrarea cu alte platforme dezvoltate de Code for Romania, Theater Hub isi doreste ca pe viitor să ofere și informații utile pentru profesioniștii din domeniul actoriei, cum ar fi resurse legislative sau referitoare la finanțări europene.
                </p>
            </v-flex>
            <v-flex xs12>
                <p>
                    Vrei să iei parte la dezvoltarea acestui proiect? Vrei să fii printre primii actori care își fac cont în Theater Hub? Atunci scrie-ne chiar acum:
                </p>
            </v-flex>
            <v-flex xs12 mt-3>
                <p>
                  <a href="mailto:theaterhub@code4.ro"><v-icon>email</v-icon>theaterhub@code4.ro</a>
                </p>
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>

<script>

  export default {
    async fetch ({ store, redirect }) {
      if (store.getters['authentication/isAuthenticated'] && !store.getters['users/isEnabled']) {
        return redirect('/create-profile');
      } else if (store.getters['authentication/isAuthenticated']) {
        return redirect('/projects');
      }
    }
  }

</script>

<style lang="scss" scoped>

  .homepage-section {
    max-width: 700px;

    a {
      text-decoration: none;
      color: #000;
      font-size: 18px;

      i {
        margin-right: 10px;
      }
    }
  }

</style>

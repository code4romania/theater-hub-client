<template>
  <section class="terms-and-conditions">
    <v-container
        terms-and-conditions-container
        class="main-container"
    >
        <v-layout row wrap>
            <v-flex mb-3>
                <h1 class="page-title">{{ $t('pages.terms-and-conditions.title') }}</h1>
            </v-flex>
            <v-flex xs12 class="terms-and-conditions-text">
                <pre v-if="isRoLanguage">
                
Asociația Code for Romania este o persoană juridică, avand sediul in Mun. Bucuresti, Piata Alba Iulia nr. 7, bloc I6, etaj 1, ap. 6, inregistrata in registrul special, Partea A, sectiunea I 67/06.07.2016.

1. Datele personale prelucrate

Completând formularul pus la dispoziție pentru inregistrare, sau formularul de abonare la newsletter, putem colecta următoarele date cu caracter personal:
(please list all the required fields that are personal information. Ex: age, name, email, address, city) from all the forms present on the website 

2. Scop și temei

Code for Romania prelucrează date cu caracter personal doar în interesul utilizatorilor website-ului www.theaterhub.ro care își exprimă consimțământul cu privire la a fi adaugati ca membri in comunitate si/sau adăugați la baza de date de newsletter a platformei.  

3. Drepturile tale

În calitate de utilizator al www.theaterhub.ro, potrivit Legii nr. 677/2001, precum și, începând cu 25 mai 2018, potrivit Regulamentului general privind protecția datelor, ai următoarele drepturi:
Dreptul la informare cu privire la prelucrarea datelor personale de către Code for Romania;
Dreptul de acces la datele personale, la cerere și în mod gratuit pentru o solicitare pe an;
Dreptul de intervenție, rectificare sau ștergere a datelor personale, la cerere și în mod gratuit;
Dreptul de a te adresa Autorității Naționale de Supraveghere privind Prelucrarea Datelor cu Caracter Personal (cu sediul în Bucureşti, sector 1, B-dul G-ral. Gheorghe Magheru, www.dataprotection.ro) sau justiției, pentru apărarea oricăror drepturi garantate de lege;
Începând cu 25 mai 2018, potrivit Regulamentului general privind protecția datelor, Dreptul la restricționarea prelucrării.

6. Securitate și confidențialitate

Protecția informațiilor în cursul prelucrării Datelor tale personale este o preocupare majoră a Code for Romania, de aceea toate Datele personale colectate în cursul vizitelor pe www.theaterhub.ro sunt prelucrate conform prevederilor legale în vigoare în România. Code for Romania folosește tehnologii de ultimă generație și ia toate măsurile tehnice rezonabile pentru transmiterea și păstrarea Datelor personale în condiții de deplină securitate și confidențialitate.
Toate Datele personale de pe site sunt stocate și procesate pe servere situate în Uniunea Europeana, ce cad sub incidența legislației europene de protecție a datelor personale. Nicio informație oferită pe acest site nu părăsește teritoriul Uniunii Europene.
Code for Romania se angajează să nu dezvăluie Datele personale cu privire la vizitele tale pe www.theaterhub.ro, exceptând situațiile legale sau situațiile prezentate în această Notă de informare.
Dacă descoperim un incident cu privire la securitatea datelor personale care prezintă un risc pentru drepturile și libertățile utilizatorilor noștri, vom notifica Autoritatea Națională de Supraveghere privind Prelucrarea Datelor cu Caracter Personale în termen de 72 de ore. Dacă incidentul de securitate este de natură să prezinte un risc ridicat pentru drepturile și libertățile tale, vei fi, de asemenea, notificat.

7. Contactează Code for Romania

Pentru orice întrebări sau preocupări, precum și pentru exercitarea drepturilor tale legate de prelucrarea Datelor personale de către Code for Romania, ne poti contacta la:
Adresa: Piata Alba Iulia nr. 7, bloc I6, etaj 1, ap. 6, mun. Bucuresti, Romania
E-mail: contact@code4.ro

            </pre>

            <pre v-if="!isRoLanguage">
                
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie, dui et viverra luctus, urna massa lobortis dui, vel lacinia metus ipsum egestas mauris. Aliquam imperdiet quam eget posuere vulputate. Nunc molestie dignissim dapibus. Aenean laoreet condimentum justo, id finibus nunc luctus ut. Fusce diam ipsum, convallis ac tincidunt eget, finibus vitae ipsum. Vestibulum accumsan nulla eget mi tempor, eget pulvinar elit tincidunt. Ut a euismod nunc. Vivamus non posuere risus. Suspendisse eget nunc imperdiet arcu tincidunt hendrerit blandit quis sem. Quisque eget tellus ut quam dapibus pellentesque non a neque. Duis placerat, enim ut bibendum maximus, nunc lectus sodales mi, sit amet volutpat neque ante viverra dui.

            </pre>
            </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>

<script>

    import { mapGetters } from 'vuex';
    import { LocaleType } from '~/store/entities';

    export default {
        layout: ({ store }) => {
            if (!store.getters['authentication/isAuthenticated']) {
                return 'visitor';
            } else if (store.getters['users/isAdmin']) {
                return 'administration';
            } else {
                return 'user';
            }
        },
        computed: {
            ...mapGetters({
                locale: 'locale'
            }),
            isRoLanguage: function () {
                return this.locale && this.locale === LocaleType.RO;
            }
        }
    }

</script>

<style lang="scss" scoped>

    .terms-and-conditions-text pre {
        font-family: Titillium Web;
        font-size: 16px;
        white-space: pre-wrap;
        white-space: -moz-pre-wrap;
        white-space: -pre-wrap;
        white-space: -o-pre-wrap;
        word-wrap: break-word;
    }

</style>

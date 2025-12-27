<template>
  <div
    v-if="showModal"
    class="bg"
  >
    <div class="modal">
      <p v-if="!realEstate.hasRealEstate">Нет недвижимости!</p>
      <div v-for="object in realEstate.objects">
        <p>{{ object.type }}</p>
        <p>{{ object.address }}</p>
        <p>{{ object.ownership }}</p>
        ---------------------------------
      </div>
      <input type="button" value="X" class="closeBtn" @click="close"></input>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'RealEstateModal',
    data() {
      return {
        showModal: false,
        realEstate: {
          hasRealEstate: false,
          objects: [],
        },
      };
    },
    methods: {
      open(familyMemberId) {
        this.realEstate = axios
          .get(`/api/family/members/${familyMemberId}/real-estate `)
          .then((response) => {
            this.realEstate = response.data;
            this.showModal = true
          });
      },
      close() {
        // this.realEstate = this.$store.getFamilyMemberRealEstate(familyMemberId);
        this.showModal = false;
      },
    },
  };
</script>

<style scoped>
  .bg {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 0;
  }

  .modal {
    background-color: aliceblue;
    padding: 50px;
    position: relative;
  }

  .closeBtn {
    position: absolute;
    right: 0px;
    top: 0px;
  }
</style>

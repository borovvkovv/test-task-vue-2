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

<script lang="ts">
import { instance } from '../api';
import { RealEstate } from '../store/utils/models';
import Vue from 'vue';

interface IData {
  showModal: boolean;
  realEstate?: RealEstate
}

interface IMethods {
  open(familyMemberId: number): void;
  close(): void
}
  export default Vue.extend<IData, IMethods, {}, {}>({
    name: 'RealEstateModal',
    data: () => ({
        showModal: false,
        realEstate: undefined
    }),
    methods: {
      open(familyMemberId: number) {
          instance<RealEstate, RealEstate>({
                url:`/members/${familyMemberId}/real-estate ` ,
                method: 'get',
          })
          .then((response) => {
            this.realEstate = response.data;
            this.showModal = true
          });
      },
      close() {
        this.showModal = false;
      },
    },
  });
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

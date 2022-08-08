<template>
    <div class="container"> 
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <router-link to="/page1"   @click.native="addTab('page1','1')" class="nav-item nav-link">Page1</router-link>
                    <router-link to="/page2" @click.native="addTab('page2','2')" class="nav-item nav-link">page2</router-link>
                    <router-link to="/page3"   @click.native="addTab('page3','3')" class="nav-item nav-link">page3</router-link>
                </div>
            </div>
        </nav>
        <vue-tabs-chrome ref="tab" :minHiddenWidth="120" v-model="tab" :tabs="tabs"  @click.native="handleClick()" />
        <router-view> </router-view>
    </div>


</template>
 
<script>
  import Vue from 'vue'
  import VueTabsChrome from 'vue-tabs-chrome'

  export default {
    components: {
      VueTabsChrome
    },
    data() {
      return {
        tab: 'google',
        tabs: [],
        tab_names: [],
        tab_id:[]
      }
    },
  methods: {
    addTab (ev,index) {
      let item = 'tab' + Date.now()
      let newTabs = [
        {
          label: ev,
          url: ev,
          key: item
        }
      ]

       
         this.$refs.tab.addTab(...newTabs)
         this.tab = item
         this.tab_names.push(index);
         this.tab_id.push(this.tab);
         console.log("nea tab id",this.tab);
         console.log("tab_names",this.tab_names);
      
    },
    getCurrTab () {
      return this.tabs.find(item => item.key === this.tab)
    },
    handleClick(ev){
      let tab = this.getCurrTab();
      var url=tab.label;
        this.$router.push(url).catch(error => {
        if (error.name != "NavigationDuplicated") {
            throw error;
        }
        });


    }
  }

  }
</script>
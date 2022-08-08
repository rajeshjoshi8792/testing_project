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
    
      <vue-tabs-chrome
      ref="tab"
      v-model="tab"
      :tabs="tabs"
      @dragstart="handleDragStart"
      @dragging="handleDragging"
      @dragend="handleDragEnd"
      @swap="handleSwap"
      @remove="handleRemove"
      @contextmenu="handleRightClick"
      @click="handleTabClick"
      @click.native="handleClick()"/>
        <router-view> </router-view>

              {{ msgList }}

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
        tab_id:[],
        msgList: []
      }
    },
      beforeMount () {
    this.load()
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
       this.save()     
    },

    load () {
      let tabs = localStorage.getItem('VUE_TABS_CHROME')
      if (tabs) {
        this.tabs = JSON.parse(tabs)
      }
    },
    save () {
      localStorage.setItem('VUE_TABS_CHROME', JSON.stringify(this.$refs.tab.getTabs()))
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
    },
 handleDragStart (e, tab, index) {
      console.info('dragstart', e, tab, index)
      

      this.msgList.push('dragstart')
    },
    handleDragging (e, tab, index) {
      console.info('dragging', e, tab, index)
      this.msgList.push('dragging')
    },
    handleDragEnd (e, tab) {
      console.info('dragend', e, tab)
      this.msgList.push('dragend')
    },
    handleRemove (tab, index) {
        this.save()
      console.info('remove', tab, index)
      this.msgList.push('remove')
    },
    handleSwap (tab, targetTab) {
      console.info('swap', tab, targetTab)
      this.msgList.push('swap')
    },
    handleRightClick (e, tab, index) {
      console.info('contextmenu', e, tab, index)
      this.msgList.push('contextmenu')
    },

    handleTabClick (e, tab, index) {
    var url=tab.url;
       this.$router.push(url).catch(error => {
        if (error.name != "NavigationDuplicated") {
            throw error;
        }
        });

      console.info(e, tab, index)
      this.msgList.push('click')
    }

  }



  }
</script>
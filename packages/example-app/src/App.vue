<script>
import '@pageup/components'
export default {
  data() {
    return {
      drawer: document.querySelector('kabal-drawer'),
      commands: [
        {
          id: "consultation",
          title: "Start consultation",
          keywords: "command new create",
          shortcut: "Alt+KeyC",
          section: "Commands",
          handler: () => { alert("Start consultation") },
        }
      ]
    }
  },
  methods: {
    changeTheme() {
      const currentTheme = document.querySelector('html').getAttribute('theme') || 'light'
      const newTheme = currentTheme === 'light' ? 'dark' : 'light'
      document.querySelector('html').setAttribute('theme', newTheme)
    },
    toggleDrawer () {
      if (this.drawer.isConnected) {
        this.drawer.remove()
      } else {
        document.querySelector('kabal-layout').appendChild(this.drawer)
      }
    },
    handleChange () {
      console.log('Input changed')
    }
  },
  mounted () {
      this.drawer = document.querySelector('kabal-drawer')
      this.$command = this.$refs.commandMenu
      this.$command.commands = this.commands

  }
}


</script>
<template>

  <kabal-layout nav-open padding="m">

    <kabal-navigation slot="nav">
      <kabal-dropdown slot="header" expand position="block-end" size="m">
        <kabal-button class="k-logo" expand slot="toggle" variant="switch">
          <div slot="start"></div>
          <span class="application-name">Kabal</span>
        </kabal-button>

        <kabal-dropdown-group heading="oyvind.roysland@kabal.com">
          <kabal-dropdown-item>
            <kabal-avatar name="Base" variant="square" size="s"></kabal-avatar>
            Marine
          </kabal-dropdown-item>
          <kabal-dropdown-item>
            <kabal-avatar name="Supplier" variant="square" size="s"></kabal-avatar>
            Cargo
          </kabal-dropdown-item>
          <kabal-dropdown-item>
            <kabal-avatar name="Operator" variant="square" size="s"></kabal-avatar>
            Personnel
          </kabal-dropdown-item>
          <kabal-dropdown-item>
            <kabal-avatar name="Operator" variant="square" size="s"></kabal-avatar>
            Settings
          </kabal-dropdown-item>
        </kabal-dropdown-group>
      </kabal-dropdown>

      <kabal-nav-group>
        <kabal-nav-item icon="navigation-search">Search</kabal-nav-item>
        <kabal-nav-item icon="navigation-notifications" active>Notifications</kabal-nav-item>
      </kabal-nav-group>
      <kabal-nav-group heading="Workspace">
        <kabal-nav-item icon="navigation-dashboard">
          Reports
          <kabal-nav-group slot="subnav">
            <kabal-nav-item>KPI</kabal-nav-item>
            <kabal-nav-item>Fuel consumption</kabal-nav-item>
          </kabal-nav-group>
        </kabal-nav-item>
        <kabal-nav-item icon="navigation-dashboard">Dashboard</kabal-nav-item>
      </kabal-nav-group>

      <kabal-dropdown expand slot="footer" size="m">
        <kabal-button slot="toggle" variant="plain" size="m">
          <kabal-avatar name="Øyvind Røysland" slot="start" size="m" variant="default"></kabal-avatar>
          Øyvind Røysland
        </kabal-button>

        <kabal-dropdown-group>
          <kabal-dropdown-item href="#">View Profile</kabal-dropdown-item>
          <kabal-dropdown-item @click="changeTheme">Settings</kabal-dropdown-item>
        </kabal-dropdown-group>
        <kabal-dropdown-group>
          <kabal-dropdown-item href="#" @click="$command.show">Commands
            <div slot="end" class="n-color-text-weaker n-font-size-xs">Cmd+K</div>
          </kabal-dropdown-item>
          <kabal-dropdown-item href="#">Help & Support</kabal-dropdown-item>
        </kabal-dropdown-group>
        <kabal-dropdown-group>
          <kabal-dropdown-item>Sign out</kabal-dropdown-item>
        </kabal-dropdown-group>
      </kabal-dropdown>
    </kabal-navigation>
    <kabal-header slot="header">
      Workspace
  </kabal-header>
    <kabal-banner variant="danger">
      We’re experiencing an incident. Please see our <a href="#">status page</a> for more details.
    </kabal-banner>
    <kabal-card padding="1rem">

      <kabal-button id="toggle" @click="toggleDrawer">Toggle drawer</kabal-button>

      <kabal-fieldset>
        <kabal-input label="Label" value="" @change="handleChange"></kabal-input>
        <kabal-button variant="primary" aria-controls="example" aria-haspopup="true">Toggle popout</kabal-button>

        <kabal-popout id="example" position="block-end">
          <div style="padding: var(--n-space-m)">
            <kabal-stack gap="m">
            <div>Really delete?</div>  
            <div>
              <kabal-button href="#" variant="plain">Cancel</kabal-button>
              <kabal-button href="#" variant="danger">Delete</kabal-button>
            </div>
            </kabal-stack>
          </div>
        </kabal-popout>
      </kabal-fieldset>
    </kabal-card>

    <kabal-drawer slot="drawer" open>
      <kabal-header slot="header">
        <h3 class="n-typescale-l">Drawer header</h3>
        <kabal-button @click="toggleDrawer" slot="end" id="close" variant="plain" aria-describedby="close-sidebar"
          size="s">
          <kabal-icon name="interface-close" size="s"></kabal-icon>
        </kabal-button>
        <kabal-tooltip id="close-sidebar">Close</kabal-tooltip>
      </kabal-header>

      <p>Suspendisse blandit sodales eros, quis aliquet leo aliquet ultrices lorem ipsum dolor sit.</p>
    </kabal-drawer>
  </kabal-layout>
  <kabal-command-menu ref="commandMenu"></kabal-command-menu>

</template>


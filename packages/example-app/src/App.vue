<script setup>
import '@pageup/components'

function changeTheme () {
  const currentTheme = document.querySelector('html').getAttribute('theme') || 'light'
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  document.querySelector('html').setAttribute('theme', newTheme)
}
</script>
<template>
  <nord-avatar size="m" name="Øyvind Røysland"></nord-avatar>
  <nord-card>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla provident aliquid corporis tempora eius quam, quae vel
  molestias esse maxime aperiam totam suscipit. Nobis consectetur optio reprehenderit animi? Suscipit, quibusdam?
  </nord-card>

  <nord-table density="relaxed">
    <table>
      <thead>
        <tr>
          <th>First col</th>
          <th>Second col</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><nord-avatar size="m"></nord-avatar></td>
          <td><span>Øyvind Røysland</span></td>
        </tr>
      </tbody>
    </table>
  </nord-table>

  <nord-button variant="primary" @click="changeTheme">Change theme</nord-button>
</template>


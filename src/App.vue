<template>
  <div id="app">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Hello</h1>
          <h2 class="subtitle">Create awesome recipes bla bla</h2>
        </div>
      </div>
    </section>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/new">New</router-link> |
      <router-link v-if="$auth.isAuthenticated" to="/profile">
        Profile
      </router-link>
    </div>

    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Cookbook</strong> by
          <a href="https://github.com/anoia/">Anoia</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

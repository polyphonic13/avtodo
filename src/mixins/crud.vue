<template>
  
</template>

<script lang="ts">
import { Vue, Component, Trait, Mixin } from 'av-ts';

@Trait class Test extends Vue {
    foo = "bar";
    meth() {
      console.log(this.foo + ' from Test mixin');
    }
  }
  </script>
  <style>
  
  </style>
  
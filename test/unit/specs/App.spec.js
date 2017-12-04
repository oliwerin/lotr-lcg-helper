import Vue from 'vue';
import App from '../../../src/App.vue';
import { store } from '../../../src/store/store';

const vm = new Vue({ 
  template: '<div><test></test></div>',
  components: {
    'test': App,
  },
  store,
}).$mount();

describe('App.vue', () => {
  it('should have correct message', () => {
    expect(vm.$el.querySelector('h1').textContent).toBe('Threat Tracker for the Lord of the Rings: The Card Game');
  });
});
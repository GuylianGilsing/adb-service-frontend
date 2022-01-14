import { mount } from '@vue/test-utils';

import LargeSearchBar from '@/components/LargeSearchBar.vue';

test('That the search event is being emitted when the search button has been pressed', async () => {
    // Arrange
    const wrapper = mount(LargeSearchBar);
    const input = wrapper.find('.search-bar__input');
    const button = wrapper.find('.search-bar__btn');

    // Act
    await input.setValue('test');
    await button.trigger('click');

    // Wait until all emits have been handled
    await wrapper.vm.$nextTick();

    // Assert
    expect(wrapper.emitted().search.length).toBe(1); // Make sure that the event has been emitted only once
    expect(wrapper.emitted().search).toBeTruthy();
});


test('That when the search event is emitted, the search value is returned', async () => {
    // Arrange
    const wrapper = mount(LargeSearchBar);
    const input = wrapper.find('.search-bar__input');
    const button = wrapper.find('.search-bar__btn');
    
    const searchValue = "my-search-value";

    // Act
    await input.setValue(searchValue);
    await button.trigger('click');

    // Wait until all emits have been handled
    await wrapper.vm.$nextTick();

    // Assert
    expect(wrapper.emitted().search.length).toBe(1); // Make sure that the event has been emitted only once
    expect(wrapper.emitted().search[0][0]).toBe(searchValue);
});

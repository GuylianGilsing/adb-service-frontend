import { mount } from '@vue/test-utils';

import Attraction from '@/components/Attraction.vue';

test('That all passed props get rendered correctly.', async () => {
    // Arrange
    const wrapper = mount(Attraction);
    const coasterData = {
        url: '/attraction',
        name: 'Test attraction',
        park: 'Test Park',
        description: 'Test description'
    }

    // Act
    await wrapper.setProps({
        url: coasterData.url,
        name: coasterData.name, 
        park: coasterData.park,
        description: coasterData.description
    });

    // Assert
    const name = wrapper.find('.attraction__name');
    const park = wrapper.find('.attraction__park');
    const description = wrapper.find('.attraction__description');

    expect(name.text()).toBe(coasterData.name);
    expect(park.text()).toBe(coasterData.park);
    expect(description.text()).toBe(coasterData.description);
    expect(wrapper.find(`[to="${coasterData.url}"].btn.btn--primary`).exists()).toBe(true);
});

test('That a placeholder image is shown when no image gets passed to the component.', async () => {
    // Arrange + act
    const wrapper = mount(Attraction);

    // Assert
    const image = wrapper.find('.attraction__image');

    expect(image.exists()).toBe(true);
    expect(image.element.getAttribute('src')).toBe('/assets/img/placeholders/image.svg');
});

test('That the given image is shown when it is passed to the component.', async () => {
    // Arrange
    const coasterData = {
        image: '/path-to-image/example.jpg'
    }

    // Act
    const wrapper = mount(Attraction, {
        props: {
            image: coasterData.image,
        }
    });

    await wrapper.trigger('update');

    // Assert
    const image = wrapper.find('.attraction__image');

    expect(image.exists()).toBe(true);
    expect(image.element.getAttribute('src')).toBe(coasterData.image);
});

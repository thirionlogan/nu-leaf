import React from 'react';
import { mount } from 'enzyme';
import Copyright from './Copyright';
import { createMount } from '@material-ui/core/test-utils';

describe('Copyright View', () => {
    let mount;
    beforeEach(() => {
        mount = createMount();
    });
    it('should render', () => {
        const wrapper = mount(<Copyright/>);
        expect(wrapper.text()).toEqual('Copyright © NuLeaf 2021.');
    });
});

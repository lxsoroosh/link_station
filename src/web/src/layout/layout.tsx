import React, { FC, ReactElement } from 'react';
import Header from './header';
import HomePage from '../pages/homePage';
import { Stack } from '@fluentui/react';
import { headerStackStyles, mainStackStyles, rootStackStyles, sidebarStackStyles } from '../ux/styles';

const Layout: FC = (): ReactElement => {

    return (
        <Stack styles={rootStackStyles}>
            <Stack.Item styles={headerStackStyles}>
                <Header></Header>
            </Stack.Item>
            <Stack horizontal grow={1}>
                <Stack.Item grow={2} styles={mainStackStyles}>
                    <HomePage />
                </Stack.Item>
            </Stack>
        </Stack>
    );
}

export default Layout;

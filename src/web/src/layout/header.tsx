import { FontIcon, getTheme, IconButton, IIconProps, IStackStyles, mergeStyles, Persona, PersonaSize, Stack, Text } from '@fluentui/react';
import React, { FC, ReactElement } from 'react';
import {Box, Typography} from "@mui/material";

const theme = getTheme();

const logoStyles: IStackStyles = {
    root: {
        width: 'auto', // Adjusted from fixed width to auto
        background: theme.palette.themePrimary,
        alignItems: 'center',
        padding: '0 20px',
        display: 'flex', // Ensure flexbox is used for better alignment
        justifyContent: 'start' // Align items to the start of the flex container
    }
}

const logoIconClass = mergeStyles({
    fontSize: 20,
    paddingRight: 10
});


const Header: FC = (): ReactElement => {
    return (
        <Stack horizontal>
            <Stack horizontal styles={logoStyles}>
                <FontIcon aria-label="Check" iconName="SkypeCircleCheck" className={logoIconClass} />
                <Text variant="xLarge">Link Station Operations</Text>
            </Stack>
            <Stack.Item grow={1}>
                <div></div>
            </Stack.Item>
            <Stack.Item>
                <div></div>
            </Stack.Item>
        </Stack>
    );
}

export default Header;
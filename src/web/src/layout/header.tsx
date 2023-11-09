import { FontIcon, getTheme, IconButton, IIconProps, IStackStyles, mergeStyles, Persona, PersonaSize, Stack, Text } from '@fluentui/react';
import React, { FC, ReactElement } from 'react';
import {Box, Typography} from "@mui/material";

const theme = getTheme();

const logoStyles: IStackStyles = {
    root: {
        width: '300px',
        background: theme.palette.themePrimary,
        alignItems: 'center',
        padding: '0 20px'
    }
}

const logoIconClass = mergeStyles({
    fontSize: 20,
    paddingRight: 10
});

const toolStackClass: IStackStyles = {
    root: {
        alignItems: 'center',
        height: 48,
        paddingRight: 10
    }
}

const iconProps: IIconProps = {
    styles: {
        root: {
            fontSize: 16,
            color: theme.palette.white
        }
    }
}

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
                <Stack horizontal styles={logoStyles}>
                    <Box
                        component="img"
                        sx={{
                            height: 45,
                            width: 250,
                        }}
                        alt="Nordcloud Logo"
                        src="/nordcloud12.png"
                    />
                </Stack>
            </Stack.Item>
        </Stack>
    );
}

export default Header;
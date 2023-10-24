import { ApplicationProvider } from "@ui-kitten/components";
import { Link, Slot } from "expo-router";
import * as eva from "@eva-design/eva";
import React from 'react';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';

export default function SettingsLayout() {
    const goBackString = `<- go home`;
    return (
        <ApplicationProvider {...eva} theme={eva.dark}>
            <TopNavigation
                accessoryLeft={
                    () => (
                        <TopNavigationAction
                            icon={() => <Link href="/" style={{ color: "#ffffff" }}>{goBackString}</Link>}
                        />
                    )
                }
                title=''
            />
            <Slot />
        </ApplicationProvider>
    )
}
import React from 'react'
import {
    View,
    ScrollView,
    StyleSheet
}   from 'react-native'

export default VerticalScroll = ( {children } ) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} nestedScrollEnabled={true}>
                {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start'
    }
});

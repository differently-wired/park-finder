import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';


export function ParkingFormModal(props) {
    const { notes, setNotes } = props;
    const [visibleModal, setVisibleModal] = useState(null);

    
    console.log(notes, setNotes)
    const _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    const _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text>Hello!</Text>
            <View style={{ flex: 1 }} />
            {_renderButton('Close', () => setVisibleModal(null))}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Form</Text>

            {_renderButton('Fancy modal!', () => setVisibleModal(4))}

            <Modal isVisible={visibleModal === 1}>{_renderModalContent()}</Modal>

            <Modal
                isVisible={visibleModal === 4}
                backdropColor={'white'}
                backdropOpacity={1}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                animationInTiming={100}
                animationOutTiming={100}
                backdropTransitionInTiming={100}
                backdropTransitionOutTiming={100}>
                {_renderModalContent()}
            </Modal>
            <Modal isVisible={visibleModal === 5} style={styles.bottomModal}>
                {_renderModalContent()}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'black',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.0)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});
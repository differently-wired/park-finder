import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';


export function ParkingFormModal(props) {
    const { notes, setNotes } = props;
    const [visibleModal, setVisibleModal] = useState(null);
    const [newNote, setNewNote] = useState("");

    
    const saveNote = () => {
        setNotes(notes.concat(newNote));
        setNewNote("");
        setVisibleModal(null);
    }

    const _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    const _renderModalContent = () => (
        <View style={styles.modalContent}>
            <TextInput
                placeholder="Enter note"
                value={newNote}
                onChangeText={(text) => setNewNote(text)}
                style={styles.input}
            />
            <View style={{ flexDirection: 'row' }}>
                {_renderButton('Submit', saveNote)}
                {_renderButton('Cancel', () => setVisibleModal(null))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Form</Text>

            {_renderButton('Add Note', () => setVisibleModal(4))}

            <Modal isVisible={visibleModal === 4}>
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
        marginRight: 8,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.0)',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        width: '100%',
    },
});

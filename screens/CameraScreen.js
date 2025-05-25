import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>Sem acesso à câmera</Text>;

  return (
    <View style={styles.container}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.preview} />
      ) : (
        <Camera style={styles.camera} ref={cameraRef} />
      )}
      <Button title={photo ? 'Tirar outra' : 'Tirar Foto'} onPress={() => (photo ? setPhoto(null) : takePicture())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  camera: { flex: 1 },
  preview: { flex: 1, resizeMode: 'cover' },
});

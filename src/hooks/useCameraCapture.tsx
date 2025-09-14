import { useRef, useState } from "react";
import type { CameraView } from "expo-camera";

export default function useCameraCapture() {
  const cameraRef = useRef<CameraView>(null);
  const [capturing, setCapturing] = useState(false);

  const takePicture = async (): Promise<string> => {
    if (!cameraRef.current || capturing) return "";
    try {
      setCapturing(true);
      const pic = await cameraRef.current.takePictureAsync();
      return pic.uri;
    } finally {
      setCapturing(false);
    }
  };

  return { cameraRef, capturing, takePicture };
}

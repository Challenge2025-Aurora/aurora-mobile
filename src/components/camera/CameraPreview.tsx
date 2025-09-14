import { forwardRef } from "react";
import { CameraView, CameraViewProps } from "expo-camera";

const CameraPreview = forwardRef<CameraView, CameraViewProps>((props, ref) => {
  return <CameraView ref={ref} style={{ flex: 1 }} {...props} />;
});

export default CameraPreview;

import React, { useState, useCallback } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { Box, Button, Slider, Typography, CircularProgress } from "@mui/material";

import readFile from "@/utils/readFile";

interface AvatarCropperProps {
  size?: number;
  onSave: (croppedBlob: Blob) => void;
  loading?: boolean;
}

const AvatarCropper: React.FC<AvatarCropperProps> = ({ onSave, loading }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("No 2D context found");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/png");
    });
  };

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    onSave(croppedBlob);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <Typography variant="body1">Subiendo avatar...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  if (!imageSrc) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <Button variant="contained" component="label">
          Cargar Imagen
          <input hidden accept="image/*" type="file" onChange={onFileChange} />
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, p: 2 }}  >

      <Box position="relative" width={250} height={250} sx={{ backgroundColor: "#333" }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          cropSize={{ width: 250, height: 250 }}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Box>

      <Typography variant="body2" sx={{ mt: 1 }}>Ajustar Zoom</Typography>
      <Slider
        min={1}
        max={3}
        step={0.1}
        value={zoom}
        onChange={(_, value) => setZoom(value as number)}
        sx={{ width: 200 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: 2, mt: 2, mr: 2 }}>
        <Button color="error" variant="contained" onClick={() => setImageSrc(null)}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
      </Box>

    </Box>
  );
};

export default AvatarCropper;

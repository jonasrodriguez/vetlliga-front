import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Box from '@mui/material/Box';

interface LazyAvatarProps {
  src: string;
  size?: number;
  alt?: string;
  onClick?: () => void;
}

const LazyAvatar: React.FC<LazyAvatarProps> = ({ src, size = 150, alt, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {!loaded && <Skeleton variant="circular" width={size} height={size} />}
      
      <Avatar
        src={src}
        alt={alt}
        sx={{
          width: size,
          height: size,
          display: loaded ? 'flex' : 'none',
        }}
        imgProps={{
          loading: 'lazy',
          onLoad: () => setLoaded(true),
        }}
      />

      {hovered && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: size,
            height: size,
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CameraAltIcon sx={{ color: 'white', fontSize: size / 3 }} />
        </Box>
      )}
    </Box>
  );
};

export default LazyAvatar;

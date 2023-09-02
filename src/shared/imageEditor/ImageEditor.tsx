import { HiUser } from 'react-icons/hi';
import AvatarEditor from 'react-avatar-editor';
import { ChangeEventHandler, forwardRef, useEffect, useState } from 'react';

import styles from './ImageEditor.module.scss';

type Props = {
  imageUrl: string;
};

const ImageEditor = forwardRef<AvatarEditor, Props>(({ imageUrl }, ref) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(1);
  }, [imageUrl]);

  const onScaleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const scale = Number(e.target.value ?? 1);

    setScale(scale);
  };

  return (
    <>
      <AvatarEditor
        ref={ref}
        image={imageUrl ?? '/user-icon.png'}
        borderRadius={9999999}
        width={400}
        height={400}
        border={0}
        className={styles.container}
        scale={scale}
      />

      <div className={styles.settingsRow}>
        <HiUser />
        <input
          type="range"
          value={scale}
          min={1}
          max={5}
          step={0.01}
          onChange={onScaleChange}
          className="w-full mx-3"
        />
        <HiUser size={30} />
      </div>
    </>
  );
});

ImageEditor.displayName = 'ImageEditor';

export default ImageEditor;

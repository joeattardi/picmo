import React, { useRef, useState, useEffect } from 'react';

import styles from './styles.module.css';

const keyframes = {
  opacity: [1, 0],
  transform: ['rotateY(0deg)', 'rotateY(90deg)']
};

const options = {
  duration: 200,
  easing: 'ease-in-out',
}

function animate(el: HTMLDivElement, direction: 'normal' | 'reverse' = 'normal') {
  return el.animate(keyframes, { ...options, direction }).finished;
}

export default function Emoji({ emoji }) {
  const ref = useRef<HTMLDivElement>();

  const [currentEmoji, setCurrentEmoji] = useState(null);

  useEffect(() => {
    async function changeEmoji() {
      await animate(ref.current, 'normal');
      setCurrentEmoji(emoji);
      await animate(ref.current, 'reverse');
    }
    
    if (ref.current.animate) {
      changeEmoji();
    } 
  }, [emoji]);

  return <div ref={ref} className={styles.emoji}>{currentEmoji}</div>;
}
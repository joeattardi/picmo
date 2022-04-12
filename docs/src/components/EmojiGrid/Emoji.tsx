import React, { useRef, useState, useEffect } from 'react';

import styles from './styles.module.css';

const keyframes = {
  opacity: [1, 0],
  transform: ['scale(1)', 'scale(0.8)']
};

const options: KeyframeAnimationOptions = {
  duration: 200,
  easing: 'ease-in-out',
  fill: 'both'
}

function animate(el: HTMLDivElement, overrides: KeyframeAnimationOptions = {}) {
  return el.animate(keyframes, { ...options, ...overrides }).finished;
}

export default function Emoji({ emoji, index, total }) {
  const ref = useRef<HTMLDivElement>();

  const [currentEmoji, setCurrentEmoji] = useState(null);

  useEffect(() => {
    async function changeEmoji() {
      await animate(ref.current, { direction: 'normal', delay: index * 50 });
      setCurrentEmoji(emoji);
      await animate(ref.current, { direction: 'reverse', delay: (total - 1) * 50 });
    }
    
    if (ref.current.animate) {
      changeEmoji();
    } 
  }, [emoji]);

  return <div ref={ref} className={styles.emoji}>{currentEmoji}</div>;
}
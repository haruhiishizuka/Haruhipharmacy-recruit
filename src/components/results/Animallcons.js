import React from 'react';

/**
 * 16種類の動物アイコンを提供するコンポーネント
 * @param {Object} props
 * @param {string} props.type - 動物タイプ (owl, fox, eagle, etc.)
 * @param {string} props.color - 色指定 (デフォルトは #1A6CBF)
 * @param {number} props.size - サイズ (デフォルトは 128px)
 * @param {string} props.className - 追加のクラス名
 */
const AnimalIcon = ({ type, color = '#1A6CBF', size = 128, className = '' }) => {
  // AnimalMapに基づいて動物を決定
  const animalType = type || 'default';
  
  const animalIcons = {
    // フクロウ - 専門的・革新的・人間中心・分析的タイプ (SIHA)
    'owl': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 3 6.7l1.3.8 3 1.5a3 3 0 0 0 3.4 0l3-1.5 1.3-.8a9 9 0 0 0 3-6.7 9 9 0 0 0-9-9z" />
        <circle cx="9" cy="9" r="2" fill={color} />
        <circle cx="15" cy="9" r="2" fill={color} />
        <path d="M7 3.1C7 6 9 8 12 8s5-2 5-4.9" />
        <path d="M17 3.1C17 6 15 8 12 8S7 6 7 3.1" />
        <path d="M12 16v2" />
        <path d="M9 18c0 1 .6 3 3 3s3-2 3-3" />
      </svg>
    ),
    
    // キツネ - 専門的・革新的・人間中心・実践的タイプ (SIHP)
    'fox': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 9l3-6 3 6" />
        <path d="M16 9l3-6 3 6" />
        <path d="M9 9h6" />
        <path d="M13 21h5c1 0 2-1 2-2v-7a8 8 0 0 0-16 0v7c0 1 1 2 2 2h5" />
        <circle cx="9" cy="11" r="1" fill={color} />
        <circle cx="15" cy="11" r="1" fill={color} />
        <path d="M9 16c.5 1 1.5 2 3 2s2.5-1 3-2" />
      </svg>
    ),
    
    // ワシ - 専門的・革新的・技術中心・分析的タイプ (SITA)
    'eagle': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3a5 5 0 0 1 4 8" />
        <path d="M12 3a5 5 0 0 0-4 8" />
        <path d="M3 21h18" />
        <path d="M16 21v-6c0-2.5-2-4-4-4-2.5 0-4 1.5-4 4v6" />
        <path d="M11 9c0 1 .6 3 3 3s3-2 3-3" />
        <path d="M19 7c-1 0-2-1-3-1" />
        <path d="M5 7c1 0 2-1 3-1" />
        <circle cx="9" cy="9" r="1" fill={color} />
        <circle cx="15" cy="9" r="1" fill={color} />
        <path d="M12 16v-2" />
      </svg>
    ),
    
    // デフォルト (スマイリー)
    'default': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  };

  /* ----------------------------------------------------------
   * もし SVG が用意されていない場合は /public 配下の PNG にフォールバック
   * 例）public/images/animals/fox.png
   * --------------------------------------------------------*/
  if (!animalIcons[animalType]) {
    const pngPath = `${process.env.PUBLIC_URL}/images/animals/${animalType}.png`;
    return (
      <img src={pngPath} width={size} height={size} alt={animalType} className={className} />
    );
  }

  // SVG があれば従来どおり返す
  return animalIcons[animalType];
};

export default AnimalIcon;
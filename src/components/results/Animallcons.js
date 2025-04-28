import React from 'react';

/**
 * 16種類の動物アイコンを提供するコンポーネント
 * 医療キャリア診断タイプに対応した動物キャラクターを表示
 * 
 * @param {Object} props
 * @param {string} props.type - 動物タイプ (owl, fox, eagle, etc.) またはタイプコード (SIHA, SIHP, etc.)
 * @param {string} props.color - 色指定 (デフォルトは #1A6CBF)
 * @param {number} props.size - サイズ (デフォルトは 128px)
 * @param {string} props.className - 追加のクラス名
 */
const AnimalIcon = ({ type, color = '#1A6CBF', size = 128, className = '' }) => {
  // タイプコードから動物タイプへの変換マッピング
  const typeToAnimal = {
    'SIHA': 'owl',     // 専門的・革新的・人間中心・分析的タイプ
    'SIHP': 'fox',     // 専門的・革新的・人間中心・実践的タイプ
    'SITA': 'eagle',   // 専門的・革新的・技術中心・分析的タイプ
    'SITP': 'dolphin', // 専門的・革新的・技術中心・実践的タイプ
    'SCHA': 'turtle',  // 専門的・継続的・人間中心・分析的タイプ
    'SCHP': 'bear',    // 専門的・継続的・人間中心・実践的タイプ
    'SCTA': 'beaver',  // 専門的・継続的・技術中心・分析的タイプ
    'SCTP': 'elephant', // 専門的・継続的・技術中心・実践的タイプ
    'GIHA': 'monkey',  // 総合的・革新的・人間中心・分析的タイプ
    'GIHP': 'cat',     // 総合的・革新的・人間中心・実践的タイプ
    'GITA': 'wolf',    // 総合的・革新的・技術中心・分析的タイプ
    'GITP': 'horse',   // 総合的・革新的・技術中心・実践的タイプ
    'GCHA': 'koala',   // 総合的・継続的・人間中心・分析的タイプ
    'GCHP': 'rabbit',  // 総合的・継続的・人間中心・実践的タイプ
    'GCTA': 'deer',    // 総合的・継続的・技術中心・分析的タイプ
    'GCTP': 'dog'      // 総合的・継続的・技術中心・実践的タイプ
  };
  
  // 入力がタイプコードの場合は動物タイプに変換、それ以外はそのまま使用
  const animalType = typeToAnimal[type] || type;
  
  // 各動物タイプのSVGアイコン定義
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
    
    // イルカ - 専門的・革新的・技術中心・実践的タイプ (SITP)
    'dolphin': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M11 2c3 0 4 1 5 2.5 3 3 5 3.5 5 7.5V16c0 2-1 4-4 4-2 0-3-1-4-2l1-1" />
        <path d="M10 16c-2-1-3-1-3-2.5 0-1.5 1-3.5-3-3.5-1 0-3 1-3 3 0 1 1 2 3 2s3 1 3 3c0 2 2 2 2 2" />
        <path d="M17 10c.5 0 1-.5 1-1s-.5-1-1-1-1 .5-1 1 .5 1 1 1z" fill={color} />
        <path d="M13 5c2 0 3 1 4 2" />
      </svg>
    ),
    
    // カメ - 専門的・継続的・人間中心・分析的タイプ (SCHA)
    'turtle': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <ellipse cx="12" cy="13" rx="8" ry="7" />
        <path d="M18 11.5l2-3" />
        <path d="M6 11.5l-2-3" />
        <path d="M12 4v6" />
        <path d="M9 4.5L7.5 7" />
        <path d="M15 4.5L16.5 7" />
        <circle cx="9" cy="12" r="1" fill={color} />
        <circle cx="15" cy="12" r="1" fill={color} />
        <path d="M10 16a2 2 0 1 0 4 0" />
      </svg>
    ),
    
    // クマ - 専門的・継続的・人間中心・実践的タイプ (SCHP)
    'bear': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7 9a3 3 0 0 1-3-3c0-1 .5-3 3-3 1.5 0 3 1 3 3v3" />
        <path d="M17 9a3 3 0 0 0 3-3c0-1-.5-3-3-3-1.5 0-3 1-3 3v3" />
        <path d="M8 20h8s1.5-1 1.5-3.5-1-6.5-5.5-6.5-5.5 4-5.5 6.5S8 20 8 20z" />
        <circle cx="10" cy="13" r="1" fill={color} />
        <circle cx="14" cy="13" r="1" fill={color} />
        <path d="M11 16c.2.7.8 1 1 1s.8-.3 1-1" />
      </svg>
    ),
    
    // ビーバー - 専門的・継続的・技術中心・分析的タイプ (SCTA)
    'beaver': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2.5a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
        <path d="M7 10.5v2c0 2.5 2 5 5 5s5-2.5 5-5v-2" />
        <path d="M3 21h18L12 5 3 21z" />
        <circle cx="10" cy="8" r="1" fill={color} />
        <circle cx="14" cy="8" r="1" fill={color} />
        <path d="M10 12l2 1 2-1" />
      </svg>
    ),
    
    // ゾウ - 専門的・継続的・技術中心・実践的タイプ (SCTP)
    'elephant': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 8v9a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3H9v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9.5C4 8.1 4.9 5 9.4 5c4.7 0 4.6 3 5.6 3h3c.4 0 1-.1 1 1Z" />
        <path d="M7 16.5h.01" />
        <path d="M17 16.5h.01" />
        <path d="M18 5h1a2 2 0 0 1 2 2v1" />
        <path d="M12 13v3" />
        <circle cx="9" cy="11" r="1" fill={color} />
        <circle cx="14" cy="11" r="1" fill={color} />
      </svg>
    ),
    
    // サル - 総合的・革新的・人間中心・分析的タイプ (GIHA)
    'monkey': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="9" r="7" />
        <path d="M12 16v5" />
        <path d="M9 21h6" />
        <path d="M8 13c1.5 2 4.5 2 6 0" />
        <circle cx="9" cy="8" r="1" fill={color} />
        <circle cx="15" cy="8" r="1" fill={color} />
        <path d="M7 4.1a5 5 0 0 1 5 0" />
        <path d="M12 4.1a5 5 0 0 1 5 0" />
      </svg>
    ),
    
    // ネコ - 総合的・革新的・人間中心・実践的タイプ (GIHP)
    'cat': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 5c-4.4 0-8 3.6-8 8v2c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2c0-4.4-3.6-8-8-8Z" />
        <path d="m16 7 2-4" />
        <path d="m8 7-2-4" />
        <path d="M10.3 17.7a3 3 0 0 0 3.4 0" />
        <circle cx="9" cy="10" r="1" fill={color} />
        <circle cx="15" cy="10" r="1" fill={color} />
      </svg>
    ),
    
    // オオカミ - 総合的・革新的・技術中心・分析的タイプ (GITA)
    'wolf': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2L6.3 9H3l2 3.5L6.3 17h11.4l1.3-4.5L21 9h-3.3L12 2z" />
        <path d="M9 10.5l-.5 3" />
        <path d="M15 10.5l.5 3" />
        <circle cx="9" cy="11" r="1" fill={color} />
        <circle cx="15" cy="11" r="1" fill={color} />
        <path d="M10 16c.5.5 1.5 1 2 1s1.5-.5 2-1" />
      </svg>
    ),
    
    // ウマ - 総合的・革新的・技術中心・実践的タイプ (GITP)
    'horse': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 22V12c0-1 0-8 7-8h4c1 0 3 1 3 3v4" />
        <path d="M19 11c2 0 3 2 3 5s-1 5-3 5" />
        <path d="M19 21h-6" />
        <path d="M5 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1" />
        <circle cx="9" cy="8" r="1" fill={color} />
        <path d="M15 8h.1" />
        <path d="M9 12c0 1 .5 2 3 2s3-1 3-2" />
      </svg>
    ),
    
    // コアラ - 総合的・継続的・人間中心・分析的タイプ (GCHA)
    'koala': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 11.5v-1C4 8 6 7 8 7s4 1 4 3.5v1" />
        <path d="M16 11.5v-1c0-2.5 2-3.5 4-3.5s4 1 4 3.5v1" />
        <path d="M19 11.5V18a3 3 0 0 1-6 0v-6.5" />
        <path d="M5 11.5V18a3 3 0 0 0 6 0v-6.5" />
        <circle cx="9" cy="10.5" r="1" fill={color} />
        <circle cx="15" cy="10.5" r="1" fill={color} />
        <path d="M11 14h2" />
      </svg>
    ),
    
    // ウサギ - 総合的・継続的・人間中心・実践的タイプ (GCHP)
    'rabbit': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 3a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2z" />
        <path d="M18 3a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2z" />
        <path d="M8 5v9a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V5" />
        <path d="M12 11v5" />
        <path d="M9 14h6" />
        <circle cx="9" cy="10" r="1" fill={color} />
        <circle cx="15" cy="10" r="1" fill={color} />
      </svg>
    ),
    
    // シカ - 総合的・継続的・技術中心・分析的タイプ (GCTA)
    'deer': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
        <path d="M19 5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" />
        <path d="M5 6c0 2 2 3 5 3h4c3 0 5-1 5-3" />
        <path d="M8 9v11" />
        <path d="M16 9v11" />
        <path d="M8 17h8" />
        <circle cx="9" cy="11" r="1" fill={color} />
        <circle cx="15" cy="11" r="1" fill={color} />
      </svg>
    ),
    
    // イヌ - 総合的・継続的・技術中心・実践的タイプ (GCTP)
    'dog': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 3h6l3 3-4 2 4 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10l4-2-4-2 3-3z" />
        <circle cx="9" cy="11" r="1" fill={color} />
        <circle cx="15" cy="11" r="1" fill={color} />
        <path d="M10 15c.5.5 1.5 1 2 1s1.5-.5 2-1" />
        <path d="M6 6H3" />
        <path d="M21 6h-3" />
      </svg>
    ),
    
    // デフォルト (スマイリー)
    'default': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <circle cx="9" cy="9" r="1" fill={color} />
        <circle cx="15" cy="9" r="1" fill={color} />
      </svg>
    )
  };

  // リクエストされたタイプのアイコンを返す (見つからない場合はデフォルト)
  return animalIcons[animalType] || animalIcons['default'];
};

/**
 * 動物名の日本語名を返す関数
 * @param {string} typeCode - 動物タイプまたはタイプコード
 * @returns {string} - 動物の日本語名
 */
export const getAnimalName = (typeCode) => {
  const animalNameMap = {
    'owl': 'フクロウ',
    'fox': 'キツネ',
    'eagle': 'ワシ',
    'dolphin': 'イルカ',
    'turtle': 'カメ',
    'bear': 'クマ',
    'beaver': 'ビーバー',
    'elephant': 'ゾウ',
    'monkey': 'サル',
    'cat': 'ネコ',
    'wolf': 'オオカミ',
    'horse': 'ウマ',
    'koala': 'コアラ',
    'rabbit': 'ウサギ',
    'deer': 'シカ',
    'dog': 'イヌ',
    'SIHA': 'フクロウ',
    'SIHP': 'キツネ',
    'SITA': 'ワシ',
    'SITP': 'イルカ',
    'SCHA': 'カメ',
    'SCHP': 'クマ',
    'SCTA': 'ビーバー',
    'SCTP': 'ゾウ',
    'GIHA': 'サル',
    'GIHP': 'ネコ',
    'GITA': 'オオカミ',
    'GITP': 'ウマ',
    'GCHA': 'コアラ',
    'GCHP': 'ウサギ',
    'GCTA': 'シカ',
    'GCTP': 'イヌ'
  };
  
  return animalNameMap[typeCode] || 'フクロウ';
};

/**
 * タイプコードから動物タイプを返す関数
 * @param {string} typeCode - タイプコード
 * @returns {string} - 動物タイプ
 */
export const getAnimalType = (typeCode) => {
  const typeToAnimal = {
    'SIHA': 'owl',
    'SIHP': 'fox',
    'SITA': 'eagle',
    'SITP': 'dolphin',
    'SCHA': 'turtle',
    'SCHP': 'bear',
    'SCTA': 'beaver',
    'SCTP': 'elephant',
    'GIHA': 'monkey',
    'GIHP': 'cat',
    'GITA': 'wolf',
    'GITP': 'horse',
    'GCHA': 'koala',
    'GCHP': 'rabbit',
    'GCTA': 'deer',
    'GCTP': 'dog'
  };
  
  return typeToAnimal[typeCode] || 'owl';
};

export default AnimalIcon;
// ProfessionSelect.js の修正版
import React from 'react';
import { motion } from 'framer-motion';

const ProfessionSelect = ({ selectedProfession, onSelect }) => {
  // 職種データに視覚的要素を追加
  const professions = [
    { 
      id: 'nurse', 
      label: '看護師', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      ),
      description: "病院・クリニック・訪問看護ステーションなど"
    },
    { 
      id: 'pharmacist', 
      label: '薬剤師', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14a7 7 0 1 0-14 0"></path>
          <circle cx="12" cy="8" r="7"></circle>
          <path d="M12 8v8"></path>
          <path d="M8 12h8"></path>
        </svg>
      ),
      description: "病院・調剤薬局・ドラッグストアなど"
    },
    { 
      id: 'therapist', 
      label: 'リハビリ系', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
          <path d="M9 17l0 -5"></path>
          <path d="M12 17l0 -4"></path>
          <path d="M15 17l0 -3"></path>
        </svg>
      ),
      description: "PT・OT・ST（理学/作業/言語聴覚療法士）"
    },
    { 
      id: 'other', 
      label: 'その他医療職', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
      description: "臨床検査技師・放射線技師・臨床工学技士など"
    }
  ];

  // カード全体のアニメーション
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // 各カードのアニメーション
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div style={{ 
      fontFamily: `'Inter', 'Noto Sans JP', sans-serif`, 
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/patterns/medical_pattern_light.png)`,
      backgroundSize: '400px',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundColor: '#65A9E5',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        padding: '40px 30px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}>
        <h3 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          textAlign: 'center',
          color: '#1A6CBF',
          marginBottom: '30px'
        }}>
          あなたの職種を選択してください
        </h3>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {professions.map(profession => (
            <motion.div
              key={profession.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault();
                if (typeof onSelect === 'function') {
                  onSelect(profession.id);
                }
              }}
              style={{
                cursor: 'pointer',
                padding: '24px',
                borderRadius: '16px',
                border: '2px solid',
                borderColor: selectedProfession === profession.id ? '#1A6CBF' : '#E5E7EB',
                backgroundColor: selectedProfession === profession.id ? 'rgba(26, 108, 191, 0.05)' : 'white',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  marginRight: '16px',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: selectedProfession === profession.id ? '#1A6CBF' : '#F3F4F6',
                  color: selectedProfession === profession.id ? 'white' : '#4B5563',
                }}>
                  {profession.icon}
                </div>
                
                <div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '6px',
                    color: selectedProfession === profession.id ? '#1A6CBF' : '#1F2937',
                  }}>
                    {profession.label}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    margin: 0,
                  }}>
                    {profession.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              if (selectedProfession && typeof onSelect === 'function') {
                onSelect(selectedProfession);
              }
            }}
            disabled={!selectedProfession}
            style={{
              backgroundColor: selectedProfession ? '#1A6CBF' : '#A5B4FC',
              color: 'white',
              border: 'none',
              borderRadius: '32px',
              padding: '14px 36px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: selectedProfession ? 'pointer' : 'not-allowed',
              opacity: selectedProfession ? 1 : 0.7,
              boxShadow: selectedProfession ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
            }}
          >
            次へ進む
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionSelect;
